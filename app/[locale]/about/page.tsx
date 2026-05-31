import type { Metadata } from "next";
import Image from "next/image";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import { clr, skillTag } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

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
      ? "Sobre mí | Jesús Jiménez Alcántara — Ingeniero Backend"
      : "About | Jesús Jiménez Alcántara — Backend Engineer",
    description: t.about.description,
    keywords: [
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "Backend Engineer",
      "Ingeniero Backend",
      "ASP.NET Core",
      "Azure Functions",
      "Azure",
      ".NET",
      "C#",
      "PostgreSQL",
      "Redis",
      "JWT",
      "OAuth 2.0",
      "RBAC",
      "Stripe",
      "REST API",
      "CI/CD",
      "SOLID",
      "Clean Architecture",
      "The Bubble Hub",
      "Ernst Young",
      "EY",
      "Universidad de Málaga",
      "UMA",
      "UNIR",
      "Málaga",
      "Vélez-Málaga",
    ],
    openGraph: {
      type: "profile",
      title: locale === "es"
        ? "Sobre mí | Jesús Jiménez Alcántara — Ingeniero Backend"
        : "About | Jesús Jiménez Alcántara — Backend Engineer",
      description: t.about.description,
      url: `${baseUrl}/${locale}/about`,
    },
  };
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
                <div className={`relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-2 ${clr.border.base}`}>
                  <Image
                    src="/profile.png"
                    alt="Foto de perfil de Jesús Jiménez Alcántara"
                    width={160}
                    height={160}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${clr.text.subtle} tracking-widest uppercase mb-3 select-none`}>
                  Jesús Jiménez Alcántara
                </p>
                <h1 className={`${tx.h1} mb-4 ${clr.text.primary}`}>
                  {t.about.title}
                </h1>
                <p className={`${tx.bodyXl} ${clr.text.body}`}>
                  {t.about.description}
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>

        <div className={`border-t ${clr.border.base} pt-12 mb-16`}>
          <div className="space-y-6 max-w-2xl">
            <ScrollAnimation animation="fade-up" delay={0}>
              <p className={`${tx.bodyLg} ${clr.text.body} text-justify`}>
                {t.about.intro.paragraph1}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={100}>
              <p className={`${tx.bodyLg} ${clr.text.body} text-justify`}>
                {t.about.intro.paragraph2}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <p className={`${tx.bodyLg} ${clr.text.body} text-justify`}>
                {t.about.intro.paragraph3}
              </p>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={300}>
              <p className={`${tx.bodyLg} ${clr.text.body} text-justify`}>
                {t.about.intro.paragraph4}
              </p>
            </ScrollAnimation>
          </div>
        </div>

        <div className="space-y-16">
          <section aria-labelledby="experience-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="experience-heading" className={`${tx.h2} mb-8 ${clr.text.primary}`}>
                {t.about.experience.title}
              </h2>
            </ScrollAnimation>
            <div className="space-y-12" role="list">
              <ScrollAnimation animation="slide-left" delay={100}>
                <article className={`border-l-2 ${clr.border.base} pl-6 group transition-all duration-300 hover:border-black`} role="listitem">
                  <div className="mb-3">
                    <h3 className={`${tx.h3sm} ${clr.text.primary} mb-1`}>
                      {t.about.experience.bubbleHub.role}
                    </h3>
                    <p className={`text-sm ${clr.text.muted} mb-2`}>
                      {t.about.experience.bubbleHub.company} • {t.about.experience.bubbleHub.location}
                    </p>
                    <p className={`text-xs ${clr.text.subtle} uppercase tracking-wide`} aria-label={`Período: ${t.about.experience.bubbleHub.period}`}>
                      {t.about.experience.bubbleHub.period}
                    </p>
                  </div>
                  <p className={`text-base ${clr.text.body} leading-relaxed`}>
                    {t.about.experience.bubbleHub.description}
                  </p>
                </article>
              </ScrollAnimation>

              <ScrollAnimation animation="slide-left" delay={200}>
                <article className={`border-l-2 ${clr.border.base} pl-6 group transition-all duration-300 hover:border-black`} role="listitem">
                  <div className="mb-3">
                    <h3 className={`${tx.h3sm} ${clr.text.primary} mb-1`}>
                      {t.about.experience.ey.role}
                    </h3>
                    <p className={`text-sm ${clr.text.muted} mb-2`}>
                      {t.about.experience.ey.company} • {t.about.experience.ey.location}
                    </p>
                    <p className={`text-xs ${clr.text.subtle} uppercase tracking-wide`} aria-label={`Período: ${t.about.experience.ey.period}`}>
                      {t.about.experience.ey.period}
                    </p>
                  </div>
                  <p className={`text-base ${clr.text.body} leading-relaxed`}>
                    {t.about.experience.ey.description}
                  </p>
                </article>
              </ScrollAnimation>
            </div>
          </section>

          <section className={`border-t ${clr.border.base} pt-12`} aria-labelledby="education-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="education-heading" className={`${tx.h2} mb-8 ${clr.text.primary}`}>
                {t.about.education.title}
              </h2>
            </ScrollAnimation>
            <div className="space-y-8" role="list">
              <ScrollAnimation animation="fade-up" delay={100}>
                <article role="listitem" className="group transition-all duration-300 hover:translate-x-1">
                  <h3 className={`${tx.h3sm} ${clr.text.primary} mb-1 transition-colors duration-300 group-hover:text-gray-800`}>
                    {t.about.education.university.degree}
                  </h3>
                  <p className={`text-sm ${clr.text.muted} mb-1`}>
                    {t.about.education.university.name}
                  </p>
                  <p className={`text-xs ${clr.text.subtle}`}>
                    {t.about.education.university.grade} • {t.about.education.university.date}
                  </p>
                </article>
              </ScrollAnimation>
              <ScrollAnimation animation="fade-up" delay={200}>
                <article role="listitem" className="group transition-all duration-300 hover:translate-x-1">
                  <h3 className={`${tx.h3sm} ${clr.text.primary} mb-1 transition-colors duration-300 group-hover:text-gray-800`}>
                    {t.about.education.master.degree}
                  </h3>
                  <p className={`text-sm ${clr.text.muted} mb-1`}>
                    {t.about.education.master.name}
                  </p>
                  <p className={`text-xs ${clr.text.subtle}`}>
                    {t.about.education.master.grade} • {t.about.education.master.date}
                  </p>
                </article>
              </ScrollAnimation>
            </div>
          </section>

          <section className={`border-t ${clr.border.base} pt-12`} aria-labelledby="skills-heading">
            <ScrollAnimation animation="fade-up" delay={0}>
              <h2 id="skills-heading" className={`${tx.h2} mb-10 ${clr.text.primary}`}>
                {t.about.skills.title}
              </h2>
            </ScrollAnimation>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              {t.about.skills.categories.map((category, i) => {
                const isRight = i % 2 === 1;
                const row = Math.floor(i / 2);
                return (
                  <ScrollAnimation
                    key={category.name}
                    animation="fade-up"
                    delay={row * 90 + (isRight ? 50 : 0)}
                  >
                    <div
                      className={[
                        `py-8 border-t ${clr.border.soft}`,
                        isRight
                          ? `sm:pl-10 sm:border-l ${clr.border.soft}`
                          : "sm:pr-10",
                      ].join(" ")}
                    >
                      <p className={`${tx.captionLabel} ${clr.text.faint} mb-4 select-none`}>
                        {category.name}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((item) => (
                          <span key={item} className={skillTag}>
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </ScrollAnimation>
                );
              })}
            </div>
          </section>
        </div>
      </article>
    </div>
  );
}
