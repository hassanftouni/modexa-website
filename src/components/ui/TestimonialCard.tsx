import type { Testimonial } from "@/content/schema";
import type { Localized } from "@/lib/content";

/*
 * Testimonials come from content/testimonials/ (Pages CMS). Only publish
 * real quotes, with the customer's approval.
 */
export function TestimonialCard({ testimonial }: { testimonial: Localized<Testimonial> }) {
  const attribution = [testimonial.role, testimonial.company].filter(Boolean).join(", ");

  return (
    <figure className="card-surface flex h-full flex-col gap-5 rounded-xl p-6">
      <blockquote className="flex-1 leading-relaxed text-soft">“{testimonial.quote}”</blockquote>
      <figcaption className="text-sm">
        <span className="font-semibold">{testimonial.author}</span>
        {attribution ? <span className="text-muted"> — {attribution}</span> : null}
      </figcaption>
    </figure>
  );
}
