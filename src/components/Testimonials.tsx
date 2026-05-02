import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedElement } from "./AnimatedSection";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: string;
  name: { en: string; te: string; kn: string };
  location: { en: string; te: string; kn: string };
  service: { en: string; te: string; kn: string };
  review: { en: string; te: string; kn: string };
  rating: number;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: { en: "Ramesh Kumar", te: "రమేష్ కుమార్", kn: "ರಮೇಶ್ ಕುಮಾರ್" },
    location: { en: "Hyderabad", te: "హైదరాబాద్", kn: "ಹೈದರಾಬಾದ್" },
    service: { en: "House Painting", te: "ఇంటి పెయింటింగ్", kn: "ಮನೆ ಪೇಂಟಿಂಗ್" },
    review: { 
      en: "Excellent work! They completed our entire house painting in just 3 days. Very professional team and reasonable prices. Highly recommended!", 
      te: "అద్భుతమైన పని! వారు మా మొత్తం ఇంటి పెయింటింగ్‌ను కేవలం 3 రోజుల్లో పూర్తి చేశారు. చాలా వృత్తిపరమైన బృందం మరియు సహేతుకమైన ధరలు.", 
      kn: "ಅತ್ಯುತ್ತಮ ಕೆಲಸ! ಅವರು ನಮ್ಮ ಸಂಪೂರ್ಣ ಮನೆ ಪೇಂಟಿಂಗ್ ಅನ್ನು ಕೇವಲ 3 ದಿನಗಳಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸಿದರು. ತುಂಬಾ ವೃತ್ತಿಪರ ತಂಡ." 
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "2",
    name: { en: "Priya Sharma", te: "ప్రియ శర్మ", kn: "ಪ್ರಿಯಾ ಶರ್ಮಾ" },
    location: { en: "Bangalore", te: "బెంగళూరు", kn: "ಬೆಂಗಳೂರು" },
    service: { en: "Bathroom Renovation", te: "బాత్రూమ్ పునరుద్ధరణ", kn: "ಬಾತ್‌ರೂಮ್ ನವೀಕರಣ" },
    review: { 
      en: "Transformed our old bathroom into a modern space. The tiles work was perfect. They even helped us choose the right materials. No pressure at all!", 
      te: "మా పాత బాత్రూమ్‌ను ఆధునిక స్థలంగా మార్చారు. టైల్స్ పని పర్ఫెక్ట్‌గా ఉంది. సరైన మెటీరియల్స్ ఎంచుకోవడంలో కూడా సహాయం చేశారు.", 
      kn: "ನಮ್ಮ ಹಳೆಯ ಬಾತ್‌ರೂಮ್ ಅನ್ನು ಆಧುನಿಕ ಸ್ಥಳವಾಗಿ ಪರಿವರ್ತಿಸಿದರು. ಟೈಲ್ಸ್ ಕೆಲಸ ಪರಿಪೂರ್ಣವಾಗಿತ್ತು." 
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "3",
    name: { en: "Venkatesh Reddy", te: "వెంకటేష్ రెడ్డి", kn: "ವೆಂಕಟೇಶ್ ರೆಡ್ಡಿ" },
    location: { en: "Vizag", te: "విశాఖపట్నం", kn: "ವಿಶಾಖಪಟ್ಟಣಂ" },
    service: { en: "Electrical Work", te: "ఎలక్ట్రికల్ పని", kn: "ಎಲೆಕ್ಟ್ರಿಕಲ್ ಕೆಲಸ" },
    review: { 
      en: "Complete rewiring of our old house. The electricians were very skilled and safety-conscious. They explained everything clearly before starting.", 
      te: "మా పాత ఇంటి పూర్తి రీవైరింగ్. ఎలక్ట్రీషియన్లు చాలా నైపుణ్యంగా మరియు భద్రత పట్ల జాగ్రత్తగా ఉన్నారు.", 
      kn: "ನಮ್ಮ ಹಳೆಯ ಮನೆಯ ಸಂಪೂರ್ಣ ರಿವೈರಿಂಗ್. ಎಲೆಕ್ಟ್ರೀಷಿಯನ್‌ಗಳು ತುಂಬಾ ನುರಿತವರು ಮತ್ತು ಸುರಕ್ಷತಾ ಜಾಗೃತರಾಗಿದ್ದರು." 
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "4",
    name: { en: "Lakshmi Devi", te: "లక్ష్మీ దేవి", kn: "ಲಕ್ಷ್ಮೀ ದೇವಿ" },
    location: { en: "Mysore", te: "మైసూర్", kn: "ಮೈಸೂರು" },
    service: { en: "Kitchen Cabinets", te: "కిచెన్ క్యాబినెట్లు", kn: "ಅಡುಗೆಮನೆ ಕ್ಯಾಬಿನೆಟ್‌ಗಳು" },
    review: { 
      en: "Beautiful modular kitchen installed. The carpenters were very patient with all my requirements. They never rushed or pressured us. Wonderful service!", 
      te: "అందమైన మాడ్యులర్ కిచెన్ ఇన్‌స్టాల్ చేశారు. వడ్రంగులు నా అన్ని అవసరాలతో చాలా ఓపికగా ఉన్నారు.", 
      kn: "ಸುಂದರವಾದ ಮಾಡ್ಯುಲರ್ ಕಿಚನ್ ಅಳವಡಿಸಲಾಗಿದೆ. ಮರಗೆಲಸದವರು ನನ್ನ ಎಲ್ಲಾ ಅಗತ್ಯಗಳೊಂದಿಗೆ ತುಂಬಾ ತಾಳ್ಮೆಯಿಂದಿದ್ದರು." 
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "5",
    name: { en: "Suresh Babu", te: "సురేష్ బాబు", kn: "ಸುರೇಶ್ ಬಾಬು" },
    location: { en: "Warangal", te: "వరంగల్", kn: "ವಾರಂಗಲ್" },
    service: { en: "Plumbing", te: "ప్లంబింగ్", kn: "ಪ್ಲಂಬಿಂಗ್" },
    review: { 
      en: "Fixed all our plumbing issues in one visit. Very honest pricing and they arrived exactly on time. Will definitely call them again for any home service needs.", 
      te: "ఒక్క సందర్శనలో మా అన్ని ప్లంబింగ్ సమస్యలను పరిష్కరించారు. చాలా నిజాయితీగల ధరలు మరియు సరిగ్గా సమయానికి వచ్చారు.", 
      kn: "ಒಂದು ಭೇಟಿಯಲ್ಲಿ ನಮ್ಮ ಎಲ್ಲಾ ಪ್ಲಂಬಿಂಗ್ ಸಮಸ್ಯೆಗಳನ್ನು ಸರಿಪಡಿಸಿದರು. ತುಂಬಾ ಪ್ರಾಮಾಣಿಕ ಬೆಲೆ ಮತ್ತು ಸರಿಯಾದ ಸಮಯಕ್ಕೆ ಬಂದರು." 
    },
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];

const Testimonials = () => {
  const { t, language } = useLanguage();
  const lang = language as 'en' | 'te' | 'kn';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: carouselRef, isVisible: carouselVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: trustRef, isVisible: trustVisible } = useScrollAnimation({ threshold: 0.2 });

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-muted/20 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Testimonials
              </span>
            </AnimatedElement>
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={100}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {t("testimonials.title")}
              </h2>
            </AnimatedElement>
            <AnimatedElement isVisible={headerVisible} animation="fadeInUp" delay={200}>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {t("testimonials.subtitle")}
              </p>
            </AnimatedElement>
          </div>

          {/* Testimonials Carousel */}
          <div ref={carouselRef} className="relative">
            <AnimatedElement isVisible={carouselVisible} animation="scaleIn" delay={100}>
              {/* Navigation Arrows */}
              <button
                onClick={prevTestimonial}
                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-all duration-300 hover:scale-110"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-all duration-300 hover:scale-110"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground" />
              </button>

              {/* Main Testimonial Card */}
              <div className="px-8 md:px-16">
                <Card className="p-6 md:p-10 bg-gradient-to-br from-card via-card to-muted/30 backdrop-blur-sm border-primary/10 overflow-hidden relative shadow-lg">
                  <Quote className="absolute top-4 right-4 w-16 h-16 text-primary/10" />
                  
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name[lang]}
                        className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      {/* Rating */}
                      <div className="flex justify-center md:justify-start gap-1 mb-4">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* Review */}
                      <p className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                        "{testimonials[currentIndex].review[lang]}"
                      </p>

                      {/* Author Info */}
                      <div>
                        <h4 className="font-bold text-lg text-foreground">
                          {testimonials[currentIndex].name[lang]}
                        </h4>
                        <p className="text-muted-foreground">
                          {testimonials[currentIndex].location[lang]} • {testimonials[currentIndex].service[lang]}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </AnimatedElement>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setCurrentIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "w-6 bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Trust Banner */}
          <div ref={trustRef} className="mt-12">
            <AnimatedElement isVisible={trustVisible} animation="fadeInUp" delay={100}>
              <Card className="p-6 md:p-8 bg-gradient-primary text-primary-foreground text-center shadow-xl">
                <p className="text-lg md:text-xl font-medium mb-2">
                  {t("testimonials.trustBanner")}
                </p>
                <p className="text-primary-foreground/80 text-sm md:text-base">
                  {t("testimonials.trustBannerSub")}
                </p>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;