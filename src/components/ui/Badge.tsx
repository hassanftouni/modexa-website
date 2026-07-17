import type { ReactNode } from "react";

type Tone = "brand" | "neutral" | "outline";

const tones: Record<Tone, string> = {
  brand:
    "border border-brand/40 bg-brand/10 text-[#d8b4fe]",
  neutral: "border border-edge bg-white/[0.05] text-muted",
  outline: "border border-edge-strong text-foreground",
};

export function Badge({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
