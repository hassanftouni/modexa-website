import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import type { HomePage } from "@/content/pages";
import type { PortfolioProject } from "@/content/schema";
import type { Localized } from "@/lib/content";

interface FeaturedWorkProps {
  content: Localized<HomePage["work"]>;
  projects: Localized<PortfolioProject>[];
}

/** Published projects from Pages CMS; hidden entirely while there are none. */
export function FeaturedWork({ content, projects }: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />
        <Button href="/portfolio" variant="secondary" className="shrink-0">
          {content.cta}
          <Icon name="arrowRight" className="size-4" />
        </Button>
      </div>
      <ul className="mt-14 grid gap-x-8 gap-y-14 md:grid-cols-2">
        {projects.slice(0, 4).map((project, index) => (
          <li key={project.slug}>
            <AnimatedContainer delay={(index % 2) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </AnimatedContainer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
