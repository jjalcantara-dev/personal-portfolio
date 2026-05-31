import Link from "next/link";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import ParallaxLogo from "@/components/ParallaxLogo";
import { clr, btnPrimary, btnOutline, btnGhost, focusRing } from "@/lib/constants/colors";
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
              className={`${tx.h1Hero} mb-5 sm:mb-6 ${clr.text.primary}`}
            >
              {t.home.title}
            </h1>

            {/* Tech stack pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4 sm:mb-8">
              {t.home.subtitle.split(" · ").map((item) => (
                <span
                  key={item}
                  className={`text-xs font-medium ${clr.text.subtle} border ${clr.border.base} px-3 py-1 select-none`}
                >
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
              <p className={`mt-4 text-xs ${clr.text.faint} text-center`}>
                Prefer English?{" "}
                <Link href="/en" className="underline underline-offset-2 hover:text-gray-600 transition-colors">
                  Switch to English
                </Link>{" "}
                to download the English CV.
              </p>
            )}

            {/* Social links */}
            <div className="flex items-center justify-center gap-6 mt-4">
              <a
                href="https://github.com/jjalcantara-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`${clr.text.faint} hover:text-black transition-colors duration-200 ${focusRing}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/jjalcantara"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${clr.text.faint} hover:text-black transition-colors duration-200 ${focusRing}`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Focus section — starts below the fold on mobile */}
      <section className={`border-t ${clr.border.base} pt-10 sm:pt-16 pb-10 sm:pb-0`} aria-labelledby="focus-heading">
        <ScrollAnimation animation="fade-up" delay={0}>
          <h2
            id="focus-heading"
            className={`text-xl sm:text-3xl font-light mb-10 sm:mb-14 ${clr.text.primary}`}
          >
            {t.home.focus.title}
          </h2>
        </ScrollAnimation>
        <div className="grid sm:grid-cols-2 gap-0" role="list">
          {[
            {
              key: "architecture", item: t.home.focus.architecture, delay: 100,
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
            },
            {
              key: "cleanCode", item: t.home.focus.cleanCode, delay: 200,
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" /></svg>,
            },
            {
              key: "performance", item: t.home.focus.performance, delay: 300,
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
            },
            {
              key: "professionalism", item: t.home.focus.professionalism, delay: 400,
              icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>,
            },
          ].map(({ key, item, delay, icon }) => (
            <ScrollAnimation key={key} animation="fade-up" delay={delay}>
              <article
                role="listitem"
                className={`group border-t ${clr.border.base} py-8 sm:py-10 sm:pr-12`}
              >
                <div className={`${clr.text.ghost} mb-4`}>
                  {icon}
                </div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${clr.text.faint} mb-3`}>
                  {item.title}
                </p>
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
