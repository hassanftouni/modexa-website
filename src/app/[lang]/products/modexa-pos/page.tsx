import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PosDemo } from "@/components/products/PosDemo";
import { FinalCta } from "@/components/shared/FinalCta";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { isLocale } from "@/i18n/config";
import { getFaqs, getPage, getPosFeatures } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site";

const path = "/products/modexa-pos";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/products/modexa-pos">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("pos", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description, absoluteTitle: true });
}

export default async function ModexaPosPage({ params }: PageProps<"/[lang]/products/modexa-pos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("pos", lang);
  const features = getPosFeatures(lang);
  const faqs = getFaqs("pos", lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Modexa POS",
    applicationCategory: "BusinessApplication",
    description: page.seo.description,
    inLanguage: lang,
    publisher: { "@type": "Organization", name: "Modexa", url: siteConfig.url },
  };

  return (
    <>
      <PageHeader
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        highlight={page.hero.highlight}
        description={page.hero.description}
      >
        <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
          <Button href="/request-quote" size="lg">
            {page.hero.primaryCta}
            <Icon name="arrowRight" className="size-4" />
          </Button>
          <Button href="#demo" variant="secondary" size="lg">
            {page.hero.secondaryCta}
          </Button>
        </div>
      </PageHeader>

      {/* Interactive demo */}
      <Section id="demo">
        <SectionHeading
          eyebrow={page.demo.eyebrow}
          title={page.demo.title}
          description={page.demo.description}
        />
        <AnimatedContainer delay={0.1} className="mt-12">
          <PosDemo screenshots={page.demo.screenshots} />
        </AnimatedContainer>
      </Section>

      {/* Who it's for */}
      <Section tone="light" className="py-16! lg:py-20!">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col gap-4 lg:col-span-4">
            <p className="eyebrow">{page.industries.eyebrow}</p>
            <h2 className="display text-3xl sm:text-4xl">{page.industries.title}</h2>
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-3 lg:col-span-8">
            {page.industries.items.map((industry) => (
              <li key={industry.name} className="flex items-center gap-3 bg-background px-5 py-5">
                <Icon name={industry.icon} className="size-5 shrink-0 text-brand-accent" />
                <span className="font-medium">{industry.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Offline, local-network operation */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow={page.offline.eyebrow}
              title={page.offline.title}
              description={page.offline.description}
            />
            <ul className="flex flex-col gap-3">
              {page.offline.points.map((point) => (
                <li key={point} className="flex items-start gap-3 text-soft">
                  <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <AnimatedContainer delay={0.1}>
            <figure className="card-surface flex flex-col items-stretch gap-3 rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-3 gap-3">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="flex flex-col items-center gap-2 rounded-lg border border-edge bg-background px-2 py-4"
                  >
                    <Icon name="monitor" className="size-6 text-soft" />
                    <span className="text-xs text-muted tabular-nums">#{n}</span>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-muted">{page.offline.terminalsLabel}</p>
              <Connector />
              <div className="flex flex-col items-center gap-1.5 rounded-lg border border-brand/40 bg-brand/10 px-4 py-5 text-center">
                <Icon name="database" className="size-6 text-brand-accent" />
                <p className="font-medium">{page.offline.serverLabel}</p>
                <p className="flex items-center gap-1.5 text-xs text-brand-accent">
                  <Icon name="wifiOff" className="size-3.5" />
                  {page.offline.serverNote}
                </p>
              </div>
              <Connector />
              <div className="grid grid-cols-3 gap-3">
                {(["printer", "printer", "receipt"] as const).map((icon, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center rounded-lg border border-edge bg-background py-4"
                  >
                    <Icon name={icon} className="size-6 text-soft" />
                  </div>
                ))}
              </div>
              <figcaption className="text-center text-xs text-muted">{page.offline.printersLabel}</figcaption>
            </figure>
          </AnimatedContainer>
        </div>
      </Section>

      {/* Features */}
      <Section tone="light">
        <SectionHeading
          eyebrow={page.features.eyebrow}
          title={page.features.title}
          description={page.features.description}
        />
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li key={feature.slug} className="border-t border-edge">
              <AnimatedContainer delay={(index % 3) * 0.05} className="flex flex-col gap-3 py-7">
                <h3 className="flex items-center gap-3 text-lg font-semibold">
                  <Icon name={feature.icon} className="size-5 text-brand-accent" />
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-soft/80">{feature.description}</p>
                <ul className="flex flex-col gap-1.5 text-sm text-muted">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-current" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </AnimatedContainer>
            </li>
          ))}
        </ul>
      </Section>

      {/* FAQ */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow={page.faq.eyebrow}
            title={page.faq.title}
            description={page.faq.description}
            className="lg:col-span-5"
          />
          <div className="lg:col-span-7">
            <FaqAccordion faqs={faqs} />
          </div>
        </div>
      </Section>

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

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden="true">
      <span className="h-6 w-px bg-brand/60" />
    </div>
  );
}
