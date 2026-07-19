import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon, type IconName } from "@/components/ui/icons";
import { PosMockup } from "@/components/products/PosMockup";

const posHighlights: { label: string; icon: IconName }[] = [
  { label: "Restaurant & retail support", icon: "utensils" },
  { label: "Multi-terminal operation", icon: "monitor" },
  { label: "Offline local-network functionality", icon: "wifiOff" },
  { label: "Inventory management", icon: "package" },
  { label: "Kitchen & receipt printing", icon: "printer" },
  { label: "Sales analytics", icon: "chart" },
  { label: "Employee management", icon: "users" },
  { label: "Multi-branch possibilities", icon: "building" },
  { label: "Secure backups", icon: "shield" },
  { label: "Modern interface", icon: "layout" },
];

export function FeaturedPos() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="pointer-events-none absolute top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgba(168,85,247,0.14),transparent)] blur-3xl"
        aria-hidden="true"
      />
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-2">
        <AnimatedContainer className="flex flex-col items-start gap-6">
          <Badge tone="brand">Featured product</Badge>
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Meet <span className="text-gradient">Modexa POS</span>
          </h2>
          <p className="text-lg leading-relaxed text-muted">
            A complete point-of-sale platform designed to simplify sales,
            inventory, employees, printing and business insights.
          </p>
          <ul className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2">
            {posHighlights.map((highlight) => (
              <li
                key={highlight.label}
                className="flex items-center gap-2.5 text-sm text-foreground/90"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-brand/25 bg-brand/10 text-[#c4a1fa]">
                  <Icon name={highlight.icon} className="size-3.5" />
                </span>
                {highlight.label}
              </li>
            ))}
          </ul>
          <div className="mt-2 flex flex-wrap gap-4">
            <Button href="/products/modexa-pos" size="lg">
              Explore Modexa POS
              <Icon name="arrowRight" className="size-4" />
            </Button>
            <Button href="/request-quote" variant="secondary" size="lg">
              Request a Demo
            </Button>
          </div>
        </AnimatedContainer>

        <AnimatedContainer delay={0.15} className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(99,102,241,0.15),transparent)] blur-2xl"
          />
          <div className="relative">
            <PosMockup />
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
