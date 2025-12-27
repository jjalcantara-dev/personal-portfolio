import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import DailyGame from "@/components/games/DailyGame";

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
      ? "Puzzles | Jesús Jiménez Alcántara" 
      : "Puzzles | Jesús Jiménez Alcántara",
    description: t.puzzles.description,
    keywords: [
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "puzzles",
      "logic puzzles",
      "Backend Engineer",
      "Ingeniero Backend",
    ],
    openGraph: {
      title: locale === "es" 
        ? "Puzzles | Jesús Jiménez Alcántara" 
        : "Puzzles | Jesús Jiménez Alcántara",
      description: t.puzzles.description,
      url: `${baseUrl}/${locale}/puzzles`,
    },
  };
}

export default async function Puzzles({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.puzzles.title}
          </h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={100}>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
            {t.puzzles.description}
          </p>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="border-t border-gray-200 pt-12 mb-16">
            <div className="max-w-2xl">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify mb-8">
                {t.puzzles.intro}
              </p>
              <p className="text-sm text-gray-600 italic mb-4">
                {locale === 'es' 
                  ? 'Los puzzles se actualizan automáticamente cada día a medianoche (00:00 UTC).'
                  : 'Puzzles update automatically every day at midnight (00:00 UTC).'}
              </p>
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={300}>
          <div className="border-t border-gray-200 pt-12">
            <div className="mb-6">
              <h2 className="text-xl sm:text-2xl font-light mb-2 text-black">
                {locale === 'es' ? 'Puzzle de Hoy' : "Today's Logic Game"}
              </h2>
            </div>
            <DailyGame locale={locale as Locale} />
          </div>
        </ScrollAnimation>
      </article>
    </div>
  );
}

