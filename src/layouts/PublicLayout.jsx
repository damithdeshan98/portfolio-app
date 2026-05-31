import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomCursor from "../components/CustomCursor";
import { usePortfolio } from "../context/DataContext";

export default function PublicLayout() {
  const { profile } = usePortfolio();
  const location = useLocation();

  // Honour "/#section" links — scroll to the target once the page renders.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <CustomCursor />
      <Navbar cvUrl={profile?.cvUrl || "#"} />
      <Outlet />
      <Footer name={profile?.fullName} location={profile?.location} />
    </>
  );
}
