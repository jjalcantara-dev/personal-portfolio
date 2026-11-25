import type { Metadata } from "next";
import { Fragment, type ReactNode } from "react";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import { clr, focusRing } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";
import { CONTACT_EMAIL } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return pageMetadata({
    locale,
    path: "/privacy",
    title: t.privacy.title,
    description: locale === "es"
      ? "Política de privacidad de jjalcantara.dev: solo datos técnicos del alojamiento y una cookie de idioma. Sin formularios, analítica ni seguimiento."
      : "Privacy policy of jjalcantara.dev: only technical hosting data and a language cookie. No forms, analytics or tracking.",
  });
}

const linkClass = `underline underline-offset-2 hover:text-black ${focusRing}`;

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const LINKED = new RegExp(`(${escapeRe(CONTACT_EMAIL)}|www\\.aepd\\.es)`);

// Turns the contact email and www.aepd.es inside policy text into links.
function linkify(text: string): ReactNode {
  return text.split(LINKED).map((part, i) =>
    part === CONTACT_EMAIL ? (
      <a key={i} href={`mailto:${part}`} className={linkClass}>{part}</a>
    ) : part === "www.aepd.es" ? (
      <a key={i} href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className={linkClass}>{part}</a>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

type Section = {
  title: string;
  paragraphs: string[];
  table?: { label: string; value: string }[];
  after?: string[];
  links?: { label: string; href: string }[];
};

export default async function Privacy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale).privacy;
  const sections = t.sections as Section[];
  const body = `${tx.bodyLg} ${clr.text.body}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:py-20 md:py-32">
      <article className="max-w-3xl">
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className={`${tx.h1} mb-6 ${clr.text.primary}`}>{t.title}</h1>
          <p className={`text-base ${clr.text.subtle} mb-10`}>{t.lastUpdated}</p>
          <div className={`border-l-2 ${clr.border.strong} pl-4 py-3 ${clr.bg.soft} mb-12`}>
            <p className={`${tx.body} ${clr.text.primary}`}>{t.summary}</p>
          </div>
        </ScrollAnimation>

        <div className="space-y-12">
          {sections.map((s, i) => (
            <ScrollAnimation key={s.title} animation="fade-up">
              <section className={`border-t ${clr.border.base} pt-10`} aria-labelledby={`privacy-${i}`}>
                <h2 id={`privacy-${i}`} className={`${tx.h2} mb-6 ${clr.text.primary}`}>
                  {i + 1}. {s.title}
                </h2>
                <div className={`space-y-4 ${body}`}>
                  {s.paragraphs.map((p) => <p key={p}>{linkify(p)}</p>)}
                  {s.table && (
                    <dl className={`border ${clr.border.base} divide-y divide-gray-200 text-sm sm:text-base`}>
                      {s.table.map(({ label, value }) => (
                        <div key={label} className="flex">
                          <dt className={`w-32 sm:w-40 shrink-0 px-4 py-3 font-medium ${clr.text.primary} ${clr.bg.soft} border-r ${clr.border.base}`}>
                            {label}
                          </dt>
                          <dd className={`px-4 py-3 ${clr.text.body} leading-relaxed`}>{value}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {s.after?.map((p) => <p key={p}>{linkify(p)}</p>)}
                  {s.links && (
                    <ul className="list-disc pl-6 space-y-1">
                      {s.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{l.label}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </ScrollAnimation>
          ))}
        </div>
      </article>
    </div>
  );
}
