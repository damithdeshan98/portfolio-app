import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ cvUrl = "#" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = document.querySelectorAll("section[id]");
      let current = "";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 150) current = s.getAttribute("id");
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Scroll to a section on the home page; navigate home first if elsewhere.
  const go = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/#" + id);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <a
          href="/"
          className="nav-logo"
          onClick={(e) => { e.preventDefault(); navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        >
          DD<span>.</span>
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a className={active === l.id ? "active" : ""} onClick={() => go(l.id)}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={cvUrl} download className="nav-cta">
          <i className="fas fa-download" /> &nbsp;Resume
        </a>
        <div className="hamburger" onClick={() => setMenuOpen(true)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button className="close-menu" onClick={() => setMenuOpen(false)}>
          <i className="fas fa-times" />
        </button>
        {LINKS.map((l) => (
          <a key={l.id} onClick={() => go(l.id)}>{l.label}</a>
        ))}
      </div>
    </>
  );
}
