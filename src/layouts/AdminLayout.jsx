import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const NAV = [
  { to: "/admin/dashboard", icon: "fas fa-gauge-high", label: "Dashboard", end: true },
  { to: "/admin/projects", icon: "fas fa-folder-open", label: "Projects" },
  { to: "/admin/experience", icon: "fas fa-briefcase", label: "Experience" },
  { to: "/admin/skills", icon: "fas fa-layer-group", label: "Skills" },
  { to: "/admin/qualifications", icon: "fas fa-graduation-cap", label: "Qualifications" },
  { to: "/admin/certificates", icon: "fas fa-certificate", label: "Certificates" },
  { to: "/admin/cv", icon: "fas fa-id-card", label: "CV & Profile" },
];

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const onLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className={`admin-sidebar${open ? " open" : ""}`}>
        <div className="admin-brand">DD<span>.</span></div>
        <div className="admin-brand-sub">Portfolio Admin</div>
        <nav className="admin-nav">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <i className={n.icon} /> {n.label}
            </NavLink>
          ))}
        </nav>
        <button className="admin-logout" onClick={onLogout}>
          <i className="fas fa-right-from-bracket" /> Logout
        </button>
      </aside>

      <main className="admin-main">
        <div className="admin-mobile-bar">
          <div className="admin-brand">DD<span>.</span></div>
          <button onClick={() => setOpen((v) => !v)}>
            <i className="fas fa-bars" />
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
}
