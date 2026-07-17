import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Icon, type IconName } from "@/components/ui/icons";
import { QuoteForm } from "@/components/forms/QuoteForm";

export const metadata: Metadata = {
  title: "Request a Quote",
  description:
    "Describe your project — website, Modexa POS, AI agent, automation or custom software — and receive a custom quote from Modexa.",
  alternates: { canonical: "/request-quote" },
  openGraph: {
    title: "Request a Quote — Modexa",
    description:
      "Describe your project and receive a clear custom quote — no automatic pricing.",
    url: "/request-quote",
  },
};

const steps: { title: string; description: string; icon: IconName }[] = [
  {
    title: "We review your request",
    description: "A real person reads your project details — nothing automated.",
    icon: "search",
  },
  {
    title: "We ask the right questions",
    description:
      "If anything is unclear, we follow up to understand your goals properly.",
    icon: "message",
  },
  {
    title: "You receive a custom quote",
    description:
      "A clear proposal with scope, approach and pricing — no obligation.",
    icon: "fileText",
  },
];

export default function RequestQuotePage() {
  return (
    <>
      <PageHeader
        eyebrow="Request a Quote"
        title={
          <>
            Tell us about{" "}
            <span className="text-gradient">your project.</span>
          </>
        }
        description="The more we understand about your business and goals, the better the recommendation and quote we can prepare. Prices are never calculated automatically — every project is reviewed personally."
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-[1.6fr_1fr]">
        <AnimatedContainer>
          <div className="card-surface rounded-3xl p-6 sm:p-10">
            <QuoteForm />
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.1}>
          <aside className="card-surface flex h-fit flex-col gap-6 rounded-3xl p-8">
            <h2 className="text-lg font-semibold">What happens next?</h2>
            <ol className="flex flex-col gap-5">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                    <Icon name={step.icon} className="size-4.5" />
                  </span>
                  <div>
                    <p className="text-sm font-medium">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </AnimatedContainer>
      </div>
    </>
  );
}
