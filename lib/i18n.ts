export type Locale = 'es' | 'en';

export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

