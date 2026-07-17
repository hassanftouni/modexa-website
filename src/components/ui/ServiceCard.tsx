import Link from "next/link";
import type { Service } from "@/content/types";
import { Icon } from "./icons";

interface ServiceCardProps {
  service: Service;
  /** Where the "Learn more" link points; defaults to the service anchor on /services. */
  href?: string;
}

export function ServiceCard({ service, href }: ServiceCardProps) {
  const target = href ?? `/services#${service.slug}`;

  return (
    <article className="card-surface group relative flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-24px_rgba(124,93,247,0.45)]">
      <div className="flex size-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa] transition-colors group-hover:text-white">
        <Icon name={service.icon} className="size-5" />
      </div>
      <h3 className="text-lg font-semibold">{service.name}</h3>
      <p className="text-sm leading-relaxed text-muted">
        {service.shortDescription}
      </p>
      <ul className="mt-auto flex flex-col gap-1.5 text-sm text-muted">
        {service.benefits.slice(0, 3).map((benefit) => (
          <li key={benefit} className="flex items-start gap-2">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-accent" />
            {benefit}
          </li>
        ))}
      </ul>
      <Link
        href={target}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-white"
      >
        Learn more
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
        <span className="sr-only"> about {service.name}</span>
      </Link>
    </article>
  );
}
