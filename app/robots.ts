import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://jjalcantara.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
      // Explicit allow for AI crawlers
      { userAgent: "GPTBot",           allow: "/" },
      { userAgent: "ClaudeBot",        allow: "/" },
      { userAgent: "anthropic-ai",     allow: "/" },
      { userAgent: "Google-Extended",  allow: "/" },
      { userAgent: "PerplexityBot",    allow: "/" },
      { userAgent: "CCBot",            allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "cohere-ai",        allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
