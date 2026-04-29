"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { clr } from "@/lib/constants/colors";

type Props = { locale: Locale };

type IconKey = "home" | "projects" | "collab" | "about" | "contact";

type IconSet = {
  outline: React.ReactNode;
  solid: React.ReactNode;
  keepStroke?: boolean;
};

const icons: Record<IconKey, IconSet> = {
  home: {
    outline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    ),
    solid: (
      <>
        <path d="M11.47 3.841a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.061l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 101.061 1.06l8.69-8.689z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.432z" />
      </>
    ),
  },
  projects: {
    keepStroke: true,
    outline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    ),
    solid: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    ),
  },
  collab: {
    outline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    ),
    solid: (
      <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
    ),
  },
  about: {
    outline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    ),
    solid: (
      <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    ),
  },
  contact: {
    outline: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    ),
    solid: (
      <>
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
      </>
    ),
  },
};

export default function BottomNav({ locale }: Props) {
  const pathname = usePathname();
  const t = getContent(locale);

  const navItems: { href: string; label: string; icon: IconKey }[] = [
    { href: `/${locale}`,          label: t.nav.home,                              icon: "home" },
    { href: `/${locale}/projects`, label: t.nav.projects,                          icon: "projects" },
    { href: `/${locale}/collab`,   label: locale === "es" ? "Colab" : t.nav.collab, icon: "collab" },
    { href: `/${locale}/about`,    label: t.nav.about,                             icon: "about" },
    { href: `/${locale}/contact`,  label: t.nav.contact,                           icon: "contact" },
  ];

  return (
    <nav
      className={`fixed bottom-0 left-0 right-0 z-50 ${clr.bg.white} border-t ${clr.border.base} sm:hidden`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Main navigation"
      role="navigation"
    >
      <ul className="flex list-none m-0 p-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const useStroke = !isActive || icons[item.icon].keepStroke;

          return (
            <li key={item.href} className="flex-1 m-0 p-0">
              <Link
                href={item.href}
                className={`flex items-center justify-center w-full py-2 focus:outline-none ${
                  isActive ? clr.text.primary : clr.text.faint
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-2xl transition-colors duration-150 min-w-0 ${
                  isActive ? "bg-gray-100" : "hover:bg-gray-100 active:bg-gray-100"
                }`}>
                  <svg
                    className="w-[22px] h-[22px] shrink-0"
                    fill={useStroke ? "none" : "currentColor"}
                    stroke={useStroke ? "currentColor" : "none"}
                    strokeWidth={useStroke ? (isActive ? 2 : 1.5) : undefined}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    {isActive ? icons[item.icon].solid : icons[item.icon].outline}
                  </svg>
                  <span className="text-[10px] font-medium leading-none tracking-wide text-center truncate">
                    {item.label}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
