import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Hero } from "@/components/home/Hero";
import { ServicesIndex } from "@/components/home/ServicesIndex";
import { PosShowcase } from "@/components/home/PosShowcase";
import { Problems } from "@/components/home/Problems";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { WhyModexa } from "@/components/home/WhyModexa";
import { FinalCta } from "@/components/shared/FinalCta";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getCustomers,
  getFaqs,
  getPage,
  getPortfolioProjects,
  getProcessSteps,
  getTestimonials,
} from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("home", lang);
  return pageMetadata({
    locale: lang,
    path: "/",
    title: seo.title,
    description: seo.description,
    absoluteTitle: true,
  });
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const page = getPage("home", lang);
  const posPage = getPage("pos", lang);

  return (
    <>
      <Hero content={page.hero} />
      <ServicesIndex content={page.services} allServicesLabel={dict.common.allServices} />
      <PosShowcase content={page.pos} screenshots={posPage.demo.screenshots} />
      <Problems content={page.problems} />

      <Section>
        <SectionHeading
          eyebrow={page.process.eyebrow}
          title={page.process.title}
          description={page.process.description}
        />
        <div className="mt-14 lg:mt-16">
          <ProcessTimeline steps={getProcessSteps(lang)} />
        </div>
      </Section>

      <FeaturedWork
        content={page.work}
        projects={getPortfolioProjects(lang)
          .sort((a, b) => Number(b.featured) - Number(a.featured))
          .slice(0, 4)}
      />

      <WhyModexa
        content={page.why}
        customers={getCustomers(lang).filter((customer) => customer.featured)}
        testimonials={getTestimonials(lang).filter((testimonial) => testimonial.featured)}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            eyebrow={page.faq.eyebrow}
            title={page.faq.title}
            description={page.faq.description}
            className="lg:col-span-5"
          />
          <div className="lg:col-span-7">
            <FaqAccordion faqs={getFaqs("general", lang)} />
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
    </>
  );
}
