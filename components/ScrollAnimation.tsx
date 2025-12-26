"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type ScrollAnimationProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
  threshold?: number;
};

export default function ScrollAnimation({
  children,
  delay = 0,
  className = "",
  animation = "fade-up",
  threshold = 0.1,
}: ScrollAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  const animationClasses = {
    "fade-up": isVisible ? "animate-fade-up" : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "animate-fade-in" : "opacity-0",
    "slide-left": isVisible ? "animate-slide-left" : "opacity-0 translate-x-8",
    "slide-right": isVisible ? "animate-slide-right" : "opacity-0 -translate-x-8",
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animationClasses[animation]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
