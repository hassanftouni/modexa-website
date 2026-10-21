"use client";

import Link from "next/link";
import { createContext, useContext, type ComponentProps, type ReactNode } from "react";
import { localizePath, type Locale } from "./config";
import type { Dictionary } from "./dictionaries/en";

interface I18nValue {
  locale: Locale;
  dict: Dictionary;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Provides the active locale and interface strings to client components. */
export function I18nProvider({
  locale,
  dict,
  children,
}: I18nValue & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, dict }}>{children}</I18nContext.Provider>
  );
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) throw new Error("useI18n must be used inside <I18nProvider>");
  return value;
}

function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

/**
 * next/link that keeps the visitor in their language: internal paths are
 * written in their English form ("/services#ai-agents") and prefixed with
 * /ar automatically on Arabic pages.
 */
export function LocaleLink({ href, ...props }: ComponentProps<typeof Link> & { href: string }) {
  const { locale } = useI18n();
  return <Link href={isInternal(href) ? localizePath(locale, href) : href} {...props} />;
}
