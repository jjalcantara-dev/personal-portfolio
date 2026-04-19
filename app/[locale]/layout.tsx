import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import CookieBanner from "@/components/CookieBanner";
import ScrollProgress from "@/components/ScrollProgress";
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
    ? "Jesús Jiménez Alcántara | Ingeniero Backend | Azure & .NET Specialist"
    : "Jesús Jiménez Alcántara | Backend Engineer | Azure & .NET Specialist";

  const baseUrl = "https://jjalcantara.dev";
  const canonicalUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    icons: {
      icon: [
        { url: "/favicon_centered.png", type: "image/png", sizes: "512x512" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "192x192" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "96x96" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "64x64" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "48x48" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon_centered.png", type: "image/png", sizes: "16x16" },
      ],
      apple: [
        { url: "/logo_final.png", type: "image/png", sizes: "180x180" },
      ],
      shortcut: [
        { url: "/favicon_centered.png", type: "image/png" },
      ],
    },
    title: {
      default: title,
      template: "%s | jjalcantara.dev",
    },
    description: t.home.description,
    keywords: [
      // Nombre completo con variaciones
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "Jesús Jiménez Alcantara",
      "Jesus Jimenez Alcántara",
      "Jesús Jimenez Alcántara",
      "Jesus Jiménez Alcantara",
      "JJA",
      "jjalcantara",
      // Profesión y especialización
      "backend engineer",
      "software engineer",
      "software architecture",
      "backend development",
      "cloud developer",
      "ingeniero backend",
      "arquitectura software",
      "desarrollo backend",
      // Tecnologías
      "Azure",
      ".NET",
      "C#",
      "ASP.NET",
      "Azure Functions",
      "Cloud Computing",
      "Microservices",
      "Docker",
      "Kubernetes",
      // Ubicación
      "Málaga",
      "Vélez-Málaga",
      "Spain",
      "España",
      // Empresa
      "The Bubble Hub",
      "Backend Engineer Málaga",
      "Ingeniero Backend Málaga",
    ],
    authors: [{ name: "Jesús Jiménez Alcántara" }],
    creator: "Jesús Jiménez Alcántara",
    publisher: "Jesús Jiménez Alcántara",
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
          url: `${baseUrl}/profile.png`,
          width: 800,
          height: 800,
          alt: "Jesús Jiménez Alcántara - Backend Engineer",
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
    manifest: "/manifest.json",
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="author" content="Jesús Jiménez Alcántara" />
        <link rel="icon" type="image/png" href="/favicon_centered.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon_centered.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon_centered.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon_centered.png" />
        <link rel="shortcut icon" type="image/png" href="/favicon_centered.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo_final.png" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t.a11y.skipToContent}
        </a>
        <StructuredData locale={locale} />
        <ScrollProgress />
        <div className="min-h-screen flex flex-col">
          <Header locale={locale} />
          <main id="main-content" className="flex-1" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
          <CookieBanner locale={locale} />
        </div>
      </body>
    </html>
  );
}

