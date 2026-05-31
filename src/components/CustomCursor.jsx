import { useEffect, useRef } from "react";

// Glowing dot + trailing ring cursor (desktop only). Mirrors the original site.
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    document.body.classList.add("has-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0, raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const anim = () => {
      dot.style.left = mx + "px";
      dot.style.top = my + "px";
      dot.style.transform = "translate(-50%,-50%)";
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      raf = requestAnimationFrame(anim);
    };
    anim();

    const activate = () => { dot.classList.add("active"); ring.classList.add("active"); };
    const deactivate = () => { dot.classList.remove("active"); ring.classList.remove("active"); };
    const bind = () => {
      document
        .querySelectorAll("a, button, .project-card, .tech-chip, input, textarea, select")
        .forEach((el) => {
          el.addEventListener("mouseenter", activate);
          el.addEventListener("mouseleave", deactivate);
        });
    };
    bind();
    // Rebind periodically so dynamically rendered elements get hover states.
    const interval = setInterval(bind, 2000);

    document.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
      document.removeEventListener("mousemove", onMove);
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  );
}
