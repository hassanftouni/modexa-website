"use client";

import { motion, useReducedMotion } from "motion/react";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { Button } from "@/components/ui/Button";
import { TiltReveal } from "@/components/ui/TiltReveal";
import { Icon } from "@/components/ui/icons";
import { PosMockup } from "@/components/products/PosMockup";

const headlineWords: { text: string; gradient?: boolean }[] = [
  { text: "Technology" },
  { text: "built" },
  { text: "for" },
  { text: "modern", gradient: true },
  { text: "businesses.", gradient: true },
];

export function Hero() {
  const reduceMotion = useReducedMotion();

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.21, 0.65, 0.36, 1] as const },
  });

  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="animate-drift pointer-events-none absolute -top-48 left-[10%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.25),transparent)] blur-3xl"
        aria-hidden="true"
      />
      <div
        className="animate-drift-slow pointer-events-none absolute top-24 -right-32 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(closest-side,rgba(63,162,247,0.18),transparent)] blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">
        <motion.div {...fadeUp(0)}>
          <AnimatedLogo size={64} />
        </motion.div>

        <motion.p
          {...fadeUp(0.08)}
          className="mt-6 inline-flex items-center gap-2 rounded-full border border-edge bg-white/[0.04] px-4 py-1.5 text-sm text-muted"
        >
          <span
            className="size-1.5 rounded-full bg-[linear-gradient(110deg,#a855f7,#3fa2f7)]"
            aria-hidden="true"
          />
          Software · Websites · AI · Automation
        </motion.p>

        {/* Cinematic word-by-word headline reveal */}
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.09, delayChildren: 0.25 },
            },
          }}
          className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl lg:leading-[1.05]"
        >
          {headlineWords.map((word) => (
            <motion.span
              key={word.text}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : "0.45em" },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.55,
                    ease: [0.21, 0.65, 0.36, 1] as const,
                  },
                },
              }}
              className={`inline-block whitespace-pre ${
                word.gradient ? "text-gradient" : ""
              }`}
            >
              {`${word.text} `}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          {...fadeUp(0.55)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl"
        >
          Modexa creates powerful software, intelligent AI agents, business
          automation and premium digital experiences that help companies work
          smarter and grow faster.
        </motion.p>

        <motion.div
          {...fadeUp(0.68)}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/services" size="lg">
            Explore Our Solutions
            <Icon name="arrowRight" className="size-4" />
          </Button>
          <Button href="/request-quote" variant="secondary" size="lg">
            Request a Quote
          </Button>
          <Button href="/products/modexa-pos" variant="ghost" size="lg">
            Discover Modexa POS
            <Icon name="arrowUpRight" className="size-4" />
          </Button>
        </motion.div>

        {/* Floating product interface preview */}
        <motion.div
          {...fadeUp(0.85)}
          className="relative mt-20 w-full max-w-4xl"
        >
          <div
            className="pointer-events-none absolute -inset-x-8 -top-10 bottom-0 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(99,102,241,0.16),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <TiltReveal tilt={14} className="relative">
            <PosMockup />
          </TiltReveal>

          {/* Floating AI agent card */}
          <div
            aria-hidden="true"
            className="animate-float card-surface absolute -left-10 top-10 hidden w-56 rounded-xl p-4 text-left backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name="bot" className="size-4" />
              </span>
              <p className="text-xs font-medium">AI Support Agent</p>
              <span className="ml-auto size-1.5 rounded-full bg-emerald-400" />
            </div>
            <p className="mt-3 rounded-lg bg-white/[0.05] p-2.5 text-[11px] leading-relaxed text-muted">
              “What are your opening hours?”
            </p>
            <p className="mt-2 rounded-lg bg-[linear-gradient(110deg,rgba(168,85,247,0.18),rgba(63,162,247,0.18))] p-2.5 text-[11px] leading-relaxed text-foreground/90">
              We’re open daily from 9:00 to 22:00. Would you like to book a
              table?
            </p>
          </div>

          {/* Floating website build card */}
          <div
            aria-hidden="true"
            className="animate-float-delayed card-surface absolute -right-10 bottom-8 hidden w-52 rounded-xl p-4 text-left backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name="globe" className="size-4" />
              </span>
              <p className="text-xs font-medium">Website deployed</p>
            </div>
            <div className="mt-3 flex flex-col gap-1.5">
              {["Build completed", "Performance 98/100", "Live on Vercel"].map(
                (line) => (
                  <p
                    key={line}
                    className="flex items-center gap-1.5 text-[11px] text-muted"
                  >
                    <Icon name="check" className="size-3 text-emerald-400" />
                    {line}
                  </p>
                )
              )}
            </div>
          </div>

          {/* Floating automation card */}
          <div
            aria-hidden="true"
            className="animate-float card-surface absolute -top-8 right-16 hidden w-44 rounded-xl p-3.5 text-left backdrop-blur-md lg:block"
          >
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-md border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name="workflow" className="size-3.5" />
              </span>
              <p className="text-[11px] font-medium">Workflow automated</p>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-muted">
              New lead → CRM → follow-up email sent
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
