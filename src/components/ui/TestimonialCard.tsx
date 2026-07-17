import type { Testimonial } from "@/content/types";
import { Icon } from "./icons";

/*
 * IMPORTANT: All testimonials currently in content/testimonials/ are temporary
 * placeholders. They MUST be replaced with real, approved customer testimonials
 * (managed through Pages CMS) before the website launches. Never publish
 * fabricated claims attributed to real people or companies.
 */
export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="card-surface flex h-full flex-col gap-4 rounded-2xl p-6">
      <div className="flex gap-1 text-brand-accent" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" className="size-4 fill-current" />
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="border-t border-edge pt-4 text-sm">
        <p className="font-medium">{testimonial.author}</p>
        <p className="text-muted">
          {testimonial.role}, {testimonial.company}
        </p>
      </figcaption>
    </figure>
  );
}
