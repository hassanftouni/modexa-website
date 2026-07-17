export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Website Development", href: "/services#website-development" },
      { label: "Web Applications", href: "/services#web-applications" },
      { label: "AI Agents", href: "/services#ai-agents" },
      { label: "Business Automation", href: "/services#business-automation" },
      { label: "Software Development", href: "/services#custom-software" },
      { label: "API Integrations", href: "/services#api-integrations" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    children: [
      { label: "Modexa POS", href: "/products/modexa-pos" },
      { label: "Business Dashboards", href: "/products#business-dashboards" },
      { label: "Booking Systems", href: "/products#booking-systems" },
      { label: "Custom Software", href: "/products#custom-software" },
    ],
  },
  { label: "Modexa POS", href: "/products/modexa-pos" },
  { label: "AI & Automation", href: "/ai-automation" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function isActiveRoute(pathname: string, href: string): boolean {
  const cleanHref = href.split("#")[0];
  if (cleanHref === "/") return pathname === "/";
  return pathname === cleanHref || pathname.startsWith(`${cleanHref}/`);
}
