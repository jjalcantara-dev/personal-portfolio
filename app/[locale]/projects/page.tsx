import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";

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
      ? "Proyectos | Jesús Jiménez Alcántara" 
      : "Projects | Jesús Jiménez Alcántara",
    description: t.projects.description,
    keywords: [
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "projects",
      "proyectos",
      "Backend Engineer",
      "Ingeniero Backend",
      "Azure",
      ".NET",
      "portfolio",
    ],
    openGraph: {
      title: locale === "es" 
        ? "Proyectos | Jesús Jiménez Alcántara" 
        : "Projects | Jesús Jiménez Alcántara",
      description: t.projects.description,
      url: `${baseUrl}/${locale}/projects`,
    },
  };
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
        <section className="border-t border-gray-200 pt-12" aria-labelledby="current-projects-heading">
          <ScrollAnimation animation="fade-up" delay={200}>
            <h2 id="current-projects-heading" className="text-2xl sm:text-3xl font-light tracking-tight mb-12 text-black">
              {t.projects.current.title}
            </h2>
          </ScrollAnimation>

          <div className="space-y-16">
            {/* Prodigy Padel Academy */}
            <ScrollAnimation animation="fade-up" delay={300}>
              <article className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center sm:justify-start w-full sm:w-auto">
                    <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 flex items-center justify-center" style={{ minWidth: '140px', minHeight: '100px' }}>
                      <Image
                        src="/logo_padel.svg"
                        alt={`${t.projects.current.prodigy.name} logo`}
                        width={138}
                        height={56}
                        className="w-auto h-8 sm:h-10 object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-medium text-black mb-3">
                      {t.projects.current.prodigy.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.prodigy.type}
                      </span>
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.prodigy.role}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      {t.projects.current.prodigy.description}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollAnimation>

            {/* Koru Acne */}
            <ScrollAnimation animation="fade-up" delay={400}>
              <article className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center sm:justify-start w-full sm:w-auto">
                    <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 flex items-center justify-center" style={{ minWidth: '140px', minHeight: '100px' }}>
                      <Image
                        src="/logo-koru.svg"
                        alt={`${t.projects.current.koru.name} logo`}
                        width={132}
                        height={148}
                        className="w-auto h-16 sm:h-20 object-contain"
                        priority
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-medium text-black mb-3">
                      {t.projects.current.koru.name}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.koru.type}
                      </span>
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.koru.role}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                      {t.projects.current.koru.description}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollAnimation>
          </div>
        </section>
      </article>
    </div>
  );
}

