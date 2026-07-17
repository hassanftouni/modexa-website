import type { Technology } from "@/content/types";

export function TechnologyBadge({ technology }: { technology: Technology }) {
  return (
    <span className="card-surface inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foreground/90 transition-colors hover:border-white/25">
      <span className="size-1.5 rounded-full bg-[linear-gradient(110deg,#a855f7,#3fa2f7)]" aria-hidden="true" />
      {technology.name}
    </span>
  );
}
