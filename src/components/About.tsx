import { Card } from "@/components/ui/card";
import { Users, Award, Clock, Shield, Heart, FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { AnimatedElement } from "./AnimatedSection";

const About = () => {
  const { t } = useLanguage();
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresVisible } = useScrollAnimation({ threshold: 0.1 });
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation({ threshold: 0.2 });

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: t("about.expertTeam"),
      description: t("about.expertTeamDesc"),
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t("about.qualityWork"),
      description: t("about.qualityWorkDesc"),
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t("about.onTimeService"),
      description: t("about.onTimeServiceDesc"),
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t("about.affordablePrices"),
      description: t("about.affordablePricesDesc"),
      gradient: "from-accent/20 to-accent/5",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: t("about.satisfaction"),
      description: t("about.satisfactionDesc"),
      gradient: "from-primary/20 to-primary/5",
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: t("about.freeQuote"),
      description: t("about.freeQuoteDesc"),
      gradient: "from-accent/20 to-accent/5",
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-b from-background via-secondary/30 to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={sectionRef} className="text-center mb-12 md:mb-16">
            <AnimatedElement isVisible={sectionVisible} animation="fadeInUp">
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                {t("about.badge") || "Why Us"}
              </span>
            </AnimatedElement>
            <AnimatedElement isVisible={sectionVisible} animation="fadeInUp" delay={100}>
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
                {t("about.title")}
              </h2>
            </AnimatedElement>
            <AnimatedElement isVisible={sectionVisible} animation="fadeInUp" delay={200}>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t("about.subtitle")}
              </p>
            </AnimatedElement>
          </div>

          {/* Main Content Grid */}
          <div ref={featuresRef} className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start mb-12 md:mb-16">
            {/* Left Side - Why Choose Us */}
            <AnimatedElement isVisible={featuresVisible} animation="fadeInLeft" delay={100}>
              <div className="bg-gradient-to-br from-primary/5 via-background to-accent/5 rounded-2xl p-6 md:p-8 border border-border/50">
                <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
                  {t("about.whyChooseUs")}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {t("about.whyChooseDesc1")}
                </p>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {t("about.whyChooseDesc2")}
                </p>
                
                {/* Trust Badge */}
                <div className="bg-gradient-to-r from-accent/10 to-accent/5 border-l-4 border-accent p-4 rounded-r-xl">
                  <p className="text-accent font-semibold text-base md:text-lg flex items-start gap-2">
                    <span className="text-2xl">💡</span>
                    <span>{t("about.noPressure")}</span>
                  </p>
                </div>
              </div>
            </AnimatedElement>

            {/* Right Side - Feature Cards */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <AnimatedElement 
                  key={index}
                  isVisible={featuresVisible} 
                  animation="fadeInUp" 
                  delay={150 + index * 100}
                >
                  <Card
                    className={`p-4 md:p-5 group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border/50 bg-gradient-to-br ${feature.gradient} h-full`}
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow-md">
                      <div className="text-primary-foreground">
                        {feature.icon}
                      </div>
                    </div>
                    <h4 className="font-bold text-sm md:text-base mb-1 text-foreground">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {feature.description}
                    </p>
                  </Card>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div ref={statsRef}>
            <AnimatedElement isVisible={statsVisible} animation="scaleIn" delay={100}>
              <div className="bg-gradient-to-r from-primary via-primary/90 to-accent rounded-2xl md:rounded-3xl p-6 md:p-10 text-center relative overflow-hidden shadow-xl">
                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-foreground/10 rounded-full animate-float blur-2xl" />
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary-foreground/10 rounded-full animate-float stagger-2 blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl md:text-4xl font-bold mb-3 text-primary-foreground">
                    {t("about.readyToTransform")}
                  </h3>
                  <p className="text-base md:text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                    {t("about.readyToTransformDesc")}
                  </p>
                  
                  <div className="grid grid-cols-3 gap-4 md:gap-8 text-primary-foreground">
                    <AnimatedElement isVisible={statsVisible} animation="fadeInUp" delay={300}>
                      <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">500+</div>
                      <div className="text-xs md:text-sm text-primary-foreground/80">{t("about.servicesCompleted")}</div>
                    </AnimatedElement>
                    <AnimatedElement isVisible={statsVisible} animation="fadeInUp" delay={400}>
                      <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">98%</div>
                      <div className="text-xs md:text-sm text-primary-foreground/80">{t("about.happyCustomers")}</div>
                    </AnimatedElement>
                    <AnimatedElement isVisible={statsVisible} animation="fadeInUp" delay={500}>
                      <div className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">10+</div>
                      <div className="text-xs md:text-sm text-primary-foreground/80">{t("about.yearsExperience")}</div>
                    </AnimatedElement>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;