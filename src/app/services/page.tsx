import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { services } from "@/content/services";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website development, e-commerce, web applications, AI agents, business automation, custom software, API integrations and support — all from one team at Modexa.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Modexa Services",
    description:
      "Websites, web applications, AI agents, automation and custom software — designed and built by one team.",
    url: "/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: services.map((service, index) => ({
    "@type": "Service",
    position: index + 1,
    name: service.name,
    description: service.shortDescription,
    provider: { "@type": "Organization", name: "Modexa", url: siteConfig.url },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={
          <>
            Complete digital solutions,{" "}
            <span className="text-gradient">built around your business.</span>
          </>
        }
        description="Every Modexa service starts with a real business problem and ends with a reliable, well-designed solution. No fixed templates — and no fixed price lists: every project receives a custom quote."
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 pb-24">
        {services.map((service, index) => (
          <AnimatedContainer
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24"
            delay={Math.min(index * 0.03, 0.15)}
          >
            <article className="card-surface grid gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-2">
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                    <Icon name={service.icon} className="size-6" />
                  </span>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {service.name}
                  </h2>
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    The problem
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {service.problem}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    The Modexa solution
                  </h3>
                  <p className="mt-2 leading-relaxed text-muted">
                    {service.solution}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-4 pt-2">
                  <Button href="/request-quote">
                    Request a Quote
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Contact us for a custom quote
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    Main benefits
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm text-foreground/90"
                      >
                        <Icon
                          name="check"
                          className="mt-0.5 size-4 shrink-0 text-brand-accent"
                        />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    Possible features
                  </h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="rounded-full border border-edge bg-white/[0.04] px-3 py-1 text-xs text-muted"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    Typical projects
                  </h3>
                  <ul className="mt-3 flex flex-col gap-2">
                    {service.examples.map((example) => (
                      <li
                        key={example}
                        className="flex items-start gap-2 text-sm text-muted"
                      >
                        <Icon
                          name="arrowRight"
                          className="mt-0.5 size-4 shrink-0 text-brand-accent"
                        />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </AnimatedContainer>
        ))}
      </div>

      <CtaBanner
        title="Not sure which service fits?"
        description="Describe your goal and Modexa will recommend the right solution — a website, an application, automation or a combination."
        primaryLabel="Request a Quote"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
    </>
  );
}
