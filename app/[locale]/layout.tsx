import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { defaultLocale, isValidLocale, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  const title = locale === "es"
    ? "Jesús Jiménez Alcantara | Ingeniero Backend"
    : "Jesús Jiménez Alcantara | Backend Engineer";

  const baseUrl = "https://jjalcantara.dev";
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: title,
      template: "%s | jjalcantara.dev",
    },
    description: t.home.description,
    keywords: [
      "backend engineer",
      "software engineer",
      "software architecture",
      "backend development",
      "Azure",
      ".NET",
      "cloud developer",
      "ingeniero backend",
      "arquitectura software",
      "desarrollo backend",
      "C#",
      "ASP.NET",
    ],
    authors: [{ name: "Jesús Jiménez Alcantara" }],
    creator: "Jesús Jiménez Alcantara",
    publisher: "Jesús Jiménez Alcantara",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: canonicalUrl,
      siteName: "jjalcantara.dev",
      title,
      description: t.home.description,
      images: [
        {
          url: `${baseUrl}/logo_final.svg`,
          width: 1200,
          height: 630,
          alt: "Jesús Jiménez Alcantara - Backend Engineer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.home.description,
      creator: "@jjalcantara",
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-ES": `${baseUrl}/es`,
        "en-US": `${baseUrl}/en`,
        "x-default": `${baseUrl}/${defaultLocale}`,
      },
    },
    verification: {
      // Añade tus códigos de verificación cuando los tengas
      // google: "tu-codigo-google",
      // yandex: "tu-codigo-yandex",
      // bing: "tu-codigo-bing",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo_final.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo_final.svg" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t.a11y.skipToContent}
        </a>
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} />
          <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </div>
      </body>
    </html>
  );
}

