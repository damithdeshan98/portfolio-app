export default function ProjectsSection({ projects }) {
  return (
    <section id="projects">
      <div className="section-header reveal">
        <div className="section-tag">What I've Built</div>
        <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            className={`project-card${p.featured ? " featured" : ""} reveal delay-${(i % 4) + 1}`}
            key={p.id || i}
          >
            <div className="project-num">
              {String(i + 1).padStart(2, "0")}{p.featured ? " / Featured" : ""}
            </div>
            {p.imageUrl ? (
              <img className="project-thumb" src={p.imageUrl} alt={p.title} />
            ) : (
              <div className="project-icon">
                <i className={p.icon || "fas fa-folder"} />
              </div>
            )}
            <div className="project-name">{p.title}</div>
            {p.period && <div className="project-period">{p.period}</div>}
            <div className="project-desc">{p.description}</div>
            <div className="project-tags">
              {(p.techStack || []).map((t) => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <div className="project-links">
              {p.githubUrl && (
                <a href={p.githubUrl} target="_blank" rel="noopener" className="project-link">
                  <i className="fab fa-github" /> View Repo
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener" className="project-link">
                  <i className="fas fa-external-link-alt" /> Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
