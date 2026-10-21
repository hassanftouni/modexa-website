import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/shared/FinalCta";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isLocale } from "@/i18n/config";
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/about";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("about", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("about", lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      {/* Mission & vision as two statements, not boxes */}
      <Section>
        <div className="grid gap-14 md:grid-cols-2 md:gap-16">
          {[page.mission, page.vision].map((block, index) => (
            <AnimatedContainer key={block.label} delay={index * 0.08} className="flex flex-col gap-5">
              <p className="eyebrow">{block.label}</p>
              <p className="display text-2xl leading-snug sm:text-3xl">{block.text}</p>
            </AnimatedContainer>
          ))}
        </div>
      </Section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading eyebrow={page.story.eyebrow} title={page.story.title} className="lg:col-span-5" />
          <AnimatedContainer className="flex flex-col gap-6 text-lg leading-relaxed text-soft/85 lg:col-span-7">
            {page.story.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </AnimatedContainer>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow={page.values.eyebrow} title={page.values.title} />
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {page.values.items.map((value, index) => (
            <li key={value.title} className="border-t border-edge">
              <AnimatedContainer delay={index * 0.05} className="flex flex-col gap-3 py-7">
                <span className="text-sm font-medium text-muted tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-xl font-semibold">{value.title}</h3>
                <p className="leading-relaxed text-soft/80">{value.description}</p>
              </AnimatedContainer>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading eyebrow={page.approach.eyebrow} title={page.approach.title} className="lg:col-span-5" />
          <ol className="border-t border-edge lg:col-span-7">
            {page.approach.items.map((item, index) => (
              <li key={item} className="flex items-baseline gap-6 border-b border-edge py-5 text-lg">
                <span className="text-sm font-semibold text-brand-accent tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta
        title={page.cta.title}
        highlight={page.cta.highlight}
        description={page.cta.description}
        primaryLabel={page.cta.primaryCta}
        primaryHref="/contact"
        secondaryLabel={page.cta.secondaryCta}
        secondaryHref="/request-quote"
      />
    </>
  );
}
