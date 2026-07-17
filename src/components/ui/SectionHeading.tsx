import type { ReactNode } from "react";
import { AnimatedContainer } from "./AnimatedContainer";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
}: SectionHeadingProps) {
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "text-left items-start";

  return (
    <AnimatedContainer
      className={`flex max-w-3xl flex-col gap-4 ${alignment} ${className}`}
    >
      {eyebrow ? (
        <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
        {title}
      </h2>
      {description ? (
        <p className="text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </AnimatedContainer>
  );
}
