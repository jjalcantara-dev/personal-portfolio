import type { Locale } from "./i18n";

// Pages that define their own `openGraph` replace the layout's, so they must
// list the generated image (app/[locale]/opengraph-image.tsx) again.
export function ogImages(locale: Locale) {
  return [
    {
      url: `/${locale}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: "Jesús Jiménez Alcántara, Backend Engineer",
    },
  ];
}
