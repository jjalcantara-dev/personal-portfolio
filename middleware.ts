import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["es", "en"] as const;
type Locale = (typeof LOCALES)[number];
const DEFAULT: Locale = "es";
const COOKIE = "preferred_locale";

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT;

  const candidates = acceptLanguage
    .split(",")
    .map((s) => {
      const [tag, q] = s.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .map((x) => x.lang);

  for (const lang of candidates) {
    if (lang === "en") return "en";
    if (lang === "es") return "es";
  }

  return DEFAULT;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix → let it through
  if (LOCALES.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))) {
    return NextResponse.next();
  }

  // Cookie set by the user via the language switcher wins
  const cookie = request.cookies.get(COOKIE)?.value;
  const locale: Locale =
    cookie && (LOCALES as readonly string[]).includes(cookie)
      ? (cookie as Locale)
      : detectLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url, { status: 302 });
}

export const config = {
  // Match everything except API routes, Next internals, and static files
  matcher: ["/((?!api|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|pdf|txt|xml|js|css|map)$).*)"],
};
