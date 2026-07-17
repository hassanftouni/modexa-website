"use client";

import { motion, useReducedMotion } from "motion/react";
import { useId } from "react";

/**
 * Cinematic version of the Modexa monogram: the two strokes of the X draw
 * themselves in on mount. Falls back to the static logo for reduced motion.
 */
export function AnimatedLogo({ size = 64 }: { size?: number }) {
  const gradientId = useId();
  const reduceMotion = useReducedMotion();

  // whileInView so the strokes draw themselves in when the logo becomes
  // visible (the hero may sit below the fold on the home page).
  const draw = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true },
          transition: {
            pathLength: { duration: 0.9, delay, ease: [0.65, 0, 0.35, 1] as const },
            opacity: { duration: 0.2, delay },
          },
        };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden="true"
      initial={reduceMotion ? undefined : { scale: 0.85 }}
      whileInView={reduceMotion ? undefined : { scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.1, ease: [0.21, 0.65, 0.36, 1] }}
    >
      <defs>
        <linearGradient
          id={gradientId}
          x1="132"
          y1="116"
          x2="380"
          y2="396"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#A855F7" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#3FA2F7" />
        </linearGradient>
      </defs>
      <motion.line
        x1="148"
        y1="132"
        x2="364"
        y2="380"
        stroke={`url(#${gradientId})`}
        strokeWidth="64"
        strokeLinecap="round"
        {...draw(0.15)}
      />
      <motion.line
        x1="364"
        y1="132"
        x2="148"
        y2="380"
        stroke="#FFFFFF"
        strokeWidth="64"
        strokeLinecap="round"
        {...draw(0.5)}
      />
    </motion.svg>
  );
}
