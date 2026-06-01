import { createContext, useContext, useEffect, useState } from "react";
import { getAll, getOne } from "../services/firestoreService";
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
  const [loading, setLoading] = useState(false);

  const load = async () => {
    try {
      const [profile, projects, experience, skills, qualifications, certificates] =
        await Promise.all([
          getOne("profile", "main"),
          getAll("projects"),
          getAll("experience"),
          getAll("skills"),
          getAll("qualifications"),
          getAll("certificates"),
        ]);
      setData({
        profile: profile || seedProfile,
        // Public site shows active projects only; records without the flag
        // (created before it existed) are treated as active.
        projects: orSeed(projects, seedProjects).filter((p) => p.active !== false),
        experience: orSeed(experience, seedExperience).filter((x) => x.active !== false),
        skills: orSeed(skills, seedSkills),
        qualifications: orSeed(qualifications, seedQualifications),
        certificates: orSeed(certificates, seedCertificates),
      });
    } catch (err) {
      // Firestore not configured yet — keep seed defaults.
      console.warn("Falling back to seed data:", err?.message || err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <DataContext.Provider value={{ ...data, loading, reload: load }}>
      {children}
    </DataContext.Provider>
  );
}
