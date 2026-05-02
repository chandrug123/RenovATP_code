import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, MessageSquare, ChevronDown, Search, Star, X, HelpCircle } from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { useServicesData } from "@/hooks/useServicesData";
import { useLanguage } from "@/hooks/useLanguage";
import { saveEnquiryToSheets } from "@/lib/googleSheets";
import ServicesTutorial from "./ServicesTutorial";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import civilImg from "@/assets/service-civil.jpg";
import tilesImg from "@/assets/service-tiles.jpg";
import paintingImg from "@/assets/service-painting.jpg";
import carpentryImg from "@/assets/service-carpentry.jpg";
import electricalImg from "@/assets/service-electrical.jpg";
import plumbingImg from "@/assets/service-plumbing.jpg";
import otherImg from "@/assets/service-other.jpg";

const imageMap: Record<string, string> = {
  "civil-works": civilImg,
  "tiles-granite": tilesImg,
  "painting": paintingImg,
  "carpentry": carpentryImg,
  "electrical": electricalImg,
  "plumbing": plumbingImg,
  "welding-works": otherImg,
  "other-services": otherImg,
};

const Services = () => {
  const { categories, quickBundles, loading } = useServicesData();
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    const tutorialCompleted = localStorage.getItem("services-tutorial-completed");
    if (!tutorialCompleted) {
      setShowTutorial(true);
    }
  }, []);

  const handleTutorialComplete = () => setShowTutorial(false);
  const handleShowTutorial = () => setShowTutorial(true);

  const toggleDropdown = (categoryId: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleService = (categoryId: string, serviceName: string) => {
    const serviceKey = `${categoryId}:${serviceName}`;
    setSelectedServices((prev) =>
      prev.includes(serviceKey)
        ? prev.filter((s) => s !== serviceKey)
        : [...prev, serviceKey]
    );
  };

  const selectBundle = (bundleServices: string[]) => {
    setSelectedServices((prev) => {
      const newServices = [...prev];
      bundleServices.forEach(service => {
        if (!newServices.includes(service)) {
          newServices.push(service);
        }
      });
      return newServices;
    });
    toast.success(t("services.bundleAdded"));
  };

  const clearAllServices = () => {
    setSelectedServices([]);
    toast.info(t("services.selectionCleared"));
  };

  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;
    
    const query = searchQuery.toLowerCase();
    return categories
      .map(category => ({
        ...category,
        services: category.services.filter(service => 
          service.name.toLowerCase().includes(query) || 
          category.title.toLowerCase().includes(query)
        )
      }))
      .filter(category => category.services.length > 0);
  }, [categories, searchQuery]);

  const handleWhatsAppEnquiry = async () => {
    if (selectedServices.length === 0) {
      toast.error(t("services.selectAtLeastOne"));
      return;
    }

    const selectedServicesList = selectedServices.map((serviceKey) => {
      const [categoryId, serviceName] = serviceKey.split(":");
      const category = categories.find((cat) => cat.id === categoryId);
      return `${category?.title} - ${serviceName}`;
    });

    try {
      await saveEnquiryToSheets({
        name: "Website Visitor",
        phone: "Via WhatsApp",
        email: "",
        services: selectedServicesList,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Failed to save enquiry:", error);
    }

    const message = `Hi, I'm interested in:\n\n${selectedServicesList.join("\n")}\n\nPlease provide more information.`;
    const whatsappNumber = "9441444876";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
    toast.success(t("services.openingWhatsApp"));
  };

  if (loading) {
    return (
      <section id="services" className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-12 bg-muted rounded w-64 mx-auto"></div>
            <div className="h-6 bg-muted rounded w-96 mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 md:py-24 bg-gradient-to-b from-secondary/50 via-background to-secondary/30 overflow-hidden relative">
      {showTutorial && <ServicesTutorial onComplete={handleTutorialComplete} />}
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 opacity-0 animate-fade-in">
            {t("services.badge") || "Our Services"}
          </span>
          <div className="flex items-center justify-center gap-2 mb-3">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground opacity-0 animate-fade-in stagger-1">
              {t("services.title")}
            </h2>
            <button
              onClick={handleShowTutorial}
              className="p-2 rounded-full hover:bg-primary/10 transition-colors opacity-0 animate-fade-in stagger-2"
              title={t("services.showTutorial")}
            >
              <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
            </button>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in stagger-2">
            {t("services.subtitle")}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-6 animate-fade-in-up">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("services.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 py-5 text-base border-2 focus:border-primary transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Quick Select Bundles */}
        {!searchQuery && (
          <div className="mb-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">{t("services.quickSelect")}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickBundles.map((bundle, index) => (
                <button
                  key={bundle.id}
                  onClick={() => selectBundle(bundle.services)}
                  className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 hover:border-primary hover:bg-primary/20 transition-all duration-300 text-sm font-medium flex items-center gap-2 hover-scale animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span>{bundle.icon}</span>
                  <span>{bundle.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Service Categories - Desktop Grid */}
        {!isMobile && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {filteredCategories.map((category, index) => {
              const categoryServices = selectedServices.filter((s) =>
                s.startsWith(`${category.id}:`)
              );
              const hasSelectedServices = categoryServices.length > 0;

              return (
                <div
                  key={category.id}
                  className={`group rounded-2xl overflow-hidden border-2 transition-all duration-300 animate-fade-in-up hover:shadow-xl ${
                    hasSelectedServices
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {/* Category Header */}
                  <div className="relative h-32 overflow-hidden">
                    <img
                      src={imageMap[category.id]}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{category.icon}</span>
                        <h3 className="text-lg font-bold text-white drop-shadow-lg">
                          {category.title}
                        </h3>
                        {category.popular && (
                          <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold">
                            {t("services.popular")}
                          </span>
                        )}
                      </div>
                    </div>
                    {hasSelectedServices && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg animate-scale-in">
                        <span className="text-primary-foreground font-bold text-sm">
                          {categoryServices.length}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Services List */}
                  <div className="p-4 space-y-2 max-h-[280px] overflow-y-auto">
                    {category.services.map((service) => {
                      const serviceKey = `${category.id}:${service.name}`;
                      const isSelected = selectedServices.includes(serviceKey);

                      const handleQuickWhatsApp = (e: React.MouseEvent) => {
                        e.stopPropagation();
                        const message = `Hi, I'm interested in:\n\n${category.title} - ${service.name}\n\nPlease provide more information.`;
                        const whatsappNumber = "9441444876";
                        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
                      };

                      return (
                        <div
                          key={service.name}
                          className={`flex items-center gap-2 p-2.5 rounded-lg border transition-all duration-200 group/item ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-sm"
                              : "border-border bg-background hover:border-primary/50 hover:bg-secondary/30"
                          }`}
                        >
                          <button
                            onClick={() => toggleService(category.id, service.name)}
                            className="flex items-center gap-2 flex-1 min-w-0 text-left"
                          >
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                isSelected
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground group-hover/item:border-primary"
                              }`}
                            >
                              {isSelected && (
                                <Check className="w-2.5 h-2.5 text-primary-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <span
                                className={`font-medium text-sm block truncate ${
                                  isSelected ? "text-primary" : "text-foreground"
                                }`}
                              >
                                {service.name}
                              </span>
                            </div>
                          </button>
                          <button
                            onClick={handleQuickWhatsApp}
                            className="flex-shrink-0 w-7 h-7 rounded-full bg-[hsl(142_76%_36%)] hover:bg-[hsl(142_76%_30%)] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                            title={`Chat about ${service.name}`}
                          >
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Service Categories - Mobile Accordion */}
        {isMobile && (
          <div className="space-y-3 mb-6">
            {filteredCategories.map((category, index) => {
              const isOpen = openDropdowns.includes(category.id);
              const categoryServices = selectedServices.filter((s) =>
                s.startsWith(`${category.id}:`)
              );
              const hasSelectedServices = categoryServices.length > 0;

              return (
                <Collapsible
                  key={category.id}
                  open={isOpen}
                  onOpenChange={() => toggleDropdown(category.id)}
                  className={`border-2 rounded-xl overflow-hidden transition-all duration-300 animate-fade-in-up ${
                    hasSelectedServices
                      ? "border-primary bg-primary/5 shadow-lg"
                      : "border-border bg-card hover:border-primary/50"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CollapsibleTrigger className="w-full">
                    <div className="flex items-center justify-between p-4 hover:bg-secondary/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                          <img
                            src={imageMap[category.id]}
                            alt={category.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{category.icon}</span>
                            <h3 className="text-lg font-bold text-foreground">
                              {category.title}
                            </h3>
                            {category.popular && (
                              <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs font-semibold animate-pulse">
                                {t("services.popular")}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {hasSelectedServices
                              ? `${categoryServices.length} ${t("services.selected")}`
                              : `${category.services.length} ${t("services.servicesAvailable")}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {hasSelectedServices && (
                          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center animate-scale-in">
                            <span className="text-primary-foreground font-bold text-sm">
                              {categoryServices.length}
                            </span>
                          </div>
                        )}
                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <div className="border-t border-border bg-card/50 p-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {category.services.map((service) => {
                          const serviceKey = `${category.id}:${service.name}`;
                          const isSelected = selectedServices.includes(serviceKey);

                          const handleQuickWhatsApp = (e: React.MouseEvent) => {
                            e.stopPropagation();
                            const message = `Hi, I'm interested in:\n\n${category.title} - ${service.name}\n\nPlease provide more information.`;
                            const whatsappNumber = "9441444876";
                            window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
                          };

                          return (
                            <div
                              key={service.name}
                              className={`flex items-center gap-2 p-3 rounded-lg border transition-all duration-200 group ${
                                isSelected
                                  ? "border-primary bg-primary/10 shadow-md"
                                  : "border-border bg-background hover:border-primary/50 hover:bg-secondary/30"
                              }`}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleService(category.id, service.name);
                                }}
                                className="flex items-center gap-3 flex-1 min-w-0 text-left"
                              >
                                <div
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                                    isSelected
                                      ? "border-primary bg-primary"
                                      : "border-muted-foreground group-hover:border-primary"
                                  }`}
                                >
                                  {isSelected && (
                                    <Check className="w-3 h-3 text-primary-foreground" />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <span
                                    className={`font-medium text-sm block ${
                                      isSelected ? "text-primary" : "text-foreground"
                                    }`}
                                  >
                                    {service.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground truncate block">
                                    {service.description}
                                  </span>
                                </div>
                              </button>
                              <button
                                onClick={handleQuickWhatsApp}
                                className="flex-shrink-0 w-9 h-9 rounded-full bg-[hsl(142_76%_36%)] hover:bg-[hsl(142_76%_30%)] flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-md hover:shadow-lg"
                                title={`Chat about ${service.name}`}
                              >
                                <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                </svg>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              );
            })}
          </div>
        )}

        {/* Selection Summary */}
        {selectedServices.length > 0 && (
          <div className={`${isMobile ? '' : 'max-w-4xl'} mx-auto mb-4 flex items-center justify-between p-4 bg-primary/10 rounded-xl animate-scale-in border border-primary/20`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <span className="font-bold text-foreground block">
                  {selectedServices.length} {selectedServices.length > 1 ? t("services.servicesSelected") : t("services.serviceSelected")}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t("services.readyToEnquire")}
                </span>
              </div>
            </div>
            <button
              onClick={clearAllServices}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-background/50"
            >
              <X className="w-4 h-4" />
              {t("services.clearAll")}
            </button>
          </div>
        )}
      </div>

      {/* Sticky WhatsApp Button */}
      {selectedServices.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
          <Button
            onClick={handleWhatsAppEnquiry}
            size="lg"
            className="bg-[hsl(142_76%_36%)] hover:bg-[hsl(142_76%_30%)] text-white shadow-2xl px-8 py-6 text-lg font-bold rounded-full whatsapp-glow animate-pulse-glow flex items-center gap-3"
          >
            <MessageSquare className="w-6 h-6" />
            <span>{t("services.enquireNow")}</span>
            <span className="bg-white/20 px-2.5 py-1 rounded-full text-sm">
              {selectedServices.length}
            </span>
          </Button>
        </div>
      )}

      {selectedServices.length > 0 && <div className="h-24" />}
    </section>
  );
};

export default Services;
