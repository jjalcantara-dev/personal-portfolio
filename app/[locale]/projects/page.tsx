import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";
import ScrollAnimation from "@/components/ScrollAnimation";
import { clr } from "@/lib/constants/colors";
import { tx } from "@/lib/constants/typography";
import { SITE_URL } from "@/lib/site";
import ProjectCard, { type ProjectLink } from "@/components/ProjectCard";
import { safeJsonLd } from "@/components/StructuredData";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  return pageMetadata({
    locale,
    path: "/projects",
    title: locale === "es" ? "Proyectos" : "Projects",
    description: t.projects.description,
    keywords: [
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcantara",
      "Backend Engineer",
      "Ingeniero Backend",
      "Prodigy Padel Academy",
      "Koru Acne",
      "DailyDermaTalks",
      "StoreBridge",
      "NuGet",
      "open source",
      "ASP.NET Core",
      "Azure Functions",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "JWT",
      "OAuth 2.0",
      "gamification",
      "in-app purchases",
      "REST API",
      "The Bubble Hub",
      "portfolio",
    ],
  });
}

export default async function Projects({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  const pro = t.projects.current;
  const sb = t.projects.personal.storebridge;
  const vpo = t.projects.personal.galivivienda;
  const storeLinks = (app: { appStore: string; googlePlay: string }): ProjectLink[] => [
    { href: app.appStore, label: "App Store", ariaLabel: locale === "es" ? "Descargar en App Store" : "Download on App Store", icon: "appStore" },
    { href: app.googlePlay, label: "Google Play", ariaLabel: locale === "es" ? "Descargar en Google Play" : "Download on Google Play", icon: "googlePlay" },
  ];
  const storeBridgeSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: sb.name,
    description: sb.description,
    codeRepository: sb.githubUrl,
    url: sb.nugetUrl,
    programmingLanguage: "C#",
    runtimePlatform: ".NET",
    license: "https://opensource.org/licenses/MIT",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: locale === "es" ? "es-ES" : "en-US",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 md:py-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(storeBridgeSchema) }} />
      <article>
        <ScrollAnimation animation="fade-up" delay={0}>
          <h1 className={`${tx.h1} mb-6 ${clr.text.primary}`}>
            {t.projects.title}
          </h1>
        </ScrollAnimation>
        <ScrollAnimation animation="fade-up" delay={100}>
          <p className={`${tx.bodyXl} ${clr.text.body} max-w-3xl mb-12`}>
            {t.projects.description}
          </p>
        </ScrollAnimation>
        <section className={`border-t ${clr.border.base} pt-12`} aria-labelledby="current-projects-heading">
          <ScrollAnimation animation="fade-up" delay={200}>
            <h2 id="current-projects-heading" className={`${tx.h2} tracking-tight mb-12 ${clr.text.primary}`}>
              {t.projects.current.title}
            </h2>
          </ScrollAnimation>

          <div className="space-y-16">
            <ProjectCard
              name={pro.prodigy.name}
              logo={{ kind: "image", src: "/logo_padel.svg", width: 138, height: 56, className: "w-auto h-8 sm:h-10 object-contain", priority: true }}
              type={pro.prodigy.type}
              role={pro.prodigy.role}
              description={pro.prodigy.description}
              techStack={pro.prodigy.techStack}
              links={storeLinks(pro.prodigy)}
              delay={300}
            />
            <ProjectCard
              name={pro.koru.name}
              logo={{ kind: "image", src: "/logo-koru.svg", width: 132, height: 148, className: "w-auto h-16 sm:h-20 object-contain", priority: true }}
              type={pro.koru.type}
              role={pro.koru.role}
              description={pro.koru.description}
              techStack={pro.koru.techStack}
              links={storeLinks(pro.koru)}
              delay={400}
            />
            <ProjectCard
              name={pro.dailydermatalks.name}
              logo={{ kind: "image", src: "/ddt_logotype.svg", width: 138, height: 56, className: "w-auto h-16 sm:h-20 object-contain" }}
              badge={pro.dailydermatalks.status}
              type={pro.dailydermatalks.type}
              role={pro.dailydermatalks.role}
              description={pro.dailydermatalks.description}
              techStack={pro.dailydermatalks.techStack}
              links={[{ href: pro.dailydermatalks.url, label: pro.dailydermatalks.visitLabel, icon: "web" }]}
              delay={500}
            />
          </div>
        </section>

        {/* Personal Projects */}
        <section className={`border-t ${clr.border.base} pt-12 mt-16`} aria-labelledby="personal-projects-heading">
          <ScrollAnimation animation="fade-up" delay={200}>
            <h2 id="personal-projects-heading" className={`${tx.h2} tracking-tight mb-12 ${clr.text.primary}`}>
              {t.projects.personal.title}
            </h2>
          </ScrollAnimation>

          <div className="space-y-16">
            <ProjectCard
              name={sb.name}
              logo={{ kind: "text", text: ".NET" }}
              badge={sb.category}
              type={sb.type}
              role={sb.role}
              description={sb.description}
              techStack={sb.techStack}
              links={[
                { href: sb.githubUrl, label: sb.githubLabel, icon: "github" },
                { href: sb.nugetUrl, label: sb.nugetLabel, icon: "nuget" },
              ]}
              delay={300}
            />
            <ProjectCard
              name={vpo.name}
              logo={{ kind: "text", text: "VPO" }}
              badge={vpo.category}
              type={vpo.type}
              role={vpo.role}
              description={vpo.description}
              techStack={vpo.techStack}
              links={[{ href: vpo.url, label: vpo.visitLabel, icon: "web" }]}
              delay={300}
            />
          </div>
        </section>
      </article>
    </div>
  );
}
