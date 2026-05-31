import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import ContactSection from "../../components/sections/ContactSection";

export default function ContactCV() {
  const { profile, loading } = usePortfolio();
  useReveal([loading]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <ContactSection profile={profile} />
    </div>
  );
}
