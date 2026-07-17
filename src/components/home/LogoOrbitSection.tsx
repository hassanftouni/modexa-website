"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useId, useRef } from "react";

/*
 * Full-page scroll-scrubbed brand moment: the two stripes of the Modexa X
 * orbit the page in opposite circular paths, spiralling inward as the visitor
 * scrolls, until they meet and lock into the complete X with the wordmark.
 * Scrolling back up reverses the whole choreography. This is a NEW section —
 * the small Logo / AnimatedLogo components used elsewhere are untouched.
 */

/** How many circles each stripe travels while spiralling in. */
const TURNS = 1.25;
/** Orbit start radius in vmin (shrinks to 0 as the X assembles). */
const START_RADIUS = 40;
/** Extra self-rotation of each stripe while travelling (degrees). */
const SPIN = 540;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Orbit path for one stripe: position (vmin), self-rotation and scale. */
function useOrbit(progress: MotionValue<number>, startAngleDeg: number, direction: 1 | -1) {
  const x = useTransform(progress, (p) => {
    const t = clamp01(p);
    const angle = ((startAngleDeg + t * 360 * TURNS) * Math.PI) / 180;
    return `${Math.cos(angle) * START_RADIUS * (1 - t)}vmin`;
  });
  const y = useTransform(progress, (p) => {
    const t = clamp01(p);
    const angle = ((startAngleDeg + t * 360 * TURNS) * Math.PI) / 180;
    return `${Math.sin(angle) * START_RADIUS * (1 - t)}vmin`;
  });
  const rotate = useTransform(progress, (p) => direction * SPIN * (1 - clamp01(p)));
  const scale = useTransform(progress, (p) => 0.72 + 0.28 * clamp01(p));
  return { x, y, rotate, scale };
}

export function LogoOrbitSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const gradientId = useId();
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  // Gradient stripe starts at the top of the orbit, white stripe opposite.
  const gradientStripe = useOrbit(progress, -90, 1);
  const whiteStripe = useOrbit(progress, 90, -1);

  const stripesOpacity = useTransform(progress, [0, 0.05], [0, 1]);
  const glowOpacity = useTransform(progress, [0.55, 1], [0, 1]);
  const wordmarkOpacity = useTransform(progress, [0.82, 0.97], [0, 1]);
  const wordmarkY = useTransform(progress, [0.82, 0.97], [18, 0]);

  const gradientDefs = (
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
  );

  // Reduced motion: one calm screen with the assembled logo, no scrub journey.
  if (reduceMotion) {
    return (
      <section
        aria-label="Modexa"
        className="relative flex h-dvh flex-col items-center justify-center gap-8 overflow-hidden"
      >
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <svg
          viewBox="0 0 512 512"
          fill="none"
          aria-hidden="true"
          className="relative size-[min(46vmin,20rem)]"
        >
          {gradientDefs}
          <line x1="148" y1="132" x2="364" y2="380" stroke={`url(#${gradientId})`} strokeWidth="64" strokeLinecap="round" />
          <line x1="364" y1="132" x2="148" y2="380" stroke="#FFFFFF" strokeWidth="64" strokeLinecap="round" />
        </svg>
        <p className="relative text-2xl font-semibold tracking-[0.35em] uppercase">
          Modexa
        </p>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Modexa"
      className="relative h-[300vh]"
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />

        {/* Glow that builds as the X locks together */}
        <motion.div
          style={{ opacity: glowOpacity }}
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(124,93,247,0.3),transparent)] blur-3xl"
        />

        {/* Assembly stage — slightly below center so the stripes "meet at the bottom" */}
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative size-[min(52vmin,24rem)] translate-y-[5vh]">
            {/* Gradient stripe */}
            <motion.div
              style={{ ...gradientStripe, opacity: stripesOpacity, willChange: "transform" }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 512 512" fill="none" className="h-full w-full overflow-visible">
                {gradientDefs}
                <line x1="148" y1="132" x2="364" y2="380" stroke={`url(#${gradientId})`} strokeWidth="64" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* White stripe */}
            <motion.div
              style={{
                x: whiteStripe.x,
                y: whiteStripe.y,
                rotate: whiteStripe.rotate,
                scale: whiteStripe.scale,
                opacity: stripesOpacity,
                willChange: "transform",
              }}
              className="absolute inset-0"
            >
              <svg viewBox="0 0 512 512" fill="none" className="h-full w-full overflow-visible">
                <line x1="364" y1="132" x2="148" y2="380" stroke="#FFFFFF" strokeWidth="64" strokeLinecap="round" />
              </svg>
            </motion.div>

            {/* Wordmark reveal once the X is formed */}
            <motion.p
              style={{ opacity: wordmarkOpacity, y: wordmarkY }}
              className="absolute inset-x-0 -bottom-20 text-center text-2xl font-semibold tracking-[0.35em] text-foreground uppercase sm:-bottom-24 sm:text-3xl"
            >
              Modexa
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
