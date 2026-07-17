"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Thin brand-gradient bar at the very top that fills as the page scrolls. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-[linear-gradient(90deg,#a855f7,#6366f1,#3fa2f7)]"
      style={{ scaleX }}
    />
  );
}
