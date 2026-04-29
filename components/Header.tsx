"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";
import { clr } from "@/lib/constants/colors";

type Props = {
  locale: Locale;
};

export default function Header({ locale }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const check = () => setScrolled(window.scrollY > 16);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  return (
    <header
      className={`hidden sm:block sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? `${clr.bg.frosted} backdrop-blur-md border-b ${clr.border.baseOpa} shadow-[0_1px_12px_rgba(0,0,0,0.06)]`
          : `${clr.bg.white} border-b ${clr.border.base}`
      }`}
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Logo locale={locale} size="small" />
          <div
            className="flex items-center flex-shrink-0"
            role="toolbar"
            aria-label="Navigation and language selection"
          >
            <div className="hidden sm:flex">
              <Navigation locale={locale} />
            </div>
            <div className={`sm:ml-8 md:ml-12 lg:ml-16 sm:border-l ${clr.border.base} sm:pl-8 md:pl-10`}>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
