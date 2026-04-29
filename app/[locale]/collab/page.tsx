import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import CollabList from "@/components/CollabList";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);
  const baseUrl = "https://jjalcantara.dev";

  return {
    title: locale === "es"
      ? "Colaboradores | Jesús Jiménez Alcántara"
      : "Collab | Jesús Jiménez Alcántara",
    description: t.collab.description,
    keywords: [
      "Jesús Jiménez Alcántara",
      "colaboradores",
      "collab",
      "network",
      "Backend Engineer",
    ],
    openGraph: {
      title: locale === "es"
        ? "Colaboradores | Jesús Jiménez Alcántara"
        : "Collab | Jesús Jiménez Alcántara",
      description: t.collab.description,
      url: `${baseUrl}/${locale}/collab`,
    },
  };
}

export default async function Collab({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.collab.title}
          </h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={100}>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-3xl mb-12">
            {t.collab.description}
          </p>
        </ScrollAnimation>

        <section className="border-t border-gray-200 pt-12" aria-labelledby="collab-people-heading">
          <h2 id="collab-people-heading" className="sr-only">
            {t.collab.title}
          </h2>
          <CollabList people={t.collab.people} visitLabel={t.collab.visitLabel} />
        </section>
      </article>
    </div>
  );
}
