import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.privacy.title}
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-2xl mb-12">
            {t.privacy.lastUpdated}
          </p>
        </ScrollAnimation>

        <div className="space-y-12">
          <ScrollAnimation animation="fade-up" delay={200}>
            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.dataController.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.dataController.content.name}</p>
                <p>{t.privacy.sections.dataController.content.email}</p>
                <p>{t.privacy.sections.dataController.content.location}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={300}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.dataCollection.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.dataCollection.content.paragraph1}</p>
                <p>{t.privacy.sections.dataCollection.content.paragraph2}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.privacy.sections.dataCollection.content.list.name}</li>
                  <li>{t.privacy.sections.dataCollection.content.list.email}</li>
                  <li>{t.privacy.sections.dataCollection.content.list.message}</li>
                </ul>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={400}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.purpose.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.purpose.content.paragraph1}</p>
                <p>{t.privacy.sections.purpose.content.paragraph2}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={500}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.legalBasis.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.legalBasis.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={600}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.dataProcessing.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.dataProcessing.content.paragraph1}</p>
                <p>
                  {t.privacy.sections.dataProcessing.content.paragraph2}{" "}
                  <a
                    href="https://formspree.io/legal/privacy-policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                  >
                    {t.privacy.sections.dataProcessing.content.link}
                  </a>
                </p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={700}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.dataRetention.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.dataRetention.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={800}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.yourRights.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.yourRights.content.intro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{t.privacy.sections.yourRights.content.rights.access}</li>
                  <li>{t.privacy.sections.yourRights.content.rights.rectification}</li>
                  <li>{t.privacy.sections.yourRights.content.rights.erasure}</li>
                  <li>{t.privacy.sections.yourRights.content.rights.objection}</li>
                  <li>{t.privacy.sections.yourRights.content.rights.portability}</li>
                </ul>
                <p>{t.privacy.sections.yourRights.content.contact}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={900}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.cookies.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.cookies.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={1000}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.changes.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.changes.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-up" delay={1100}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {t.privacy.sections.contact.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{t.privacy.sections.contact.content}</p>
                <p>
                  <strong>{t.privacy.sections.contact.emailLabel}:</strong>{" "}
                  <a
                    href="mailto:contact@jjalcantara.dev"
                    className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                  >
                    contact@jjalcantara.dev
                  </a>
                </p>
              </div>
            </section>
          </ScrollAnimation>
        </div>
      </article>
    </div>
  );
}

