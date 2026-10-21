"use client";

import Image from "next/image";
import { Icon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import type { PortfolioProject } from "@/content/schema";
import type { Localized } from "@/lib/content";

/** Portfolio entry: image first, then category, title and summary. */
export function ProjectCard({ project }: { project: Localized<PortfolioProject> }) {
  const { dict } = useI18n();
  const status = project.projectStatus === "completed" ? null : dict.portfolio.status[project.projectStatus];

  return (
    <article className="group flex h-full flex-col">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-edge bg-surface">
        {project.thumbnail ? (
          <Image
            src={project.thumbnail}
            alt={`${project.title} — ${dict.portfolio.previewAlt}`}
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-3 pt-5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <span className="text-brand-accent">{dict.portfolio.categories[project.category]}</span>
          {status ? <span>· {status}</span> : null}
        </p>
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="leading-relaxed text-soft/75">{project.shortDescription}</p>
        {project.technologies.length > 0 ? (
          <p className="text-sm text-muted">
            <bdi dir="ltr">{project.technologies.join(" · ")}</bdi>
          </p>
        ) : null}
        {project.websiteUrl ? (
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-1.5 pt-2 text-sm font-semibold text-foreground underline decoration-edge-strong underline-offset-4 hover:decoration-brand"
          >
            {dict.common.visitWebsite}
            <Icon name="arrowUpRight" className="size-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
