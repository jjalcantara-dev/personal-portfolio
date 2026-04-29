"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import { clr, focusRing } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
};

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  const currentLocale = isValidLocale(firstSegment) ? firstSegment : defaultLocale;
  const pathWithoutLocale = pathSegments.length > 0 && isValidLocale(firstSegment)
    ? "/" + pathSegments.slice(1).join("/")
    : pathname;

  const switchLocale = (newLocale: Locale) => {
    const secure = window.location.protocol === "https:";
    document.cookie = `preferred_locale=${newLocale};path=/;max-age=31536000;SameSite=Lax${secure ? ";Secure" : ""}`;
    router.push(`/${newLocale}${pathWithoutLocale}`);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select language"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 ${tx.nav} uppercase tracking-wider ${clr.text.muted} hover:text-black transition-colors px-2 py-1.5 ${focusRing}`}
      >
        <span>{currentLocale}</span>
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-1 w-40 ${clr.bg.white} border ${clr.border.base} rounded-sm shadow-lg z-50`}
          role="menu"
          aria-orientation="vertical"
        >
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => switchLocale(locale)}
              role="menuitem"
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none focus:bg-gray-50 ${
                currentLocale === locale
                  ? `${clr.text.primary} ${clr.bg.soft}`
                  : `${clr.text.muted} hover:text-black hover:bg-gray-50`
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{localeNames[locale]}</span>
                {currentLocale === locale && (
                  <svg
                    className={`w-4 h-4 ${clr.text.primary}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
