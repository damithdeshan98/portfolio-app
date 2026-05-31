import { useEffect, useRef, useState } from "react";
import Constellation from "../Constellation";

// Splits a full name into "First" + remainder, with last 4 chars accented,
// approximating the original two-line hero treatment.
function splitName(full = "") {
  const parts = full.trim().split(" ");
  const line1 = parts.slice(0, -1).join(" ") || full;
  const last = parts[parts.length - 1] || "";
  const cut = Math.max(1, last.length - 4);
  return { line1, lead: last.slice(0, cut), accent: last.slice(cut) };
}

export default function HeroSection({ profile }) {
  const roles = profile.roles?.length ? profile.roles : [profile.title];
  const typedRef = useRef(null);
  const [name] = useState(() => splitName(profile.fullName));

  useEffect(() => {
    let ri = 0, ci = 0, deleting = false, timer;
    const el = typedRef.current;
    if (!el) return;
    const type = () => {
      const word = roles[ri];
      if (!deleting) {
        el.textContent = word.slice(0, ++ci);
        if (ci === word.length) { deleting = true; timer = setTimeout(type, 1800); return; }
      } else {
        el.textContent = word.slice(0, --ci);
        if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
      }
      timer = setTimeout(type, deleting ? 40 : 80);
    };
    timer = setTimeout(type, 1200);
    return () => clearTimeout(timer);
  }, [roles]);

  const social = profile.socialLinks || {};

  return (
    <section id="hero">
      <Constellation />
      <div className="hero-grid-overlay" />

      <div className="hero-content">
        {profile.tagline && <div className="hero-tag">{profile.tagline}</div>}
        <h1 className="hero-name">
          <span className="line1">{name.line1}</span>
          <span className="line2">
            {name.lead}
            <span className="accent">{name.accent}</span>
          </span>
        </h1>
        <div className="hero-role">
          <span className="typed-text" ref={typedRef} />
          <span className="cursor-blink" />
        </div>
        <p className="hero-desc">{profile.heroDesc}</p>
        <div className="hero-actions">
          <a
            href="#projects"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }); }}
          >
            <i className="fas fa-folder-open" /> View Work
          </a>
          {profile.cvUrl && (
            <a href={profile.cvUrl} download className="btn-outline">
              <i className="fas fa-download" /> Download CV
            </a>
          )}
        </div>
      </div>

      <div className="hero-socials">
        {profile.email && (
          <a href={`mailto:${profile.email}`} title="Email"><i className="fas fa-envelope" /></a>
        )}
        {social.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener" title="LinkedIn"><i className="fab fa-linkedin-in" /></a>
        )}
        {social.github && (
          <a href={social.github} target="_blank" rel="noopener" title="GitHub"><i className="fab fa-github" /></a>
        )}
      </div>

      <div className="hero-scroll">
        <div className="scroll-line" />
        scroll
      </div>
    </section>
  );
}
