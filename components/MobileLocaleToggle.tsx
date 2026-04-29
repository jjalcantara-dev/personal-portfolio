"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type Props = { locale: Locale };

export default function MobileLocaleToggle({ locale }: Props) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < 10) {
        setVisible(true);
      } else if (currentY > lastY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const switchLocale = () => {
    const newLocale: Locale = locale === "es" ? "en" : "es";
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`) || `/${newLocale}`;
    const secure = window.location.protocol === "https:";
    document.cookie = `preferred_locale=${newLocale};path=/;max-age=31536000;SameSite=Lax${secure ? ";Secure" : ""}`;
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className={`fixed top-4 right-4 z-40 sm:hidden text-[11px] font-semibold uppercase tracking-widest text-gray-600 hover:text-black bg-white/80 backdrop-blur-sm border border-gray-200 shadow-sm px-2.5 py-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale}
    </button>
  );
}
