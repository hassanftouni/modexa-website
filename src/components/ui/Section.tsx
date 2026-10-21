import type { ReactNode } from "react";

/** Page-width wrapper: 1200px content column with a 20/32px gutter. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

interface SectionProps {
  children: ReactNode;
  /** "dark" = midnight page background, "light" = #E7EDF3 contrast section. */
  tone?: "dark" | "light";
  id?: string;
  className?: string;
  /** Accessible name when the section has no visible heading. */
  label?: string;
}

/** A full-width page section with consistent vertical rhythm. */
export function Section({ children, tone = "dark", id, className = "", label }: SectionProps) {
  return (
    <section
      id={id}
      aria-label={label}
      className={`${tone === "light" ? "section-light" : ""} py-[4.5rem] sm:py-24 lg:py-32 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}
