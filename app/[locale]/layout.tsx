import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import MobileLocaleToggle from "@/components/MobileLocaleToggle";
import MobileBackButton from "@/components/MobileBackButton";
import StructuredData from "@/components/StructuredData";
import Intro, { INTRO_GATE } from "@/components/Intro";
import ScrollProgress from "@/components/ScrollProgress";
import { defaultLocale, isValidLocale, locales } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import { AUTHOR_NAME, SITE_NAME, SITE_URL, SOCIAL_URLS, displayUrl } from "@/lib/site";

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
    ? "Jesús Jiménez Alcántara | Ingeniero Backend .NET y Azure"
    : "Jesús Jiménez Alcántara | Backend Engineer, .NET & Azure";

  const canonicalUrl = `${SITE_URL}/${locale}`;

  return {
    metadataBase: new URL(SITE_URL),
    icons: {
      icon: [
        { url: "/favicon_centered.png", type: "image/png" },
      ],
      apple: [
        { url: "/favicon_centered.png", type: "image/png" },
      ],
      shortcut: [
        { url: "/favicon_centered.png", type: "image/png" },
      ],
    },
    title: {
      default: title,
      template: "%s | Jesús Jiménez Alcántara",
    },
    description: t.home.metaDescription,
    keywords: [
      // Nombre completo con variaciones
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "Jesus Jimenez Alcántara",
      "Jesús Jimenez Alcántara",
      "Jesus Jiménez Alcantara",
      "JJA",
      "jjalcantara",
      "jjalcantara-dev",
      // Profesión y especialización
      "backend engineer",
      "ingeniero backend",
      "backend development",
      "cloud-native backend",
      "REST API design",
      "API design",
      "software architecture",
      "cloud developer",
      // Tecnologías principales
      "ASP.NET Core",
      "ASP.NET",
      ".NET",
      "C#",
      "Azure",
      "Azure Functions",
      "PostgreSQL",
      "Redis",
      // Auth y pagos
      "JWT",
      "OAuth 2.0",
      "RBAC",
      "Stripe",
      // Prácticas
      "SOLID",
      "Clean Architecture",
      "CI/CD",
      "Docker",
      // Ubicación
      "Málaga",
      "Vélez-Málaga",
      "Spain",
      "España",
      // Perfiles
      displayUrl(SOCIAL_URLS.github),
      // Empresa
      "The Bubble Hub",
      "Ernst Young",
      "Backend Engineer Málaga",
      "Ingeniero Backend Málaga",
    ],
    authors: [{ name: AUTHOR_NAME }],
    creator: AUTHOR_NAME,
    publisher: AUTHOR_NAME,
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
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      url: canonicalUrl,
      siteName: SITE_NAME,
      title,
      description: t.home.metaDescription,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t.home.metaDescription,
    },
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "es-ES": `${SITE_URL}/es`,
        "en-US": `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/${defaultLocale}`,
      },
    },
    verification: {
      // Añade tus códigos de verificación cuando los tengas
      // google: "tu-codigo-google",
      // yandex: "tu-codigo-yandex",
      // bing: "tu-codigo-bing",
    },
    manifest: "/manifest.json",
    formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    // suppressHydrationWarning: INTRO_GATE may set data-intro on <html> before hydration
    <html lang={locale} className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE }} />
      </head>
      <body className={`${inter.variable} antialiased`}>
        <Intro />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-sm focus:outline-none focus:ring-2 focus:ring-white"
        >
          {t.a11y.skipToContent}
        </a>
        <StructuredData locale={locale} />
        <ScrollProgress />
        <div className="min-h-screen flex flex-col pb-[calc(env(safe-area-inset-bottom)+57px)] sm:pb-0">
          <Header locale={locale} />
          <main id="main-content" className="flex-1 flex flex-col" role="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </div>
        <BottomNav locale={locale} />
        <MobileBackButton locale={locale} />
        <MobileLocaleToggle locale={locale} />
      </body>
    </html>
  );
}

