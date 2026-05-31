import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import EducationSection from "../../components/sections/EducationSection";

export default function Qualifications() {
  const { qualifications, loading } = usePortfolio();
  useReveal([loading, qualifications]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <EducationSection qualifications={qualifications} />
    </div>
  );
}
