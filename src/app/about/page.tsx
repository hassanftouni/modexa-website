import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About",
  description:
    "Modexa is a technology company building modern software, websites, AI agents and automation solutions that make professional technology accessible to businesses of every size.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Modexa",
    description:
      "The mission, vision and values behind Modexa — a modern technology company.",
    url: "/about",
  },
};

const values: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Craftsmanship",
    description:
      "We build things properly — clean design, solid engineering and attention to the details users feel.",
    icon: "wrench",
  },
  {
    title: "Honesty",
    description:
      "Clear scope, realistic timelines and no overpromising. What we say is what we deliver.",
    icon: "shield",
  },
  {
    title: "Practicality",
    description:
      "Technology has to solve a real problem. We recommend what works, not what's fashionable.",
    icon: "check",
  },
  {
    title: "Partnership",
    description:
      "We treat every project as a long-term relationship, not a one-time transaction.",
    icon: "users",
  },
];

const approach = [
  "Understand the business before writing any code",
  "Choose reliable, well-supported technologies",
  "Design for the people who will actually use it",
  "Automate what's repetitive, keep humans in control",
  "Ship, measure and keep improving",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={
          <>
            A technology company built on{" "}
            <span className="text-gradient">craft and honesty.</span>
          </>
        }
        description="Modexa builds digital products, business software and intelligent automation for companies that want to work smarter."
      />

      {/* Mission & vision */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <AnimatedContainer className="h-full">
            <article className="card-surface flex h-full flex-col gap-4 rounded-3xl p-8 sm:p-10">
              <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                Our mission
              </p>
              <p className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                To make modern technology, intelligent automation and
                professional software accessible to businesses of every size.
              </p>
            </article>
          </AnimatedContainer>
          <AnimatedContainer delay={0.1} className="h-full">
            <article className="card-surface flex h-full flex-col gap-4 rounded-3xl p-8 sm:p-10">
              <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
                Our vision
              </p>
              <p className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
                To help businesses work more efficiently through reliable
                software, thoughtful design and practical artificial
                intelligence.
              </p>
            </article>
          </AnimatedContainer>
        </div>
      </section>

      {/* Why Modexa was created */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <SectionHeading
          eyebrow="Why Modexa exists"
          title="Great technology shouldn't be reserved for big companies"
          align="center"
        />
        <AnimatedContainer className="mt-8 flex flex-col gap-5 text-lg leading-relaxed text-muted">
          <p>
            Modexa was created from a simple observation: most restaurants,
            shops and growing businesses run on tools that are outdated,
            overpriced or simply not built for them — while modern software, AI
            and automation keep getting more powerful every year.
          </p>
          <p>
            Modexa closes that gap. One team that designs and builds websites,
            business software, POS systems, AI agents and automations — shaped
            around how each business actually works, at a level of quality
            usually reserved for much larger companies.
          </p>
        </AnimatedContainer>
      </section>

      {/* Values */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Values"
          title="What we stand for"
          description="The principles behind every Modexa project."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <AnimatedContainer
              key={value.title}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={value.icon} className="size-5" />
                </span>
                <h3 className="font-semibold">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* Approach */}
      <section className="mx-auto w-full max-w-3xl px-6 py-16">
        <SectionHeading
          eyebrow="Approach"
          title="How we think about technology"
        />
        <AnimatedContainer className="mt-8">
          <ol className="flex flex-col gap-3">
            {approach.map((item, index) => (
              <li
                key={item}
                className="card-surface flex items-center gap-4 rounded-xl px-5 py-4"
              >
                <span className="text-sm font-semibold text-brand-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-sm sm:text-base">{item}</p>
              </li>
            ))}
          </ol>
        </AnimatedContainer>
      </section>

      {/* Team placeholder */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Team"
          title="The people behind Modexa"
          description="Team member profiles are coming soon."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* PLACEHOLDER: replace with real team members (photos in public/images/team/). */}
          {[1, 2, 3].map((slot, index) => (
            <AnimatedContainer key={slot} delay={index * 0.07} className="h-full">
              <article className="card-surface flex h-full flex-col items-center gap-4 rounded-2xl p-8 text-center">
                <span className="flex size-20 items-center justify-center rounded-full border border-edge bg-white/[0.04] text-muted">
                  <Icon name="users" className="size-8" />
                </span>
                <div>
                  <p className="font-medium">Team member</p>
                  <p className="mt-1 text-sm text-muted">Profile coming soon</p>
                </div>
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      <CtaBanner
        title={
          <>
            Let’s build something{" "}
            <span className="text-gradient">worth using.</span>
          </>
        }
        description="Tell Modexa about your business and goals — and get a clear, honest recommendation on where technology can help."
        primaryLabel="Contact Modexa"
        primaryHref="/contact"
        secondaryLabel="Request a Quote"
        secondaryHref="/request-quote"
      />
    </>
  );
}
