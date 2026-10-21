"use client";

import { usePathname } from "next/navigation";
import { useI18n } from "@/i18n/client";
import { localeCookie, localizePath, stripLocale } from "@/i18n/config";

/**
 * Links to the same page in the other language and remembers the choice
 * (cookie read by src/proxy.ts), so it persists across visits and reloads.
 * A full page load is intentional: <html lang/dir> and fonts change.
 */
export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, dict } = useI18n();
  const pathname = usePathname();
  const target = locale === "ar" ? "en" : "ar";
  const href = localizePath(target, stripLocale(pathname));

  function remember() {
    document.cookie = `${localeCookie}=${target}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <a
      href={href}
      hrefLang={target}
      lang={target}
      onClick={remember}
      aria-label={dict.language.switchToName}
      className={`inline-flex h-10 items-center justify-center rounded-lg border border-edge px-3 text-sm font-medium text-soft transition-colors hover:border-edge-strong hover:text-foreground ${className}`}
    >
      {dict.language.switchTo}
    </a>
  );
}
