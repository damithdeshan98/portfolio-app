import { useEffect, useRef } from "react";
import { logVisit, closeVisit } from "../services/firestoreService";

// One visit record per browser session (a tab). The id + start time are kept in
// sessionStorage so a page reload keeps appending to the same visit instead of
// creating a brand-new one, and the total duration stays accurate.
const KEY = "pf_visit";

// Look up the visitor's public IP. Best-effort: if the lookup is blocked or
// offline we still log the visit, just without an IP.
async function fetchIp() {
  try {
    const r = await fetch("https://api.ipify.org?format=json");
    const j = await r.json();
    return j.ip || "unknown";
  } catch {
    return "unknown";
  }
}

/**
 * Logs a visitor session to Firestore: IP + arrival time on mount, then close
 * time + duration on a heartbeat and when the tab is hidden/closed. Mounted
 * once at the public layout level.
 */
export default function useVisitTracker() {
  const started = useRef(false);

  useEffect(() => {
    // Guard against React 18 StrictMode double-invoking the effect in dev.
    if (started.current) return;
    started.current = true;

    let visitId = null;
    let startMs = Date.now();

    // Resume an existing session if this tab already logged one.
    const stored = sessionStorage.getItem(KEY);
    if (stored) {
      try {
        const v = JSON.parse(stored);
        visitId = v.id;
        startMs = v.start || startMs;
      } catch {
        /* corrupt value — start fresh */
      }
    }

    const begin = async () => {
      if (visitId) return; // already logging this session
      const ip = await fetchIp();
      try {
        const id = await logVisit({
          ip,
          userAgent: navigator.userAgent,
          path: window.location.pathname,
          referrer: document.referrer || "direct",
        });
        visitId = id;
        startMs = Date.now();
        sessionStorage.setItem(KEY, JSON.stringify({ id, start: startMs }));
      } catch {
        /* writes may be blocked by rules or an extension — ignore */
      }
    };

    const flush = () => {
      if (!visitId) return;
      const durationSec = Math.round((Date.now() - startMs) / 1000);
      closeVisit(visitId, durationSec).catch(() => {});
    };

    begin();

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    const heartbeat = setInterval(flush, 30000);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      flush();
    };
  }, []);
}
