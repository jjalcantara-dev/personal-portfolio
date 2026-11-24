"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { clr } from "@/lib/constants/colors";
import { useHideOnScroll } from "@/components/useHideOnScroll";

type Props = { locale: Locale };

// Pages that are not in the bottom nav (reached from the footer). With no tab
// highlighted there, they get a floating back arrow, top left, paired with the
// language toggle top right.
const SECONDARY_PAGES = ["/puzzles", "/privacy"];

export default function MobileBackButton({ locale }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const visible = useHideOnScroll();
  // Mounted once in the layout, so it outlives page changes: if the path has
  // changed since mount, there is a page of this site to go back to.
  const firstPath = useRef(pathname);
  const navigatedInSite = useRef(false);

  useEffect(() => {
    if (pathname !== firstPath.current) navigatedInSite.current = true;
  }, [pathname]);

  if (!SECONDARY_PAGES.some((page) => pathname === `/${locale}${page}`)) return null;

  const goBack = () => {
    if (navigatedInSite.current) router.back();
    else router.push(`/${locale}`);
  };

  return (
    <button
      type="button"
      onClick={goBack}
      className={`fixed top-4 left-4 z-40 sm:hidden flex items-center justify-center w-[30px] h-[30px] ${clr.text.muted} hover:text-black ${clr.bg.frostLight} backdrop-blur-sm border ${clr.border.base} shadow-sm rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"
      }`}
      aria-label={getContent(locale).a11y.back}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
