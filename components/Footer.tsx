import Image from "next/image";
import Link from "next/link";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function Footer({ locale }: Props) {
  const currentYear = new Date().getFullYear();
  const t = getContent(locale);

  const logoLink = (
    <Link
      href={`/${locale}`}
      className="focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
      aria-label="Ir a inicio"
    >
      <Image
        src="/logo_final.svg"
        alt=""
        width={50}
        height={50}
        className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity"
        aria-hidden="true"
      />
    </Link>
  );

  return (
    <footer className="border-t border-gray-200 mt-auto" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">

        {/* Mobile layout */}
        <div className="flex items-center justify-between sm:hidden">
          <div className="flex flex-col gap-1.5 text-sm text-gray-600 flex-1 min-w-0">
            <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
            <div className="flex items-center gap-x-3 text-gray-500">
              <Link
                href={`/${locale}/puzzles`}
                className="hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
              >
                {t.nav.puzzles}
              </Link>
              <span className="text-gray-300" aria-hidden="true">·</span>
              <Link
                href={`/${locale}/privacy`}
                className="hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
              >
                {t.footer.privacy}
              </Link>
            </div>
          </div>
          <div className="shrink-0 pl-8">
            {logoLink}
          </div>
        </div>

        {/* Desktop layout */}
        <div className="hidden sm:flex sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
            <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
            <span className="text-gray-300" aria-hidden="true">•</span>
            <p className="text-gray-500">{t.footer.domain}</p>
            <span className="text-gray-300" aria-hidden="true">•</span>
            <Link
              href={`/${locale}/puzzles`}
              className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            >
              {t.nav.puzzles}
            </Link>
            <span className="text-gray-300" aria-hidden="true">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            >
              {t.footer.privacy}
            </Link>
          </div>
          {logoLink}
        </div>

      </div>
    </footer>
  );
}
