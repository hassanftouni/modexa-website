import Image from "next/image";
import type { PortfolioProject } from "@/content/types";
import {
  portfolioCategoryLabels,
  projectStatusLabels,
} from "@/content/labels";
import { Badge } from "./Badge";

export function ProjectCard({ project }: { project: PortfolioProject }) {
  return (
    <article className="card-surface group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-24px_rgba(124,93,247,0.45)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-edge">
        <Image
          src={project.thumbnail}
          alt={`${project.title} preview`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{portfolioCategoryLabels[project.category]}</Badge>
          <Badge tone="neutral">{projectStatusLabels[project.projectStatus]}</Badge>
        </div>
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-edge px-2.5 py-0.5 text-xs text-muted"
            >
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
