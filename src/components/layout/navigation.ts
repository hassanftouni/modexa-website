import type { Dictionary } from "@/i18n/dictionaries/en";

export interface NavItem {
  key: keyof Dictionary["nav"];
  /** English path — localized by LocaleLink. */
  href: string;
}

/** Five destinations keep the header readable on every screen size. */
export const navItems: NavItem[] = [
  { key: "services", href: "/services" },
  { key: "pos", href: "/products/modexa-pos" },
  { key: "work", href: "/portfolio" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

/** `pathname` must already have its locale prefix stripped. */
export function isActiveRoute(pathname: string, href: string): boolean {
  const cleanHref = href.split("#")[0];
  if (cleanHref === "/") return pathname === "/";
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}
