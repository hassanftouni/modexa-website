"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import type { PosWalkthroughContent } from "@/content/pages";
import type { Localized } from "@/lib/content";

/*
 * Animated walkthrough over the real Modexa POS checkout screenshot.
 *
 * The screenshot is never altered: sample-data overlays are layered on top
 * of it at the exact positions of the real interface (scan field, product
 * area, cart, totals, Pay & Complete, status bar). All geometry is in % of
 * the screenshot and all overlay text is sized in container-query units
 * (cqw), so the scene looks identical at every width.
 *
 * Text inside the screenshot stays in English because the real POS screen
 * is English; step names, captions and controls around it are localized.
 *
 * On narrow screens a "camera" zooms and pans to the active area so the
 * overlays stay readable. Autoplay starts when the section is visible and
 * is disabled for visitors who prefer reduced motion.
 */

type Rect = { x: number; y: number; w: number; h: number };
type Point = { x: number; y: number };

interface StepDef {
  /** Overlays visible in this step. */
  show: Overlay[];
  /** Outline drawn around the area being used. */
  focus?: Rect;
  /** Where the "tap" ripple appears. */
  tap?: Point;
  /** Area the mobile camera frames. */
  camera: Rect;
  /** How long the step stays on screen during autoplay. */
  duration: number;
}

type Overlay =
  | "scan"
  | "products"
  | "itemCount"
  | "cart"
  | "totals"
  | "payReady"
  | "alert"
  | "paid"
  | "receipt"
  | "offline";

const SCAN_TEXT = "8901234567890 · Cappuccino";

const STEPS: StepDef[] = [
  // 0 · Ready
  { show: [], camera: { x: 0, y: 0, w: 100, h: 100 }, duration: 3200 },
  // 1 · Scan
  {
    show: ["scan"],
    focus: { x: 1.8, y: 5.8, w: 47, h: 8.8 },
    tap: { x: 30, y: 10.4 },
    camera: { x: 1, y: 2, w: 50, h: 30 },
    duration: 3800,
  },
  // 2 · Products
  {
    show: ["scan", "products"],
    focus: { x: 17.6, y: 33, w: 32, h: 61 },
    tap: { x: 26.5, y: 41 },
    camera: { x: 0, y: 25, w: 52, h: 72 },
    duration: 3800,
  },
  // 3 · Order & totals
  {
    show: ["products", "itemCount", "cart", "totals", "payReady"],
    focus: { x: 50.7, y: 19.8, w: 48.3, h: 60.2 },
    tap: { x: 37.5, y: 41 },
    camera: { x: 50, y: 2, w: 50, h: 92 },
    duration: 4200,
  },
  // 4 · Low stock
  {
    show: ["products", "itemCount", "cart", "totals", "payReady", "alert"],
    focus: { x: 18.6, y: 79.5, w: 30, h: 10 },
    camera: { x: 12, y: 55, w: 42, h: 42 },
    duration: 3800,
  },
  // 5 · Pay & print
  {
    show: ["products", "itemCount", "cart", "totals", "payReady", "paid", "receipt"],
    focus: { x: 70.4, y: 84.6, w: 28, h: 7.8 },
    tap: { x: 84, y: 88.5 },
    camera: { x: 30, y: 18, w: 58, h: 62 },
    duration: 5200,
  },
  // 6 · Offline
  {
    show: ["products", "itemCount", "cart", "totals", "payReady", "offline"],
    focus: { x: 56.8, y: 94.6, w: 16.4, h: 3.8 },
    camera: { x: 0, y: 14, w: 76, h: 86 },
    duration: 4400,
  },
];

const products = [
  { name: "Cappuccino", price: "$3.00", initial: "C" },
  { name: "Latte", price: "$3.50", initial: "L" },
  { name: "Americano", price: "$2.50", initial: "A" },
  { name: "Water", price: "$1.00", initial: "W" },
];

const pct = (n: number) => `${n}%`;
const box = (r: Rect): CSSProperties => ({
  left: pct(r.x),
  top: pct(r.y),
  width: pct(r.w),
  height: pct(r.h),
});
/** Font size relative to the screenshot width (1cqw = 1% of it). */
const fs = (n: number): CSSProperties => ({ fontSize: `${n}cqw` });

export function PosWalkthrough({ content }: { content: Localized<PosWalkthroughContent> }) {
  const { dict } = useI18n();
  const t = dict.walkthrough;
  const reduceMotion = useReducedMotion() ?? false;

  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });

  const [step, setStep] = useState(0);
  // null = default: play automatically unless the visitor prefers reduced motion.
  const [playingChoice, setPlayingChoice] = useState<boolean | null>(null);
  const [compact, setCompact] = useState(false);

  const playing = playingChoice ?? !reduceMotion;
  const autoplay = playing && inView;
  const def = STEPS[step];
  const visible = (overlay: Overlay) => def.show.includes(overlay);
  const steps = content.steps.slice(0, STEPS.length);

  // Advance automatically while visible and playing.
  useEffect(() => {
    if (!autoplay) return;
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % STEPS.length), def.duration);
    return () => window.clearTimeout(timer);
  }, [autoplay, step, def.duration]);

  // Switch to the zooming camera when the screenshot is too small to read.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setCompact(entry.contentRect.width < 640));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    setPlayingChoice(false);
    setStep(index);
  }

  function replay() {
    setStep(0);
    setPlayingChoice(true);
  }

  // Camera: scale so the active area fills the frame, then pan it to the centre.
  const cam = compact ? def.camera : STEPS[0].camera;
  const scale = Math.min(100 / cam.w, 100 / cam.h, 2.4);
  const clamp = (v: number, min: number) => Math.min(0, Math.max(min, v));
  const tx = clamp(50 - (cam.x + cam.w / 2) * scale, 100 - 100 * scale);
  const ty = clamp(50 - (cam.y + cam.h / 2) * scale, 100 - 100 * scale);

  const fade = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 6 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0 },
    transition: { duration: reduceMotion ? 0 : 0.35, ease: [0.22, 0.61, 0.36, 1] as const },
  };

  return (
    <div ref={rootRef} className="flex flex-col gap-5">
      {/* Screenshot stage */}
      <div
        ref={stageRef}
        className="relative aspect-[1366/767] w-full overflow-hidden rounded-xl border border-edge-strong bg-[#e8e4f1] shadow-card"
        style={{ containerType: "inline-size" }}
      >
        <motion.div
          className="absolute inset-0 origin-top-left"
          animate={{ scale, x: pct(tx), y: pct(ty) }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
        >
          <Image
            src={content.image}
            alt={content.imageAlt}
            fill
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="select-none object-cover"
            draggable={false}
          />

          {/* Everything below is sample data drawn over the real interface. */}
          <div dir="ltr" lang="en" className="absolute inset-0 text-[#1e344a]" aria-hidden="true">
            <AnimatePresence>
              {visible("scan") ? (
                <motion.div
                  key="scan"
                  {...fade}
                  className="absolute flex items-center rounded-[0.6cqw] bg-[#faf8fd]"
                  style={{ ...box({ x: 2.3, y: 6.7, w: 46, h: 7.2 }), paddingLeft: "1.1cqw" }}
                >
                  <TypedText key={step} text={SCAN_TEXT} animate={step === 1 && !reduceMotion} />
                </motion.div>
              ) : null}

              {visible("products") ? (
                <motion.div
                  key="products"
                  {...fade}
                  className="absolute grid grid-cols-2 content-start gap-[1cqw] rounded-[0.6cqw] bg-[#e8e4f1] p-[0.9cqw]"
                  style={box({ x: 17.9, y: 33.4, w: 31.6, h: 60 })}
                >
                  {products.map((product, index) => {
                    const picked = step >= 3 && index < 2;
                    return (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.94 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: reduceMotion ? 0 : 0.08 * index }}
                        className={`flex items-center gap-[0.8cqw] rounded-[0.6cqw] border bg-white p-[0.8cqw] shadow-[0_0.2cqw_0.6cqw_rgba(21,42,64,0.06)] ${
                          picked ? "border-[#06b6d4]" : "border-[#d8d6e2]"
                        }`}
                      >
                        <span
                          className="flex aspect-square w-[2.6cqw] shrink-0 items-center justify-center rounded-[0.5cqw] bg-[#d9f0f6] font-semibold text-[#147b98]"
                          style={fs(1.1)}
                        >
                          {product.initial}
                        </span>
                        <span className="leading-tight" style={fs(0.95)}>
                          {product.name}
                          <b className="block">{product.price}</b>
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : null}

              {visible("itemCount") ? (
                <motion.div
                  key="itemCount"
                  {...fade}
                  className="absolute flex items-center justify-center rounded-full bg-[#d2f6ef] font-mono font-semibold text-[#0b6867]"
                  style={{ ...box({ x: 94, y: 3, w: 4.2, h: 2.1 }), ...fs(0.62) }}
                >
                  2 items
                </motion.div>
              ) : null}

              {visible("cart") ? (
                <motion.div
                  key="cart"
                  {...fade}
                  className="absolute bg-white px-[1.4cqw] pt-[1.2cqw]"
                  style={box({ x: 51.4, y: 20.4, w: 46.6, h: 45.6 })}
                >
                  <p className="mb-[0.8cqw] flex justify-between font-semibold" style={fs(1.05)}>
                    Current order
                    <span className="font-normal text-[#5b7c8a]" style={fs(0.85)}>
                      Walk-in · USD
                    </span>
                  </p>
                  {products.slice(0, 2).map((product, index) => (
                    <motion.div
                      key={product.name}
                      initial={{ opacity: 0, x: reduceMotion ? 0 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.35, delay: reduceMotion ? 0 : 0.25 + index * 0.45 }}
                      className="flex items-center justify-between border-b border-[#e4ebf2] py-[0.75cqw]"
                      style={fs(0.98)}
                    >
                      <span>
                        <b>{product.name}</b>
                        <small className="block text-[#667b91]" style={fs(0.8)}>
                          1 × {product.price}
                        </small>
                      </span>
                      <span className="rounded-[0.4cqw] bg-[#e4f3f8] px-[0.6cqw] py-[0.25cqw] text-[#036d86]">
                        {product.price}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              ) : null}

              {visible("totals") ? (
                <motion.div
                  key="totals"
                  {...fade}
                  className="absolute bg-white px-[0.1cqw] font-mono text-[#2b384e]"
                  style={{ ...box({ x: 51.3, y: 67.4, w: 47.3, h: 11.8 }), paddingRight: "0.25cqw", ...fs(0.9) }}
                >
                  <Row label="Subtotal:" value="$6.50" />
                  <Row label="Tax (11%):" value="$0.72" />
                  <div className="my-[0.2cqw] border-t border-[#d9dee5]" />
                  <Row label="Total:" value="$7.22" strong />
                  <Row label="LBP:" value="646,190" className="text-[#14896f]" />
                </motion.div>
              ) : null}

              {visible("payReady") ? (
                <motion.div
                  key="payReady"
                  {...fade}
                  className="absolute flex items-center justify-center rounded-[0.8cqw] bg-[#0f8f9f] font-bold text-white"
                  style={{ ...box({ x: 70.6, y: 85, w: 27.6, h: 7.2 }), ...fs(1.25) }}
                >
                  Pay &amp; Complete · $7.22
                </motion.div>
              ) : null}

              {visible("alert") ? (
                <motion.div
                  key="alert"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.4 }}
                  className="absolute flex items-center gap-[0.7cqw] rounded-[0.6cqw] border border-[#f3b89f] bg-[#fff3ea] px-[1cqw] text-[#a8441f] shadow-[0_0.3cqw_1cqw_rgba(184,94,61,0.15)]"
                  style={{ ...box({ x: 19.2, y: 80.6, w: 28.8, h: 7.8 }), ...fs(0.9) }}
                >
                  <Icon name="alert" className="size-[1.4cqw] shrink-0" />
                  <span>
                    <b>Low stock</b> · Cappuccino beans: 3 left
                  </span>
                </motion.div>
              ) : null}

              {visible("paid") ? (
                <motion.div
                  key="paid"
                  {...fade}
                  className="absolute inset-0 bg-[#0b1220]/25"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : 0.5 }}
                    className="absolute flex flex-col items-center rounded-[1.2cqw] border border-[#9fdcd2] bg-white px-[2cqw] py-[1.6cqw] text-center text-[#184f4a] shadow-[0_1cqw_3cqw_rgba(11,18,32,0.3)]"
                    style={{ left: "36%", top: "30%", width: "27%" }}
                  >
                    <span className="mb-[0.8cqw] flex aspect-square w-[3.6cqw] items-center justify-center rounded-full bg-[#0f9c87] text-white">
                      <Icon name="check" className="size-[2cqw]" />
                    </span>
                    <b style={fs(1.4)}>Payment complete</b>
                    <span className="mt-[0.3cqw] text-[#4b6b70]" style={fs(0.95)}>
                      $7.22 · Cash USD
                    </span>
                    <span
                      className="mt-[1cqw] flex items-center gap-[0.5cqw] rounded-full bg-[#e6f6f4] px-[0.9cqw] py-[0.3cqw] text-[#0b6867]"
                      style={fs(0.8)}
                    >
                      <Icon name="printer" className="size-[1.1cqw]" />
                      Order #1042 sent to kitchen
                    </span>
                  </motion.div>
                </motion.div>
              ) : null}

              {visible("receipt") ? (
                <motion.div
                  key="receipt"
                  initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
                  animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 1.1, delay: reduceMotion ? 0 : 1, ease: "easeOut" }}
                  className="absolute rounded-b-[0.5cqw] bg-[#fbfdfe] px-[1.2cqw] py-[1cqw] font-mono text-[#1b3b4c] shadow-[0_0.8cqw_2.4cqw_rgba(25,59,86,0.3)]"
                  style={{ ...box({ x: 66.5, y: 22, w: 17, h: 52 }), ...fs(0.82) }}
                >
                  <p className="text-center font-bold">MODEXA POS</p>
                  <p className="text-center">Receipt #1042</p>
                  <Dashed />
                  <Row label="Cappuccino" value="$3.00" />
                  <Row label="Latte" value="$3.50" />
                  <Row label="Tax 11%" value="$0.72" />
                  <Dashed />
                  <Row label="Total" value="$7.22" strong />
                  <Row label="LBP" value="646,190" />
                  <Dashed />
                  <p className="text-center">Thank you!</p>
                </motion.div>
              ) : null}

              {visible("offline") ? (
                <motion.div key="offline" {...fade}>
                  <div
                    className="absolute flex items-center gap-[1cqw] rounded-[0.8cqw] border border-[#7fd1c4] bg-[#e9f8f5] px-[1.4cqw] text-[#0b5e57]"
                    style={{ ...box({ x: 1, y: 17.6, w: 48.4, h: 8 }), ...fs(1) }}
                  >
                    <Icon name="wifiOff" className="size-[1.8cqw] shrink-0" />
                    <span>
                      <b>Internet is down</b> — still selling on the local network
                    </span>
                  </div>
                  <div
                    className="absolute flex items-center justify-center gap-[0.5cqw] rounded-[0.4cqw] border border-[#7fd1c4] bg-[#e9f8f5] font-mono text-[#0b5e57]"
                    style={{ ...box({ x: 57.3, y: 95.2, w: 15.4, h: 2.6 }), ...fs(0.68) }}
                  >
                    <Icon name="wifiOff" className="size-[1cqw]" />
                    Offline · Local network OK
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Focus outline and tap ripple */}
            <AnimatePresence>
              {def.focus ? (
                <motion.div
                  key="focus"
                  className="pointer-events-none absolute rounded-[0.8cqw] border-2 border-[#06b6d4] shadow-[0_0_0_0.5cqw_rgba(6,182,212,0.16)]"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    left: pct(def.focus.x),
                    top: pct(def.focus.y),
                    width: pct(def.focus.w),
                    height: pct(def.focus.h),
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.65, 0, 0.35, 1] }}
                />
              ) : null}
            </AnimatePresence>
            {def.tap ? (
              <span
                key={`tap-${step}`}
                className="pointer-events-none absolute"
                style={{ left: pct(def.tap.x), top: pct(def.tap.y) }}
              >
                <motion.span
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#06b6d4]"
                  style={{ width: "3cqw", height: "3cqw" }}
                  initial={{ scale: 0.4, opacity: 0.9 }}
                  animate={reduceMotion ? { scale: 1, opacity: 0.6 } : { scale: [0.4, 1.6], opacity: [0.9, 0] }}
                  transition={{ duration: 1.1, delay: 0.4, repeat: reduceMotion ? 0 : 2, repeatDelay: 0.3 }}
                />
                <span
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#06b6d4]/80"
                  style={{ width: "1cqw", height: "1cqw" }}
                />
              </span>
            ) : null}
          </div>
        </motion.div>
      </div>

      {/* Caption + controls */}
      <div className="flex flex-col gap-4">
        <p className="min-h-[3.5rem] text-lg leading-relaxed text-soft/90 sm:min-h-0" aria-live="polite">
          <span className="me-2 text-sm font-semibold text-brand-accent tabular-nums">
            {step + 1}/{steps.length}
          </span>
          {steps[step]?.caption}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex shrink-0 gap-2">
            <ControlButton
              onClick={() => setPlayingChoice(!playing)}
              label={playing ? t.pause : t.play}
              icon={playing ? "pause" : "play"}
            />
            <ControlButton onClick={replay} label={t.replay} icon="refresh" />
          </div>

          <div
            role="group"
            aria-label={t.steps}
            className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 sm:flex-wrap sm:overflow-visible"
          >
            {steps.map((item, index) => {
              const active = index === step;
              return (
                <button
                  key={item.label}
                  type="button"
                  aria-pressed={active}
                  aria-label={`${t.step} ${index + 1}: ${item.label}`}
                  onClick={() => goTo(index)}
                  className={`relative shrink-0 overflow-hidden rounded-lg border px-3 py-2 text-sm transition-colors ${
                    active
                      ? "border-foreground/40 bg-surface text-foreground"
                      : "border-edge text-muted hover:border-edge-strong hover:text-soft"
                  }`}
                >
                  {item.label}
                  {active && autoplay ? (
                    <motion.span
                      key={`progress-${step}`}
                      className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand rtl:origin-right"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: STEPS[step].duration / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted">{content.note}</p>
      </div>
    </div>
  );
}

/** Barcode typed character by character; remounted (via key) on each step. */
function TypedText({ text, animate }: { text: string; animate: boolean }) {
  const [count, setCount] = useState(animate ? 0 : text.length);

  useEffect(() => {
    if (!animate) return;
    const timer = window.setInterval(() => {
      setCount((n) => (n >= text.length ? n : n + 1));
    }, 55);
    return () => window.clearInterval(timer);
  }, [animate, text.length]);

  return (
    <span className="font-mono whitespace-nowrap text-[#22394c]" style={fs(1.1)}>
      {text.slice(0, count)}
      <span className="ms-px inline-block h-[1.3cqw] w-px translate-y-[0.2cqw] animate-pulse bg-[#0891b2]" />
    </span>
  );
}

function Row({
  label,
  value,
  strong,
  className = "",
}: {
  label: string;
  value: string;
  strong?: boolean;
  className?: string;
}) {
  return (
    <p className={`flex justify-between py-[0.15cqw] ${strong ? "font-bold" : ""} ${className}`}>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  );
}

function Dashed() {
  return <div className="my-[0.6cqw] border-t border-dashed border-[#a9bec8]" />;
}

function ControlButton({
  onClick,
  label,
  icon,
}: {
  onClick: () => void;
  label: string;
  icon: "play" | "pause" | "refresh";
}): ReactNode {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-2 rounded-lg border border-edge-strong px-3.5 text-sm font-medium text-foreground transition-colors hover:border-foreground/50"
    >
      <Icon name={icon} className="size-4" />
      {label}
    </button>
  );
}
