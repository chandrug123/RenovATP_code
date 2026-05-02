import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};

// Animation variants for different effects
export const animationVariants = {
  fadeInUp: "translate-y-8 opacity-0",
  fadeInDown: "translate-y-[-2rem] opacity-0",
  fadeInLeft: "-translate-x-8 opacity-0",
  fadeInRight: "translate-x-8 opacity-0",
  fadeIn: "opacity-0",
  scaleIn: "scale-95 opacity-0",
  slideUp: "translate-y-full opacity-0",
} as const;

export const visibleStyles = "translate-y-0 translate-x-0 opacity-100 scale-100";
