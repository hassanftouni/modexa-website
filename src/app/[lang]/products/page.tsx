import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/shared/FinalCta";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getPage, getProducts } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/products";

export async function generateMetadata({ params }: PageProps<"/[lang]/products">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("products", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function ProductsPage({ params }: PageProps<"/[lang]/products">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const page = getPage("products", lang);
  const products = getProducts(lang);
  const flagship = products.find((product) => product.slug === "modexa-pos");
  const others = products.filter((product) => product.slug !== "modexa-pos");

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      {flagship ? (
        <Section>
          <AnimatedContainer>
            <article className="card-surface relative grid gap-10 overflow-hidden rounded-2xl p-8 sm:p-12 lg:grid-cols-2 lg:gap-16">
              <div className="accent-rule absolute inset-x-0 top-0 h-px" aria-hidden="true" />
              <div className="flex flex-col items-start gap-5">
                <p className="eyebrow">{page.flagshipLabel}</p>
                <h2 className="display text-4xl sm:text-5xl">{flagship.name}</h2>
                <p className="text-sm font-medium text-brand-accent">
                  {dict.products.status[flagship.status]}
                </p>
                <p className="text-lg leading-relaxed text-soft/85">{flagship.summary}</p>
                <div className="flex w-full flex-col gap-3 pt-2 sm:w-auto sm:flex-row">
                  <Button href={flagship.href || "/products/modexa-pos"} size="lg">
                    {dict.common.seePos}
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                  <Button href="/request-quote" variant="secondary" size="lg">
                    {dict.common.requestDemo}
                  </Button>
                </div>
              </div>
              <ul className="flex flex-col justify-center border-t border-edge lg:border-t-0">
                {flagship.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="flex items-center gap-4 border-b border-edge py-5 text-lg"
                  >
                    <Icon name="check" className="size-5 shrink-0 text-brand-accent" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </article>
          </AnimatedContainer>
        </Section>
      ) : null}

      {others.length > 0 ? (
        <Section tone="light">
          <SectionHeading title={page.otherTitle} description={page.otherDescription} />
          <ul className="mt-12 border-t border-edge">
            {others.map((product, index) => (
              <li key={product.slug} id={product.slug} className="scroll-mt-28 border-b border-edge">
                <AnimatedContainer
                  delay={index * 0.05}
                  className="grid gap-6 py-10 lg:grid-cols-12 lg:gap-10"
                >
                  <div className="flex flex-col gap-3 lg:col-span-5">
                    <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                      <Icon name={product.icon} className="size-6 text-brand-accent" />
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium text-muted">{dict.products.status[product.status]}</p>
                  </div>
                  <div className="flex flex-col gap-5 lg:col-span-7">
                    <p className="text-lg leading-relaxed text-soft/85">{product.summary}</p>
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2.5 text-soft/80">
                          <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-accent" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </AnimatedContainer>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <FinalCta
        title={page.cta.title}
        highlight={page.cta.highlight}
        description={page.cta.description}
        primaryLabel={page.cta.primaryCta}
        secondaryLabel={page.cta.secondaryCta}
      />
    </>
  );
}
