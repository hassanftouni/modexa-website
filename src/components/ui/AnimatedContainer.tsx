"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds — use small increments (index * 0.05) for staggered lists. */
  delay?: number;
  id?: string;
}

/**
 * Scroll-triggered entrance: a short fade and 16px rise, played once.
 * Falls back to a plain fade for visitors who prefer reduced motion.
 */
export function AnimatedContainer({
  children,
  className,
  delay = 0,
  id,
}: AnimatedContainerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      // The initial pose must not branch on reduced motion: it is serialized
      // into the SSR HTML, and a client-only branch would hydrate mismatched.
      // Reduced motion instead collapses the slide instantly (pure fade).
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.22, 0.61, 0.36, 1],
        y: reduceMotion ? { duration: 0, delay: 0 } : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
