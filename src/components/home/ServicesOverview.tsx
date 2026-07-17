import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { services } from "@/content/services";

/** The eight core services featured on the home page (excludes maintenance). */
const featuredSlugs = [
  "website-development",
  "portfolio-websites",
  "ecommerce-development",
  "web-applications",
  "ai-agents",
  "business-automation",
  "custom-software",
  "api-integrations",
];

export function ServicesOverview() {
  const featured = services.filter((service) =>
    featuredSlugs.includes(service.slug)
  );

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Services"
        title={
          <>
            Everything your business needs,{" "}
            <span className="text-gradient">under one roof.</span>
          </>
        }
        description="Websites, web applications, AI agents, automation and custom software — designed and built by one team."
      />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((service, index) => (
          <AnimatedContainer
            key={service.slug}
            delay={(index % 4) * 0.06}
            className="h-full"
          >
            <ServiceCard service={service} />
          </AnimatedContainer>
        ))}
      </div>
    </section>
  );
}
