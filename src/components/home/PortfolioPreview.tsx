import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Icon } from "@/components/ui/icons";
import type { PortfolioProject } from "@/content/types";

/*
 * Projects come from the CMS-managed collection in content/portfolio/.
 * Current entries are clearly-labelled concept placeholders — real projects
 * are added through Pages CMS without touching this component.
 */
export function PortfolioPreview({ projects }: { projects: PortfolioProject[] }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Portfolio"
        title="Work across products, websites and automation"
        description="POS systems, business websites, portfolio sites, AI solutions and web applications — a preview of the kind of work Modexa delivers."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <AnimatedContainer
            key={project.slug}
            delay={(index % 3) * 0.07}
            className="h-full"
          >
            <ProjectCard project={project} />
          </AnimatedContainer>
        ))}
      </div>
      <AnimatedContainer className="mt-12 flex justify-center">
        <Button href="/portfolio" variant="secondary" size="lg">
          View Full Portfolio
          <Icon name="arrowRight" className="size-4" />
        </Button>
      </AnimatedContainer>
    </section>
  );
}
