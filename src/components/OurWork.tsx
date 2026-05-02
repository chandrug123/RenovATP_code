import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedElement } from "./AnimatedSection";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface WorkItem {
  id: string;
  category: string;
  title: { en: string; te: string; kn: string };
  description: { en: string; te: string; kn: string };
  beforeImage: string;
  afterImage: string;
}

const workData: WorkItem[] = [
  {
    id: "1",
    category: "painting",
    title: { en: "Living Room Makeover", te: "లివింగ్ రూమ్ మేకోవర్", kn: "ಲಿವಿಂಗ್ ರೂಮ್ ಮೇಕ್‌ಓವರ್" },
    description: { en: "Complete wall painting with texture finish", te: "టెక్చర్ ఫినిష్‌తో పూర్తి గోడ పెయింటింగ్", kn: "ಟೆಕ್ಸ್ಚರ್ ಫಿನಿಶ್‌ನೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಗೋಡೆ ಪೇಂಟಿಂಗ್" },
    beforeImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600",
    afterImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=600"
  },
  {
    id: "2",
    category: "tiles-granite",
    title: { en: "Bathroom Renovation", te: "బాత్రూమ్ పునరుద్ధరణ", kn: "ಬಾತ್‌ರೂಮ್ ನವೀಕರಣ" },
    description: { en: "Modern tiles installation with waterproofing", te: "వాటర్‌ప్రూఫింగ్‌తో మోడర్న్ టైల్స్ ఇన్‌స్టాలేషన్", kn: "ವಾಟರ್‌ಪ್ರೂಫಿಂಗ್‌ನೊಂದಿಗೆ ಆಧುನಿಕ ಟೈಲ್ಸ್ ಅಳವಡಿಕೆ" },
    beforeImage: "https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600",
    afterImage: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600"
  },
  {
    id: "3",
    category: "civil-works",
    title: { en: "Kitchen Remodeling", te: "వంటగది రీమోడలింగ్", kn: "ಅಡುಗೆಮನೆ ಮರುರೂಪಣೆ" },
    description: { en: "Complete kitchen renovation with modern cabinets", te: "ఆధునిక క్యాబినెట్లతో పూర్తి వంటగది పునర్నిర్మాణం", kn: "ಆಧುನಿಕ ಕ್ಯಾಬಿನೆಟ್‌ಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಅಡುಗೆಮನೆ ನವೀಕರಣ" },
    beforeImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600",
    afterImage: "https://images.unsplash.com/photo-1556909114-a3f8a5f85a28?w=600"
  },
  {
    id: "9",
    category: "civil-works",
    title: { en: "Modular Kitchen Remodeling", te: "మోడ్యులర్ వంటగది రీమోడలింగ్", kn: "ಮಾಡ್ಯೂಲರ್ ಅಡುಗೆಮನೆ ಮರುರೂಪಣೆ" },
    description: { en: "Modern kitchen cabinets, counters, and workflow upgrades", te: "ఆధునిక క్యాబినెట్లు, కౌంటర్లు మరియు వర్క్‌ఫ్లో అప్గ్రేడ్‌లు", kn: "ಆಧುನಿಕ ಕ್ಯಾಬಿನೆಟ್‌ಗಳು, ಕೌಂಟರ್‌ಗಳು ಮತ್ತು ಕಾರ್ಯಪ್ರವಾಹ ಎತ್ತರಗೊಳಿಸುವಿಕೆ" },
    beforeImage: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=600",
    afterImage: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600"
  },
  {
    id: "4",
    category: "electrical",
    title: { en: "Complete House Wiring", te: "పూర్తి ఇంటి వైరింగ్", kn: "ಸಂಪೂರ್ಣ ಮನೆ ವೈರಿಂಗ್" },
    description: { en: "New electrical setup with modern switches", te: "ఆధునిక స్విచ్‌లతో కొత్త ఎలక్ట్రికల్ సెటప్", kn: "ಆಧುನಿಕ ಸ್ವಿಚ್‌ಗಳೊಂದಿಗೆ ಹೊಸ ಎಲೆಕ್ಟ್ರಿಕಲ್ ಸೆಟಪ್" },
    beforeImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
    afterImage: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600"
  },
  {
    id: "5",
    category: "carpentry",
    title: { en: "Wardrobe Installation", te: "వార్డ్‌రోబ్ ఇన్‌స్టాలేషన్", kn: "ವಾರ್ಡ್‌ರೋಬ್ ಅಳವಡಿಕೆ" },
    description: { en: "Custom built-in wardrobe with sliding doors", te: "స్లైడింగ్ డోర్లతో కస్టమ్ బిల్ట్-ఇన్ వార్డ్‌రోబ్", kn: "ಸ್ಲೈಡಿಂಗ್ ಬಾಗಿಲುಗಳೊಂದಿಗೆ ಕಸ್ಟಮ್ ಬಿಲ್ಟ್-ಇನ್ ವಾರ್ಡ್‌ರೋಬ್" },
    beforeImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=600",
    afterImage: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=600"
  },
  {
    id: "6",
    category: "plumbing",
    title: { en: "Bathroom Plumbing Upgrade", te: "బాత్రూమ్ ప్లంబింగ్ అప్‌గ్రేడ్", kn: "ಬಾತ್‌ರೂಮ್ ಪ್ಲಂಬಿಂಗ್ ಅಪ್‌ಗ್ರೇಡ್" },
    description: { en: "Complete plumbing renovation with new fixtures", te: "కొత్త ఫిక్చర్లతో పూర్తి ప్లంబింగ్ రినోవేషన్", kn: "ಹೊಸ ಫಿಕ್ಸ್ಚರ್‌ಗಳೊಂದಿಗೆ ಸಂಪೂರ್ಣ ಪ್ಲಂಬಿಂಗ್ ನವೀಕರಣ" },
    beforeImage: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
    afterImage: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600"
  },
  {
    id: "10",
    category: "welding-works",
    title: { en: "Iron Grill Welding", te: "ఐరన్ గ్రిల్ వెల్డింగ్", kn: "ಐರನ್ ಗ್ರಿಲ್ ವೆಲ್ಡಿಂಗ್" },
    description: { en: "Expert welding and repair for gates, grills and railings", te: "గేట్స్, గ్రిల్స్ మరియు రైలింగ్స్ కోసం నిపుణుల వెల్డింగ్ మరియు మరమ్మత్తు", kn: "ಗೇಟುಗಳು, ಗ್ರಿಲ್‌ಗಳು ಮತ್ತು ರೈಲಿಂಗ್‌ಗಳಿಗೆ ಪರಿಣತ ವೆಲ್ಡಿಂಗ್ ಮತ್ತು ಮರುಮರಳು" },
    beforeImage: "https://images.unsplash.com/photo-1508898578281-774ac4893a8b?w=600",
    afterImage: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=600"
  },
  {
    id: "7",
    category: "painting",
    title: { en: "Exterior Wall Painting", te: "బయటి గోడ పెయింటింగ్", kn: "ಹೊರಗಿನ ಗೋಡೆ ಪೇಂಟಿಂಗ್" },
    description: { en: "Weather-proof exterior painting with premium finish", te: "ప్రీమియం ఫినిష్‌తో వాతావరణ-నిరోధక బయటి పెయింటింగ్", kn: "ಪ್ರೀಮಿಯಂ ಫಿನಿಶ್‌ನೊಂದಿಗೆ ಹವಾಮಾನ-ನಿರೋಧಕ ಹೊರಗಿನ ಪೇಂಟಿಂಗ್" },
    beforeImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600"
  },
  {
    id: "8",
    category: "tiles-granite",
    title: { en: "Floor Tile Replacement", te: "అంతస్తు టైల్ మార్పిడి", kn: "ನೆಲ ಟೈಲ್ ಬದಲಾವಣೆ" },
    description: { en: "Old floor tiles replaced with modern vitrified tiles", te: "పాత ఫ్లోర్ టైల్స్‌ను ఆధునిక విట్రిఫైడ్ టైల్స్‌తో మార్చారు", kn: "ಹಳೆಯ ನೆಲ ಟೈಲ್ಸ್ ಅನ್ನು ಆಧುನಿಕ ವಿಟ್ರಿಫೈಡ್ ಟೈಲ್ಸ್‌ನಿಂದ ಬದಲಾಯಿಸಲಾಗಿದೆ" },
    beforeImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600",
    afterImage: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=600"
  }
];

const categories = [
  { id: "all", label: { en: "All", te: "అన్నీ", kn: "ಎಲ್ಲಾ" } },
  { id: "civil-works", label: { en: "Civil Works", te: "సివిల్ పనులు", kn: "ಸಿವಿಲ್ ಕೆಲಸಗಳು" } },
  { id: "electrical", label: { en: "Electrical", te: "ఎలక్ట్రికల్", kn: "ಎಲೆಕ್ಟ್ರಿಕಲ್" } },
  { id: "plumbing", label: { en: "Plumbing", te: "ప్లంబింగ్", kn: "ಪ್ಲంబಿಂಗ್" } },
  { id: "carpentry", label: { en: "Carpentry", te: "వడ్రంగి పని", kn: "ಮರಗೆಲಸ" } },
  { id: "tiles-granite", label: { en: "Tiles & Granite", te: "టైల్స్ & గ్రానైట్", kn: "ಟೈಲ್ಸ್ & ಗ್ರಾನೈಟ್" } },
  { id: "welding-works", label: { en: "Welding Works", te: "వెల్డింగ్ పనులు", kn: "ವೆಲ್ಡಿಂಗ್ ಕೆಲಸಗಳು" } },
  { id: "painting", label: { en: "Painting", te: "పెయింటింగ్", kn: "ಪೇಂಟಿಂಗ್" } }
];

const BeforeAfterCard = ({ item, language, index, isVisible }: { item: WorkItem; language: string; index: number; isVisible: boolean }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const lang = language as 'en' | 'te' | 'kn';

  return (
    <AnimatedElement isVisible={isVisible} animation="fadeInUp" delay={index * 100}>
      <Card className="overflow-hidden group hover-lift">
        <div 
          className="relative aspect-[4/3] overflow-hidden cursor-ew-resize select-none"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          <img 
            src={item.afterImage} 
            alt="After"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <img 
              src={item.beforeImage} 
              alt="Before"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div 
            className="absolute top-0 bottom-0 w-1 bg-primary-foreground shadow-lg z-10"
            style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg">
              <ChevronLeft className="w-4 h-4 text-primary-foreground -mr-1" />
              <ChevronRight className="w-4 h-4 text-primary-foreground -ml-1" />
            </div>
          </div>

          <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
            Before
          </Badge>
          <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
            After
          </Badge>
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-1">
            {item.title[lang]}
          </h3>
          <p className="text-sm text-muted-foreground">
            {item.description[lang]}
          </p>
        </div>
      </Card>
    </AnimatedElement>
  );
};

const OurWork = () => {
  const { t, language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: filtersRef, isVisible: filtersVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation({ threshold: 0.05 });
  const { ref: trustRef, isVisible: trustVisible } = useScrollAnimation({ threshold: 0.2 });

  const filteredWork = selectedCategory === "all" 
    ? workData 
    : workData.filter(item => item.category === selectedCategory);

  const lang = language as 'en' | 'te' | 'kn';

  return (
    <section id="our-work" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 via-background to-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Portfolio
              </span>
            </AnimatedElement>
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={100}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {t("ourWork.title")}
              </h2>
            </AnimatedElement>
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={200}>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("ourWork.subtitle")}
              </p>
            </AnimatedElement>
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={300}>
              <p className="text-base text-primary mt-4 font-medium">
                {t("ourWork.dragToCompare")}
              </p>
            </AnimatedElement>
          </div>

          {/* Filter buttons */}
          <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category, index) => (
              <AnimatedElement 
                key={category.id}
                isVisible={filtersVisible} 
                animation="fadeInUp" 
                delay={index * 50}
              >
                <Button
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300"
                >
                  {category.label[lang]}
                </Button>
              </AnimatedElement>
            ))}
          </div>

          {/* Work grid */}
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWork.map((item, index) => (
              <BeforeAfterCard 
                key={item.id} 
                item={item} 
                language={language} 
                index={index}
                isVisible={gridVisible}
              />
            ))}
          </div>

          {/* Trust message */}
          <div ref={trustRef} className="mt-16 text-center">
            <AnimatedElement isVisible={trustVisible} animation="scaleIn">
              <Card className="inline-block p-8 bg-gradient-primary text-primary-foreground max-w-2xl">
                <p className="text-xl md:text-2xl font-medium mb-2">
                  {t("ourWork.trustMessage")}
                </p>
                <p className="text-primary-foreground/80">
                  {t("ourWork.trustSubtext")}
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;