import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import ProjectsSection from "../../components/sections/ProjectsSection";

export default function Projects() {
  const { projects, loading } = usePortfolio();
  useReveal([loading, projects]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <ProjectsSection projects={projects} />
    </div>
  );
}
