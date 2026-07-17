import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { processSteps } from "@/content/process";

export function ProcessSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Process"
        title="How Modexa works"
        description="A clear, structured process — from the first conversation to launch and beyond."
      />
      <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, index) => (
          <AnimatedContainer
            key={step.step}
            delay={(index % 4) * 0.07}
            className="h-full"
          >
            <li className="card-surface relative flex h-full flex-col gap-3 rounded-2xl p-6 transition-colors hover:border-white/20">
              <span
                className="absolute top-5 right-5 text-4xl font-semibold text-white/[0.06]"
                aria-hidden="true"
              >
                {String(step.step).padStart(2, "0")}
              </span>
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
    </section>
  );
}
