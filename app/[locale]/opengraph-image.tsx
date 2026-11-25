import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getContent } from "@/lib/content";
import { locales, defaultLocale, isValidLocale } from "@/lib/i18n";

export const alt = "Jesús Jiménez Alcántara, Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeParam } = await params;
  const locale = isValidLocale(localeParam) ? localeParam : defaultLocale;
  const t = getContent(locale);

  const logo = await readFile(join(process.cwd(), "public/logo_final.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "72px 80px",
          color: "#000000",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 24, letterSpacing: 6, color: "#9ca3af", textTransform: "uppercase" }}>
            Jesús Jiménez Alcántara
          </div>
          <img src={logoSrc} width={123} height={101} alt="" />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 96, letterSpacing: -3, lineHeight: 1 }}>
            {t.home.title}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 36 }}>
            {t.home.subtitle.split(" · ").map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  fontSize: 26,
                  color: "#4b5563",
                  border: "2px solid #e5e7eb",
                  padding: "8px 20px",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "2px solid #e5e7eb",
            paddingTop: 28,
            fontSize: 24,
            color: "#4b5563",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, backgroundColor: "#10b981" }} />
            {t.home.availability}
          </div>
          <div style={{ display: "flex", color: "#000000" }}>jjalcantara.dev</div>
        </div>
      </div>
    ),
    size,
  );
}
