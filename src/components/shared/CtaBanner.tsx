import type { ReactNode } from "react";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";

interface CtaBannerProps {
  title: ReactNode;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function CtaBanner({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CtaBannerProps) {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24">
      <AnimatedContainer>
        <div className="relative overflow-hidden rounded-3xl border border-edge bg-surface px-6 py-16 text-center sm:px-16">
          <div
            className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.28),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-5">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Button href={primaryHref} size="lg">
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button href={secondaryHref} variant="secondary" size="lg">
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </AnimatedContainer>
    </section>
  );
}
