import { Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import { ConfirmProvider } from "./context/ConfirmContext";

import PublicLayout from "./layouts/PublicLayout";
import Home from "./pages/public/Home";
import Projects from "./pages/public/Projects";
import Experience from "./pages/public/Experience";
import Skills from "./pages/public/Skills";
import Qualifications from "./pages/public/Qualifications";
import Certificates from "./pages/public/Certificates";
import ContactCV from "./pages/public/ContactCV";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import ManageProjects from "./pages/admin/ManageProjects";
import ManageExperience from "./pages/admin/ManageExperience";
import ManageSkills from "./pages/admin/ManageSkills";
import ManageQualifications from "./pages/admin/ManageQualifications";
import ManageCertificates from "./pages/admin/ManageCertificates";
import ManageCV from "./pages/admin/ManageCV";

export default function App() {
  return (
    <Routes>
      {/* ---------- Public site ---------- */}
      <Route
        element={
          <DataProvider>
            <PublicLayout />
          </DataProvider>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/qualifications" element={<Qualifications />} />
        <Route path="/certificates" element={<Certificates />} />
        <Route path="/contact" element={<ContactCV />} />
      </Route>

      {/* ---------- Admin ---------- */}
      <Route path="/admin/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <ConfirmProvider>
              <AdminLayout />
            </ConfirmProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="experience" element={<ManageExperience />} />
        <Route path="skills" element={<ManageSkills />} />
        <Route path="qualifications" element={<ManageQualifications />} />
        <Route path="certificates" element={<ManageCertificates />} />
        <Route path="cv" element={<ManageCV />} />
      </Route>

      {/* ---------- Fallback ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
