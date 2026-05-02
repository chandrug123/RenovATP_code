import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const whatsappNumber = "9441444876";
    const message = "Hi, I'm interested in your home services. Please provide more information.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Professional home renovation services"
          className="w-full h-full object-cover animate-scale-in"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground opacity-0 animate-fade-in">
            Expert Home Services
            <span className="block text-primary mt-2 opacity-0 animate-fade-in stagger-2">
              at Your Doorstep
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed opacity-0 animate-fade-in-up stagger-3">
            From renovations to repairs, we provide comprehensive home maintenance
            solutions with professional expertise and quality workmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up stagger-4">
            <Button
              variant="hero"
              size="lg"
              onClick={openWhatsApp}
              className="group animate-pulse-glow"
            >
              <MessageSquare className="w-5 h-5" />
              Chat on WhatsApp
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToServices}
              className="group hover-lift"
            >
              View Services
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
