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
import { getPage } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/ai-automation";

export async function generateMetadata({ params }: PageProps<"/[lang]/ai-automation">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("ai-automation", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function AiAutomationPage({ params }: PageProps<"/[lang]/ai-automation">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("ai-automation", lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      {/* AI assistants — few items, given room as a two-column list */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow={page.agents.eyebrow}
            title={page.agents.title}
            description={page.agents.description}
            className="lg:col-span-5"
          />
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
            {page.agents.items.map((agent, index) => (
              <li key={agent.name} className="border-t border-edge">
                <AnimatedContainer delay={(index % 2) * 0.06} className="flex h-full flex-col gap-3 py-7">
                  <Icon name={agent.icon} className="size-5 text-brand-accent" />
                  <h3 className="text-lg font-semibold">{agent.name}</h3>
                  <p className="leading-relaxed text-soft/80">{agent.description}</p>
                  {agent.note ? <p className="mt-auto text-sm text-muted">{agent.note}</p> : null}
                </AnimatedContainer>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Automations — a compact, scannable table of use cases */}
      <Section tone="light">
        <SectionHeading
          eyebrow={page.automations.eyebrow}
          title={page.automations.title}
          description={page.automations.description}
        />
        <ul className="mt-12 grid overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "1px" }}>
          {page.automations.items.map((item) => (
            <li key={item.name} className="flex flex-col gap-3 bg-background p-6">
              <Icon name={item.icon} className="size-5 text-brand-accent" />
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm leading-relaxed text-soft/80">{item.description}</p>
              {item.note ? <p className="mt-auto text-xs text-muted">{item.note}</p> : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading eyebrow={page.process.eyebrow} title={page.process.title} />
        <div className="mt-14">
          <ProcessTimeline steps={page.process.steps} />
        </div>
        <p className="mt-14 max-w-2xl border-s-2 border-brand ps-5 leading-relaxed text-soft/80">
          {page.process.note}
        </p>
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
