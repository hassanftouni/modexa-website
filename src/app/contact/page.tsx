import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Icon } from "@/components/ui/icons";
import { ContactForm } from "@/components/forms/ContactForm";
import { generalFaqs } from "@/content/faqs";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Modexa about websites, Modexa POS, AI agents, business automation, custom software and API integrations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Modexa",
    description: "Tell Modexa about your project — get a clear, honest answer.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={
          <>
            Let’s talk about{" "}
            <span className="text-gradient">your project.</span>
          </>
        }
        description="Tell Modexa what you need — a website, a POS system, an AI agent or automation — and get a clear, personal reply."
      />

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 pb-24 lg:grid-cols-[1.5fr_1fr]">
        <AnimatedContainer>
          <div className="card-surface rounded-3xl p-6 sm:p-10">
            <ContactForm />
          </div>
        </AnimatedContainer>

        <div className="flex flex-col gap-8">
          <AnimatedContainer delay={0.1}>
            <div className="card-surface flex flex-col gap-4 rounded-3xl p-8">
              <h2 className="text-lg font-semibold">Direct contact</h2>
              <a
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-3 text-sm text-muted transition-colors hover:text-foreground"
              >
                <Icon name="mail" className="size-4 text-brand-accent" />
                {siteConfig.email}
              </a>
              <p className="flex items-start gap-3 text-sm text-muted">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0 text-brand-accent" />
                Messages are usually answered within one to two business days.
              </p>
            </div>
          </AnimatedContainer>

          <AnimatedContainer delay={0.15}>
            <div>
              <h2 className="mb-4 text-lg font-semibold">Common questions</h2>
              <FaqAccordion faqs={generalFaqs} />
            </div>
          </AnimatedContainer>
        </div>
      </div>
    </>
  );
}
