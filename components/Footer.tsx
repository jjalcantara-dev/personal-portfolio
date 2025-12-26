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
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center gap-8">
          <Link 
            href={`/${locale}`} 
            className="inline-block focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            aria-label="Ir a inicio"
          >
            <Image
              src="/logo_final.svg"
              alt=""
              width={80}
              height={80}
              className="h-16 w-auto opacity-60 hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </Link>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
            <p>{t.footer.copyright.replace("{year}", currentYear.toString())}</p>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">•</span>
            <p className="text-gray-500">{t.footer.domain}</p>
            <span className="hidden sm:inline text-gray-300" aria-hidden="true">•</span>
            <Link
              href={`/${locale}/privacy`}
              className="text-gray-600 hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
            >
              {t.footer.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}




