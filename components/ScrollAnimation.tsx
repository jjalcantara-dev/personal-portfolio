"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: AnimationType;
  threshold?: number;
  rootMargin?: string;
};

const HIDDEN: Record<AnimationType, CSSProperties> = {
  "fade-up":     { opacity: 0, transform: "translateY(22px)" },
  "fade-in":     { opacity: 0 },
  "slide-left":  { opacity: 0, transform: "translateX(22px)" },
  "slide-right": { opacity: 0, transform: "translateX(-22px)" },
  "scale-up":    { opacity: 0, transform: "scale(0.95)" },
};

const VISIBLE: CSSProperties = { opacity: 1, transform: "none" };

const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function ScrollAnimation({
  children,
  delay = 0,
  className = "",
  animation = "fade-up",
  threshold = 0.01,
  rootMargin = "0px 0px 60px 0px",
}: Props) {
  // mounted: whether JS has run and we should apply animation styles
  // visible: whether the element has entered the viewport
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If the element is already in the viewport on load, show it immediately
    // without any animation — avoids flash of invisible content on mobile
    const rect = el.getBoundingClientRect();
    const alreadyInView = rect.top < window.innerHeight && rect.bottom > 0;

    if (alreadyInView) {
      setMounted(true);
      setVisible(true);
      return;
    }

    // Element is below the fold: mark as mounted (apply hidden styles) and observe
    setMounted(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={ref}
      className={className}
      style={
        mounted
          ? {
              transition: `opacity 0.65s ${EASING} ${delay}ms, transform 0.65s ${EASING} ${delay}ms`,
              ...(visible ? VISIBLE : HIDDEN[animation]),
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
