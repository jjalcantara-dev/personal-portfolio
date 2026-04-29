"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { clr, focusRing } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

type Props = {
  locale: Locale;
};

export default function Navigation({ locale }: Props) {
  const pathname = usePathname();
  const t = getContent(locale);

  const navItems = [
    { href: `/${locale}`,          label: t.nav.home },
    { href: `/${locale}/projects`, label: t.nav.projects },
    { href: `/${locale}/collab`,   label: t.nav.collab },
    { href: `/${locale}/about`,    label: t.nav.about },
    { href: `/${locale}/contact`,  label: t.nav.contact },
  ];

  return (
    <nav
      className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 flex-wrap justify-end"
      aria-label="Main navigation"
      role="navigation"
    >
      <ul className="flex gap-2 sm:gap-4 md:gap-6 lg:gap-8 list-none m-0 p-0 flex-wrap">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="m-0 p-0">
              <Link
                href={item.href}
                className={`group relative ${tx.nav} transition-colors duration-200 ${focusRing} px-1 pb-1 ${
                  isActive ? clr.text.primary : `${clr.text.subtle} hover:text-black`
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-[2px] ${clr.bg.primary} transition-[width] duration-300 ease-out ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
