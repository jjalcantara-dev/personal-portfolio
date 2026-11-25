import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
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
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
