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
    name: "Jesús Jiménez Alcántara",
    alternateName: [
      "Jesus Jimenez Alcantara",
      "Jesús Jiménez Alcántara",
      "Jesus Jimenez Alcántara",
      "JJA",
      "jjalcantara",
    ],
    jobTitle: locale === "es" ? "Ingeniero Backend" : "Backend Engineer",
    description:
      locale === "es"
        ? "Ingeniero Backend con más de 4 años de experiencia diseñando sistemas cloud-native escalables con ASP.NET Core, Azure y PostgreSQL. Especializado en APIs REST, autenticación (JWT, OAuth 2.0, RBAC) e integración de pagos (Stripe, App Store, Google Play)."
        : "Backend Engineer with 4+ years of experience building scalable cloud-native systems using ASP.NET Core, Azure and PostgreSQL. Specialized in REST APIs, authentication (JWT, OAuth 2.0, RBAC) and payment integrations (Stripe, App Store, Google Play).",
    url: baseUrl,
    image: `${baseUrl}/profile.png`,
    sameAs: [
      "https://github.com/jjalcantara",
      "https://linkedin.com/in/jjalcantara",
    ],
    email: "contact@jjalcantara.dev",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Vélez-Málaga",
      postalCode: "29700",
      addressRegion: "Málaga",
      addressCountry: "ES",
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
    knowsAbout: [
      "Backend Development",
      "Cloud Computing",
      "Azure",
      ".NET",
      "C#",
      "ASP.NET Core",
      "REST API Design",
      "PostgreSQL",
      "Redis",
      "JWT",
      "OAuth 2.0",
      "RBAC",
      "Stripe",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "SOLID Principles",
      "Clean Architecture",
      "Software Engineering",
    ],
    worksFor: {
      "@type": "Organization",
      name: "The Bubble Hub",
      url: "https://thebbhub.com",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Jesús Jiménez Alcántara — Backend Engineer",
    alternateName: "jjalcantara.dev",
    url: baseUrl,
    description:
      locale === "es"
        ? "Portfolio profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en Azure, .NET y PostgreSQL."
        : "Professional portfolio of Jesús Jiménez Alcántara, Backend Engineer specialized in Azure, .NET and PostgreSQL.",
    author: {
      "@type": "Person",
      name: "Jesús Jiménez Alcántara",
    },
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
