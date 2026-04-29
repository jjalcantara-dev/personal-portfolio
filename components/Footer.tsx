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

  return (
    <footer
      className="border-t border-gray-200 mt-auto"
      role="contentinfo"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-2 sm:gap-x-4 sm:gap-y-2 text-sm text-gray-600">
            <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">•</span>
            <p className="text-gray-500">{t.footer.domain}</p>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">•</span>
            <Link
              href={`/${locale}/puzzles`}
              className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            >
              {t.nav.puzzles}
            </Link>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            >
              {t.footer.privacy}
            </Link>
          </div>
          <Link
            href={`/${locale}`}
            className="inline-block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm self-end sm:self-auto"
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
        </div>
      </div>
    </footer>
  );
}
