import { useState } from "react";
import { Link } from "react-router-dom";
import { add, setDocument } from "../../services/firestoreService";
import {
  seedProfile,
  seedProjects,
  seedExperience,
  seedSkills,
  seedQualifications,
  seedCertificates,
} from "../../data/seed";

const CARDS = [
  { to: "/admin/projects", icon: "fas fa-folder-open", title: "Projects", desc: "Add, edit and reorder portfolio projects." },
  { to: "/admin/experience", icon: "fas fa-briefcase", title: "Experience", desc: "Manage your work history timeline." },
  { to: "/admin/skills", icon: "fas fa-layer-group", title: "Skills", desc: "Proficiency bars and tool chips." },
  { to: "/admin/qualifications", icon: "fas fa-graduation-cap", title: "Qualifications", desc: "Education and academic background." },
  { to: "/admin/certificates", icon: "fas fa-certificate", title: "Certificates", desc: "Credentials and verification links." },
  { to: "/admin/cv", icon: "fas fa-id-card", title: "CV & Profile", desc: "Upload your CV and edit profile details." },
];

export default function Dashboard() {
  const [seeding, setSeeding] = useState(false);
  const [msg, setMsg] = useState(null);

  // One-click import of the bundled seed content into Firestore.
  const seed = async () => {
    if (!window.confirm("Import the default portfolio content into Firestore? Run this only on an empty database.")) return;
    setSeeding(true);
    setMsg(null);
    try {
      await setDocument("profile", "main", seedProfile);
      const push = (col, rows) => Promise.all(rows.map((r) => add(col, r)));
      await push("projects", seedProjects);
      await push("experience", seedExperience);
      await push("skills", seedSkills);
      await push("qualifications", seedQualifications);
      await push("certificates", seedCertificates);
      setMsg({ type: "success", text: "Seed content imported into Firestore." });
    } catch (err) {
      setMsg({ type: "error", text: err?.message || "Seeding failed (check Firebase config & rules)." });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1 className="admin-title">Dashboard</h1>
        <p className="admin-subtitle">Manage every section of your public portfolio.</p>
      </div>

      {msg && <div className={`alert alert-${msg.type}`}>{msg.text}</div>}

      <div className="dash-grid">
        {CARDS.map((c) => (
          <Link to={c.to} className="dash-card" key={c.to}>
            <i className={c.icon} />
            <div className="dash-card-title">{c.title}</div>
            <div className="dash-card-desc">{c.desc}</div>
          </Link>
        ))}
      </div>

      <div className="card" style={{ marginTop: "2rem" }}>
        <div className="card-title"><i className="fas fa-seedling" /> First-time setup</div>
        <p className="dash-card-desc" style={{ marginBottom: "1.2rem" }}>
          Import the bundled default content (your existing portfolio data) into Firestore
          so you can edit it from here. Only do this once on an empty database.
        </p>
        <button className="btn-primary btn-sm" onClick={seed} disabled={seeding}>
          {seeding ? "Importing…" : "Import seed content"}
        </button>
      </div>
    </>
  );
}
