import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";
import { websiteQualities, websiteTypes } from "@/content/websiteTypes";

export function WebsiteDevelopmentSection() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="relative mx-auto w-full max-w-7xl px-6">
        <SectionHeading
          eyebrow="Websites"
          title={
            <>
              Websites that make businesses{" "}
              look world-class.
            </>
          }
          description="From focused landing pages to complete web platforms — every Modexa website is responsive, fast and built to convert."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {websiteTypes.map((type, index) => (
            <AnimatedContainer
              key={type.name}
              delay={(index % 4) * 0.05}
              className="h-full"
            >
              <article className="card-surface flex h-full flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <span className="flex size-9 items-center justify-center rounded-lg border border-brand/30 bg-brand/10 text-brand">
                  <Icon name={type.icon} className="size-4.5" />
                </span>
                <h3 className="text-sm font-semibold sm:text-base">{type.name}</h3>
                <p className="hidden text-sm leading-relaxed text-muted sm:block">
                  {type.description}
                </p>
              </article>
            </AnimatedContainer>
          ))}
        </div>

        <AnimatedContainer className="mt-10">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2.5">
            {websiteQualities.slice(0, 8).map((quality) => (
              <li
                key={quality}
                className="flex items-center gap-2 text-sm text-muted"
              >
                <Icon name="check" className="size-4 text-brand-accent" />
                {quality}
              </li>
            ))}
          </ul>
        </AnimatedContainer>

        <AnimatedContainer className="mt-10 flex justify-center">
          <Button href="/websites" variant="secondary" size="lg">
            See Website Development
            <Icon name="arrowRight" className="size-4" />
          </Button>
        </AnimatedContainer>
      </div>
    </section>
  );
}
