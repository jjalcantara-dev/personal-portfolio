import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import { clr, focusRing } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`border-l-2 ${clr.border.strong} pl-4 py-2 ${clr.bg.soft}`}>
      <p className={`text-sm font-medium ${clr.text.primary}`}>{children}</p>
    </div>
  );
}

function CookieTable({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className={`border ${clr.border.base} divide-y divide-gray-200 text-sm sm:text-base`}>
      {rows.map(({ label, value }) => (
        <div key={label} className="flex">
          <dt className={`w-28 sm:w-36 shrink-0 px-4 py-3 font-medium ${clr.text.primary} ${clr.bg.soft} border-r ${clr.border.base}`}>
            {label}
          </dt>
          <dd className={`px-4 py-3 ${clr.text.body} leading-relaxed`}>{value}</dd>
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

  const sectionClass = `border-t ${clr.border.base} pt-12`;
  const bodyClass = `${tx.bodyLg} ${clr.text.body}`;
  const h2Class = `${tx.h2} mb-6 ${clr.text.primary}`;
  const linkClass = `underline hover:text-black ${focusRing}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className={`${tx.h1} mb-6 ${clr.text.primary}`}>
            {t.privacy.title}
          </h1>
        </ScrollAnimation>

        <ScrollAnimation animation="fade-up" delay={100}>
          <p className={`text-base ${clr.text.subtle} mb-12`}>
            {t.privacy.lastUpdated}
          </p>
        </ScrollAnimation>

        <div className="space-y-12">

          {/* 1. Data Controller */}
          <ScrollAnimation animation="fade-up" delay={200}>
            <section>
              <h2 className={h2Class}>{s.dataController.title}</h2>
              <div className={`space-y-1 ${bodyClass}`}>
                <p>{s.dataController.content.name}</p>
                <p>
                  <a href="mailto:jjalcantara.dev@gmail.com" className={linkClass}>
                    {s.dataController.content.email}
                  </a>
                </p>
                <p>{s.dataController.content.location}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 2. Data Collection */}
          <ScrollAnimation animation="fade-up" delay={300}>
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.dataCollection.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
                <p>{s.dataCollection.content.paragraph1}</p>
                {s.dataCollection.content.paragraph3 && (
                  <p>{s.dataCollection.content.paragraph3}</p>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 3. Purpose */}
          <ScrollAnimation animation="fade-up" delay={400}>
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.purpose.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
                <p>{s.purpose.content.paragraph1}</p>
                <p>{s.purpose.content.paragraph2}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 4. Legal Basis */}
          <ScrollAnimation animation="fade-up" delay={500}>
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.legalBasis.title}</h2>
              <div className={bodyClass}>
                <p>{s.legalBasis.content}</p>
              </div>
            </section>
          </ScrollAnimation>

          {/* 5. Data Processing */}
          <ScrollAnimation animation="fade-up" delay={600}>
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.dataProcessing.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
                <p>{s.dataProcessing.content.paragraph1}</p>
                {s.dataProcessing.content.paragraph2 && (
                  <p>{s.dataProcessing.content.paragraph2}</p>
                )}
                {s.dataProcessing.content.paragraph3 && (
                  <>
                    <p>{s.dataProcessing.content.paragraph3}</p>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      <li>
                        <a href={s.dataProcessing.content.vercelLink} target="_blank" rel="noopener noreferrer" className={linkClass}>
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
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.dataRetention.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
                {typeof s.dataRetention.content === "string" ? (
                  <p>{s.dataRetention.content}</p>
                ) : (
                  <>
                    <p>{s.dataRetention.content.paragraph1}</p>
                    {s.dataRetention.content.paragraph2 && (
                      <p>{s.dataRetention.content.paragraph2}</p>
                    )}
                  </>
                )}
              </div>
            </section>
          </ScrollAnimation>

          {/* 7. Your Rights */}
          <ScrollAnimation animation="fade-up" delay={800}>
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.yourRights.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
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
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.cookies.title}</h2>
              {typeof s.cookies.content === "string" ? (
                <p className={bodyClass}>{s.cookies.content}</p>
              ) : (
                <div className={`space-y-6 ${bodyClass}`}>
                  <p>{s.cookies.content.paragraph1}</p>

                  <div className="space-y-3">
                    <h3 className={`text-base font-medium ${clr.text.primary}`}>
                      {s.cookies.content.cookie2Label}
                    </h3>
                    <CookieTable
                      rows={[
                        { label: s.cookies.content.cookieNameLabel,     value: s.cookies.content.cookie2Name },
                        { label: s.cookies.content.cookiePurposeLabel,  value: s.cookies.content.cookie2Purpose },
                        { label: s.cookies.content.cookieDurationLabel, value: s.cookies.content.cookie2Duration },
                        { label: s.cookies.content.cookieTypeLabel,     value: s.cookies.content.cookie2Type },
                      ]}
                    />
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
              <section className={sectionClass}>
                <h2 className={h2Class}>{s.dataSecurity.title}</h2>
                <div className={`space-y-4 ${bodyClass}`}>
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
              <section className={sectionClass}>
                <h2 className={h2Class}>{s.internationalTransfers.title}</h2>
                <div className={`space-y-4 ${bodyClass}`}>
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
              <section className={sectionClass}>
                <h2 className={h2Class}>{s.minors.title}</h2>
                <div className={bodyClass}>
                  <p>{s.minors.content}</p>
                </div>
              </section>
            </ScrollAnimation>
          )}

          {/* 12. CCPA */}
          {s.ccpa && (
            <ScrollAnimation animation="fade-up" delay={1300}>
              <section className={sectionClass}>
                <h2 className={h2Class}>{s.ccpa.title}</h2>
                <div className={`space-y-4 ${bodyClass}`}>
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
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.changes.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
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
            <section className={sectionClass}>
              <h2 className={h2Class}>{s.contact.title}</h2>
              <div className={`space-y-4 ${bodyClass}`}>
                {typeof s.contact.content === "string" ? (
                  <>
                    <p>{s.contact.content}</p>
                    <p>
                      <a href="mailto:jjalcantara.dev@gmail.com" className={linkClass}>
                        jjalcantara.dev@gmail.com
                      </a>
                    </p>
                  </>
                ) : (
                  <>
                    <p>{s.contact.content.paragraph1}</p>
                    <p>
                      <span className={`font-medium ${clr.text.primary}`}>
                        {(s.contact.content as { emailLabel?: string }).emailLabel ?? "Email"}:{" "}
                      </span>
                      <a href="mailto:jjalcantara.dev@gmail.com" className={linkClass}>
                        jjalcantara.dev@gmail.com
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
