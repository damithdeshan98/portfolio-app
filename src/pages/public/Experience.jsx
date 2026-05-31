import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import ExperienceSection from "../../components/sections/ExperienceSection";

export default function Experience() {
  const { experience, loading } = usePortfolio();
  useReveal([loading, experience]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <ExperienceSection experience={experience} />
    </div>
  );
}
