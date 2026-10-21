"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useI18n } from "@/i18n/client";
import type { PortfolioCategory, PortfolioProject } from "@/content/schema";
import type { Localized } from "@/lib/content";

type Project = Localized<PortfolioProject>;

/** Category filter + project grid. Filters only list categories that have projects. */
export function PortfolioGrid({ projects }: { projects: Project[] }) {
  const { dict } = useI18n();
  const [active, setActive] = useState<PortfolioCategory | "all">("all");

  const categories = Array.from(new Set(projects.map((project) => project.category)));
  const visible = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <div className="flex flex-col gap-12">
      {categories.length > 1 ? (
        <div role="group" aria-label={dict.portfolio.filtersLabel} className="flex flex-wrap gap-2">
          {(["all", ...categories] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={active === value}
              onClick={() => setActive(value)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === value
                  ? "border-foreground bg-foreground text-background"
                  : "border-edge text-muted hover:border-edge-strong hover:text-foreground"
              }`}
            >
              {value === "all" ? dict.portfolio.all : dict.portfolio.categories[value]}
            </button>
          ))}
        </div>
      ) : null}

      {visible.length > 0 ? (
        <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2">
          {visible.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-16 text-center text-muted">{dict.portfolio.empty}</p>
      )}
    </div>
  );
}
