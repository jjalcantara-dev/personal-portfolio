// Site-wide constants. Change a URL, the name or the email here, not in pages.

export const SITE_URL = "https://jjalcantara.dev";
export const SITE_NAME = "jjalcantara.dev";
export const AUTHOR_NAME = "Jesús Jiménez Alcántara";
export const CONTACT_EMAIL = "jjalcantara.dev@gmail.com";

export const SOCIAL_URLS = {
  github: "https://github.com/jjalcantara-dev",
  linkedin: "https://linkedin.com/in/jjalcantara",
} as const;

/** Display form of a URL: no protocol, no trailing slash ("github.com/jjalcantara-dev"). */
export const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/** Only http(s) links are rendered from content data. */
export function isSafeUrl(url: string): boolean {
  try {
    const { protocol } = new URL(url);
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}
