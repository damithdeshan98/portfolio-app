function initials(name = "") {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const CHIPS = [
  { icon: "fas fa-code", label: "Full-Stack Java" },
  { icon: "fas fa-hospital", label: "Healthcare IT" },
  { icon: "fas fa-exchange-alt", label: "HL7 / FHIR" },
  { icon: "fas fa-mobile-alt", label: "Flutter" },
];

export default function AboutSection({ profile }) {
  const paragraphs = Array.isArray(profile.about)
    ? profile.about
    : [profile.about].filter(Boolean);
  const social = profile.socialLinks || {};

  return (
    <section id="about">
      <div className="section-header reveal">
        <div className="section-tag">Get to know me</div>
        <h2 className="section-title">About <span className="highlight">Me</span></h2>
      </div>
      <div className="about-grid">
        <div className="about-text reveal-left">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <div className="about-highlights">
            {CHIPS.map((c) => (
              <div className="highlight-chip" key={c.label}>
                <i className={c.icon} /> {c.label}
              </div>
            ))}
          </div>
        </div>
        <div className="about-visual reveal-right">
          <div style={{ position: "relative", padding: "1.5rem" }}>
            <div className="about-card-main">
              <div className="about-avatar">
                {profile.profileImageUrl ? (
                  <img src={profile.profileImageUrl} alt={profile.fullName} />
                ) : (
                  initials(profile.fullName)
                )}
              </div>
              <div className="about-name-big">{profile.fullName}</div>
              <div className="about-role-tag">// {profile.title}</div>
              <ul className="about-info-list">
                {profile.email && (
                  <li><i className="fas fa-envelope" /> <a href={`mailto:${profile.email}`}>{profile.email}</a></li>
                )}
                {profile.phone && <li><i className="fas fa-phone" /> {profile.phone}</li>}
                {profile.location && <li><i className="fas fa-map-marker-alt" /> {profile.location}</li>}
                {social.linkedin && (
                  <li><i className="fab fa-linkedin-in" /> <a href={social.linkedin} target="_blank" rel="noopener">LinkedIn</a></li>
                )}
                {profile.languages && <li><i className="fas fa-language" /> {profile.languages}</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
