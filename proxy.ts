import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isValidLocale, type Locale } from "@/lib/i18n";
import { LOCALE_COOKIE } from "@/lib/locale-cookie";

function detectLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const candidates = acceptLanguage
    .split(",")
    .map((s) => {
      const [tag, q] = s.trim().split(";q=");
      return { lang: tag.split("-")[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q)
    .map((x) => x.lang);

  for (const lang of candidates) {
    if (isValidLocale(lang)) return lang;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already has a locale prefix → let it through
  if (locales.some((loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`))) {
    return NextResponse.next();
  }

  // Cookie set by the user via the language switcher wins
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale: Locale =
    cookie && isValidLocale(cookie)
      ? cookie
      : detectLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(url, { status: 302 });
}

export const config = {
  // Match everything except API routes, Next internals, and static files
  matcher: ["/((?!api|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|pdf|txt|xml|js|css|map)$).*)"],
};
