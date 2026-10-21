import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { LocaleLink } from "@/i18n/client";
import type { HomePage } from "@/content/pages";
import type { Localized } from "@/lib/content";

interface ServicesIndexProps {
  content: Localized<HomePage["services"]>;
  allServicesLabel: string;
}

/** "What we do": a numbered index of services rather than a card grid. */
export function ServicesIndex({ content, allServicesLabel }: ServicesIndexProps) {
  return (
    <Section tone="light" id="what-we-do">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="flex flex-col items-start gap-8 lg:sticky lg:top-28">
            <SectionHeading
              eyebrow={content.eyebrow}
              title={content.title}
              description={content.description}
            />
            <Button href="/services" variant="secondary">
              {allServicesLabel}
              <Icon name="arrowRight" className="size-4" />
            </Button>
          </div>
        </div>

        <ol className="border-t border-edge lg:col-span-7">
          {content.items.map((item, index) => (
            <li key={item.href} className="border-b border-edge">
              <AnimatedContainer delay={Math.min(index * 0.04, 0.2)}>
                <LocaleLink
                  href={item.href}
                  className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-7 transition-colors sm:gap-7"
                >
                  <span className="pt-1 text-sm font-medium text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex flex-col gap-2">
                    <span className="flex items-center gap-3 text-xl font-semibold tracking-tight sm:text-2xl">
                      <Icon name={item.icon} className="size-5 text-brand-accent" />
                      {item.title}
                    </span>
                    <span className="max-w-lg leading-relaxed text-soft/80">{item.description}</span>
                  </span>
                  <span className="mt-1 flex size-10 items-center justify-center rounded-full border border-edge text-muted transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                    <Icon name="arrowRight" className="size-4" />
                  </span>
                </LocaleLink>
              </AnimatedContainer>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
