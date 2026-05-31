import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import { clr } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const baseUrl = "https://jjalcantara.dev";

  return {
    title: locale === "es"
      ? "Contacto | Jesús Jiménez Alcántara"
      : "Contact | Jesús Jiménez Alcántara",
    description: locale === "es"
      ? "Página de contacto de Jesús Jiménez Alcántara, Backend Engineer"
      : "Contact page for Jesús Jiménez Alcántara, Backend Engineer",
    keywords: [
      "Jesús Jiménez Alcántara", "Jesus Jimenez Alcantara",
      "contact", "contacto", "Backend Engineer", "Ingeniero Backend",
      "Málaga", "jjalcantara.dev@gmail.com",
    ],
    openGraph: {
      title: locale === "es" ? "Contacto | Jesús Jiménez Alcántara" : "Contact | Jesús Jiménez Alcántara",
      description: locale === "es" ? "Página de contacto de Jesús Jiménez Alcántara, Backend Engineer" : "Contact page for Jesús Jiménez Alcántara, Backend Engineer",
      url: `${baseUrl}/${locale}/contact`,
    },
  };
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`shrink-0 ${clr.text.ghost} group-hover:text-gray-400 transition-colors duration-150`}>
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="shrink-0 w-11 h-11 rounded-xl bg-black flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-150">
      {children}
    </div>
  );
}

const iconProps = { width: 19, height: 19, fill: "white", "aria-hidden": true as const };
const rowClickable = "group flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 bg-white hover:bg-gray-50 transition-colors duration-150 focus:outline-none focus:bg-gray-50";
const rowStatic   = "flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 bg-white";

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  const preferred = locale === "es" ? "Preferido" : "Preferred";
  const responseNote = locale === "es" ? "Suelo responder en menos de 24h." : "I usually respond within 24h.";

  return (
    <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto w-full flex flex-col lg:flex-row lg:items-start lg:gap-20">

        {/* Header — left column on desktop */}
        <ScrollAnimation animation="fade-up" delay={0}>
          <div className="lg:w-64 shrink-0 mb-10 lg:mb-0 lg:sticky lg:top-24">
            <p className={`${tx.label} ${clr.text.faint} mb-3 select-none`}>
              Jesús Jiménez Alcántara
            </p>
            <h1 className={`text-4xl lg:text-5xl font-light tracking-tight mb-4 ${clr.text.primary}`}>
              {t.contact.title}
            </h1>
            <p className={`${tx.body} ${clr.text.muted} leading-relaxed`}>
              {t.contact.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        {/* Card — right column on desktop */}
        <ScrollAnimation animation="fade-up" delay={100}>
          <div className="flex-1 min-w-0">
            <div className="border border-gray-200 rounded-2xl overflow-hidden divide-y divide-gray-100 shadow-sm">

              {/* Email */}
              <a href="mailto:jjalcantara.dev@gmail.com" className={rowClickable}>
                <IconBox>
                  <svg {...iconProps} viewBox="0 0 24 24">
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </IconBox>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className={`${tx.captionLabel} ${clr.text.faint}`}>{t.contact.email}</p>
                    <span className="text-[9px] font-bold uppercase tracking-widest bg-black text-white px-1.5 py-0.5 rounded-full leading-none">
                      {preferred}
                    </span>
                  </div>
                  <p className={`text-sm sm:text-base ${clr.text.primary} truncate`}>
                    jjalcantara.dev@gmail.com
                  </p>
                </div>
                <ChevronRight />
              </a>

              {/* LinkedIn */}
              <a href="https://linkedin.com/in/jjalcantara" target="_blank" rel="noopener noreferrer" className={rowClickable}>
                <IconBox>
                  <svg {...iconProps} viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </IconBox>
                <div className="flex-1 min-w-0">
                  <p className={`${tx.captionLabel} ${clr.text.faint} mb-0.5`}>{t.contact.linkedin}</p>
                  <p className={`text-sm sm:text-base ${clr.text.primary} truncate`}>
                    linkedin.com/in/jjalcantara
                  </p>
                </div>
                <ChevronRight />
              </a>

              {/* GitHub */}
              <a href="https://github.com/jjalcantara-dev" target="_blank" rel="noopener noreferrer" className={rowClickable}>
                <IconBox>
                  <svg {...iconProps} viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </IconBox>
                <div className="flex-1 min-w-0">
                  <p className={`${tx.captionLabel} ${clr.text.faint} mb-0.5`}>{t.contact.github}</p>
                  <p className={`text-sm sm:text-base ${clr.text.primary} truncate`}>
                    github.com/jjalcantara-dev
                  </p>
                </div>
                <ChevronRight />
              </a>

              {/* Location */}
              <div className={rowStatic}>
                <div className="shrink-0 w-11 h-11 rounded-xl bg-black flex items-center justify-center">
                  <svg {...iconProps} viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.003 3.5-4.697 3.5-8.327a8 8 0 10-16 0c0 3.63 1.556 6.324 3.5 8.327a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className={`${tx.captionLabel} ${clr.text.faint} mb-0.5`}>{t.contact.location}</p>
                  <p className={`text-sm sm:text-base ${clr.text.primary}`}>Vélez-Málaga, España</p>
                </div>
              </div>

            </div>

            {/* Response time note */}
            <p className={`mt-4 text-xs ${clr.text.faint} text-center`}>
              {responseNote}
            </p>
          </div>
        </ScrollAnimation>

      </div>
    </div>
  );
}
