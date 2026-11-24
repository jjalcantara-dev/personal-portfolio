import type { Locale } from "./i18n";

export const LOCALE_COOKIE = "preferred_locale";

export function savePreferredLocale(locale: Locale): void {
  const secure = window.location.protocol === "https:";
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=31536000;SameSite=Lax${secure ? ";Secure" : ""}`;
}
