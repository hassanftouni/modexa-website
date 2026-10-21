import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { LocaleLink } from "@/i18n/client";
import type { HomePage } from "@/content/pages";
import type { Localized } from "@/lib/content";

/**
 * "Sound familiar?" — everyday problems in the visitor's own words, each
 * paired with the plain-language answer and the page that covers it.
 */
export function Problems({ content }: { content: Localized<HomePage["problems"]> }) {
  return (
    <Section tone="light">
      <SectionHeading
        eyebrow={content.eyebrow}
        title={content.title}
        description={content.description}
      />
      <ul className="mt-14 grid gap-x-12 sm:grid-cols-2 lg:mt-16">
        {content.items.map((item, index) => (
          <li key={item.href + index} className="border-t border-edge">
            <AnimatedContainer delay={(index % 2) * 0.06} className="flex h-full flex-col gap-4 py-8">
              <p className="display text-2xl leading-snug sm:text-[1.7rem]">{item.problem}</p>
              <p className="flex items-start gap-3 leading-relaxed text-soft/85">
                <Icon name="arrowRight" className="mt-1 size-4 shrink-0 text-brand-accent" />
                {item.solution}
              </p>
              <LocaleLink
                href={item.href}
                className="mt-auto w-fit ps-7 text-sm font-semibold text-brand-accent underline decoration-current/30 underline-offset-4 transition-colors hover:decoration-current"
              >
                {item.linkLabel}
              </LocaleLink>
            </AnimatedContainer>
          </li>
        ))}
      </ul>
    </Section>
  );
}
