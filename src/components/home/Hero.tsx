import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";
import type { HomePage } from "@/content/pages";
import type { Localized } from "@/lib/content";
import { HeroShowcase } from "./HeroShowcase";

/** First screen: who Modexa is, what it builds, and where to go next. */
export function Hero({ content }: { content: Localized<HomePage["hero"]> }) {
  return (
    <header className="relative overflow-hidden pt-28 pb-20 sm:pt-36 lg:pt-40 lg:pb-28">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <AnimatedContainer className="flex flex-col items-start gap-7">
          <p className="eyebrow">{content.eyebrow}</p>
          <h1 className="display text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
            <Highlight text={content.title} highlight={content.highlight} />
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-soft/85 sm:text-xl sm:leading-relaxed">
            {content.description}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/request-quote" size="lg">
              {content.primaryCta}
              <Icon name="arrowRight" className="size-4" />
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              {content.secondaryCta}
            </Button>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted">
            {content.facts.map((fact) => (
              <li key={fact} className="flex items-center gap-2">
                <Icon name="check" className="size-4 text-brand-accent" />
                {fact}
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        <AnimatedContainer delay={0.12}>
          <HeroShowcase content={content.showcase} />
        </AnimatedContainer>
      </Container>
    </header>
  );
}
