"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { savePreferredLocale } from "@/lib/locale-cookie";
import { clr } from "@/lib/constants/colors";
import { useHideOnScroll } from "@/components/useHideOnScroll";

type Props = { locale: Locale };

export default function MobileLocaleToggle({ locale }: Props) {
  const visible = useHideOnScroll();
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = () => {
    const newLocale: Locale = locale === "es" ? "en" : "es";
    const newPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${newLocale}`) || `/${newLocale}`;
    savePreferredLocale(newLocale);
    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className={`fixed top-4 right-4 z-40 sm:hidden text-[11px] font-semibold uppercase tracking-widest ${clr.text.muted} hover:text-black ${clr.bg.frostLight} backdrop-blur-sm border ${clr.border.base} shadow-sm px-2.5 py-1.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      aria-label={locale === "es" ? "Switch to English" : "Cambiar a Español"}
    >
      {locale}
    </button>
  );
}
