import { ReactNode } from "react";
import { useScrollAnimation, visibleStyles } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn";
  delay?: number;
  threshold?: number;
}

const animationClasses = {
  fadeInUp: "translate-y-12 opacity-0",
  fadeInDown: "-translate-y-12 opacity-0",
  fadeInLeft: "-translate-x-12 opacity-0",
  fadeInRight: "translate-x-12 opacity-0",
  fadeIn: "opacity-0",
  scaleIn: "scale-90 opacity-0",
};

export const AnimatedSection = ({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? visibleStyles : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface AnimatedElementProps {
  children: ReactNode;
  className?: string;
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "fadeIn" | "scaleIn";
  delay?: number;
  isVisible: boolean;
}

export const AnimatedElement = ({
  children,
  className,
  animation = "fadeInUp",
  delay = 0,
  isVisible,
}: AnimatedElementProps) => {
  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? visibleStyles : animationClasses[animation],
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;