import type { ReactNode } from "react";
import { Highlight } from "@/components/ui/Highlight";
import { Container } from "@/components/ui/Section";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  highlight?: string;
  description?: ReactNode;
  /** Actions or extra content under the description. */
  children?: ReactNode;
}

/** Shared header for inner pages: aligned to the reading edge, no decoration. */
export function PageHeader({ eyebrow, title, highlight, description, children }: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden border-b border-edge pt-32 pb-16 sm:pt-40 sm:pb-20 lg:pb-24">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <Container className="relative">
        <div className="intro flex max-w-3xl flex-col items-start gap-6">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h1 className="display text-[2.5rem] sm:text-6xl lg:text-[4rem]">
            {typeof title === "string" ? <Highlight text={title} highlight={highlight} /> : title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-lg leading-relaxed text-soft/85 sm:text-xl sm:leading-relaxed">
              {description}
            </p>
          ) : null}
          {children}
        </div>
      </Container>
    </header>
  );
}
