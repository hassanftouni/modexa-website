"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children?: ReactNode;
  className?: string;
  /** Total drift in px across the element's pass through the viewport. */
  distance?: number;
  "aria-hidden"?: boolean;
}

/**
 * Scroll-linked parallax drift for decorative layers (glows, background art).
 * Renders children statically when the user prefers reduced motion.
 */
export function Parallax({
  children,
  className,
  distance = 60,
  ...rest
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { y, willChange: "transform" }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
