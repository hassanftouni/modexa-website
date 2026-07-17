import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import type { Testimonial } from "@/content/types";

/*
 * IMPORTANT: The testimonials rendered here come from content/testimonials/
 * and are TEMPORARY placeholders. Replace them with real, approved customer
 * testimonials (via Pages CMS) before launching the website. Never publish
 * invented quotes attributed to real people or companies.
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Testimonials"
        title="What customers say"
        description="Feedback from the businesses and professionals Modexa works with."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.slice(0, 3).map((testimonial, index) => (
          <AnimatedContainer
            key={testimonial.slug}
            delay={(index % 3) * 0.07}
            className="h-full"
          >
            <TestimonialCard testimonial={testimonial} />
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}
