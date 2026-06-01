import { useEffect, useRef } from "react";
import { seedStats } from "../data/seed";

// Animated count-up stats strip shown under the hero.
export default function StatsBand({ stats = seedStats }) {
  const ref = useRef(null);

  useEffect(() => {
    const band = ref.current;
    if (!band) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          band.querySelectorAll(".stat-num").forEach((el) => {
            const target = +el.dataset.target;
            const suffix = el.dataset.suffix || "";
            let count = 0;
            const step = Math.ceil(target / 40);
            const timer = setInterval(() => {
              count = Math.min(count + step, target);
              el.textContent = count + suffix;
              if (count >= target) clearInterval(timer);
            }, 40);
          });
          obs.unobserve(e.target);
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(band);
    return () => obs.disconnect();
  }, [stats]);

  return (
    <div
      className="stats-band"
      ref={ref}
      style={{ "--stat-count": stats.length }}
    >
      {stats.map((s, i) => (
        <div className="stat-item" key={i}>
          <div className="stat-num" data-target={s.num} data-suffix={s.suffix}>0{s.suffix}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
