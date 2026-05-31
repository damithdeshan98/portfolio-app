import { useEffect } from "react";

/**
 * Adds the `.visible` class to any `.reveal`, `.reveal-left`, `.reveal-right`
 * element as it scrolls into view. Re-runs when `deps` change so newly
 * rendered (async-loaded) content also animates.
 */
export default function useReveal(deps = []) {
  useEffect(() => {
    const els = document.querySelectorAll(
      ".reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible)"
    );
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
