import Image from "next/image";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePage } from "@/content/pages";
import type { Customer, Testimonial } from "@/content/schema";
import type { Localized } from "@/lib/content";

interface WhyModexaProps {
  content: Localized<HomePage["why"]>;
  customers: Localized<Customer>[];
  testimonials: Localized<Testimonial>[];
}

/**
 * Reasons to trust Modexa, stated as facts. Customer logos and testimonials
 * appear only once real, approved records are published in Pages CMS.
 */
export function WhyModexa({ content, customers, testimonials }: WhyModexaProps) {
  return (
    <Section tone="light">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading eyebrow={content.eyebrow} title={content.title} className="lg:col-span-5" />
        <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-7">
          {content.points.map((point, index) => (
            <li key={point.title} className="border-t border-edge">
              <AnimatedContainer delay={(index % 2) * 0.06} className="flex flex-col gap-2 py-6">
                <h3 className="flex items-center gap-3 text-lg font-semibold">
                  <span className="h-px w-4 bg-brand-accent" aria-hidden="true" />
                  {point.title}
                </h3>
                <p className="leading-relaxed text-soft/80">{point.description}</p>
              </AnimatedContainer>
            </li>
          ))}
        </ul>
      </div>

      {customers.length > 0 ? (
        <div className="mt-20">
          <h3 className="text-sm font-medium text-muted">{content.customersTitle}</h3>
          <ul className="mt-6 flex flex-wrap items-center gap-x-12 gap-y-6">
            {customers.map((customer) => (
              <li key={customer.slug} className="flex items-center gap-3">
                {customer.logo ? (
                  <Image
                    src={customer.logo}
                    alt={customer.name}
                    width={120}
                    height={48}
                    className="h-10 w-auto object-contain"
                  />
                ) : (
                  <span className="text-lg font-semibold">{customer.name}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {testimonials.length > 0 ? (
        <div className="mt-20">
          <h3 className="text-sm font-medium text-muted">{content.testimonialsTitle}</h3>
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.slice(0, 3).map((testimonial) => (
              <li key={testimonial.slug}>
                <figure className="card-surface flex h-full flex-col gap-5 rounded-xl p-6">
                  <blockquote className="flex-1 leading-relaxed text-soft">“{testimonial.quote}”</blockquote>
                  <figcaption className="text-sm">
                    <span className="font-semibold">{testimonial.author}</span>
                    <span className="text-muted">
                      {[testimonial.role, testimonial.company].filter(Boolean).join(", ")
                        ? ` — ${[testimonial.role, testimonial.company].filter(Boolean).join(", ")}`
                        : ""}
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
