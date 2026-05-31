import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import HeroSection from "../../components/sections/HeroSection";
import StatsBand from "../../components/StatsBand";
import AboutSection from "../../components/sections/AboutSection";
import ExperienceSection from "../../components/sections/ExperienceSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import SkillsSection from "../../components/sections/SkillsSection";
import EducationSection from "../../components/sections/EducationSection";
import CertificatesSection from "../../components/sections/CertificatesSection";
import ContactSection from "../../components/sections/ContactSection";

export default function Home() {
  const { profile, projects, experience, skills, qualifications, certificates, loading } =
    usePortfolio();

  // Re-run reveal observers whenever async data lands.
  useReveal([loading, projects, experience, skills, qualifications, certificates]);

  if (loading) return <Loader full />;

  return (
    <>
      <HeroSection profile={profile} />
      <StatsBand />
      <AboutSection profile={profile} />
      <ExperienceSection experience={experience} />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <EducationSection qualifications={qualifications} />
      <CertificatesSection certificates={certificates} />
      <ContactSection profile={profile} />
    </>
  );
}
