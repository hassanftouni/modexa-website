import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/shared/FinalCta";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { isLocale } from "@/i18n/config";
import { getPage, getProcessSteps } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/websites";

export async function generateMetadata({ params }: PageProps<"/[lang]/websites">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("websites", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function WebsitesPage({ params }: PageProps<"/[lang]/websites">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("websites", lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      <Section>
        <SectionHeading eyebrow={page.types.eyebrow} title={page.types.title} />
        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-4">
          {page.types.items.map((type, index) => (
            <li key={type.name} className="border-t border-edge">
              <AnimatedContainer delay={(index % 4) * 0.05} className="flex flex-col gap-3 py-7">
                <Icon name={type.icon} className="size-5 text-brand-accent" />
                <h3 className="text-lg font-semibold">{type.name}</h3>
                <p className="leading-relaxed text-soft/75">{type.description}</p>
              </AnimatedContainer>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow={page.standards.eyebrow}
            title={page.standards.title}
            description={page.standards.description}
            className="lg:col-span-5"
          />
          <ul className="grid content-start gap-x-8 border-t border-edge sm:grid-cols-2 lg:col-span-7">
            {page.standards.items.map((item) => (
              <li key={item} className="flex items-start gap-3 border-b border-edge py-4 text-soft">
                <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow={page.process.eyebrow}
          title={page.process.title}
          description={page.process.description}
        />
        <div className="mt-14">
          <ProcessTimeline steps={getProcessSteps(lang)} />
        </div>
      </Section>

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
