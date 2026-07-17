import type { Metadata } from "next";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { TiltReveal } from "@/components/ui/TiltReveal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { PosMockup } from "@/components/products/PosMockup";
import { posFaqs } from "@/content/faqs";
import { posFeatureGroups, posIndustries } from "@/content/posFeatures";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Modexa POS — The smarter way to manage sales and operations",
  description:
    "Modexa POS brings checkout, inventory, employees, customers, printing and business insights into one modern platform — with offline local-network operation and multi-terminal support.",
  alternates: { canonical: "/products/modexa-pos" },
  openGraph: {
    title: "Modexa POS",
    description:
      "A complete point-of-sale platform for restaurants, cafés, bars and retail.",
    url: "/products/modexa-pos",
  },
};

const posJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Modexa POS",
  applicationCategory: "BusinessApplication",
  description:
    "A complete point-of-sale platform that brings checkout, inventory, employees, customers, printing and business insights into one modern system.",
  publisher: { "@type": "Organization", name: "Modexa", url: siteConfig.url },
};

const architectureNodes = [
  { label: "POS Terminal 1", icon: "monitor" },
  { label: "POS Terminal 2", icon: "monitor" },
  { label: "POS Terminal 3", icon: "monitor" },
] as const;

const architectureOutputs = [
  { label: "Kitchen printer", icon: "printer" },
  { label: "Bar printer", icon: "printer" },
  { label: "Receipt printer", icon: "receipt" },
] as const;

export default function ModexaPosPage() {
  return (
    <>
      {/* Product hero */}
      <header className="relative overflow-hidden pt-36 pb-20 sm:pt-44">
        <div className="bg-grid absolute inset-0" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[52rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.22),transparent)] blur-3xl"
          aria-hidden="true"
        />
        <AnimatedContainer className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center">
          <Badge tone="brand">Modexa POS</Badge>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            The smarter way to manage{" "}
            <span className="text-gradient">sales and operations.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            Modexa POS brings checkout, inventory, employees, customers,
            printing and business insights into one modern platform.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/request-quote" size="lg">
              Request a Demo
              <Icon name="arrowRight" className="size-4" />
            </Button>
            <Button href="/contact" variant="secondary" size="lg">
              Talk to Modexa
            </Button>
          </div>
        </AnimatedContainer>

        {/* Dashboard preview */}
        <AnimatedContainer delay={0.2} className="relative mx-auto mt-16 w-full max-w-4xl px-6">
          <div
            className="pointer-events-none absolute -inset-x-4 -top-8 bottom-0 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(99,102,241,0.16),transparent)] blur-2xl"
            aria-hidden="true"
          />
          <TiltReveal tilt={14} className="relative">
            <PosMockup />
          </TiltReveal>
          <p className="mt-4 text-center text-xs text-muted">
            Interface preview — real product screenshots coming soon.
          </p>
        </AnimatedContainer>
      </header>

      {/* Industries */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Industries"
          title="Built for businesses that serve customers every day"
          description="From single-location cafés to growing multi-branch operations."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {posIndustries.map((industry, index) => (
            <AnimatedContainer key={industry.name} delay={index * 0.05}>
              <div className="card-surface flex h-full flex-col items-center gap-3 rounded-2xl p-5 text-center transition-colors hover:border-white/20">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={industry.icon} className="size-5" />
                </span>
                <p className="text-sm font-medium">{industry.name}</p>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* Core features */}
      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything your operation needs,{" "}
              <span className="text-gradient">in one system.</span>
            </>
          }
          description="Modexa POS covers the full daily flow — from the first order to the end-of-day report."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posFeatureGroups.map((group, index) => (
            <AnimatedContainer
              key={group.title}
              delay={(index % 3) * 0.06}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={group.icon} className="size-5" />
                </span>
                <h3 className="font-semibold">{group.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {group.description}
                </p>
                <ul className="mt-auto flex flex-col gap-1.5 pt-2">
                  {group.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-muted"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 size-4 shrink-0 text-brand-accent"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* Multi-terminal architecture */}
      <section className="relative overflow-hidden py-20">
        <div
          className="pointer-events-none absolute top-1/4 -right-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(63,162,247,0.14),transparent)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="Architecture"
            title="Multiple terminals. One local network. Zero downtime."
            description="Terminals, printers and the local server work together on your network — so daily operations never depend on your internet connection."
          />
          <AnimatedContainer className="mt-12">
            <div className="card-surface mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-3xl p-8 sm:p-10">
              <div className="grid w-full grid-cols-3 gap-3">
                {architectureNodes.map((node) => (
                  <div
                    key={node.label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-edge bg-white/[0.03] p-4 text-center"
                  >
                    <Icon name={node.icon} className="size-6 text-brand-accent" />
                    <p className="text-xs text-muted">{node.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center gap-1" aria-hidden="true">
                <span className="h-6 w-px bg-[linear-gradient(180deg,#a855f7,#3fa2f7)]" />
                <Icon name="wifiOff" className="size-4 text-muted" />
              </div>
              <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-xl border border-brand/40 bg-[linear-gradient(110deg,rgba(168,85,247,0.14),rgba(63,162,247,0.14))] p-5 text-center">
                <Icon name="database" className="size-7 text-[#c4a1fa]" />
                <p className="text-sm font-medium">Local server & secure backups</p>
                <p className="text-xs text-muted">
                  Works offline on your local network
                </p>
              </div>
              <div className="flex flex-col items-center gap-1" aria-hidden="true">
                <span className="h-6 w-px bg-[linear-gradient(180deg,#3fa2f7,#a855f7)]" />
              </div>
              <div className="grid w-full grid-cols-3 gap-3">
                {architectureOutputs.map((output) => (
                  <div
                    key={output.label}
                    className="flex flex-col items-center gap-2 rounded-xl border border-edge bg-white/[0.03] p-4 text-center"
                  >
                    <Icon name={output.icon} className="size-6 text-brand-accent" />
                    <p className="text-xs text-muted">{output.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-6 py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Answers to the questions business owners ask most about Modexa POS."
        />
        <AnimatedContainer className="mt-10">
          <FaqAccordion faqs={posFaqs} />
        </AnimatedContainer>
      </section>

      <CtaBanner
        title={
          <>
            See Modexa POS <span className="text-gradient">in action.</span>
          </>
        }
        description="Request a personal demo and see how Modexa POS fits your restaurant, café, bar or store — with your workflow, your printers and your team."
        primaryLabel="Request a Demo"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(posJsonLd) }}
      />
    </>
  );
}
