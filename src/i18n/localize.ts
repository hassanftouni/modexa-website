import type { Locale } from "./config";

/**
 * A piece of CMS text stored in both languages, e.g.
 *   "title": { "en": "Services", "ar": "الخدمات" }
 * Editors fill both fields side by side in Pages CMS.
 */
export interface LocalizedText {
  en: string;
  ar: string;
}

/** Recursively replaces every LocalizedText in T with a plain string. */
export type Resolved<T> = T extends LocalizedText
  ? string
  : T extends (infer U)[]
    ? Resolved<U>[]
    : T extends object
      ? { [K in keyof T]: Resolved<T[K]> }
      : T;

function isLocalizedText(value: unknown): value is LocalizedText {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const keys = Object.keys(value);
  return (
    keys.length > 0 &&
    keys.every((key) => key === "en" || key === "ar") &&
    keys.every((key) => {
      const v = (value as Record<string, unknown>)[key];
      return typeof v === "string" || v === undefined || v === null;
    })
  );
}

/**
 * Resolve CMS content for one locale. Missing or empty Arabic text falls
 * back to English, so a half-translated record never renders blank.
 */
export function localize<T>(value: T, locale: Locale): Resolved<T> {
  if (isLocalizedText(value)) {
    const text = value[locale]?.trim() ? value[locale] : value.en;
    return (text ?? "") as Resolved<T>;
  }
  if (Array.isArray(value)) {
    return value.map((item) => localize(item, locale)) as Resolved<T>;
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, v]) => [key, localize(v, locale)])
    ) as Resolved<T>;
  }
  return value as Resolved<T>;
}
