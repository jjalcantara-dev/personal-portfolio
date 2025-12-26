import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.projects.title}
          </h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={100}>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
            {t.projects.description}
          </p>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={200}>
          <div className="border-t border-gray-200 pt-12">
            <p className="text-base sm:text-lg text-gray-600 italic" role="status" aria-live="polite">
              {t.projects.comingSoon}
            </p>
          </div>
        </ScrollAnimation>
      </article>
    </div>
  );
}

