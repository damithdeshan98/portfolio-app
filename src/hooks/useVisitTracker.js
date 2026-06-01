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
 * Logs a visitor session to Firestore: IP + arrival time on mount, then a
 * close time + duration that is refreshed on a heartbeat and whenever the tab
 * is hidden or closed. Mounted once at the public layout level.
 */
export default function useVisitTracker() {
  // Refs persist across React 18 StrictMode's double-invoke so we create the
  // visit only once while still re-attaching listeners on every effect run.
  const idRef = useRef(null);
  const startRef = useRef(Date.now());
  const creatingRef = useRef(false);

  useEffect(() => {
    // Resume an existing session if this tab already logged one.
    if (!idRef.current) {
      const stored = sessionStorage.getItem(KEY);
      if (stored) {
        try {
          const v = JSON.parse(stored);
          idRef.current = v.id;
          startRef.current = v.start || startRef.current;
        } catch {
          /* corrupt value — start fresh */
        }
      }
    }

    // Write the current close time + elapsed seconds. Safe to call repeatedly;
    // the latest values simply overwrite the previous ones.
    const flush = () => {
      if (!idRef.current) return;
      const durationSec = Math.round((Date.now() - startRef.current) / 1000);
      closeVisit(idRef.current, durationSec).catch(() => {});
    };

    const begin = async () => {
      if (idRef.current || creatingRef.current) return;
      creatingRef.current = true;
      const ip = await fetchIp();
      try {
        const id = await logVisit({
          ip,
          userAgent: navigator.userAgent,
          path: window.location.pathname,
          referrer: document.referrer || "direct",
        });
        idRef.current = id;
        startRef.current = Date.now();
        sessionStorage.setItem(KEY, JSON.stringify({ id, start: startRef.current }));
        // Stamp an initial close time straight away so the field is never empty
        // even if the visitor leaves before the first heartbeat.
        flush();
      } catch {
        // Writes may be blocked by rules or an extension — allow a retry later.
        creatingRef.current = false;
      }
    };

    begin();

    const onVisibility = () => {
      if (document.visibilityState === "hidden") flush();
    };
    // Frequent enough that an abrupt close still leaves a recent close time.
    const heartbeat = setInterval(flush, 15000);

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", flush);
    window.addEventListener("beforeunload", flush);

    return () => {
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", flush);
      window.removeEventListener("beforeunload", flush);
      flush();
    };
  }, []);
}
