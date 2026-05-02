import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useServicesData } from "@/hooks/useServicesData";
import { useLanguage } from "@/hooks/useLanguage";

// Import all hero images
import heroImage from "@/assets/hero-image.jpg";
import civilImg from "@/assets/service-civil.jpg";
import paintingImg from "@/assets/service-painting.jpg";
import electricalImg from "@/assets/service-electrical.jpg";

const imageMap: Record<string, string> = {
  "hero-image.jpg": heroImage,
  "service-civil.jpg": civilImg,
  "service-painting.jpg": paintingImg,
  "service-electrical.jpg": electricalImg,
};

const HeroCarousel = () => {
  const { heroSlides, loading } = useServicesData();
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const slides = heroSlides.length > 0 ? heroSlides : [
    { image: "hero-image.jpg", title: "Expert Home Services", subtitle: "at Your Doorstep", description: "Transform your home with our professional services" }
  ];

  // Parallax scroll handler - optimized for mobile
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [slides.length, isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 600);
  }, [slides.length, isAnimating]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  const openWhatsApp = () => {
    const whatsappNumber = "9441444876";
    const message = "Hi, I'm interested in your home services. Please provide more information.";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Get translated slide content
  const getTranslatedSlide = (index: number) => {
    const slideKeys = ["slide1", "slide2", "slide3", "slide4"];
    const key = slideKeys[index] || "slide1";
    return {
      title: t(`hero.${key}Title`) || slides[index]?.title || "",
      subtitle: t(`hero.${key}Subtitle`) || slides[index]?.subtitle || "",
      description: t(`hero.${key}Desc`) || slides[index]?.description || "",
    };
  };

  const currentSlideData = getTranslatedSlide(currentSlide);

  if (loading) {
    return (
      <section className="relative min-h-[100svh] flex items-center justify-center bg-background">
        <div className="animate-pulse text-xl text-muted-foreground">{t("hero.loading")}</div>
      </section>
    );
  }

  return (
    <section 
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/95 z-0" />
      
      {/* Background Images with fade transition */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 z-[1] transition-opacity duration-700 ease-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={imageMap[slide.image] || heroImage}
              alt={slide.title}
              loading={index === 0 ? "eager" : "lazy"}
              className="w-full h-full object-cover"
              style={{ 
                transform: `translateY(${scrollY * 0.15}px) scale(1.05)`,
                willChange: 'transform'
              }}
            />
          </div>
          {/* Mobile-optimized gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-transparent hidden md:block" />
        </div>
      ))}

      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 z-[2] opacity-[0.015] pointer-events-none hidden md:block"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Content container - Mobile first layout */}
      <div 
        className="container mx-auto px-4 z-10 relative pt-20 pb-28 md:pt-0 md:pb-0"
        style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
      >
        <div className="max-w-xl md:max-w-3xl mx-auto md:mx-0">
          {/* Badge */}
          <div className="mb-4 md:mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs md:text-sm text-primary font-medium backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              {t("hero.badge") || "Professional Home Services"}
            </span>
          </div>

          {/* Title - Larger on mobile for impact */}
          <div className="mb-2 md:mb-3">
            <h1 
              key={`title-${currentSlide}`}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] animate-fade-in"
            >
              {currentSlideData.title}
            </h1>
          </div>
          
          {/* Subtitle with gradient */}
          <div className="mb-4 md:mb-6">
            <span 
              key={`subtitle-${currentSlide}`}
              className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              {currentSlideData.subtitle}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6 md:mb-8">
            <p 
              key={`desc-${currentSlide}`}
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-md animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              {currentSlideData.description}
            </p>
          </div>

          {/* CTA Buttons - Stack on mobile */}
          <div 
            className="flex flex-col sm:flex-row gap-3 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            <Button
              variant="hero"
              size="lg"
              onClick={openWhatsApp}
              className="w-full sm:w-auto group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
              <MessageSquare className="w-5 h-5" />
              {t("hero.chatOnWhatsApp")}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToServices}
              className="w-full sm:w-auto group bg-background/60 backdrop-blur-sm border-border/50 hover:bg-background/80"
            >
              {t("hero.viewServices")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      {/* Slide indicators - Bottom positioned for mobile thumb reach */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide(index);
                setTimeout(() => setIsAnimating(false), 600);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "w-8 bg-primary" 
                : "w-1.5 bg-foreground/20 hover:bg-foreground/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows - Desktop only */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/30 backdrop-blur-md border border-border/30 hover:bg-background/50 transition-all duration-200 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 text-foreground group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-background/30 backdrop-blur-md border border-border/30 hover:bg-background/50 transition-all duration-200 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 text-foreground group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide counter - Desktop only */}
      <div className="hidden md:flex absolute top-24 right-8 z-20 items-center gap-2 text-sm">
        <span className="text-primary font-semibold">{String(currentSlide + 1).padStart(2, '0')}</span>
        <div className="w-6 h-px bg-border" />
        <span className="text-muted-foreground">{String(slides.length).padStart(2, '0')}</span>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent z-[3] pointer-events-none" />
    </section>
  );
};

export default HeroCarousel;
