"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

interface TiltRevealProps {
  children: ReactNode;
  className?: string;
  /** Initial backward tilt in degrees (straightens as it scrolls into view). */
  tilt?: number;
}

/**
 * Cinematic scroll-linked reveal for product mockups: the element starts
 * slightly tilted back in 3D and straightens/scales up as it enters the
 * viewport — inspired by high-end product launch pages.
 */
export function TiltReveal({ children, className, tilt = 16 }: TiltRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });
  const rotateX = useTransform(progress, [0, 1], [tilt, 0]);
  const scale = useTransform(progress, [0, 1], [0.93, 1]);

  if (reduceMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          rotateX,
          scale,
          transformOrigin: "center 85%",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
