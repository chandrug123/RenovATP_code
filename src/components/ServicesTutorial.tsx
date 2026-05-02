import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ChevronRight, ChevronLeft, MousePointer, Check, MessageSquare, Star } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ServicesTutorialProps {
  onComplete: () => void;
}

const ServicesTutorial = ({ onComplete }: ServicesTutorialProps) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const tutorialSteps = [
    {
      title: t("tutorial.step1Title"),
      description: t("tutorial.step1Desc"),
      icon: Star,
    },
    {
      title: t("tutorial.step2Title"),
      description: t("tutorial.step2Desc"),
      icon: Star,
    },
    {
      title: t("tutorial.step3Title"),
      description: t("tutorial.step3Desc"),
      icon: MousePointer,
    },
    {
      title: t("tutorial.step4Title"),
      description: t("tutorial.step4Desc"),
      icon: Check,
    },
    {
      title: t("tutorial.step5Title"),
      description: t("tutorial.step5Desc"),
      icon: MessageSquare,
    },
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem("services-tutorial-completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isVisible) return null;

  const step = tutorialSteps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleSkip}
      />
      
      {/* Tutorial Card */}
      <div className="relative bg-card border-2 border-primary/20 rounded-2xl shadow-large max-w-md w-full p-6 animate-scale-in">
        {/* Close button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress dots */}
        <div className="flex justify-center gap-2 mb-6">
          {tutorialSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep
                  ? "w-6 bg-primary"
                  : index < currentStep
                  ? "bg-primary/50"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center animate-bounce-in">
            <Icon className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
          <p className="text-muted-foreground">{step.description}</p>
        </div>

        {/* Step indicator */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          {currentStep + 1} / {tutorialSteps.length}
        </p>

        {/* Navigation */}
        <div className="flex gap-3">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={handlePrev}
              className="flex-1"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {t("tutorial.previous")}
            </Button>
          ) : (
            <Button
              variant="ghost"
              onClick={handleSkip}
              className="flex-1 text-muted-foreground"
            >
              {t("tutorial.skip")}
            </Button>
          )}
          <Button
            onClick={handleNext}
            className="flex-1 bg-primary hover:bg-primary/90"
          >
            {currentStep === tutorialSteps.length - 1 ? (
              t("tutorial.gotIt")
            ) : (
              <>
                {t("tutorial.next")}
                <ChevronRight className="w-4 h-4 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServicesTutorial;
