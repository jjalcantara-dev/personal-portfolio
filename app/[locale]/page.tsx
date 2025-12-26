import Link from "next/link";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import ParallaxLogo from "@/components/ParallaxLogo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <section className="mb-24" aria-labelledby="main-heading">
        <div className="text-center mb-16">
          <div className="mb-12 flex justify-center">
            <ParallaxLogo
              src="/logo_final.svg"
              alt=""
              width={200}
              height={200}
              priority
            />
          </div>
          <ScrollAnimation animation="fade-up" delay={100}>
            <h1 id="main-heading" className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-6 text-black">
              {t.home.title}
              <br />
              <span className="font-normal">{t.home.subtitle}</span>
            </h1>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={200}>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto mb-10">
              {t.home.description}
            </p>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center" role="group" aria-label="Call to action buttons">
              <Link
                href={`/${locale}/projects`}
                className="inline-block px-8 py-3.5 border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                {t.home.cta.projects}
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="inline-block px-8 py-3.5 bg-black text-white text-sm font-medium hover:bg-gray-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                {t.home.cta.contact}
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <section className="border-t border-gray-200 pt-16" aria-labelledby="focus-heading">
        <ScrollAnimation animation="fade-up" delay={0}>
          <h2 id="focus-heading" className="text-2xl sm:text-3xl font-light mb-12 text-black">{t.home.focus.title}</h2>
        </ScrollAnimation>
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-12" role="list">
          <ScrollAnimation animation="fade-up" delay={100}>
            <article 
              role="listitem"
              className="group transition-all duration-300 hover:translate-y-[-2px]"
            >
              <h3 className="text-lg font-medium mb-3 text-black transition-colors duration-300 group-hover:text-gray-800">
                {t.home.focus.architecture.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.home.focus.architecture.description}
              </p>
            </article>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={200}>
            <article 
              role="listitem"
              className="group transition-all duration-300 hover:translate-y-[-2px]"
            >
              <h3 className="text-lg font-medium mb-3 text-black transition-colors duration-300 group-hover:text-gray-800">
                {t.home.focus.cleanCode.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.home.focus.cleanCode.description}
              </p>
            </article>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={300}>
            <article 
              role="listitem"
              className="group transition-all duration-300 hover:translate-y-[-2px]"
            >
              <h3 className="text-lg font-medium mb-3 text-black transition-colors duration-300 group-hover:text-gray-800">
                {t.home.focus.performance.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.home.focus.performance.description}
              </p>
            </article>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={400}>
            <article 
              role="listitem"
              className="group transition-all duration-300 hover:translate-y-[-2px]"
            >
              <h3 className="text-lg font-medium mb-3 text-black transition-colors duration-300 group-hover:text-gray-800">
                {t.home.focus.professionalism.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.home.focus.professionalism.description}
              </p>
            </article>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  );
}

