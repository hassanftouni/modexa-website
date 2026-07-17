"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds — use small increments (index * 0.06) for staggered lists. */
  delay?: number;
  id?: string;
}

/**
 * Scroll-triggered entrance animation used across all sections.
 * Falls back to a plain fade for users who prefer reduced motion.
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
      initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay, ease: [0.21, 0.65, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
