"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ParallaxLogoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function ParallaxLogo({
  src,
  alt,
  width,
  height,
  className = "",
  priority = false,
}: ParallaxLogoProps) {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [translateY, setTranslateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = windowHeight / 2;

      // Subtle parallax effect: move slower than scroll
      const parallaxOffset = (elementCenter - viewportCenter) * 0.05;

      // Very subtle fade and scale on scroll (only when scrolling past)
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - elementTop) / windowHeight));
      const fadeStart = 0;
      const fadeEnd = 0.4;
      const fadeProgress = Math.max(0, Math.min(1, (scrollProgress - fadeStart) / (fadeEnd - fadeStart)));
      
      // Very subtle effects for professional look
      setOpacity(Math.max(0.7, 1 - fadeProgress * 0.2));
      setScale(Math.max(0.98, 1 - fadeProgress * 0.02));

      setTranslateY(parallaxOffset);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="h-28 sm:h-40 w-auto"
        aria-hidden="true"
      />
    </div>
  );
}

