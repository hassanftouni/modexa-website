import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  {
    title: "Services",
    links: [
      { label: "Website Development", href: "/services#website-development" },
      { label: "E-commerce", href: "/services#ecommerce-development" },
      { label: "Web Applications", href: "/services#web-applications" },
      { label: "AI Agents", href: "/services#ai-agents" },
      { label: "Business Automation", href: "/services#business-automation" },
      { label: "API Integrations", href: "/services#api-integrations" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Modexa POS", href: "/products/modexa-pos" },
      { label: "Business Dashboards", href: "/products#business-dashboards" },
      { label: "Booking Systems", href: "/products#booking-systems" },
      { label: "Custom Software", href: "/products#custom-software" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Customers", href: "/customers" },
      { label: "AI & Automation", href: "/ai-automation" },
      { label: "Websites", href: "/websites" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

/* PLACEHOLDER: replace "#" with real social profile URLs in src/lib/site.ts. */
const socialLinks = [
  { label: "LinkedIn", href: siteConfig.social.linkedin },
  { label: "Instagram", href: siteConfig.social.instagram },
  { label: "X", href: siteConfig.social.x },
  { label: "GitHub", href: siteConfig.social.github },
];

export function Footer() {
  return (
    <footer className="border-t border-edge bg-surface">
      <div className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Modexa — home" className="w-fit rounded-md">
              <Logo size={30} />
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Modexa builds modern software, websites, AI agents and automation
              solutions for businesses ready to grow.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="w-fit text-sm text-muted transition-colors hover:text-foreground"
            >
              {siteConfig.email}
            </a>
            <ul className="flex gap-4">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`Footer — ${column.title}`}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-edge pt-8 sm:flex-row">
          <p className="text-sm text-muted">
            © {new Date().getFullYear()} Modexa. All rights reserved.
          </p>
          <p className="text-sm text-muted">
            Technology built for modern businesses.
          </p>
        </div>
      </div>
    </footer>
  );
}
