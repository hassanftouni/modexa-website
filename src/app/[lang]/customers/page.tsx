import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerExplorer } from "@/components/customers/CustomerExplorer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FinalCta } from "@/components/shared/FinalCta";
import { Section } from "@/components/ui/Section";
import { TestimonialCard } from "@/components/ui/TestimonialCard";
import { isLocale } from "@/i18n/config";
import { getCustomers, getPage, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/customers";

export async function generateMetadata({ params }: PageProps<"/[lang]/customers">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("customers", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

/*
 * Only customers and testimonials published in Pages CMS appear here. Never
 * publish a customer, logo or quote without that customer's approval.
 */
export default async function CustomersPage({ params }: PageProps<"/[lang]/customers">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("customers", lang);
  const customers = getCustomers(lang);
  const testimonials = getTestimonials(lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      <Section>
        {customers.length > 0 ? (
          <CustomerExplorer customers={customers} />
        ) : (
          <div className="flex max-w-2xl flex-col gap-4 border-s-2 border-brand ps-6">
            <h2 className="text-2xl font-semibold">{page.emptyTitle}</h2>
            <p className="text-lg leading-relaxed text-soft/80">{page.emptyText}</p>
          </div>
        )}

        {testimonials.length > 0 ? (
          <div className="mt-20">
            <h2 className="text-sm font-medium text-muted">{page.testimonialsTitle}</h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <li key={testimonial.slug}>
                  <TestimonialCard testimonial={testimonial} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </Section>

      <FinalCta
        title={page.cta.title}
        highlight={page.cta.highlight}
        description={page.cta.description}
        primaryLabel={page.cta.primaryCta}
        secondaryLabel={page.cta.secondaryCta}
      />
    </>
  );
}
