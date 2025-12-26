import Logo from "./Logo";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function Header({ locale }: Props) {
  return (
    <header 
      className="border-b border-gray-200 sticky top-0 bg-white z-50"
      role="banner"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Logo locale={locale} size="medium" />
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-shrink-0" role="toolbar" aria-label="Navigation and language selection">
            <Navigation locale={locale} />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}




