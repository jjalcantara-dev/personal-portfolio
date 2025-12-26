import Image from "next/image";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <div className="mb-12">
          <ScrollAnimation animation="fade-up" delay={0}>
            <div className="flex flex-col sm:flex-row items-start gap-8 mb-8">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src="/profile.png"
                    alt="Foto de perfil de Jesús Jiménez Alcantara"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-4 text-black">
                  {t.about.title}
                </h1>
                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                  {t.about.description}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className="border-t border-gray-200 pt-12 mb-16">
          <div className="space-y-6 max-w-2xl">
            <ScrollAnimation animation="fade-up" delay={0}>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                {t.about.intro.paragraph1}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={100}>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                {t.about.intro.paragraph2}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                {t.about.intro.paragraph3}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={300}>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
                {t.about.intro.paragraph4}
              </p>
            </ScrollAnimation>
          </div>
        </div>

        <div className="space-y-16">
          <section aria-labelledby="experience-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="experience-heading" className="text-2xl sm:text-3xl font-light mb-8 text-black">
                {t.about.experience.title}
              </h2>
            </ScrollAnimation>
            <div className="space-y-12" role="list">
              <ScrollAnimation animation="slide-left" delay={100}>
                <article className="border-l-2 border-gray-200 pl-6 group transition-all duration-300 hover:border-gray-400" role="listitem">
                  <div className="mb-3">
                    <h3 className="text-lg font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-800">
                      {t.about.experience.bubbleHub.role}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {t.about.experience.bubbleHub.company} • {t.about.experience.bubbleHub.location}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide" aria-label={`Período: ${t.about.experience.bubbleHub.period}`}>
                      {t.about.experience.bubbleHub.period}
                    </p>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {t.about.experience.bubbleHub.description}
                  </p>
                </article>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-left" delay={200}>
                <article className="border-l-2 border-gray-200 pl-6 group transition-all duration-300 hover:border-gray-400" role="listitem">
                  <div className="mb-3">
                    <h3 className="text-lg font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-800">
                      {t.about.experience.ey.role}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {t.about.experience.ey.company} • {t.about.experience.ey.location}
                    </p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide" aria-label={`Período: ${t.about.experience.ey.period}`}>
                      {t.about.experience.ey.period}
                    </p>
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    {t.about.experience.ey.description}
                  </p>
                </article>
              </ScrollAnimation>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-12" aria-labelledby="education-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="education-heading" className="text-2xl sm:text-3xl font-light mb-8 text-black">
                {t.about.education.title}
              </h2>
            </ScrollAnimation>
            <div className="space-y-8" role="list">
              <ScrollAnimation animation="fade-up" delay={100}>
                <article role="listitem" className="group transition-all duration-300 hover:translate-x-2">
                  <h3 className="text-lg font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-800">
                    {t.about.education.university.degree}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {t.about.education.university.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.about.education.university.grade} • {t.about.education.university.date}
                  </p>
                </article>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-up" delay={200}>
                <article role="listitem" className="group transition-all duration-300 hover:translate-x-2">
                  <h3 className="text-lg font-medium text-black mb-1 transition-colors duration-300 group-hover:text-gray-800">
                    {t.about.education.master.degree}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">
                    {t.about.education.master.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {t.about.education.master.grade} • {t.about.education.master.date}
                  </p>
                </article>
              </ScrollAnimation>
            </div>
          </section>

          <section className="border-t border-gray-200 pt-12" aria-labelledby="skills-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="skills-heading" className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.about.skills.title}
              </h2>
            </ScrollAnimation>
            <div className="space-y-4">
              <ScrollAnimation animation="fade-up" delay={100}>
                <p className="text-base text-gray-700">
                  <span className="font-medium text-black">{t.about.skills.advanced}</span>
                </p>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-up" delay={200}>
                <p className="text-base text-gray-700">
                  <span className="font-medium text-black">{t.about.skills.intermediate}</span>
                </p>
              </ScrollAnimation>
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}

