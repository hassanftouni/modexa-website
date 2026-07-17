import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/icons";

const reasons: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Business-focused solutions",
    description:
      "Every project starts from your operational reality — not from a template.",
    icon: "building",
  },
  {
    title: "Modern technologies",
    description:
      "Built on current, well-supported tools like Next.js, TypeScript and Laravel.",
    icon: "cpu",
  },
  {
    title: "Custom development",
    description:
      "Software shaped around your requirements instead of forcing workarounds.",
    icon: "code",
  },
  {
    title: "Professional design",
    description:
      "Clean, premium interfaces that customers trust and staff enjoy using.",
    icon: "layout",
  },
  {
    title: "Clear communication",
    description:
      "You always know what is being built, why, and what happens next.",
    icon: "message",
  },
  {
    title: "Scalable architecture",
    description:
      "Solutions designed to grow with your business, from day one.",
    icon: "layers",
  },
  {
    title: "Secure development practices",
    description:
      "Careful handling of data, access and deployments across every project.",
    icon: "shield",
  },
  {
    title: "Responsive support",
    description:
      "Maintenance and support agreements that keep your product healthy.",
    icon: "wrench",
  },
  {
    title: "AI & automation expertise",
    description:
      "Practical automation that saves real hours — not technology for its own sake.",
    icon: "sparkles",
  },
  {
    title: "Complete digital solutions",
    description:
      "Websites, software, AI and POS — one team covering the whole stack.",
    icon: "globe",
  },
];

export function WhyModexa() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Why Modexa"
        title="Why businesses choose Modexa"
        description="A single partner for websites, software, AI and automation — focused on solving real problems well."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {reasons.map((reason, index) => (
          <AnimatedContainer
            key={reason.title}
            delay={(index % 5) * 0.05}
            className="h-full"
          >
            <article className="card-surface flex h-full flex-col gap-2.5 rounded-2xl p-5 transition-colors hover:border-white/20">
              <span className="flex size-9 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name={reason.icon} className="size-4.5" />
              </span>
              <h3 className="text-sm font-semibold">{reason.title}</h3>
              <p className="text-sm leading-relaxed text-muted">
                {reason.description}
              </p>
            </article>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}
