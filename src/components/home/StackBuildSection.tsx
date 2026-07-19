"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";

/*
 * Scroll-driven stack build — scene two, directly after the name-assembly
 * hero. A 450vh wrapper pins a full-viewport stage where six isometric
 * slabs descend one by one into a platform tower:
 *
 *   t 0.02–0.08  section header fades in
 *   t 0.06–0.84  slab i (bottom → top) drops 380px along Z into its slot in
 *                a staggered window, firing a brief violet lock pulse as it
 *                lands and lighting its checklist row
 *   t 0.92–1.00  "STACK ONLINE" caption + under-glow fade in, then the
 *                sticky releases into the rest of the page
 *
 * Same conventions as the hero: local progress from the wrapper's offset,
 * one lerp-smoothed rAF loop gated by an IntersectionObserver, transform
 * and opacity only, fully reversible.
 */

const LAYERS = [
  "INFRASTRUCTURE",
  "DATABASE",
  "BACKEND",
  "API",
  "FRONTEND",
  "USERS",
] as const;

/* Timeline (fractions of the section's local progress). The header window
   sits just BELOW zero: progress is left unclamped pre-pin, so the header
   lights up while the stage is still sliding in under the hero — no dark
   dead zone at the scene change. */
const HEADER_IN: [number, number] = [-0.09, -0.015];
/** The header hands the stage over once the tower grows tall: it fades out
 *  before the upper slabs fly, so nothing ever crosses the headline. */
const HEADER_OUT: [number, number] = [0.32, 0.42];
const SLAB_START = 0.06;
const SLAB_STAGGER = 0.13;
const SLAB_LENGTH = 0.13;
/** Lock-pulse decay length after a slab lands. */
const PULSE_DECAY = 0.07;
const ONLINE_IN: [number, number] = [0.92, 0.98];

/** Tower geometry as fractions of the slab size, so phones keep the same
 *  proportions: Z gap between slabs and the drop height above each slot. */
const GAP_RATIO = 0.153;
const DROP_RATIO = 0.8;
/** CSS twin of GAP_RATIO for server-rendered slots (slab = min(300px, 62vmin)). */
const SLAB_GAP_CSS = "min(46px, 9.5vmin)";
/** Isometric tilt; rotateZ drifts from −45° to −27° across the scroll. */
const TILT_X = 56;
const ROT_Z_FROM = -45;
const ROT_Z_DRIFT = 18;
/** Scroll smoothing factor per frame (matches the hero). */
const LERP = 0.14;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const smoothstep = (edge0: number, edge1: number, v: number) => {
  const x = clamp01((v - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

const slabWindow = (i: number): [number, number] => {
  const start = SLAB_START + i * SLAB_STAGGER;
  return [start, start + SLAB_LENGTH];
};

const towerTransform = (t: number) =>
  `rotateX(${TILT_X}deg) rotateZ(${(ROT_Z_FROM + ROT_Z_DRIFT * t).toFixed(2)}deg)`;

const slabSlot = (i: number) => `translateZ(calc(${i} * ${SLAB_GAP_CSS}))`;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function SectionHeader() {
  return (
    <>
      <p className="font-label flex items-center justify-center gap-3 text-[11px] tracking-[0.34em] text-muted">
        <span
          className="inline-block h-px w-8 bg-[linear-gradient(90deg,#a855f7,#38bdf8)]"
          aria-hidden="true"
        />
        02 — HOW WE BUILD
      </p>
      <h2 className="hero-display mt-4 text-[clamp(1.5rem,4vw,2.9rem)] leading-[1.05] text-balance">
        Your platform, assembled layer by layer
      </h2>
    </>
  );
}

function OnlineCaption() {
  return (
    <>
      <p className="font-label text-gradient text-sm tracking-[0.4em]">
        STACK ONLINE
      </p>
      <p className="font-copy mt-3 text-sm leading-relaxed text-muted sm:text-base">
        Infrastructure to interface — one team, one build.
      </p>
    </>
  );
}

/** One slab plane of the tower; the pulse overlay carries the baked-in
 *  lock glow and is driven by opacity alone. */
function Slab({
  index,
  slabRef,
  pulseRef,
}: {
  index: number;
  slabRef?: (el: HTMLDivElement | null) => void;
  pulseRef?: (el: HTMLDivElement | null) => void;
}) {
  const top = index === LAYERS.length - 1;
  return (
    <div
      ref={slabRef}
      className={`stack-slab ${top ? "stack-slab-top" : ""}`}
      style={{ transform: slabSlot(index) }}
    >
      <span
        className={`font-label absolute top-4 left-5 text-[10px] tracking-[0.28em] ${
          top ? "text-foreground" : "text-muted"
        }`}
      >
        {LAYERS[index]}
      </span>
      <div ref={pulseRef} className="stack-pulse" style={{ opacity: 0 }} />
    </div>
  );
}

/** Reduced-motion fallback: the completed stack, no scroll sequence. */
function StaticStack() {
  return (
    <section
      aria-label="How we build — the Modexa stack"
      className="relative flex min-h-svh flex-col items-center justify-center gap-12 overflow-hidden px-6 py-24 text-center"
    >
      <div className="relative">
        <SectionHeader />
      </div>
      {/* The tower's 3D projection reaches well above its layout box —
          extra top margin keeps it clear of the header. */}
      <div className="stack-perspective relative mt-36">
        <div
          className="stack-underglow pointer-events-none absolute -inset-x-24 -bottom-16 h-40"
          aria-hidden="true"
        />
        <div
          className="stack-tower relative size-[min(300px,62vmin)]"
          style={{ transform: towerTransform(1) }}
        >
          {LAYERS.map((layer, i) => (
            <Slab key={layer} index={i} />
          ))}
        </div>
      </div>
      <div className="relative">
        <OnlineCaption />
      </div>
    </section>
  );
}

export function StackBuildSection() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );

  const wrapRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const towerRef = useRef<HTMLDivElement | null>(null);
  const underglowRef = useRef<HTMLDivElement | null>(null);
  const onlineRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const hudStateRef = useRef<HTMLSpanElement | null>(null);
  const hudPctRef = useRef<HTMLSpanElement | null>(null);
  const hudTickRef = useRef<HTMLSpanElement | null>(null);
  const slabRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRefs = useRef<(HTMLDivElement | null)[]>([]);
  const litRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reduced) return;

    const wrap = wrapRef.current;
    const header = headerRef.current;
    const tower = towerRef.current;
    const underglow = underglowRef.current;
    const online = onlineRef.current;
    const hud = hudRef.current;
    const hudState = hudStateRef.current;
    const hudPct = hudPctRef.current;
    const hudTick = hudTickRef.current;
    const slabs = slabRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const pulses = pulseRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );
    const lits = litRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );

    if (
      !wrap ||
      !header ||
      !tower ||
      !underglow ||
      !online ||
      !hud ||
      !hudState ||
      !hudPct ||
      !hudTick ||
      slabs.length !== LAYERS.length ||
      pulses.length !== LAYERS.length ||
      lits.length !== LAYERS.length
    ) {
      return;
    }

    let wrapTop = 0;
    let scrollRange = 1;
    let slabGap = 46;
    let dropHeight = 240;
    let rafId = 0;
    let smoothed = 0;
    let primed = false; // snap to the real position on the first frame
    let lastHudState = "";
    let lastHudPct = "";
    let disposed = false;
    let resizeQueued = false;

    // Unclamped on purpose: values below 0 drive the header's pre-pin
    // fade-in; everything else clamps locally.
    const readTarget = () => (window.scrollY - wrapTop) / scrollRange;

    const apply = (tRaw: number) => {
      const t = clamp01(tRaw);
      const headerIn = smoothstep(HEADER_IN[0], HEADER_IN[1], tRaw);
      const headerOut = smoothstep(HEADER_OUT[0], HEADER_OUT[1], t);
      header.style.opacity = (headerIn * (1 - headerOut)).toFixed(3);
      header.style.transform = `translate3d(0, ${(
        (1 - headerIn) * 18 -
        headerOut * 24
      ).toFixed(2)}px, 0)`;

      tower.style.transform = towerTransform(t);

      let locked = 0;
      for (let i = 0; i < LAYERS.length; i++) {
        const [start, land] = slabWindow(i);
        const drop = smoothstep(start, land, t);
        const z = i * slabGap + dropHeight * (1 - drop);
        slabs[i].style.transform = `translateZ(${z.toFixed(2)}px)`;
        // Delayed fade: the slab only really materialises once it is well
        // below the header zone.
        slabs[i].style.opacity = smoothstep(
          start + 0.02,
          start + SLAB_LENGTH * 0.62,
          t
        ).toFixed(3);

        const pulse =
          smoothstep(land - 0.004, land, t) *
          (1 - smoothstep(land, land + PULSE_DECAY, t));
        pulses[i].style.opacity = pulse.toFixed(3);

        const lit = smoothstep(land - 0.004, land + 0.004, t);
        lits[i].style.opacity = lit.toFixed(3);
        if (t >= land) locked += 1;
      }

      const onlineIn = smoothstep(ONLINE_IN[0], ONLINE_IN[1], t);
      online.style.opacity = onlineIn.toFixed(3);
      online.style.transform = `translate3d(0, ${((1 - onlineIn) * 14).toFixed(
        2
      )}px, 0)`;
      underglow.style.opacity = (onlineIn * 0.9).toFixed(3);

      const state =
        locked < LAYERS.length ? `LAYER ${locked}/6…` : "STACK ONLINE ✓";
      if (state !== lastHudState) {
        hudState.textContent = state;
        lastHudState = state;
      }
      const pct = `${String(Math.round(t * 100)).padStart(3, "0")}%`;
      if (pct !== lastHudPct) {
        hudPct.textContent = pct;
        lastHudPct = pct;
      }
      hudTick.style.transform = `scaleX(${t.toFixed(4)})`;
    };

    const measure = () => {
      wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      scrollRange = Math.max(1, wrap.offsetHeight - window.innerHeight);
      slabGap = tower.offsetWidth * GAP_RATIO;
      dropHeight = tower.offsetWidth * DROP_RATIO;
      apply(primed ? smoothed : readTarget());
    };

    const frame = () => {
      rafId = requestAnimationFrame(frame);
      const target = readTarget();
      if (!primed) {
        smoothed = target;
        primed = true;
      } else {
        smoothed += (target - smoothed) * LERP;
        if (Math.abs(target - smoothed) < 0.0005) smoothed = target;
      }
      apply(smoothed);
    };

    // Only run the loop while the section is on screen.
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        if (!rafId) rafId = requestAnimationFrame(frame);
      } else if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      }
    });

    const onResize = () => {
      if (resizeQueued) return;
      resizeQueued = true;
      requestAnimationFrame(() => {
        resizeQueued = false;
        if (!disposed) measure();
      });
    };

    measure();
    observer.observe(wrap);
    window.addEventListener("resize", onResize);

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  if (reduced) return <StaticStack />;

  return (
    <section
      ref={wrapRef}
      aria-label="How we build — the Modexa stack"
      className="stack-wrap relative h-[450vh]"
    >
      <noscript>
        <style>{`
          .stack-wrap { height: 100svh !important; }
          .stack-online { opacity: 1 !important; }
          .stack-lit { opacity: 1 !important; }
          .stack-hud { display: none !important; }
        `}</style>
      </noscript>

      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Section header — server-rendered visible, faded by the loop */}
        <div
          ref={headerRef}
          className="absolute inset-x-0 top-24 px-6 text-center"
        >
          <SectionHeader />
        </div>

        {/* Isometric tower, slightly below centre. The slabs are
            server-rendered in place; the loop lifts them out at t=0. */}
        <div
          className="stack-perspective absolute top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          aria-hidden="true"
        >
          <div
            ref={underglowRef}
            className="stack-underglow pointer-events-none absolute -inset-x-24 -bottom-16 h-40"
            style={{ opacity: 0 }}
          />
          <div
            ref={towerRef}
            className="stack-tower relative size-[min(300px,62vmin)]"
            style={{ transform: towerTransform(0) }}
          >
            {LAYERS.map((layer, i) => (
              <Slab
                key={layer}
                index={i}
                slabRef={(el) => {
                  slabRefs.current[i] = el;
                }}
                pulseRef={(el) => {
                  pulseRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>

        {/* Layer checklist — lights up as each slab locks in */}
        <ul
          aria-hidden="true"
          className="absolute top-1/2 left-8 hidden -translate-y-1/2 flex-col gap-3 min-[700px]:flex"
        >
          {LAYERS.map((layer, i) => (
            <li key={layer} className="relative">
              <span className="font-label flex items-center gap-3 text-[10px] tracking-[0.26em] text-muted/70">
                <span className="size-1.5 rounded-full border border-edge-strong" />
                {layer}
              </span>
              <span
                ref={(el) => {
                  litRefs.current[i] = el;
                }}
                className="stack-lit font-label absolute inset-0 flex items-center gap-3 text-[10px] tracking-[0.26em] text-foreground"
                style={{ opacity: 0 }}
              >
                <span className="size-1.5 rounded-full bg-[linear-gradient(90deg,#a855f7,#38bdf8)]" />
                {layer}
              </span>
            </li>
          ))}
        </ul>

        {/* Completion caption */}
        <div
          ref={onlineRef}
          className="stack-online absolute inset-x-0 bottom-[10vh] px-6 text-center"
          style={{ opacity: 0 }}
        >
          <OnlineCaption />
        </div>

        {/* HUD readout (same styling as the hero's) */}
        <div
          ref={hudRef}
          aria-hidden="true"
          className="stack-hud absolute right-6 bottom-6 hidden flex-col items-end gap-2 font-label text-[10px] tracking-[0.22em] text-muted sm:flex"
        >
          <div className="flex items-baseline gap-3">
            <span ref={hudStateRef}>LAYER 0/6…</span>
            <span ref={hudPctRef} className="text-foreground/80">
              000%
            </span>
          </div>
          <span className="block h-px w-28 bg-white/10">
            <span
              ref={hudTickRef}
              className="block h-full w-full origin-left bg-[linear-gradient(90deg,#a855f7,#38bdf8)]"
              style={{ transform: "scaleX(0)" }}
            />
          </span>
        </div>
      </div>
    </section>
  );
}
