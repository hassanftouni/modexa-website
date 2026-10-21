import type { Metadata } from "next";
import { localizePath, type Locale } from "@/i18n/config";

interface PageMetaInput {
  locale: Locale;
  /** English (unprefixed) path, e.g. "/services". */
  path: string;
  title: string;
  description: string;
  /** Use the full title as-is instead of the "%s — Modexa" template. */
  absoluteTitle?: boolean;
}

/** Title, description, canonical URL and en/ar alternates for a page. */
export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle = false,
}: PageMetaInput): Metadata {
  const url = localizePath(locale, path);
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: localizePath("en", path),
        ar: localizePath("ar", path),
        "x-default": localizePath("en", path),
      },
    },
    openGraph: { title, description, url },
    twitter: { title, description },
  };
}
