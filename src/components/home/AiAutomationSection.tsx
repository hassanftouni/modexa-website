import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { aiAgents, automationUseCases } from "@/content/automation";

const automatable = [
  "Customer support",
  "Lead collection",
  "Appointment booking",
  "Email responses",
  "Data entry",
  "Report generation",
  "Internal notifications",
  "Customer follow-ups",
  "Frequently asked questions",
  "Business workflows",
];

export function AiAutomationSection() {
  const examples = [...aiAgents, ...automationUseCases.slice(3, 6)];

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="AI & Automation"
        title={
          <>
            Automate work. <span className="text-gradient">Accelerate growth.</span>
          </>
        }
        description="Modexa helps companies hand repetitive work to intelligent agents and automated workflows — designed around each business, with people staying in control."
      />

      <AnimatedContainer className="mt-12">
        <ul className="flex flex-wrap justify-center gap-2.5">
          {automatable.map((item) => (
            <li
              key={item}
              className="rounded-full border border-edge bg-white/[0.04] px-4 py-1.5 text-sm text-muted"
            >
              {item}
            </li>
          ))}
        </ul>
      </AnimatedContainer>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {examples.slice(0, 6).map((example, index) => (
          <AnimatedContainer
            key={example.name}
            delay={(index % 3) * 0.06}
            className="h-full"
          >
            <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
              <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name={example.icon} className="size-5" />
              </span>
              <h3 className="font-semibold">{example.name}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {example.description}
              </p>
              {example.availability ? (
                <p className="mt-auto text-xs text-muted/80 italic">
                  {example.availability}
                </p>
              ) : null}
            </article>
          </AnimatedContainer>
        ))}
      </div>

      <AnimatedContainer className="mt-12 flex justify-center">
        <Button href="/ai-automation" variant="secondary" size="lg">
          Explore AI & Automation
          <Icon name="arrowRight" className="size-4" />
        </Button>
      </AnimatedContainer>
    </section>
  );
}
