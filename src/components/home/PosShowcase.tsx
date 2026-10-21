import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";
import { PosDemo, type DemoTab } from "@/components/products/PosDemo";
import type { HomePage } from "@/content/pages";
import type { Localized } from "@/lib/content";

interface PosShowcaseProps {
  content: Localized<HomePage["pos"]>;
  screenshots?: Partial<Record<DemoTab, string>>;
}

/** Flagship product section: the pitch on top, the interactive demo below. */
export function PosShowcase({ content, screenshots }: PosShowcaseProps) {
  return (
    <Section id="modexa-pos">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <AnimatedContainer className="flex flex-col items-start gap-5 lg:col-span-6">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 className="display text-[2rem] sm:text-[2.5rem] lg:text-5xl">
            <Highlight text={content.title} highlight={content.highlight} />
          </h2>
        </AnimatedContainer>
        <AnimatedContainer delay={0.08} className="flex flex-col gap-6 lg:col-span-6 lg:pt-10">
          <p className="text-lg leading-relaxed text-soft/80">{content.description}</p>
          <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {content.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-soft">
                <Icon name="check" className="mt-1 size-4 shrink-0 text-brand-accent" />
                {point}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button href="/products/modexa-pos" size="lg">
              {content.primaryCta}
              <Icon name="arrowRight" className="size-4" />
            </Button>
            <Button href="/request-quote" variant="secondary" size="lg">
              {content.secondaryCta}
            </Button>
          </div>
        </AnimatedContainer>
      </div>

      <AnimatedContainer delay={0.1} className="mt-14 lg:mt-16">
        <PosDemo screenshots={screenshots} />
      </AnimatedContainer>
    </Section>
  );
}
