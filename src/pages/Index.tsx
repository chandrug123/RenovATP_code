import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import OurWork from "@/components/OurWork";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setIsLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    sessionStorage.setItem("hasSeenLoader", "true");
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loader onComplete={handleLoaderComplete} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroCarousel />
        <Services />
        <OurWork />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
