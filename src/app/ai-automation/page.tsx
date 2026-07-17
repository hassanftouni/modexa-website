import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/icons";
import { aiAgents, automationUseCases } from "@/content/automation";

export const metadata: Metadata = {
  title: "AI & Automation",
  description:
    "AI agents, customer support automation, lead automation, booking automation, email workflows and reporting automation — designed around your business process by Modexa.",
  alternates: { canonical: "/ai-automation" },
  openGraph: {
    title: "AI & Automation by Modexa",
    description:
      "Practical AI agents and automated workflows, designed around each customer's business process.",
    url: "/ai-automation",
  },
};

const projectSteps: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Map the process",
    description:
      "We study how the work happens today — where time is lost and what should stay human.",
    icon: "search",
  },
  {
    title: "Design the automation",
    description:
      "We define exactly what the agent or workflow will do, with clear boundaries and fallbacks.",
    icon: "layers",
  },
  {
    title: "Build & integrate",
    description:
      "We implement the solution and connect it to your website, tools and data.",
    icon: "code",
  },
  {
    title: "Monitor & improve",
    description:
      "We measure results, refine behaviour and expand the automation as it proves itself.",
    icon: "chart",
  },
];

export default function AiAutomationPage() {
  return (
    <>
      <PageHeader
        eyebrow="AI & Automation"
        title={
          <>
            Practical AI that works{" "}
            <span className="text-gradient">the way your business works.</span>
          </>
        }
        description="Modexa designs every AI agent and automation around the customer's actual business process. AI handles the repetitive work — your team keeps the judgment, relationships and control."
      />

      {/* AI agents */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="AI agents"
          title="Intelligent agents for everyday business work"
          description="Agents that answer, qualify, assist and organize — trained on your business knowledge."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aiAgents.map((agent, index) => (
            <AnimatedContainer
              key={agent.name}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={agent.icon} className="size-5" />
                </span>
                <h3 className="font-semibold">{agent.name}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {agent.description}
                </p>
                {agent.availability ? (
                  <p className="mt-auto text-xs text-muted/80 italic">
                    {agent.availability}
                  </p>
                ) : null}
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* Automation services */}
      <section className="mx-auto w-full max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow="Automation"
          title="Workflows that run themselves"
          description="From lead capture to reporting — repetitive processes automated end to end."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {automationUseCases.map((useCase, index) => (
            <AnimatedContainer
              key={useCase.name}
              delay={(index % 4) * 0.06}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={useCase.icon} className="size-5" />
                </span>
                <h3 className="font-semibold">{useCase.name}</h3>
                <p className="text-sm leading-relaxed text-muted">
                  {useCase.description}
                </p>
                {useCase.availability ? (
                  <p className="mt-auto text-xs text-muted/80 italic">
                    {useCase.availability}
                  </p>
                ) : null}
              </article>
            </AnimatedContainer>
          ))}
        </div>
      </section>

      {/* How a project works */}
      <section className="relative overflow-hidden py-16">
        <div
          className="pointer-events-none absolute top-0 -left-40 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.14),transparent)] blur-3xl"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-7xl px-6">
          <SectionHeading
            eyebrow="Process"
            title="How an automation project works"
            description="Every automation is designed based on the customer's business process — not the other way around."
          />
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {projectSteps.map((step, index) => (
              <AnimatedContainer
                key={step.title}
                delay={index * 0.07}
                className="h-full"
              >
                <li className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6">
                  <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                    <Icon name={step.icon} className="size-5" />
                  </span>
                  <h3 className="font-semibold">
                    <span className="mr-2 text-brand-accent">{index + 1}.</span>
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </li>
              </AnimatedContainer>
            ))}
          </ol>
          <AnimatedContainer className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-muted">
              A note on honesty: AI is a powerful assistant, not a replacement
              for your team. Modexa automates the repetitive work so people can
              focus on the parts of the business only people can do.
            </p>
          </AnimatedContainer>
        </div>
      </section>

      <CtaBanner
        title="Curious what could be automated in your business?"
        description="Request a consultation — Modexa will look at your workflow and show you where AI and automation can realistically save time."
        primaryLabel="Request a Consultation"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />
    </>
  );
}
