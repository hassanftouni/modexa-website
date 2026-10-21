import type { ReactNode } from "react";
import { AnimatedContainer } from "./AnimatedContainer";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "start" | "center";
  /** Heading level — h2 by default; use "h1" for page titles. */
  as?: "h1" | "h2";
  className?: string;
}

/** Eyebrow + display heading + lead paragraph, aligned to the reading edge. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <AnimatedContainer className={`flex max-w-2xl flex-col gap-5 ${alignment} ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <Heading className="display text-[2rem] sm:text-[2.5rem] lg:text-5xl">{title}</Heading>
      {description ? (
        <p className="text-lg leading-relaxed text-soft/80">{description}</p>
      ) : null}
    </AnimatedContainer>
  );
}
