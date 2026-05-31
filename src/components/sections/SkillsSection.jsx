import { useEffect, useRef } from "react";

export default function SkillsSection({ skills }) {
  const sectionRef = useRef(null);

  // Skills with a level render as bars (left column); level-0 entries are
  // treated as tool chips (right column).
  const bars = skills.filter((s) => s.category !== "Tools" && s.level > 0);
  const tools = skills.filter((s) => s.category === "Tools" || !s.level);

  useEffect(() => {
    const sec = sectionRef.current;
    if (!sec) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            sec.querySelectorAll(".skill-fill").forEach((bar) => {
              bar.style.width = bar.dataset.width + "%";
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(sec);
    return () => obs.disconnect();
  }, [skills]);

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-header reveal">
        <div className="section-tag">Technical Expertise</div>
        <h2 className="section-title">Skills &amp; <span className="highlight">Technologies</span></h2>
      </div>
      <div className="skills-layout">
        <div className="reveal-left">
          <div className="skills-col-title">Core Proficiency</div>
          {bars.map((s, i) => (
            <div className="skill-bar-item" key={s.id || i}>
              <div className="skill-bar-header">
                <span className="skill-name">{s.name}</span>
                <span className="skill-pct">{s.level}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" data-width={s.level} />
              </div>
            </div>
          ))}
        </div>
        <div className="reveal-right">
          <div className="skills-col-title">Tools &amp; Ecosystem</div>
          <div className="tech-grid">
            {tools.map((s, i) => (
              <div className="tech-chip" key={s.id || i}>
                <i className={s.icon || "fas fa-code"} />
                {s.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
