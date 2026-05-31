import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import SkillsSection from "../../components/sections/SkillsSection";

export default function Skills() {
  const { skills, loading } = usePortfolio();
  useReveal([loading, skills]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <SkillsSection skills={skills} />
    </div>
  );
}
