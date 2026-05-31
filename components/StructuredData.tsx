import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

function safeJsonLd(obj: unknown): string {
  return JSON.stringify(obj)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export default function StructuredData({ locale }: Props) {
  const baseUrl = "https://jjalcantara.dev";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#person`,
    name: "Jesús Jiménez Alcántara",
    alternateName: [
      "Jesus Jimenez Alcantara",
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcántara",
      "JJA",
      "jjalcantara",
      "jjalcantara-dev",
    ],
    jobTitle: locale === "es" ? "Ingeniero Backend" : "Backend Engineer",
    description:
      locale === "es"
        ? "Ingeniero Backend con más de 4 años de experiencia diseñando sistemas cloud-native escalables con ASP.NET Core, Azure y PostgreSQL. Especializado en APIs REST, autenticación (JWT, OAuth 2.0, RBAC) e integración de pagos (Stripe, App Store, Google Play)."
        : "Backend Engineer with 4+ years of experience building scalable cloud-native systems using ASP.NET Core, Azure and PostgreSQL. Specialized in REST APIs, authentication (JWT, OAuth 2.0, RBAC) and payment integrations (Stripe, App Store, Google Play).",
    url: baseUrl,
    image: `${baseUrl}/profile.png`,
    mainEntityOfPage: `${baseUrl}/${locale}/about`,
    sameAs: [
      "https://github.com/jjalcantara-dev",
      "https://linkedin.com/in/jjalcantara",
      "https://www.linkedin.com/in/jjalcantara/",
    ],
    email: "jjalcantara.dev@gmail.com",
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
      "Kubernetes",
      "CI/CD",
      "Azure DevOps",
      "SOLID Principles",
      "Clean Architecture",
      "Software Engineering",
      "Artificial Intelligence",
    ],
  };

  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${baseUrl}/${locale}/about#profilepage`,
    url: `${baseUrl}/${locale}/about`,
    name: locale === "es"
      ? "Jesús Jiménez Alcántara — Ingeniero Backend"
      : "Jesús Jiménez Alcántara — Backend Engineer",
    description: locale === "es"
      ? "Perfil profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en ASP.NET Core, Azure y PostgreSQL. Más de 4 años de experiencia en sistemas cloud-native."
      : "Professional profile of Jesús Jiménez Alcántara, Backend Engineer specialized in ASP.NET Core, Azure and PostgreSQL. 4+ years of experience in cloud-native systems.",
    mainEntity: { "@id": `${baseUrl}/#person` },
    dateModified: "2026-05-31",
    inLanguage: locale === "es" ? "es-ES" : "en-US",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: locale === "es"
      ? "Jesús Jiménez Alcántara — Ingeniero Backend"
      : "Jesús Jiménez Alcántara — Backend Engineer",
    alternateName: "jjalcantara.dev",
    url: baseUrl,
    description: locale === "es"
      ? "Portfolio profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en Azure, ASP.NET Core y PostgreSQL."
      : "Professional portfolio of Jesús Jiménez Alcántara, Backend Engineer specialized in Azure, ASP.NET Core and PostgreSQL.",
    author: { "@id": `${baseUrl}/#person` },
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
        dangerouslySetInnerHTML={{ __html: safeJsonLd(profilePageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(websiteSchema) }}
      />
    </>
  );
}
