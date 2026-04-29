import { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://jjalcantara.dev";

  const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "",          priority: 1.0, freq: "weekly"  },
    { path: "/about",   priority: 0.9, freq: "monthly" },
    { path: "/projects",priority: 0.9, freq: "monthly" },
    { path: "/collab",  priority: 0.5, freq: "monthly" },
    { path: "/contact", priority: 0.7, freq: "yearly"  },
    { path: "/puzzles", priority: 0.6, freq: "daily"   },
    { path: "/privacy", priority: 0.3, freq: "yearly"  },
  ];

  const entries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    routes.forEach(({ path, priority, freq }) => {
      entries.push({
        url: `${baseUrl}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency: freq,
        priority,
        alternates: {
          languages: {
            "es-ES": `${baseUrl}/es${path}`,
            "en-US": `${baseUrl}/en${path}`,
            "x-default": `${baseUrl}/es${path}`,
          },
        },
      });
    });
  });

  return entries;
}
