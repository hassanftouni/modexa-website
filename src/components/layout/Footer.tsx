import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { LocaleLink } from "@/i18n/client";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { SiteSettings } from "@/content/schema";
import type { Localized } from "@/lib/content";

interface FooterProps {
  dict: Dictionary;
  settings: Localized<SiteSettings>;
}

export function Footer({ dict, settings }: FooterProps) {
  const links = dict.footer.links;
  const columns = [
    {
      title: dict.footer.columns.services,
      items: [
        { label: links.services, href: "/services" },
        { label: links.websites, href: "/websites" },
        { label: links.aiAutomation, href: "/ai-automation" },
        { label: links.products, href: "/products" },
        { label: links.pos, href: "/products/modexa-pos" },
      ],
    },
    {
      title: dict.footer.columns.company,
      items: [
        { label: links.about, href: "/about" },
        { label: links.work, href: "/portfolio" },
        { label: links.customers, href: "/customers" },
        { label: links.contact, href: "/contact" },
        { label: links.quote, href: "/request-quote" },
      ],
    },
    {
      title: dict.footer.columns.legal,
      items: [
        { label: links.privacy, href: "/privacy" },
        { label: links.terms, href: "/terms" },
      ],
    },
  ];

  // Profiles appear only once a real URL is entered in Pages CMS (Site settings).
  const social = [
    { label: "LinkedIn", href: settings.social.linkedin },
    { label: "Instagram", href: settings.social.instagram },
    { label: "X", href: settings.social.x },
    { label: "GitHub", href: settings.social.github },
  ].filter((item) => item.href && item.href !== "#");

  return (
    <footer className="border-t border-edge">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="flex max-w-sm flex-col gap-5">
            <LocaleLink href="/" aria-label={dict.a11y.home} className="w-fit rounded-md">
              <Logo size={28} />
            </LocaleLink>
            <p className="text-sm leading-relaxed text-muted">{dict.footer.tagline}</p>
            <a
              href={`mailto:${settings.email}`}
              dir="ltr"
              className="w-fit text-sm text-soft underline decoration-edge-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-brand"
            >
              {settings.email}
            </a>
            {social.length > 0 ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {columns.map((column) => (
            <nav key={column.title} aria-label={`${dict.a11y.footerNav} — ${column.title}`}>
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <LocaleLink
                      href={item.href}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-edge pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Modexa. {dict.footer.rights}
          </p>
        </div>
      </Container>
    </footer>
  );
}
