import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon, type IconName } from "@/components/ui/icons";

const pillars: { name: string; icon: IconName }[] = [
  { name: "Software development", icon: "code" },
  { name: "Website design", icon: "globe" },
  { name: "Artificial intelligence", icon: "sparkles" },
  { name: "Automation", icon: "workflow" },
  { name: "Business systems", icon: "layers" },
  { name: "Digital strategy", icon: "chart" },
];

export function CompanyIntroduction() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="What Modexa does"
        title="One company. Multiple digital solutions."
        description="From professional websites to complete business platforms, Modexa designs and develops technology that solves real operational problems."
      />
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {pillars.map((pillar, index) => (
          <AnimatedContainer key={pillar.name} delay={index * 0.05}>
            <div className="card-surface flex h-full flex-col items-center gap-3 rounded-2xl p-5 text-center transition-colors hover:border-white/20">
              <span className="flex size-10 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa]">
                <Icon name={pillar.icon} className="size-5" />
              </span>
              <p className="text-sm font-medium">{pillar.name}</p>
            </div>
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}
