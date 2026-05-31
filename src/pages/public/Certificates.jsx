import { usePortfolio } from "../../context/DataContext";
import useReveal from "../../hooks/useReveal";
import Loader from "../../components/Loader";
import CertificatesSection from "../../components/sections/CertificatesSection";

export default function Certificates() {
  const { certificates, loading } = usePortfolio();
  useReveal([loading, certificates]);
  if (loading) return <Loader full />;
  return (
    <div className="page-section">
      <CertificatesSection certificates={certificates} />
    </div>
  );
}
