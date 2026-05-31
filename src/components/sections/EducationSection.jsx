export default function EducationSection({ qualifications, showAward = true }) {
  return (
    <section id="education">
      <div className="section-header reveal">
        <div className="section-tag">Academic Background</div>
        <h2 className="section-title">Education &amp; <span className="highlight">Qualifications</span></h2>
      </div>
      <div className="edu-grid">
        {qualifications.map((q, i) => (
          <div
            className={`edu-card${q.primary ? " primary" : ""} reveal${i ? ` delay-${i}` : ""}`}
            data-year={q.yearTag || q.year}
            key={q.id || i}
          >
            <div className="edu-icon"><i className={q.icon || "fas fa-graduation-cap"} /></div>
            <div className="edu-degree">{q.degree}</div>
            <div className="edu-inst">{q.institution}</div>
            {(q.location || q.year) && (
              <div className="edu-loc">
                <i className="fas fa-map-marker-alt" /> {[q.location, q.year].filter(Boolean).join(" · ")}
              </div>
            )}
            {q.description && <div className="edu-loc" style={{ marginTop: "0.6rem" }}>{q.description}</div>}
          </div>
        ))}
      </div>

      {showAward && (
        <a
          className="award-banner reveal"
          href="https://github.com/gayanvoice/top-github-users/blob/main/markdown/public_contributions/sri_lanka.md"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="award-icon"><i className="fas fa-trophy" /></div>
          <div>
            <div className="award-title">GitHub Sri Lanka Ranking</div>
            <div className="award-desc">
              Ranked among the top GitHub users in Sri Lanka for public contributions —
              recognized for open-source activity and code quality.
            </div>
          </div>
          <div className="award-rank">
            <div className="rank-num">#8</div>
            <div className="rank-label">Sri Lanka</div>
          </div>
        </a>
      )}
    </section>
  );
}
