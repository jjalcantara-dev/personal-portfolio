"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const pathSegments = pathname.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];
  const currentLocale = isValidLocale(firstSegment) ? firstSegment : defaultLocale;
  const pathWithoutLocale = pathSegments.length > 0 && isValidLocale(firstSegment)
    ? "/" + pathSegments.slice(1).join("/")
    : pathname;

  const switchLocale = (newLocale: Locale) => {
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2" role="group" aria-label="Language selector">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          aria-label={`Cambiar a ${locale === "es" ? "español" : "inglés"}`}
          aria-pressed={currentLocale === locale}
          className={`text-xs font-medium uppercase tracking-wider transition-colors px-2 py-1 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 ${
            currentLocale === locale
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"
          }`}
        >
          <span aria-hidden="true">{locale}</span>
        </button>
      ))}
    </div>
  );
}

