// Builds a human "May 2024 — Present" label from start/end if `period` is absent.
function periodLabel(exp) {
  if (exp.period) return exp.period;
  const fmt = (s) => {
    if (!s || s === "Present") return s || "";
    const [y, m] = s.split("-");
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return m ? `${months[+m - 1]} ${y}` : y;
  };
  return [fmt(exp.startDate), fmt(exp.endDate)].filter(Boolean).join(" — ");
}

function bulletsOf(exp) {
  if (Array.isArray(exp.bullets)) return exp.bullets;
  if (exp.description) return exp.description.split("\n").filter(Boolean);
  return [];
}

export default function ExperienceSection({ experience }) {
  return (
    <section id="experience">
      <div className="section-header reveal">
        <div className="section-tag">Work History</div>
        <h2 className="section-title">Professional <span className="highlight">Experience</span></h2>
      </div>
      <div className="timeline">
        {experience.map((exp, i) => (
          <div className={`timeline-item reveal${i % 2 ? " delay-2" : ""}`} key={exp.id || i}>
            <div className="timeline-dot" />
            <div className="timeline-period">{periodLabel(exp)}</div>
            <div className="timeline-card">
              <div className="timeline-role">{exp.role}</div>
              <div className="timeline-company">{exp.company}</div>
              {exp.location && (
                <div className="timeline-loc"><i className="fas fa-map-marker-alt" /> {exp.location}</div>
              )}
              <ul className="timeline-bullets">
                {bulletsOf(exp).map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
