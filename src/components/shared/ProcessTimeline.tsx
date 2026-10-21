"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "@/components/ui/icons";

interface Step {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Numbered steps on a single rule. The rule draws in once when the
 * timeline enters the viewport (horizontal on desktop, vertical on mobile).
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const reduceMotion = useReducedMotion();

  return (
    <ol
      className="relative grid gap-10 lg:gap-6"
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 12rem), 1fr))` }}
    >
      <motion.span
        aria-hidden="true"
        className="absolute top-5 hidden h-px origin-left bg-edge-strong lg:block rtl:origin-right"
        style={{ insetInline: "1.25rem" }}
        initial={{ scaleX: reduceMotion ? 1 : 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
      />
      {steps.map((step, index) => (
        <motion.li
          key={step.slug}
          className="relative flex gap-5 lg:flex-col lg:gap-6"
          initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45, delay: reduceMotion ? 0 : 0.15 + index * 0.12 }}
        >
          <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-edge-strong bg-background text-sm font-semibold tabular-nums">
            {index + 1}
          </span>
          <div className="flex flex-col gap-2">
            <h3 className="flex items-center gap-2 text-lg font-semibold">
              <Icon name={step.icon} className="size-4 text-brand-accent" />
              {step.title}
            </h3>
            <p className="leading-relaxed text-soft/75">{step.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
