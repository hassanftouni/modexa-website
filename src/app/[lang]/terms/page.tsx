import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing the use of the Modexa website.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

/*
 * PLACEHOLDER LEGAL TEXT: have these terms reviewed by a legal professional
 * before launch. Project-specific terms (payment, delivery, licensing of
 * Modexa POS, support agreements) belong in individual contracts and quotes.
 */
const sections = [
  {
    title: "About this website",
    body: "This website presents the services and products of Modexa, a technology company building software, websites, AI agents and automation solutions. The content is provided for general information about what Modexa offers.",
  },
  {
    title: "Quotes and projects",
    body: "Information submitted through the contact and quote forms is a request for a proposal, not a binding order. Every project is governed by the individual agreement and quote prepared for that project, including scope, pricing, timelines and support terms.",
  },
  {
    title: "Intellectual property",
    body: "The Modexa name, logo and the content of this website belong to Modexa and may not be copied or reused without permission. Trademarks and product names mentioned on this site belong to their respective owners.",
  },
  {
    title: "Accuracy of information",
    body: "We work to keep the information on this website accurate and current. Features described for products such as Modexa POS may evolve over time; the exact scope of any delivery is defined in the project agreement.",
  },
  {
    title: "Liability",
    body: "This website is provided as-is. Modexa is not liable for damages arising from the use of this website itself. Responsibilities related to delivered projects are defined in each project's agreement.",
  },
  {
    title: "Contact",
    body: `Questions about these terms can be sent to ${siteConfig.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The terms governing the use of the Modexa website."
      />
      <div className="mx-auto w-full max-w-3xl px-6 pb-24">
        <AnimatedContainer className="flex flex-col gap-10">
          <p className="text-sm text-muted">Last updated: July 2026</p>
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
            </section>
          ))}
        </AnimatedContainer>
      </div>
    </>
  );
}
