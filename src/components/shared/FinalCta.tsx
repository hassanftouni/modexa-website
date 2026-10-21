import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Highlight } from "@/components/ui/Highlight";
import { Container } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";

interface FinalCtaProps {
  title: string;
  highlight?: string;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

/** Closing call to action used at the bottom of every page. */
export function FinalCta({
  title,
  highlight,
  description,
  primaryLabel,
  primaryHref = "/request-quote",
  secondaryLabel,
  secondaryHref = "/contact",
}: FinalCtaProps) {
  return (
    <section className="relative overflow-hidden border-t border-edge py-24 lg:py-32">
      <div className="accent-rule absolute inset-x-0 top-0 h-px" aria-hidden="true" />
      <Container>
        <AnimatedContainer className="flex max-w-3xl flex-col items-start gap-7">
          <h2 className="display text-[2.25rem] sm:text-5xl lg:text-6xl">
            <Highlight text={title} highlight={highlight} />
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-soft/80">{description}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href={primaryHref} size="lg">
              {primaryLabel}
              <Icon name="arrowRight" className="size-4" />
            </Button>
            {secondaryLabel ? (
              <Button href={secondaryHref} variant="secondary" size="lg">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </AnimatedContainer>
      </Container>
    </section>
  );
}
