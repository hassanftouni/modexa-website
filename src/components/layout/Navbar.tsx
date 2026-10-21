"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { LocaleLink, useI18n } from "@/i18n/client";
import { stripLocale } from "@/i18n/config";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";
import { isActiveRoute, navItems } from "./navigation";

export function Navbar() {
  const { dict } = useI18n();
  const pathname = stripLocale(usePathname());
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);

  // Close the mobile menu whenever the route changes (state adjustment during render).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || mobileOpen
          ? "border-edge bg-background/90 backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label={dict.a11y.mainNav}
        className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[4.5rem]"
      >
        <LocaleLink href="/" className="rounded-md" aria-label={dict.a11y.home}>
          <Logo size={26} />
        </LocaleLink>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <li key={item.key}>
                <LocaleLink
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative block rounded-md px-3 py-2 text-sm transition-colors ${
                    active ? "text-foreground" : "text-muted hover:text-foreground"
                  }`}
                >
                  {dict.nav[item.key]}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 -bottom-px h-px origin-center bg-brand transition-transform duration-300 ${
                      active ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </LocaleLink>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2.5">
          {/* Wrappers own the visibility so it can't clash with the controls' own display. */}
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <div className="hidden lg:block">
            <Button href="/request-quote">{dict.nav.cta}</Button>
          </div>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-edge text-foreground lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </nav>

      <MobileMenu open={mobileOpen} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
    </header>
  );
}
