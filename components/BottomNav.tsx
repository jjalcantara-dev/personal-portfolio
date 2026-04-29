"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type Props = { locale: Locale };

type IconKey = "home" | "projects" | "collab" | "about" | "contact";

const iconPaths: Record<IconKey, React.ReactNode> = {
  home: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  ),
  projects: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  ),
  collab: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  ),
  about: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
  ),
  contact: (
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  ),
};

export default function BottomNav({ locale }: Props) {
  const pathname = usePathname();
  const t = getContent(locale);

  const navItems: { href: string; label: string; icon: IconKey }[] = [
    { href: `/${locale}`,          label: t.nav.home,     icon: "home" },
    { href: `/${locale}/projects`, label: t.nav.projects, icon: "projects" },
    { href: `/${locale}/collab`,   label: t.nav.collab,   icon: "collab" },
    { href: `/${locale}/about`,    label: t.nav.about,    icon: "about" },
    { href: `/${locale}/contact`,  label: t.nav.contact,  icon: "contact" },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Main navigation"
      role="navigation"
    >
      <ul className="flex list-none m-0 p-0">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="flex-1 m-0 p-0">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-2.5 w-full transition-colors duration-200 focus:outline-none ${
                  isActive ? "text-black" : "text-gray-400"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <svg
                  className="w-[22px] h-[22px] shrink-0"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={isActive ? 2 : 1.5}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {iconPaths[item.icon]}
                </svg>
                <span className="text-[10px] font-medium leading-none tracking-wide w-full text-center truncate px-0.5">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
