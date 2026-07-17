"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { Icon } from "@/components/ui/icons";

/*
 * The scroll-scrubbed video runs on desktop AND mobile (the all-keyframe
 * encoding makes seeking smooth enough on phones). Only users who ask the
 * OS for reduced motion get the static poster fallback.
 */
const STATIC_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToStaticQuery(callback: () => void) {
  const mediaQuery = window.matchMedia(STATIC_QUERY);
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

interface ScrollVideoProps {
  src: string;
  poster: string;
  /** Accessible name for the section. */
  label: string;
  /** Section height in vh — controls how slowly the video scrubs. */
  heightVh?: number;
  /** Show the "keep scrolling" hint (fades out once scrolling starts). */
  showHint?: boolean;
  /** For reduced-motion users: "show" renders a static poster, "hide" skips the section. */
  staticBehavior?: "show" | "hide";
  /** Overlay content — stays visible for the entire scroll journey. */
  children?: ReactNode;
}

/**
 * Cinematic scroll-controlled video section: the video stays paused and its
 * currentTime is driven by scroll progress, so scrolling down advances the
 * film and scrolling up reverses it. Multiple instances can be chained
 * back-to-back for a multi-part scroll story.
 */
export function ScrollVideo({
  src,
  poster,
  label,
  heightVh = 400,
  showHint = false,
  staticBehavior = "show",
  children,
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const durationRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [videoUrl, setVideoUrl] = useState(src);

  // SSR renders the static fallback; capable desktops upgrade after mount.
  const isStatic = useSyncExternalStore(
    subscribeToStaticQuery,
    () => window.matchMedia(STATIC_QUERY).matches,
    () => true
  );

  /*
   * Prefetch the whole video into memory and scrub from a blob URL. Seeking
   * against the network (range requests per seek) is what makes deployed
   * scrubbing laggy — from a blob, every seek is instant, like localhost.
   * Until the download finishes (and if it fails) the streaming src is used.
   */
  useEffect(() => {
    if (isStatic) return;
    let objectUrl: string | null = null;
    const controller = new AbortController();
    fetch(src, { signal: controller.signal })
      .then((response) =>
        response.ok
          ? response.blob()
          : Promise.reject(new Error(`HTTP ${response.status}`))
      )
      .then((blob) => {
        objectUrl = URL.createObjectURL(blob);
        setVideoUrl(objectUrl);
      })
      .catch(() => {
        // Keep streaming from the network as a fallback.
      });
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [src, isStatic]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth requestAnimationFrame seeking: ease currentTime toward the scroll
  // target instead of jumping, so fast scrolling still looks fluid.
  const stepSeek = () => {
    const video = videoRef.current;
    const duration = durationRef.current;
    if (!video || !duration) {
      rafRef.current = null;
      return;
    }
    const target = targetProgressRef.current * duration;
    const diff = target - video.currentTime;
    if (Math.abs(diff) < 0.02) {
      video.currentTime = target;
      rafRef.current = null;
      return;
    }
    video.currentTime += diff * 0.18;
    rafRef.current = requestAnimationFrame(stepSeek);
  };

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    targetProgressRef.current = progress;
    if (rafRef.current === null && !isStatic) {
      rafRef.current = requestAnimationFrame(stepSeek);
    }
  });

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollHint = useTransform(scrollYProgress, [0, 0.001], [1, 0]);

  if (isStatic) {
    if (staticBehavior === "hide") return null;
    return (
      <section
        aria-label={label}
        className="relative flex h-dvh items-center justify-center overflow-hidden"
      >
        <Image src={poster} alt="" fill sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,11,0.82),rgba(5,6,11,0.55)_50%,rgba(5,6,11,0.9))]"
          aria-hidden="true"
        />
        {children ? (
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            {children}
          </div>
        ) : null}
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      aria-label={label}
      className="relative"
      style={{ height: `${heightVh}vh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* The video never plays on its own — scroll position is its timeline. */}
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          onLoadedMetadata={(event) => {
            // Fires again when the src swaps to the prefetched blob —
            // re-sync the frame to the current scroll position.
            const video = event.currentTarget;
            video.pause();
            durationRef.current = video.duration;
            video.currentTime = targetProgressRef.current * video.duration;
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay for text readability */}
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,11,0.7),rgba(5,6,11,0.35)_50%,rgba(5,6,11,0.85))]"
          aria-hidden="true"
        />

        {/* Overlay content — visible for the entire scroll journey */}
        {children ? (
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div className="max-w-3xl">{children}</div>
          </div>
        ) : null}

        {/* Scroll hint, removed as soon as scrolling starts */}
        {showHint ? (
          <motion.div
            style={{ opacity: scrollHint }}
            aria-hidden="true"
            className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 text-muted"
          >
            <span className="text-xs tracking-widest uppercase">
              Keep scrolling
            </span>
            <Icon name="chevronDown" className="size-4 animate-bounce" />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
