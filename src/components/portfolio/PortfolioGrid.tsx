"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import type { PortfolioCategory, PortfolioProject } from "@/content/types";

const filters: { label: string; value: PortfolioCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Websites", value: "websites" },
  { label: "Modexa POS", value: "modexa-pos" },
  { label: "AI", value: "ai" },
  { label: "Automation", value: "automation" },
  { label: "Web applications", value: "web-applications" },
];

export function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  const [active, setActive] = useState<PortfolioCategory | "all">("all");
  const reduceMotion = useReducedMotion();

  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.category === active);

  return (
    <div className="flex flex-col gap-10">
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex flex-wrap justify-center gap-2"
      >
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            aria-pressed={active === filter.value}
            onClick={() => setActive(filter.value)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === filter.value
                ? "border-brand/50 bg-[linear-gradient(110deg,rgba(168,85,247,0.2),rgba(63,162,247,0.2))] text-foreground"
                : "border-edge bg-white/[0.03] text-muted hover:border-white/25 hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {visible.length > 0 ? (
        <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((project) => (
              <motion.li
                key={project.slug}
                layout={!reduceMotion}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.96 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <p className="py-16 text-center text-muted">
          No projects in this category yet — real projects are on their way.
        </p>
      )}
    </div>
  );
}
