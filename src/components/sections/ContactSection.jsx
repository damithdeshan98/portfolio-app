export default function ContactSection({ profile }) {
  const social = profile.socialLinks || {};
  return (
    <section id="contact">
      <div className="contact-inner">
        <div className="contact-pre reveal">// Let's connect</div>
        <h2 className="contact-headline reveal delay-1">
          Ready to build<br />
          <span style={{ color: "var(--teal)" }}>something great?</span>
        </h2>
        <p className="contact-desc reveal delay-2">
          I'm open to new opportunities, collaborations, and interesting projects.
          Whether you have a question or just want to say hi — my inbox is always open.
        </p>
        <div className="contact-links reveal delay-2">
          {profile.email && (
            <a href={`mailto:${profile.email}`} className="contact-link">
              <i className="fas fa-envelope" /> {profile.email}
            </a>
          )}
          {profile.phone && (
            <a href={`tel:${profile.phone.replace(/\s+/g, "")}`} className="contact-link">
              <i className="fas fa-phone" /> {profile.phone}
            </a>
          )}
          {social.linkedin && (
            <a href={social.linkedin} target="_blank" rel="noopener" className="contact-link">
              <i className="fab fa-linkedin-in" /> LinkedIn
            </a>
          )}
          {social.github && (
            <a href={social.github} target="_blank" rel="noopener" className="contact-link">
              <i className="fab fa-github" /> GitHub
            </a>
          )}
        </div>
        {profile.cvUrl && (
          <div className="reveal delay-3">
            <a href={profile.cvUrl} download className="btn-primary" style={{ display: "inline-flex" }}>
              <i className="fas fa-download" /> Download CV
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
