import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LogoCloud } from "@/components/ui/LogoCloud";
import type { Customer } from "@/content/types";

/*
 * Customer records come from content/customers/ (managed via Pages CMS).
 * The entries currently there are neutral placeholders — replace them with
 * real, approved customer logos through the CMS before launch.
 */
export function TrustedCustomers({ customers }: { customers: Customer[] }) {
  if (customers.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24">
      <SectionHeading
        eyebrow="Customers"
        title="Trusted by businesses and professionals"
        description="Modexa works with restaurants, retailers, professionals and growing companies across industries."
      />
      <AnimatedContainer className="mt-12">
        <LogoCloud customers={customers} />
      </AnimatedContainer>
    </section>
  );
}
