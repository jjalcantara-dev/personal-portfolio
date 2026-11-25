import type { Metadata } from "next";
import type { Locale } from "./i18n";
import { defaultLocale } from "./i18n";
import { ogImages } from "./og";
import { AUTHOR_NAME, SITE_URL } from "./site";

// Canonical and hreflang links for one page. Every page must set its own:
// the layout's point at the home page, and a page that inherits them tells
// search engines it is a duplicate of home.
export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: {
      "es-ES": `${SITE_URL}/es${path}`,
      "en-US": `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}/${defaultLocale}${path}`,
    },
  };
}

type PageMetadataInput = {
  locale: Locale;
  /** Route without the locale, e.g. "/about". */
  path: string;
  /** Short title; the layout template appends " | Jesús Jiménez Alcántara". */
  title: string;
  /** Title for Open Graph / Twitter, which don't use the template. Default: `${title} | AUTHOR_NAME`. */
  socialTitle?: string;
  description: string;
  keywords?: string[];
  type?: "website" | "profile";
};

/**
 * Complete metadata for a subpage: title, description, canonical + hreflang,
 * and Open Graph / Twitter with the generated preview image. A page that sets
 * its own `openGraph` replaces the layout's entirely, so it must carry all of it.
 */
export function pageMetadata({ locale, path, title, socialTitle, description, keywords, type = "website" }: PageMetadataInput): Metadata {
  const social = socialTitle ?? `${title} | ${AUTHOR_NAME}`;
  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: pageAlternates(locale, path),
    openGraph: {
      type,
      title: social,
      description,
      url: `${SITE_URL}/${locale}${path}`,
      images: ogImages(locale),
    },
    twitter: {
      card: "summary_large_image",
      title: social,
      description,
      images: ogImages(locale),
    },
  };
}
