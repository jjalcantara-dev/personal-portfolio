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
              <article className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0 group/card">
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
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      {t.projects.current.prodigy.description}
                    </p>
                    {t.projects.current.prodigy.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.projects.current.prodigy.techStack.map((tech) => (
                          <span key={tech} className="tag text-xs px-2.5 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {t.projects.current.prodigy.appStore && t.projects.current.prodigy.googlePlay && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        <a
                          href={t.projects.current.prodigy.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                          aria-label={locale === 'es' ? 'Descargar en App Store' : 'Download on App Store'}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                          </svg>
                          <span className="text-sm font-medium text-black">
                            {locale === 'es' ? 'App Store' : 'App Store'}
                          </span>
                        </a>
                        <a
                          href={t.projects.current.prodigy.googlePlay}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                          aria-label={locale === 'es' ? 'Descargar en Google Play' : 'Download on Google Play'}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                          <span className="text-sm font-medium text-black">
                            {locale === 'es' ? 'Google Play' : 'Google Play'}
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollAnimation>

            {/* Koru Acne */}
            <ScrollAnimation animation="fade-up" delay={400}>
              <article className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0 group/card">
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
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      {t.projects.current.koru.description}
                    </p>
                    {t.projects.current.koru.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.projects.current.koru.techStack.map((tech) => (
                          <span key={tech} className="tag text-xs px-2.5 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {t.projects.current.koru.appStore && t.projects.current.koru.googlePlay && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        <a
                          href={t.projects.current.koru.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                          aria-label={locale === 'es' ? 'Descargar en App Store' : 'Download on App Store'}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                          </svg>
                          <span className="text-sm font-medium text-black">
                            {locale === 'es' ? 'App Store' : 'App Store'}
                          </span>
                        </a>
                        <a
                          href={t.projects.current.koru.googlePlay}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                          aria-label={locale === 'es' ? 'Descargar en Google Play' : 'Download on Google Play'}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                          </svg>
                          <span className="text-sm font-medium text-black">
                            {locale === 'es' ? 'Google Play' : 'Google Play'}
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            </ScrollAnimation>
            {/* DailyDermaTalks */}
            <ScrollAnimation animation="fade-up" delay={500}>
              <article className="border-b border-gray-200 pb-16 last:border-b-0 last:pb-0 group/card">
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-6">
                  <div className="flex-shrink-0 flex items-center justify-center sm:justify-start w-full sm:w-auto">
                    <div className="bg-white border border-gray-200 rounded-sm p-4 sm:p-6 flex items-center justify-center" style={{ minWidth: '140px', minHeight: '100px' }}>
                      <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <h3 className="text-xl sm:text-2xl font-medium text-black">
                        {t.projects.current.dailydermatalks.name}
                      </h3>
                      <span className="inline-flex items-center text-xs px-2.5 py-1 bg-gray-100 text-gray-600 rounded-sm font-medium">
                        {t.projects.current.dailydermatalks.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.dailydermatalks.type}
                      </span>
                      <span className="inline-flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {t.projects.current.dailydermatalks.role}
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4">
                      {t.projects.current.dailydermatalks.description}
                    </p>
                    {t.projects.current.dailydermatalks.techStack && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {t.projects.current.dailydermatalks.techStack.map((tech) => (
                          <span key={tech} className="tag text-xs px-2.5 py-1">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {t.projects.current.dailydermatalks.url && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        <a
                          href={t.projects.current.dailydermatalks.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 border-2 border-gray-300 hover:border-black hover:-translate-y-px hover:shadow-md transition-all duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                          aria-label={t.projects.current.dailydermatalks.visitLabel}
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                          <span className="text-sm font-medium text-black">
                            {t.projects.current.dailydermatalks.visitLabel}
                          </span>
                        </a>
                      </div>
                    )}
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

