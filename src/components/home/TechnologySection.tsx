import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyBadge } from "@/components/ui/TechnologyBadge";
import { technologies } from "@/content/technologies";

export function TechnologySection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Technology"
        title="Built with proven, modern tools"
        description="Modexa works with reliable, well-supported technologies chosen for performance, security and longevity."
      />
      <AnimatedContainer className="mt-12">
        <ul className="flex flex-wrap justify-center gap-3">
          {technologies.map((technology) => (
            <li key={technology.name}>
              <TechnologyBadge technology={technology} />
            </li>
          ))}
        </ul>
      </AnimatedContainer>
    </section>
  );
}
