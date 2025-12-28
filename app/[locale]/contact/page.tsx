import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ContactForm from "@/components/ContactForm";
import ScrollAnimation from "@/components/ScrollAnimation";

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
      ? "Contacto | Jesús Jiménez Alcántara" 
      : "Contact | Jesús Jiménez Alcántara",
    description: locale === "es" 
      ? "Página de contacto de Jesús Jiménez Alcántara, Backend Engineer" 
      : "Contact page for Jesús Jiménez Alcántara, Backend Engineer",
    keywords: [
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "contact",
      "contacto",
      "Backend Engineer",
      "Ingeniero Backend",
      "Málaga",
      "contact@jjalcantara.dev",
    ],
    openGraph: {
      title: locale === "es" 
        ? "Contacto | Jesús Jiménez Alcántara" 
        : "Contact | Jesús Jiménez Alcántara",
      description: locale === "es" 
        ? "Página de contacto de Jesús Jiménez Alcántara, Backend Engineer" 
        : "Contact page for Jesús Jiménez Alcántara, Backend Engineer",
      url: `${baseUrl}/${locale}/contact`,
    },
  };
}

export default async function Contact({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-light tracking-tight mb-6 text-black">
            {t.contact.title}
          </h1>
        </ScrollAnimation>

        <section className="border-t border-gray-200 pt-12 mb-16" aria-labelledby="form-heading">
          <ScrollAnimation animation="fade-up" delay={0}>
            <h2 id="form-heading" className="text-2xl sm:text-3xl font-light mb-8 text-black">
              {t.contact.form.title}
            </h2>
          </ScrollAnimation>
          <ScrollAnimation animation="fade-up" delay={100}>
            <div className="max-w-2xl">
              <ContactForm locale={locale} />
            </div>
          </ScrollAnimation>
        </section>

        <section className="border-t border-gray-200 pt-12" aria-labelledby="contact-info-heading">
          <h2 id="contact-info-heading" className="sr-only">
            Información de contacto
          </h2>
          <div className="space-y-8">
            <ScrollAnimation animation="fade-up" delay={0}>
              <div className="group transition-all duration-300 hover:translate-x-2">
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                  {t.contact.email}
                </h3>
                <a
                  href="mailto:contact@jjalcantara.dev"
                  className="text-lg text-black hover:underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm inline-block transition-colors duration-300 group-hover:text-gray-800"
                >
                  contact@jjalcantara.dev
                </a>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={100}>
              <div className="group transition-all duration-300 hover:translate-x-2">
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                  {t.contact.location}
                </h3>
                <p className="text-lg text-black transition-colors duration-300 group-hover:text-gray-800">
                  Vélez-Málaga, 29700, España
                </p>
              </div>
            </ScrollAnimation>
            <ScrollAnimation animation="fade-up" delay={200}>
              <div className="group transition-all duration-300 hover:translate-x-2">
                <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
                  {t.contact.linkedin}
                </h3>
                <a
                  href="https://linkedin.com/in/jjalcantara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg text-black hover:underline focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded-sm inline-block transition-colors duration-300 group-hover:text-gray-800"
                >
                  linkedin.com/in/jjalcantara
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </section>
      </article>
    </div>
  );
}

