import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { getPortfolioProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A preview of the kind of work Modexa delivers — POS systems, business websites, portfolio websites, AI solutions, automation systems and web applications.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Modexa Portfolio",
    description:
      "POS systems, websites, AI solutions and web applications built by Modexa.",
    url: "/portfolio",
  },
};

/*
 * Projects are managed through Pages CMS in content/portfolio/.
 * Current entries are clearly-labelled concept placeholders; real projects
 * replace them without any code changes.
 */
export default function PortfolioPage() {
  const projects = getPortfolioProjects();

  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title={
          <>
            Work that shows{" "}
            <span className="text-gradient">what Modexa can build.</span>
          </>
        }
        description="The projects below are concept placeholders illustrating the kind of work Modexa delivers — real customer projects will be published here as they are approved."
      />

      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <AnimatedContainer>
          <PortfolioGrid projects={projects} />
        </AnimatedContainer>
      </section>

      <CtaBanner
        title="Want your project on this page?"
        description="Start with a conversation. Modexa will scope your idea and turn it into a product worth showing off."
        primaryLabel="Start Your Project"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />
    </>
  );
}
