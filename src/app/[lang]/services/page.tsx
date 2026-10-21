import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/shared/FinalCta";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";
import { LocaleLink } from "@/i18n/client";
import { isLocale } from "@/i18n/config";
import { getPage, getServices } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const path = "/services";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("services", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("services", lang);
  const services = getServices(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "Service",
      position: index + 1,
      name: service.name,
      description: service.summary,
      provider: { "@type": "Organization", name: "Modexa", url: siteConfig.url },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      >
        <nav aria-label={page.jumpLabel} className="pt-4">
          <ul className="flex flex-wrap gap-2">
            {services.map((service) => (
              <li key={service.slug}>
                <LocaleLink
                  href={`#${service.slug}`}
                  className="inline-flex items-center rounded-full border border-edge px-3.5 py-1.5 text-sm text-soft transition-colors hover:border-edge-strong hover:text-foreground"
                >
                  {service.name}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <Container>
        <ol>
          {services.map((service, index) => (
            <li key={service.slug} id={service.slug} className="scroll-mt-24 border-b border-edge last:border-0">
              <AnimatedContainer className="grid gap-10 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
                <div className="flex flex-col items-start gap-5 lg:col-span-4">
                  <span className="text-sm font-medium text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="display flex items-center gap-3 text-3xl sm:text-4xl">{service.name}</h2>
                  <p className="text-lg leading-relaxed text-soft/85">{service.summary}</p>
                  <Button href="/request-quote" variant="secondary" className="mt-2">
                    {page.labels.cta}
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                </div>

                <div className="grid gap-10 lg:col-span-8">
                  <div className="grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="eyebrow">{page.labels.problem}</h3>
                      <p className="mt-3 leading-relaxed text-soft/80">{service.problem}</p>
                    </div>
                    <div>
                      <h3 className="eyebrow">{page.labels.solution}</h3>
                      <p className="mt-3 leading-relaxed text-soft">{service.solution}</p>
                    </div>
                  </div>

                  <div className="grid gap-8 border-t border-edge pt-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold">{page.labels.benefits}</h3>
                      <ul className="mt-4 flex flex-col gap-2.5">
                        {service.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2.5 text-soft">
                            <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-accent" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">{page.labels.features}</h3>
                      <ul className="mt-4 flex flex-col gap-2.5 text-soft/80">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <span className="mt-2.5 size-1 shrink-0 rounded-full bg-muted" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-xl border border-edge bg-surface/50 p-6">
                    <h3 className="text-sm font-semibold">{page.labels.examples}</h3>
                    <ul className="mt-3 flex flex-col gap-2 text-soft/80 sm:flex-row sm:flex-wrap sm:gap-x-8">
                      {service.examples.map((example) => (
                        <li key={example} className="flex items-start gap-2">
                          <Icon name="arrowRight" className="mt-1 size-4 shrink-0 text-muted" />
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedContainer>
            </li>
          ))}
        </ol>
      </Container>

      <FinalCta
        title={page.cta.title}
        highlight={page.cta.highlight}
        description={page.cta.description}
        primaryLabel={page.cta.primaryCta}
        secondaryLabel={page.cta.secondaryCta}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
