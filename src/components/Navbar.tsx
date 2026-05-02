import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "./LanguageSelector";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3 font-bold text-xl text-foreground hover:text-primary transition-all duration-300 group"
          >
            {/* Custom Logo SVG */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
              <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
                <path 
                  d="M16 4L4 14V28H12V20H20V28H28V14L16 4Z" 
                  className="fill-primary-foreground" 
                />
                <path 
                  d="M16 4L4 14H28L16 4Z" 
                  className="fill-primary-foreground/80" 
                />
                <rect x="14" y="22" width="4" height="6" className="fill-primary/30" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl leading-tight font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Renova</span>
                <span className="text-foreground">tp</span>
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block font-medium tracking-wide">
                Anantapur's Trusted Partner
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={() => scrollToSection("our-work")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.ourWork")}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-colors font-medium text-sm"
            >
              {t("nav.about")}
            </button>
            <LanguageSelector />
            <Button
              variant="default"
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary shadow-md"
            >
              {t("nav.contactUs")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              className="text-foreground p-2 rounded-lg hover:bg-secondary transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setIsOpen(false);
                }}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-lg hover:bg-secondary/50"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-lg hover:bg-secondary/50"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={() => scrollToSection("our-work")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-lg hover:bg-secondary/50"
              >
                {t("nav.ourWork")}
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-foreground hover:text-primary transition-colors font-medium py-2 px-3 rounded-lg hover:bg-secondary/50"
              >
                {t("nav.about")}
              </button>
              <Button
                variant="default"
                onClick={() => scrollToSection("contact")}
                className="w-full mt-2 bg-gradient-to-r from-primary to-primary/80"
              >
                {t("nav.contactUs")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;