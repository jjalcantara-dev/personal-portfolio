"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type AnimationType = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-up";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  animation?: AnimationType;
  threshold?: number;
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
  threshold = 0.08,
}: Props) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.65s ${EASING} ${delay}ms, transform 0.65s ${EASING} ${delay}ms`,
        ...(visible ? VISIBLE : HIDDEN[animation]),
      }}
    >
      {children}
    </div>
  );
}
