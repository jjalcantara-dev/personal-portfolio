import { useEffect, useRef, useState } from "react";

// Floating mobile controls: hidden while scrolling down, shown when scrolling
// up or near the top of the page.
export function useHideOnScroll(): boolean {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(currentY < 10 || currentY <= lastY.current);
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return visible;
}
