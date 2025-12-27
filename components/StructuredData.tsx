import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export default function StructuredData({ locale }: Props) {
  const baseUrl = "https://jjalcantara.dev";
  
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Jesús Jiménez Alcántara",
    "alternateName": [
      "Jesus Jimenez Alcantara",
      "Jesús Jiménez Alcantara",
      "Jesus Jimenez Alcántara",
      "JJA",
      "jjalcantara"
    ],
    "jobTitle": locale === "es" ? "Ingeniero Backend" : "Backend Engineer",
    "description": locale === "es"
      ? "Ingeniero Backend especializado en Azure, .NET y arquitectura cloud. Desarrollo soluciones escalables con foco en código limpio, rendimiento y mantenibilidad."
      : "Backend Engineer specialized in Azure, .NET and cloud architecture. I develop scalable solutions with focus on clean code, performance and maintainability.",
    "url": baseUrl,
    "sameAs": [
      // Añade tus redes sociales cuando las tengas
      // "https://github.com/jjalcantara",
      // "https://linkedin.com/in/jjalcantara",
      // "https://twitter.com/jjalcantara"
    ],
    "email": "contact@jjalcantara.dev",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vélez-Málaga",
      "addressRegion": "Málaga",
      "addressCountry": "ES"
    },
    "alumniOf": [
      {
        "@type": "EducationalOrganization",
        "name": "University of Malaga",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Malaga",
          "addressCountry": "ES"
        }
      },
      {
        "@type": "EducationalOrganization",
        "name": "International University of Andalusia",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Andalusia",
          "addressCountry": "ES"
        }
      }
    ],
    "knowsAbout": [
      "Backend Development",
      "Cloud Computing",
      "Azure",
      ".NET",
      "C#",
      "ASP.NET",
      "Software Architecture",
      "Microservices",
      "RESTful APIs",
      "Docker",
      "Kubernetes",
      "CI/CD",
      "Software Engineering"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "The Bubble Hub",
      "jobTitle": locale === "es" ? "Ingeniero Backend" : "Backend Engineer"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Jesús Jiménez Alcántara - Backend Engineer",
    "alternateName": "jjalcantara.dev",
    "url": baseUrl,
    "description": locale === "es"
      ? "Portfolio profesional de Jesús Jiménez Alcántara, Ingeniero Backend especializado en Azure y .NET"
      : "Professional portfolio of Jesús Jiménez Alcántara, Backend Engineer specialized in Azure and .NET",
    "author": {
      "@type": "Person",
      "name": "Jesús Jiménez Alcántara"
    },
    "inLanguage": [locale === "es" ? "es-ES" : "en-US", locale === "es" ? "en-US" : "es-ES"]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

