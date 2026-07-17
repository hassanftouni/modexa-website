import type { ReactNode } from "react";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}

/** Shared hero header for subpages. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-20">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)] blur-3xl"
        aria-hidden="true"
      />
      <AnimatedContainer className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-6 text-center">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.1]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            {description}
          </p>
        ) : null}
        {children}
      </AnimatedContainer>
    </header>
  );
}
