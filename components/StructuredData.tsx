import type { Locale } from "@/lib/i18n";
import { AUTHOR_NAME, CONTACT_EMAIL, SITE_NAME, SITE_URL, SOCIAL_URLS } from "@/lib/site";

type Props = {
  locale: Locale;
};

export function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

// Site-wide JSON-LD (every page): the Person and the WebSite. The ProfilePage
// schema belongs to /about only, see profilePageJsonLd().
export default function StructuredData({ locale }: Props) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: AUTHOR_NAME,
    alternateName: [
      "Jesus Jimenez Alcantara",
      "Jesus Jimenez Alcántara",
      "Jesús Jimenez Alcántara",
      "Jesus Jiménez Alcantara",
      "JJA",
      "jjalcantara",
      "jjalcantara-dev",
    ],
    jobTitle: locale === "es" ? "Ingeniero Backend" : "Backend Engineer",
    description:
      locale === "es"
        ? "Ingeniero Backend con más de 4 años de experiencia diseñando sistemas cloud-native escalables con ASP.NET Core, Azure y PostgreSQL. Especializado en APIs REST, autenticación (JWT, OAuth 2.0, RBAC) e integración de pagos (Stripe, App Store, Google Play)."
        : "Backend Engineer with 4+ years of experience building scalable cloud-native systems using ASP.NET Core, Azure and PostgreSQL. Specialized in REST APIs, authentication (JWT, OAuth 2.0, RBAC) and payment integrations (Stripe, App Store, Google Play).",
    url: SITE_URL,
    image: `${SITE_URL}/profile.jpg`,
    mainEntityOfPage: `${SITE_URL}/${locale}/about`,
    sameAs: [SOCIAL_URLS.github, SOCIAL_URLS.linkedin],
    email: CONTACT_EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vélez-Málaga",
      postalCode: "29700",
      addressRegion: "Málaga",
      addressCountry: "ES",
    },
    nationality: {
      "@type": "Country",
      name: "Spain",
    },
    knowsLanguage: [
      { "@type": "Language", name: "Spanish", alternateName: "es" },
      { "@type": "Language", name: "English", alternateName: "en" },
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: locale === "es" ? "Ingeniero Backend" : "Backend Engineer",
      occupationLocation: {
        "@type": "Country",
        name: "Spain",
      },
      description:
        locale === "es"
          ? "Diseño y desarrollo de sistemas backend cloud-native con ASP.NET Core y Azure. Especialización en APIs REST, autenticación, pagos y arquitectura de bases de datos PostgreSQL."
          : "Design and development of cloud-native backend systems with ASP.NET Core and Azure. Specialization in REST APIs, authentication, payments and PostgreSQL database architecture.",
      skills: "ASP.NET Core, .NET, C#, Azure Functions, Azure DevOps, PostgreSQL, Redis, REST API, JWT, OAuth 2.0, RBAC, Stripe, Docker, CI/CD, SOLID, Clean Architecture",
    },
    alumniOf: [
      {
        "@type": "EducationalOrganization",
        name: "Universidad de Málaga",
        alternateName: "UMA",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Málaga",
          addressCountry: "ES",
        },
      },
      {
        "@type": "EducationalOrganization",
        name: "Universidad Internacional de La Rioja",
        alternateName: "UNIR",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Logroño",
          addressCountry: "ES",
        },
      },
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: locale === "es" ? "Grado en Ingeniería del Software" : "Bachelor's Degree in Software Engineering",
        credentialCategory: locale === "es" ? "Grado universitario" : "Bachelor's degree",
        recognizedBy: {
          "@type": "EducationalOrganization",
          name: "Universidad de Málaga",
        },
      },
    ],
    knowsAbout: [
      "Backend Development",
      "Cloud Computing",
      "Azure",
      "Azure Functions",
      ".NET",
      "C#",
      "ASP.NET Core",
      "REST API Design",
      "OpenAPI",
      "Swagger",
      "PostgreSQL",
      "Redis",
      "JWT",
      "OAuth 2.0",
      "RBAC",
      "Stripe",
      "In-App Purchases",
      "Gamification Systems",
      "Docker",
      "CI/CD",
      "Azure DevOps",
      "SOLID Principles",
      "Clean Architecture",
      "Software Engineering",
      "Artificial Intelligence",
      "Model Context Protocol",
      "AI Developer Tooling",
      "Open Source",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: locale === "es"
      ? "Jesús Jiménez Alcántara | Ingeniero Backend"
      : "Jesús Jiménez Alcántara | Backend Engineer",
    alternateName: SITE_NAME,
    url: SITE_URL,
    description: locale === "es"
      ? "Portfolio profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en Azure, ASP.NET Core y PostgreSQL."
      : "Professional portfolio of Jesús Jiménez Alcántara, Backend Engineer specialized in Azure, ASP.NET Core and PostgreSQL.",
    author: { "@id": `${SITE_URL}/#person` },
    inLanguage: ["es-ES", "en-US"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
    </>
  );
}

/** ProfilePage schema for /about: the page is about the Person declared site-wide. */
export function profilePageJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/${locale}/about#profilepage`,
    url: `${SITE_URL}/${locale}/about`,
    name: locale === "es"
      ? "Jesús Jiménez Alcántara | Ingeniero Backend"
      : "Jesús Jiménez Alcántara | Backend Engineer",
    description: locale === "es"
      ? "Perfil profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en ASP.NET Core, Azure y PostgreSQL. Más de 4 años de experiencia en sistemas cloud-native."
      : "Professional profile of Jesús Jiménez Alcántara, Backend Engineer specialized in ASP.NET Core, Azure and PostgreSQL. 4+ years of experience in cloud-native systems.",
    mainEntity: { "@id": `${SITE_URL}/#person` },
    dateModified: "2026-11-24",
    inLanguage: locale === "es" ? "es-ES" : "en-US",
  };
}
