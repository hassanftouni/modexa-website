"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import type { HomePage } from "@/content/pages";
import type { Localized } from "@/lib/content";

type Showcase = Localized<HomePage["hero"]["showcase"]>;
type View = "website" | "pos" | "automation";

const views: View[] = ["website", "pos", "automation"];
const INTERVAL_MS = 6000;

/**
 * Hero visual: three small, realistic previews of what Modexa builds.
 * Rotates automatically (paused on hover/focus and for reduced motion);
 * the tabs let visitors switch directly.
 */
export function HeroShowcase({ content }: { content: Showcase }) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState<View>("website");
  const [paused, setPaused] = useState(false);
  const autoplay = !reduceMotion && !paused;

  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => {
      setActive((current) => views[(views.indexOf(current) + 1) % views.length]);
    }, INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay]);

  return (
    <div
      className="card-surface relative overflow-hidden rounded-2xl shadow-card"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="flex items-center justify-between gap-4 border-b border-edge px-4 sm:px-5">
        <p className="hidden py-3 text-xs text-muted sm:block">{content.label}</p>
        <div role="tablist" aria-label={content.label} className="flex w-full sm:w-auto">
          {views.map((view) => {
            const selected = view === active;
            return (
              <button
                key={view}
                type="button"
                role="tab"
                id={`showcase-tab-${view}`}
                aria-selected={selected}
                aria-controls="showcase-panel"
                onClick={() => setActive(view)}
                className={`relative flex-1 px-3 py-3.5 text-xs font-medium transition-colors sm:flex-none sm:text-sm ${
                  selected ? "text-foreground" : "text-muted hover:text-soft"
                }`}
              >
                {content[view].tab}
                <span className="absolute inset-x-0 bottom-0 h-px bg-edge" aria-hidden="true">
                  {selected ? (
                    <motion.span
                      key={`${view}-${autoplay}`}
                      className="block h-full origin-left bg-brand rtl:origin-right"
                      initial={{ scaleX: autoplay ? 0 : 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: autoplay ? INTERVAL_MS / 1000 : 0, ease: "linear" }}
                    />
                  ) : null}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div
        id="showcase-panel"
        role="tabpanel"
        aria-labelledby={`showcase-tab-${active}`}
        className="relative h-[19rem] sm:h-[21rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            className="absolute inset-0 p-4 sm:p-6"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {active === "website" ? <WebsiteView content={content.website} /> : null}
            {active === "pos" ? <PosView /> : null}
            {active === "automation" ? (
              <AutomationView steps={content.automation.steps} animate={!reduceMotion} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <p className="border-t border-edge px-4 py-3 text-sm text-soft/80 sm:px-5" aria-live="polite">
        {content[active].caption}
      </p>
    </div>
  );
}

function WebsiteView({ content }: { content: Showcase["website"] }) {
  return (
    <div className="relative flex h-full gap-4">
      {/* Desktop browser */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-edge bg-background">
        <div className="flex items-center gap-2 border-b border-edge px-3 py-2">
          <span className="h-4 flex-1 rounded bg-foreground/[0.05] px-2 text-[10px] leading-4 text-muted" dir="ltr">
            yourbusiness.com
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="h-2.5 w-14 rounded-full bg-foreground/80" />
          <span className="flex gap-3 text-[10px] text-muted">
            {content.nav.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </span>
        </div>
        <div className="grid flex-1 grid-cols-[1.1fr_1fr] gap-4 px-4 pb-4">
          <div className="flex flex-col justify-center gap-3">
            <p className="display text-lg leading-tight sm:text-xl">{content.headline}</p>
            <span className="h-1.5 w-full rounded-full bg-foreground/10" />
            <span className="h-1.5 w-4/5 rounded-full bg-foreground/10" />
            <span className="mt-1 inline-flex w-fit rounded-md bg-brand px-2.5 py-1 text-[10px] font-semibold text-on-brand">
              {content.cta}
            </span>
          </div>
          <div className="rounded-md bg-[linear-gradient(160deg,#1d3045,#0f1a2b)]">
            <div className="grid h-full grid-cols-2 gap-1.5 p-2">
              <span className="rounded bg-foreground/[0.06]" />
              <span className="row-span-2 rounded bg-foreground/[0.09]" />
              <span className="rounded bg-foreground/[0.04]" />
            </div>
          </div>
        </div>
      </div>
      {/* Phone */}
      <div className="hidden w-24 shrink-0 flex-col self-end overflow-hidden rounded-2xl border border-edge-strong bg-background p-2 sm:flex">
        <span className="mx-auto mb-2 h-1 w-6 rounded-full bg-foreground/20" />
        <span className="h-1.5 w-10 rounded-full bg-foreground/70" />
        <p className="display mt-3 text-[11px] leading-tight">{content.headline}</p>
        <span className="mt-2 h-12 rounded bg-[linear-gradient(160deg,#1d3045,#0f1a2b)]" />
        <span className="mt-2 rounded bg-brand py-1 text-center text-[8px] font-semibold text-on-brand">
          {content.cta}
        </span>
      </div>
    </div>
  );
}

function PosView() {
  const { dict } = useI18n();
  const d = dict.posDemo;
  const tiles = [
    { name: d.items.chicken, price: 12 },
    { name: d.items.fattoush, price: 6.5 },
    { name: d.items.lemonade, price: 3.5 },
    { name: d.items.cake, price: 5 },
  ];
  const ticket = [
    { name: d.items.chicken, qty: 2, price: 12 },
    { name: d.items.lemonade, qty: 2, price: 3.5 },
  ];
  const total = ticket.reduce((sum, line) => sum + line.qty * line.price, 0);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted">{d.terminal}</span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-brand-accent">
          <Icon name="wifiOff" className="size-3" />
          {d.network.offline}
        </span>
      </div>
      <div className="grid min-h-0 flex-1 grid-cols-[1.2fr_1fr] gap-3">
        <div className="grid grid-cols-2 gap-2">
          {tiles.map((tile) => (
            <div key={tile.name} className="flex flex-col justify-between rounded-lg border border-edge bg-background p-2.5">
              <span className="text-[11px] leading-snug text-soft">{tile.name}</span>
              <span className="text-xs font-semibold tabular-nums" dir="ltr">
                ${tile.price.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col rounded-lg border border-edge bg-background p-3">
          <p className="text-[11px] font-medium text-muted">
            {d.ticket} · {d.table}
          </p>
          <ul className="mt-2 flex flex-1 flex-col gap-1.5">
            {ticket.map((line) => (
              <li key={line.name} className="flex justify-between gap-2 text-[11px]">
                <span className="text-soft">
                  <span dir="ltr">{line.qty}×</span> {line.name}
                </span>
                <span className="tabular-nums" dir="ltr">
                  ${(line.qty * line.price).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-between border-t border-edge pt-2 text-xs font-semibold">
            <span>{d.total}</span>
            <span className="tabular-nums" dir="ltr">${total.toFixed(2)}</span>
          </div>
          <span className="mt-2 rounded-md bg-brand py-1.5 text-center text-[11px] font-semibold text-on-brand">
            {d.sendOrder}
          </span>
        </div>
      </div>
      <p className="text-[11px] text-muted">{d.network.localOk}</p>
    </div>
  );
}

function AutomationView({ steps, animate }: { steps: string[]; animate: boolean }) {
  const icons = ["mail", "bot", "users"] as const;

  return (
    <ol className="relative flex h-full flex-col justify-center gap-5 ps-1">
      <span className="absolute top-8 bottom-8 start-[1.1rem] w-px bg-edge" aria-hidden="true" />
      {steps.map((step, index) => (
        <motion.li
          key={step}
          className="relative flex items-center gap-4"
          initial={{ opacity: animate ? 0.35 : 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: animate ? 0.5 + index * 0.9 : 0 }}
        >
          <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-edge-strong bg-surface text-brand-accent">
            <Icon name={icons[index] ?? "check"} className="size-4" />
          </span>
          <span className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-edge bg-background px-3.5 py-3 text-sm text-soft">
            {step}
            <motion.span
              initial={{ opacity: animate ? 0 : 1, scale: animate ? 0.6 : 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: animate ? 0.8 + index * 0.9 : 0 }}
              className="text-brand-accent"
            >
              <Icon name="check" className="size-4" />
            </motion.span>
          </span>
        </motion.li>
      ))}
    </ol>
  );
}
