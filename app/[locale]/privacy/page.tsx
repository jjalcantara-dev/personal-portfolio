import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-black pl-4 py-2 bg-gray-50">
      <p className="text-sm font-medium text-black">{children}</p>
    </div>
  );
}

function CookieTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="border border-gray-200 divide-y divide-gray-200 text-sm sm:text-base">
      {rows.map(({ label, value }) => (
        <div key={label} className="flex">
          <dt className="w-28 sm:w-36 shrink-0 px-4 py-3 font-medium text-black bg-gray-50 border-r border-gray-200">
            {label}
          </dt>
          <dd className="px-4 py-3 text-gray-700 leading-relaxed">{value}</dd>
        </div>
      ))}
    </div>
  );
}

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);
  const s = t.privacy.sections;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.privacy.title}
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <p className="text-base text-gray-500 mb-12">
            {t.privacy.lastUpdated}
          </p>
        </ScrollAnimation>

        <div className="space-y-12">

          {/* 1. Data Controller */}
          <ScrollAnimation animation="fade-up" delay={200}>
            <section>
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.dataController.title}
              </h2>
              <div className="space-y-1 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.dataController.content.name}</p>
                <p>
                  <a
                    href="mailto:contact@jjalcantara.dev"
                    className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                  >
                    {s.dataController.content.email}
                  </a>
                </p>
                <p>{s.dataController.content.location}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 2. Data Collection */}
          <ScrollAnimation animation="fade-up" delay={300}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.dataCollection.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.dataCollection.content.paragraph1}</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>{s.dataCollection.content.list.name}</li>
                  <li>{s.dataCollection.content.list.email}</li>
                  <li>{s.dataCollection.content.list.message}</li>
                </ul>
                <Callout>{s.dataCollection.content.important}</Callout>
                <p>{s.dataCollection.content.paragraph2}</p>
                {s.dataCollection.content.paragraph3 && (
                  <p>{s.dataCollection.content.paragraph3}</p>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 3. Purpose */}
          <ScrollAnimation animation="fade-up" delay={400}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.purpose.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.purpose.content.paragraph1}</p>
                <p>{s.purpose.content.paragraph2}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 4. Legal Basis */}
          <ScrollAnimation animation="fade-up" delay={500}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.legalBasis.title}
              </h2>
              <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.legalBasis.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 5. Data Processing */}
          <ScrollAnimation animation="fade-up" delay={600}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.dataProcessing.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.dataProcessing.content.paragraph1}</p>
                <Callout>{s.dataProcessing.content.important}</Callout>
                {s.dataProcessing.content.paragraph2 && (
                  <p>{s.dataProcessing.content.paragraph2}</p>
                )}
                {s.dataProcessing.content.paragraph3 && (
                  <>
                    <p>{s.dataProcessing.content.paragraph3}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <a
                          href={s.dataProcessing.content.formspreeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                        >
                          {s.dataProcessing.content.formspreeText}
                        </a>
                      </li>
                      <li>
                        <a
                          href={s.dataProcessing.content.vercelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                        >
                          {s.dataProcessing.content.vercelText}
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 6. Data Retention */}
          <ScrollAnimation animation="fade-up" delay={700}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.dataRetention.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                {typeof s.dataRetention.content === "string" ? (
                  <p>{s.dataRetention.content}</p>
                ) : (
                  <>
                    <p>{s.dataRetention.content.paragraph1}</p>
                    <p>{s.dataRetention.content.paragraph2}</p>
                    <p>{s.dataRetention.content.paragraph3}</p>
                  </>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 7. Your Rights */}
          <ScrollAnimation animation="fade-up" delay={800}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.yourRights.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                <p>{s.yourRights.content.intro}</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>{s.yourRights.content.rights.access}</li>
                  <li>{s.yourRights.content.rights.rectification}</li>
                  <li>{s.yourRights.content.rights.erasure}</li>
                  <li>{s.yourRights.content.rights.objection}</li>
                  <li>{s.yourRights.content.rights.portability}</li>
                  {s.yourRights.content.rights.restriction && (
                    <li>{s.yourRights.content.rights.restriction}</li>
                  )}
                  {s.yourRights.content.rights.withdraw && (
                    <li>{s.yourRights.content.rights.withdraw}</li>
                  )}
                  {s.yourRights.content.rights.automated && (
                    <li>{s.yourRights.content.rights.automated}</li>
                  )}
                </ul>
                <p>{s.yourRights.content.contact}</p>
                {s.yourRights.content.responseTime && (
                  <p>{s.yourRights.content.responseTime}</p>
                )}
                {s.yourRights.content.complaint && (
                  <p>{s.yourRights.content.complaint}</p>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 8. Cookies */}
          <ScrollAnimation animation="fade-up" delay={900}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.cookies.title}
              </h2>
              {typeof s.cookies.content === "string" ? (
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{s.cookies.content}</p>
              ) : (
                <div className="space-y-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>{s.cookies.content.paragraph1}</p>

                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-black">
                      {s.cookies.content.cookieLabel}
                    </h3>
                    <CookieTable
                      rows={[
                        { label: s.cookies.content.cookieNameLabel, value: s.cookies.content.cookieName },
                        { label: s.cookies.content.cookiePurposeLabel, value: s.cookies.content.cookiePurpose },
                        { label: s.cookies.content.cookieDurationLabel, value: s.cookies.content.cookieDuration },
                        { label: s.cookies.content.cookieTypeLabel, value: s.cookies.content.cookieType },
                      ]}
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-base font-medium text-black">
                      {s.cookies.content.localStorageLabel}
                    </h3>
                    <p>{s.cookies.content.localStoragePurpose}</p>
                  </div>

                  <Callout>{s.cookies.content.noTracking}</Callout>

                  {s.cookies.content.paragraph6 && (
                    <p>{s.cookies.content.paragraph6}</p>
                  )}
                </div>
              )}
            </section>
          </ScrollAnimation>

          {/* 9. Data Security */}
          {s.dataSecurity && (
            <ScrollAnimation animation="fade-up" delay={1000}>
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                  {s.dataSecurity.title}
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>{s.dataSecurity.content.paragraph1}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{s.dataSecurity.content.measures.encryption}</li>
                    <li>{s.dataSecurity.content.measures.headers}</li>
                    <li>{s.dataSecurity.content.measures.validation}</li>
                    <li>{s.dataSecurity.content.measures.rateLimit}</li>
                    <li>{s.dataSecurity.content.measures.access}</li>
                  </ul>
                  <p>{s.dataSecurity.content.paragraph2}</p>
                </div>
              </section>
            </ScrollAnimation>
          )}

          {/* 10. International Transfers */}
          {s.internationalTransfers && (
            <ScrollAnimation animation="fade-up" delay={1100}>
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                  {s.internationalTransfers.title}
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>{s.internationalTransfers.content.paragraph1}</p>
                  <p>{s.internationalTransfers.content.paragraph2}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{s.internationalTransfers.content.guarantees.clauses}</li>
                    <li>{s.internationalTransfers.content.guarantees.certification}</li>
                    <li>{s.internationalTransfers.content.guarantees.adequacy}</li>
                  </ul>
                  <p>{s.internationalTransfers.content.paragraph3}</p>
                </div>
              </section>
            </ScrollAnimation>
          )}

          {/* 11. Minors */}
          {s.minors && (
            <ScrollAnimation animation="fade-up" delay={1200}>
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                  {s.minors.title}
                </h2>
                <div className="text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>{s.minors.content}</p>
                </div>
              </section>
            </ScrollAnimation>
          )}

          {/* 12. CCPA */}
          {s.ccpa && (
            <ScrollAnimation animation="fade-up" delay={1300}>
              <section className="border-t border-gray-200 pt-12">
                <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                  {s.ccpa.title}
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                  <p>{s.ccpa.content.paragraph1}</p>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>{s.ccpa.content.rights.know}</li>
                    <li>{s.ccpa.content.rights.delete}</li>
                    <li>{s.ccpa.content.rights.optOut}</li>
                    <li>{s.ccpa.content.rights.nonDiscrimination}</li>
                  </ul>
                  <p>{s.ccpa.content.paragraph2}</p>
                </div>
              </section>
            </ScrollAnimation>
          )}

          {/* 13. Changes */}
          <ScrollAnimation animation="fade-up" delay={1400}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.changes.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                {typeof s.changes.content === "string" ? (
                  <p>{s.changes.content}</p>
                ) : (
                  <>
                    <p>{s.changes.content.paragraph1}</p>
                    <p>{s.changes.content.paragraph2}</p>
                    <p>{s.changes.content.paragraph3}</p>
                  </>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 14. Contact */}
          <ScrollAnimation animation="fade-up" delay={1500}>
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl sm:text-3xl font-light mb-6 text-black">
                {s.contact.title}
              </h2>
              <div className="space-y-4 text-base sm:text-lg text-gray-700 leading-relaxed">
                {typeof s.contact.content === "string" ? (
                  <>
                    <p>{s.contact.content}</p>
                    <p>
                      <a
                        href="mailto:contact@jjalcantara.dev"
                        className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                      >
                        contact@jjalcantara.dev
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <p>{s.contact.content.paragraph1}</p>
                    <p>
                      <span className="font-medium text-black">
                        {(s.contact.content as { emailLabel?: string }).emailLabel ?? "Email"}:{" "}
                      </span>
                      <a
                        href="mailto:contact@jjalcantara.dev"
                        className="underline hover:text-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm"
                      >
                        contact@jjalcantara.dev
                      </a>
                    </p>
                    {"paragraph2" in s.contact.content && (
                      <p>{(s.contact.content as { paragraph2?: string }).paragraph2}</p>
                    )}
                  </>
                )}
              </div>
            </section>
          </ScrollAnimation>

        </div>
      </article>
    </div>
  );
}
