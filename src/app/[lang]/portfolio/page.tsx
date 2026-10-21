import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { FinalCta } from "@/components/shared/FinalCta";
import { Section } from "@/components/ui/Section";
import { isLocale } from "@/i18n/config";
import { getPage, getPortfolioProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/portfolio";

export async function generateMetadata({ params }: PageProps<"/[lang]/portfolio">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("portfolio", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

/* Projects are managed in Pages CMS (content/portfolio/); only published ones appear. */
export default async function PortfolioPage({ params }: PageProps<"/[lang]/portfolio">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("portfolio", lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />
      <Section>
        <PortfolioGrid projects={getPortfolioProjects(lang)} />
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
