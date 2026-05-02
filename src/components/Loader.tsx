import { useEffect, useState } from "react";

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        // Smooth easing - faster at start, slower at end
        const increment = Math.max(1, Math.floor((100 - prev) / 10));
        return Math.min(prev + increment, 100);
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Update phase based on progress
  useEffect(() => {
    if (progress < 33) setPhase(0);
    else if (progress < 66) setPhase(1);
    else setPhase(2);
  }, [progress]);

  const phases = [
    { text: "Initializing", dots: "." },
    { text: "Loading assets", dots: ".." },
    { text: "Almost ready", dots: "..." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "0.5s" }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container with ring animation */}
        <div className="relative mb-8">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 w-24 h-24">
            <svg className="w-full h-full animate-spin" style={{ animationDuration: "3s" }} viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary)/0.1)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray={`${progress * 2.83} 283`}
                className="transition-all duration-300"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
          </div>

          {/* Inner pulsing ring */}
          <div className="absolute inset-2 w-20 h-20">
            <div className="w-full h-full rounded-full border-2 border-primary/20 animate-ping" style={{ animationDuration: "2s" }} />
          </div>

          {/* Logo circle */}
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-2xl">
            <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
              {/* House icon */}
              <svg 
                className="w-10 h-10 text-primary"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path 
                  d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  className="animate-pulse"
                  style={{ animationDuration: "2s" }}
                />
                <polyline points="9,22 9,12 15,12 15,22" />
                {/* Roof accent */}
                <path d="M12 2L22 10H2L12 2" strokeWidth="2" className="text-accent" stroke="currentColor" />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight mb-1">
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Renova</span>
            <span className="text-foreground">tp</span>
          </h1>
          <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase font-medium">
            Anantapur's Trusted Partner
          </p>
        </div>

        {/* Progress section */}
        <div className="w-56 space-y-3">
          {/* Progress bar */}
          <div className="relative h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer effect */}
            <div 
              className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"
              style={{ 
                left: `${progress - 20}%`,
                opacity: progress < 100 ? 1 : 0
              }}
            />
          </div>

          {/* Progress info */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {phases[phase].text}{phases[phase].dots}
            </span>
            <span className="text-foreground font-bold tabular-nums">
              {Math.min(progress, 100)}%
            </span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-1.5 mt-6">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <p className="text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Quality • Trust • Excellence
        </p>
      </div>
    </div>
  );
};

export default Loader;
