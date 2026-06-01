import { createContext, useContext, useEffect, useState } from "react";
import { subscribeAll, subscribeOne } from "../services/firestoreService";
import {
  seedProfile,
  seedProjects,
  seedExperience,
  seedSkills,
  seedQualifications,
  seedCertificates,
} from "../data/seed";

const DataContext = createContext(null);

export function usePortfolio() {
  return useContext(DataContext);
}

// Use Firestore data when present, otherwise fall back to the seed content so
// the public site is never empty.
const orSeed = (rows, seed) => (rows && rows.length ? rows : seed);

export function DataProvider({ children }) {
  const [data, setData] = useState({
    profile: seedProfile,
    projects: seedProjects,
    experience: seedExperience,
    skills: seedSkills,
    qualifications: seedQualifications,
    certificates: seedCertificates,
  });
  // Seed data is already in state, so render immediately rather than blocking
  // the first paint on the network. Live Firestore data swaps in when it
  // arrives; if the request is slow, fails, or is blocked by a browser
  // extension (ERR_BLOCKED_BY_CLIENT), the seed content simply stays.
  const [loading] = useState(false);

  // Public site shows active records only; rows without the flag (created
  // before it existed) are treated as active.
  const isActive = (r) => r.active !== false;

  // Subscribe to Firestore in real time so any admin change — including
  // toggling a record active/inactive — is reflected on the public site
  // immediately, without a manual reload.
  useEffect(() => {
    const patch = (key, value) => setData((d) => ({ ...d, [key]: value }));
    const warn = (err) => console.warn("Falling back to seed data:", err?.message || err);

    const unsubs = [
      subscribeOne("profile", "main", (p) => patch("profile", p || seedProfile), warn),
      subscribeAll("projects", "order", (r) => patch("projects", orSeed(r, seedProjects).filter(isActive)), warn),
      subscribeAll("experience", "order", (r) => patch("experience", orSeed(r, seedExperience).filter(isActive)), warn),
      subscribeAll("skills", "order", (r) => patch("skills", orSeed(r, seedSkills).filter(isActive)), warn),
      subscribeAll("qualifications", "order", (r) => patch("qualifications", orSeed(r, seedQualifications).filter(isActive)), warn),
      subscribeAll("certificates", "order", (r) => patch("certificates", orSeed(r, seedCertificates).filter(isActive)), warn),
    ];
    return () => unsubs.forEach((u) => u && u());
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading }}>
      {children}
    </DataContext.Provider>
  );
}
