import Link from "next/link";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import ParallaxLogo from "@/components/ParallaxLogo";
import { clr, btnPrimary, btnOutline, btnGhost } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 pb-16 sm:px-6 sm:pb-0 sm:py-20 md:py-32">

      {/* Hero — full screen height on mobile */}
      <section
        className={`flex flex-col justify-center min-h-[calc(100svh-57px)] py-8 sm:min-h-0 sm:py-0 sm:mb-24`}
        aria-labelledby="main-heading"
      >
        <div className="text-center">

          {/* Logo */}
          <div className="mb-5 sm:mb-12 flex justify-center">
            <ParallaxLogo
              src="/logo_final.svg"
              alt=""
              width={150}
              height={150}
              priority
            />
          </div>

          {/* Name */}
          <ScrollAnimation animation="fade-up" delay={80}>
            <p className={`${tx.label} sm:text-sm ${clr.text.faint} mb-2 sm:mb-4 select-none`}>
              Jesús Jiménez Alcántara
            </p>
          </ScrollAnimation>

          {/* H1 */}
          <ScrollAnimation animation="fade-up" delay={150}>
            <h1
              id="main-heading"
              className={`${tx.h1Hero} mb-2 sm:mb-6 ${clr.text.primary}`}
            >
              {t.home.title}
              {/* Desktop: subtitle inside h1 */}
              <span className="hidden sm:inline">
                <br />
                <span className="font-normal">{t.home.subtitle}</span>
              </span>
            </h1>

            {/* Mobile: subtitle as separate lines */}
            <div className="sm:hidden flex flex-col gap-0.5 mb-3 mt-1">
              {t.home.subtitle.split(" · ").map((item) => (
                <span key={item} className={`${tx.subtitle} ${clr.text.faint}`}>
                  {item}
                </span>
              ))}
            </div>
          </ScrollAnimation>

          {/* Description */}
          <ScrollAnimation animation="fade-up" delay={200}>
            <p className={`text-sm sm:text-xl ${clr.text.muted} leading-relaxed max-w-2xl mx-auto mb-6 sm:mb-10`}>
              {t.home.description}
            </p>
          </ScrollAnimation>

          {/* CTAs */}
          <ScrollAnimation animation="fade-up" delay={300}>
            <div
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-center"
              role="group"
              aria-label="Call to action buttons"
            >
              <Link href={`/${locale}/about`} className={btnPrimary}>
                {t.home.cta.about}
              </Link>
              <Link href={`/${locale}/projects`} className={btnOutline}>
                {t.home.cta.projects}
              </Link>
              <a href={`/jesus_jimenez_alcantara_cv_${locale}.pdf`} target="_blank" rel="noopener noreferrer" className={btnGhost}>
                {t.home.cta.cv}
              </a>
            </div>
            {locale === "es" && (
              <p className={`mt-3 text-xs ${clr.text.faint} text-center`}>
                Prefer English?{" "}
                <Link href="/en" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
                  Switch to English
                </Link>{" "}
                to download the English CV.
              </p>
            )}
          </ScrollAnimation>
        </div>
      </section>

      {/* Focus section — starts below the fold on mobile */}
      <section className={`border-t ${clr.border.base} pt-10 sm:pt-16`} aria-labelledby="focus-heading">
        <ScrollAnimation animation="fade-up" delay={0}>
          <h2
            id="focus-heading"
            className={`text-xl sm:text-3xl font-light mb-8 sm:mb-12 ${clr.text.primary}`}
          >
            {t.home.focus.title}
          </h2>
        </ScrollAnimation>
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-12" role="list">
          {[
            { key: "architecture",    item: t.home.focus.architecture,    delay: 100 },
            { key: "cleanCode",       item: t.home.focus.cleanCode,       delay: 200 },
            { key: "performance",     item: t.home.focus.performance,     delay: 300 },
            { key: "professionalism", item: t.home.focus.professionalism, delay: 400 },
          ].map(({ key, item, delay }) => (
            <ScrollAnimation key={key} animation="fade-up" delay={delay}>
              <article
                role="listitem"
                className="group transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className={`text-base sm:text-lg font-medium mb-2 sm:mb-3 ${clr.text.primary} transition-colors duration-300 group-hover:text-gray-800`}>
                  {item.title}
                </h3>
                <p className={`text-sm sm:text-base ${clr.text.muted} leading-relaxed`}>
                  {item.description}
                </p>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </section>
    </div>
  );
}
