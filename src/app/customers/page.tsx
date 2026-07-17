import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { Icon } from "@/components/ui/icons";
import { CustomerExplorer } from "@/components/customers/CustomerExplorer";
import { getCustomers, getFeaturedCustomers, getTestimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "The businesses and professionals Modexa works with — across restaurants, retail, services and more.",
  alternates: { canonical: "/customers" },
  openGraph: {
    title: "Modexa Customers",
    description: "Trusted by businesses and professionals across industries.",
    url: "/customers",
  },
};

export default function CustomersPage() {
  const customers = getCustomers();
  const featured = getFeaturedCustomers();
  const testimonials = getTestimonials();

  return (
    <>
      <PageHeader
        eyebrow="Customers"
        title={
          <>
            Trusted by businesses{" "}
            <span className="text-gradient">and professionals.</span>
          </>
        }
        description="The customers below are temporary placeholders — real, approved customer logos and stories will appear here as they are published through the CMS."
      />

      {/* Explorer: search + filters + logo grid */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-20">
        <AnimatedContainer>
          <CustomerExplorer customers={customers} />
        </AnimatedContainer>
      </section>

      {/* Featured customer projects */}
      {featured.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Featured"
            title="Featured customer projects"
            description="Success stories are being prepared — details coming soon."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((customer, index) => (
              <AnimatedContainer
                key={customer.slug}
                delay={(index % 3) * 0.07}
                className="h-full"
              >
                <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6">
                  <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                    {customer.projectType}
                  </p>
                  <h3 className="text-lg font-semibold">{customer.name}</h3>
                  <p className="text-sm text-muted">{customer.industry}</p>
                  {customer.testimonial ? (
                    <blockquote className="border-l-2 border-brand/40 pl-4 text-sm leading-relaxed text-foreground/90">
                      “{customer.testimonial}”
                    </blockquote>
                  ) : null}
                  <p className="mt-auto flex items-center gap-2 pt-2 text-xs text-muted italic">
                    <Icon name="clock" className="size-3.5" />
                    Success story coming soon
                  </p>
                </article>
              </AnimatedContainer>
            ))}
          </div>
        </section>
      ) : null}

      {/* Testimonials */}
      {testimonials.length > 0 ? (
        <section className="mx-auto w-full max-w-7xl px-6 py-16">
          <SectionHeading
            eyebrow="Testimonials"
            title="What customers say"
            description="Temporary placeholder feedback — to be replaced with real, approved testimonials."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
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
      ) : null}

      <CtaBanner
        title="Become the next Modexa success story"
        description="Whether you run a restaurant, a store or a growing company — Modexa builds the technology that helps you work smarter."
        primaryLabel="Start Your Project"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />
    </>
  );
}
