import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";

const baseUrl = "https://jjalcantara.dev";

// Canonical and hreflang links for one page. Every page must set its own:
// the layout's point at the home page, and a page that inherits them tells
// search engines it is a duplicate of home.
export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: `${baseUrl}/${locale}${path}`,
    languages: {
      "es-ES": `${baseUrl}/es${path}`,
      "en-US": `${baseUrl}/en${path}`,
      "x-default": `${baseUrl}/${defaultLocale}${path}`,
    },
  };
}
