import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { processSteps } from "@/content/process";
import { websiteQualities, websiteTypes } from "@/content/websiteTypes";

export const metadata: Metadata = {
  title: "Website Development",
  description:
    "Business websites, portfolio websites, landing pages, e-commerce, restaurant websites, SaaS websites and custom web platforms — designed and built by Modexa.",
  alternates: { canonical: "/websites" },
  openGraph: {
    title: "Website Development by Modexa",
    description:
      "Responsive, fast, SEO-ready websites with modern design and secure deployment.",
    url: "/websites",
  },
};

export default function WebsitesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Websites"
        title={
          <>
            Websites designed to{" "}
            <span className="text-gradient">represent and convert.</span>
          </>
        }
        description="Every Modexa website is responsive, fast, accessible and SEO-ready — built with modern tools and deployed securely."
      />

      {/* Website types */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="What we build"
          title="A website for every kind of business"
          description="From focused landing pages to complete custom web platforms."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {websiteTypes.map((type, index) => (
            <AnimatedContainer
              key={type.name}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={type.icon} className="size-5" />
                </span>
                <h3 className="font-semibold">{type.name}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {type.description}
                </p>
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* Qualities */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Standards"
          title="What every Modexa website includes"
          description="These aren't optional extras — they're the baseline of every website we deliver."
        />
        <AnimatedContainer className="mt-10">
          <ul className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
            {websiteQualities.map((quality) => (
              <li
                key={quality}
                className="card-surface flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm"
              >
                <Icon name="check" className="size-4 shrink-0 text-brand-accent" />
                {quality}
              </li>
            ))}
          </ul>
        </AnimatedContainer>
      </section>

      {/* Process */}
      <section className="relative overflow-hidden py-16">
        <div
          className="pointer-events-none absolute top-0 right-0 h-[26rem] w-[26rem] translate-x-1/3 rounded-full bg-[radial-gradient(closest-side,rgba(63,162,247,0.13),transparent)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="Process"
            title="From first conversation to launch"
            description="A structured development process keeps your project clear, predictable and on track."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <AnimatedContainer
                key={step.step}
                delay={(index % 4) * 0.06}
                className="h-full"
              >
                <li className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <h3 className="font-semibold">
                    <span className="mr-2 text-brand-accent">{step.step}.</span>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              </AnimatedContainer>
            ))}
          </ol>
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Ready for a website that{" "}
            <span className="text-gradient">works as hard as you do?</span>
          </>
        }
        description="Tell Modexa about your business and get a custom quote — no templates, no fixed price lists, no obligation."
        primaryLabel="Request a Quote"
        primaryHref="/request-quote"
        secondaryLabel="See Our Services"
        secondaryHref="/services"
      />
    </>
  );
}
