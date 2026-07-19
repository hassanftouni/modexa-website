"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";

/*
 * Scroll-driven name assembly.
 *
 * A 760vh wrapper pins a full-viewport stage. Scroll progress t (0→1) drives
 * the whole choreography through a single requestAnimationFrame loop that
 * writes transform/opacity only — scrolling up plays everything backwards:
 *
 *   t 0.00–0.04  the six parts of MODEXA float scattered across the stage
 *   t 0.04–0.80  letter-by-letter tour: each part glides into the spotlight
 *                with a caption naming the service it stands for
 *   t 0.81–0.93  assembly — every part flies into its slot in the wordmark,
 *                the X locking last as its two stripes snap together
 *   t 0.94–1.00  tagline and CTAs fade in under the assembled name
 */

const GLYPHS = ["M", "O", "D", "E", "X", "A"] as const;
/** The X is not a glyph — it renders as the two brand stripes. */
const X_INDEX = 4;

interface Part {
  tag: string;
  title: string;
  copy: string;
}

const PARTS: Part[] = [
  {
    tag: "PART 01/06",
    title: "Mobile & Web Apps",
    copy: "Native apps and web platforms engineered for speed, polish and scale.",
  },
  {
    tag: "PART 02/06",
    title: "Operations & Cloud",
    copy: "Infrastructure, DevOps and cloud operations that keep your business always on.",
  },
  {
    tag: "PART 03/06",
    title: "Data & AI",
    copy: "Pipelines, analytics and AI agents that turn raw data into decisions.",
  },
  {
    tag: "PART 04/06",
    title: "E-commerce Platforms",
    copy: "Storefronts and checkout experiences built to convert, retain and grow.",
  },
  {
    tag: "PART 05/06",
    title: "The Mark",
    copy: "Two stripes, one signature — where every discipline intersects.",
  },
  {
    tag: "PART 06/06",
    title: "Automation & Support",
    copy: "Workflow automation and human support that keep everything running.",
  },
];

/**
 * Scattered pose per letter: offsets from the scatter anchor as fractions of
 * stage size, base rotation/scale, and a float speed (rad/s) + phase so every
 * piece drifts on its own rhythm. The cluster is anchored above the caption
 * band so drifting pieces never collide with the tour captions.
 */
const SCATTER_CY = 0.4;
const SCATTER = [
  { x: -0.36, y: -0.2, r: -12, s: 0.62, fs: 0.55, fp: 0.0 },
  { x: 0.33, y: -0.26, r: 10, s: 0.58, fs: 0.62, fp: 1.7 },
  { x: -0.32, y: 0.18, r: 8, s: 0.66, fs: 0.5, fp: 3.1 },
  { x: 0.36, y: 0.12, r: -10, s: 0.6, fs: 0.68, fp: 4.4 },
  { x: 0.2, y: -0.16, r: 14, s: 0.64, fs: 0.58, fp: 5.6 },
  { x: -0.1, y: 0.2, r: -8, s: 0.62, fs: 0.64, fp: 0.9 },
];

/* Timeline (fractions of total scroll progress). */
const TOUR_START = 0.04;
const TOUR_END = 0.8;
const TOUR_WINDOW = (TOUR_END - TOUR_START) / GLYPHS.length;
const ASSEMBLE_START = 0.81;
const ASSEMBLE_STAGGER = 0.012;
const ASSEMBLE_LENGTH = 0.06;
/** Per-letter assembly rank — the X flies home last. */
const ASSEMBLY_ORDER = [0, 1, 2, 3, 5, 4];
/** The X's stripes snap together right at the end of its flight home. */
const X_LOCK_START = 0.905;
const X_LOCK_END = 0.932;
const FINALE_START = 0.94;

const SPOT_SCALE = 1.75;
/** Spotlight centre as a fraction of stage height. */
const SPOT_Y = 0.36;
/** Scroll smoothing factor per frame. */
const LERP = 0.14;
/** Diagonal angle of the X stripes (matches the .hero-x box ratio). */
const X_ANGLE = 44;

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

const smoothstep = (edge0: number, edge1: number, v: number) => {
  const x = clamp01((v - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

const mix = (a: number, b: number, m: number) => a + (b - a) * m;

const stripeJoined = (sign: 1 | -1) =>
  `translate(-50%, -50%) rotate(${sign * X_ANGLE}deg)`;

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mediaQuery = window.matchMedia(REDUCED_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

/** The two rounded stripes that form the X of the wordmark. */
function XStripes({
  gradRef,
  whiteRef,
}: {
  gradRef?: (el: HTMLSpanElement | null) => void;
  whiteRef?: (el: HTMLSpanElement | null) => void;
}) {
  return (
    <span className="hero-x">
      <span
        ref={gradRef}
        className="hero-stripe hero-stripe-grad"
        style={{ transform: stripeJoined(1) }}
      />
      <span
        ref={whiteRef}
        className="hero-stripe hero-stripe-white"
        style={{ transform: stripeJoined(-1) }}
      />
    </span>
  );
}

function FinaleContent() {
  return (
    <>
      <p className="hero-display text-2xl tracking-[0.04em] sm:text-3xl">
        Software, <span className="text-gradient">assembled.</span>
      </p>
      <p className="font-copy max-w-xl text-base leading-relaxed text-muted">
        Six disciplines, one team. Modexa designs, builds and runs the systems
        your business depends on.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button href="/request-quote" size="lg">
          Start a Project
        </Button>
        <Button href="/portfolio" variant="secondary" size="lg">
          See Our Work
        </Button>
      </div>
    </>
  );
}

/** Reduced-motion fallback: the assembled result, no scroll sequence. */
function StaticHero() {
  return (
    <section
      aria-label="Modexa — software, assembled"
      className="relative flex min-h-svh flex-col items-center justify-center gap-7 overflow-hidden px-6 py-28 text-center"
    >
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <h1
        aria-label="Modexa"
        className="hero-display hero-wordmark relative flex items-baseline gap-[0.045em]"
      >
        {GLYPHS.map((glyph, i) => (
          <span key={glyph} className="hero-letter" aria-hidden="true">
            {i === X_INDEX ? <XStripes /> : glyph}
          </span>
        ))}
      </h1>
      <div className="relative flex flex-col items-center gap-7">
        <FinaleContent />
      </div>
    </section>
  );
}

export function AssemblyHero() {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false
  );

  const wrapRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const wordmarkRef = useRef<HTMLHeadingElement | null>(null);
  const bloomRef = useRef<HTMLSpanElement | null>(null);
  const lightRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const hudStateRef = useRef<HTMLSpanElement | null>(null);
  const hudPctRef = useRef<HTMLSpanElement | null>(null);
  const hudTickRef = useRef<HTMLSpanElement | null>(null);
  const finaleRef = useRef<HTMLDivElement | null>(null);
  const stripeGradRef = useRef<HTMLSpanElement | null>(null);
  const stripeWhiteRef = useRef<HTMLSpanElement | null>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (reduced) return;

    const wrap = wrapRef.current;
    const stage = stageRef.current;
    const wordmark = wordmarkRef.current;
    const bloom = bloomRef.current;
    const light = lightRef.current;
    const cue = cueRef.current;
    const hud = hudRef.current;
    const hudState = hudStateRef.current;
    const hudPct = hudPctRef.current;
    const hudTick = hudTickRef.current;
    const finaleEl = finaleRef.current;
    const stripeGrad = stripeGradRef.current;
    const stripeWhite = stripeWhiteRef.current;
    const letters = letterRefs.current.filter(
      (el): el is HTMLSpanElement => el !== null
    );
    const captions = captionRefs.current.filter(
      (el): el is HTMLDivElement => el !== null
    );

    if (
      !wrap ||
      !stage ||
      !wordmark ||
      !bloom ||
      !light ||
      !cue ||
      !hud ||
      !hudState ||
      !hudPct ||
      !hudTick ||
      !finaleEl ||
      !stripeGrad ||
      !stripeWhite ||
      letters.length !== GLYPHS.length ||
      captions.length !== GLYPHS.length
    ) {
      return;
    }

    let slots: { x: number; y: number }[] = [];
    let stageW = 0;
    let stageH = 0;
    let wrapTop = 0;
    let scrollRange = 1;
    let rafId = 0;
    let smoothed = -1; // sentinel: snap to the real position on first frame
    let lastHudState = "";
    let lastHudPct = "";
    let disposed = false;
    let resizeQueued = false;

    const readTarget = () =>
      clamp01((window.scrollY - wrapTop) / scrollRange);

    const apply = (t: number, nowMs: number) => {
      const time = nowMs / 1000;
      const finale = smoothstep(FINALE_START, 0.99, t);
      // Narrow stages get a bigger spotlight so the letter still commands it.
      const spotScale = stageW < 640 ? 2.25 : SPOT_SCALE;

      // Pass 1 — who holds the stage, so background pieces can dim against it.
      const locals: number[] = [];
      const focuses: number[] = [];
      let peakFocus = 0;
      for (let i = 0; i < GLYPHS.length; i++) {
        const u = clamp01((t - (TOUR_START + i * TOUR_WINDOW)) / TOUR_WINDOW);
        const focus = smoothstep(0, 0.42, u) * (1 - smoothstep(0.58, 1, u));
        locals.push(u);
        focuses.push(focus);
        if (focus > peakFocus) peakFocus = focus;
      }

      // Pass 2 — pose every letter and its caption.
      for (let i = 0; i < GLYPHS.length; i++) {
        const el = letters[i];
        const slot = slots[i];
        const sc = SCATTER[i];
        const u = locals[i];
        const focus = focuses[i];

        const asmStart = ASSEMBLE_START + ASSEMBLY_ORDER[i] * ASSEMBLE_STAGGER;
        const asm = smoothstep(asmStart, asmStart + ASSEMBLE_LENGTH, t);

        const floatX = Math.sin(time * sc.fs + sc.fp) * stageH * 0.014;
        const floatY =
          Math.cos(time * sc.fs * 0.85 + sc.fp * 1.6) * stageH * 0.018;
        const floatR = Math.sin(time * sc.fs * 0.75 + sc.fp) * 3.2;

        // scattered (drifting) → spotlight → natural slot
        let cx = mix(stageW * (0.5 + sc.x) + floatX, stageW * 0.5, focus);
        let cy = mix(stageH * (SCATTER_CY + sc.y) + floatY, stageH * SPOT_Y, focus);
        let rot = mix(sc.r + floatR, 0, focus);
        let scl = mix(sc.s, spotScale, focus);
        cx = mix(cx, slot.x, asm);
        cy = mix(cy, slot.y, asm);
        rot = mix(rot, 0, asm);
        scl = mix(scl, 1, asm);

        el.style.transform = `translate3d(${(cx - slot.x).toFixed(2)}px, ${(
          cy - slot.y
        ).toFixed(2)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${scl.toFixed(
          3
        )})`;

        const lit = Math.max(focus, asm);
        el.style.opacity = (1 - peakFocus * (1 - lit) * 0.5).toFixed(3);

        const caption = captions[i];
        const capIn = smoothstep(0.07, 0.3, u);
        const capOut = smoothstep(0.7, 0.94, u);
        const capOpacity = capIn * (1 - capOut);
        caption.style.opacity = capOpacity.toFixed(3);
        caption.style.visibility = capOpacity > 0.001 ? "visible" : "hidden";
        caption.style.transform = `translate3d(0, ${(
          (1 - capIn) * 26 -
          capOut * 16
        ).toFixed(2)}px, 0)`;
      }

      // The X's stripes: slightly split while loose, joined in its spotlight
      // window, then snapped together for good as the wordmark locks.
      const lock = smoothstep(X_LOCK_START, X_LOCK_END, t);
      const split = 1 - Math.max(focuses[X_INDEX], lock);
      stripeGrad.style.transform = `translate(-50%, -50%) translate(${(
        0.15 * split
      ).toFixed(4)}em, ${(-0.17 * split).toFixed(4)}em) rotate(${(
        X_ANGLE +
        9 * split
      ).toFixed(2)}deg)`;
      stripeWhite.style.transform = `translate(-50%, -50%) translate(${(
        -0.15 * split
      ).toFixed(4)}em, ${(0.17 * split).toFixed(4)}em) rotate(${(
        -X_ANGLE -
        9 * split
      ).toFixed(2)}deg)`;

      // Stage light, lock bloom, scroll cue, wordmark lift, finale.
      light.style.opacity = (peakFocus * 0.9).toFixed(3);
      const bloomPulse =
        smoothstep(0.925, 0.946, t) * (1 - smoothstep(0.946, 0.985, t));
      bloom.style.opacity = (bloomPulse * 0.9).toFixed(3);
      cue.style.opacity = (1 - smoothstep(0.004, 0.03, t)).toFixed(3);
      wordmark.style.transform = `translate3d(0, ${(
        -finale *
        stageH *
        0.07
      ).toFixed(2)}px, 0)`;
      finaleEl.style.opacity = finale.toFixed(3);
      finaleEl.style.transform = `translate3d(0, ${((1 - finale) * 28).toFixed(
        2
      )}px, 0)`;
      finaleEl.style.pointerEvents = finale > 0.6 ? "auto" : "none";

      // HUD readout — text nodes only touched when their content changes.
      let state: string;
      if (t < TOUR_START) {
        state = "IN PIECES";
      } else if (t < TOUR_END) {
        const idx = Math.min(
          GLYPHS.length - 1,
          Math.floor((t - TOUR_START) / TOUR_WINDOW)
        );
        state = `PART 0${idx + 1}/06 · ${GLYPHS[idx]}`;
      } else if (t < FINALE_START) {
        state = "ASSEMBLING…";
      } else {
        state = "ASSEMBLED";
      }
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
      hud.style.opacity = (1 - smoothstep(0.975, 0.998, t)).toFixed(3);
    };

    // Measure the letters' natural slots with transforms reset. apply() runs
    // synchronously afterwards, so no intermediate state ever paints.
    const measure = () => {
      const stageRect = stage.getBoundingClientRect();
      stageW = stageRect.width;
      stageH = stageRect.height;

      wordmark.style.transform = "none";
      for (const el of letters) el.style.transform = "none";
      slots = letters.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - stageRect.left,
          y: r.top + r.height / 2 - stageRect.top,
        };
      });

      wrapTop = wrap.getBoundingClientRect().top + window.scrollY;
      scrollRange = Math.max(1, wrap.offsetHeight - window.innerHeight);

      apply(smoothed < 0 ? readTarget() : smoothed, performance.now());
    };

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      const target = readTarget();
      if (smoothed < 0) {
        smoothed = target;
      } else {
        smoothed += (target - smoothed) * LERP;
        if (Math.abs(target - smoothed) < 0.0005) smoothed = target;
      }
      apply(smoothed, now);
    };

    // Only run the loop while the hero is on screen.
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
    // Slot positions shift when the webfont swaps in — measure again then.
    document.fonts?.ready.then(() => {
      if (!disposed) measure();
    });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  if (reduced) return <StaticHero />;

  return (
    <section
      ref={wrapRef}
      aria-label="Modexa — software, assembled"
      className="hero-wrap relative h-[760vh]"
    >
      <noscript>
        <style>{`
          .hero-wrap { height: 100svh !important; }
          .hero-finale { opacity: 1 !important; pointer-events: auto !important; }
          .hero-cue, .hero-hud { display: none !important; }
        `}</style>
      </noscript>

      <div
        ref={stageRef}
        className="hero-stage sticky top-0 h-dvh overflow-hidden"
      >
        <div className="bg-grid absolute inset-0" aria-hidden="true" />

        {/* Soft radial stage light behind the letter in the spotlight */}
        <div
          ref={lightRef}
          aria-hidden="true"
          className="hero-stage-light pointer-events-none absolute left-1/2 top-[36%] size-[92vmin] -translate-x-1/2 -translate-y-1/2"
          style={{ opacity: 0 }}
        />

        {/* The wordmark — server-rendered assembled, scattered by the loop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            ref={wordmarkRef}
            aria-label="Modexa"
            className="hero-display hero-wordmark relative flex items-baseline gap-[0.045em]"
          >
            <span
              ref={bloomRef}
              aria-hidden="true"
              className="hero-bloom absolute -inset-x-[12%] -inset-y-[30%] -z-10"
              style={{ opacity: 0 }}
            />
            {GLYPHS.map((glyph, i) => (
              <span
                key={glyph}
                ref={(el) => {
                  letterRefs.current[i] = el;
                }}
                className="hero-letter"
                aria-hidden="true"
              >
                {i === X_INDEX ? (
                  <XStripes
                    gradRef={(el) => {
                      stripeGradRef.current = el;
                    }}
                    whiteRef={(el) => {
                      stripeWhiteRef.current = el;
                    }}
                  />
                ) : (
                  glyph
                )}
              </span>
            ))}
          </h1>
        </div>

        {/* Tour captions — one per letter, only ever one visible */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-[9vh]">
          <div className="relative mx-auto h-44 max-w-2xl">
            {PARTS.map((part, i) => (
              <div
                key={part.tag}
                ref={(el) => {
                  captionRefs.current[i] = el;
                }}
                className="absolute inset-x-6 bottom-0 text-center"
                style={{ opacity: 0, visibility: "hidden" }}
              >
                <span className="mx-auto mb-4 block h-px w-10 bg-[linear-gradient(90deg,#a855f7,#38bdf8)]" />
                <p className="font-label text-[11px] tracking-[0.34em] text-muted">
                  {part.tag}
                </p>
                <p className="hero-display mt-3 text-3xl sm:text-4xl">
                  {part.title}
                </p>
                <p className="font-copy mt-3 text-sm leading-relaxed text-muted sm:text-base">
                  {part.copy}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Finale: tagline + CTAs under the assembled name */}
        <div
          ref={finaleRef}
          className="hero-finale absolute inset-x-0 top-[58%] flex flex-col items-center gap-6 px-6 text-center"
          style={{ opacity: 0, pointerEvents: "none" }}
        >
          <FinaleContent />
        </div>

        {/* Scroll cue — gone the moment scrolling starts */}
        <div
          ref={cueRef}
          aria-hidden="true"
          className="hero-cue pointer-events-none absolute inset-x-0 bottom-7 flex justify-center px-6"
        >
          <p className="font-label text-center text-[10px] tracking-[0.25em] text-muted sm:text-[11px] sm:tracking-[0.3em]">
            SCROLL — EVERY LETTER IS A SERVICE ↓
          </p>
        </div>

        {/* HUD readout */}
        <div
          ref={hudRef}
          aria-hidden="true"
          className="hero-hud absolute right-6 bottom-6 hidden flex-col items-end gap-2 font-label text-[10px] tracking-[0.22em] text-muted sm:flex"
        >
          <div className="flex items-baseline gap-3">
            <span ref={hudStateRef}>IN PIECES</span>
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
