import type { Locale } from './i18n';
import esContent from '@/content/es.json';
import enContent from '@/content/en.json';

const content = {
  es: esContent,
  en: enContent,
};

export function getContent(locale: Locale) {
  return content[locale];
}

export type Content = typeof esContent;

