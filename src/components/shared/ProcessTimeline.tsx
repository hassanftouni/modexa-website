import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Icon, type IconName } from "@/components/ui/icons";

interface Step {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Numbered steps on a single rule. On desktop the rule draws in as the
 * timeline scrolls into view (CSS only — see `.draw-in` in globals.css).
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <ol
      className="relative grid gap-10 lg:gap-6"
      style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 12rem), 1fr))" }}
    >
      <span
        aria-hidden="true"
        className="draw-in absolute top-5 hidden h-px origin-left bg-edge-strong lg:block rtl:origin-right"
        style={{ insetInline: "1.25rem" }}
      />
      {steps.map((step, index) => (
        <li key={step.slug}>
          <AnimatedContainer delay={index * 0.08} className="relative flex gap-5 lg:flex-col lg:gap-6">
            <span className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border border-edge-strong bg-background text-sm font-semibold tabular-nums">
              {index + 1}
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Icon name={step.icon} className="size-4 text-brand-accent" />
                {step.title}
              </h3>
              <p className="leading-relaxed text-soft/75">{step.description}</p>
            </div>
          </AnimatedContainer>
        </li>
      ))}
    </ol>
  );
}
