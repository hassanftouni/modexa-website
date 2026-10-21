import type { CSSProperties, ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  /** Stagger in seconds (kept for compatibility) — shifts when the reveal starts. */
  delay?: number;
  id?: string;
}

/**
 * Scroll-triggered entrance (short fade + 16px rise) done entirely in CSS
 * with a scroll-driven animation — see `.reveal` in globals.css.
 *
 * Content is fully visible by default: browsers without scroll-driven
 * animations, visitors with JavaScript disabled and reduced-motion users
 * simply see it in place. No client JavaScript, no hydration cost.
 */
export function AnimatedContainer({ children, className = "", delay = 0, id }: AnimatedContainerProps) {
  const style = delay ? ({ "--reveal-offset": `${Math.round(delay * 40)}%` } as CSSProperties) : undefined;

  return (
    <div id={id} className={`reveal ${className}`} style={style}>
      {children}
    </div>
  );
}
