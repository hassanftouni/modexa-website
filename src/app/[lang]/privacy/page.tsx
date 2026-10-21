import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Modexa handles personal information on this website.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

/*
 * PLACEHOLDER LEGAL TEXT: have this policy reviewed (and localized if needed)
 * by a legal professional before launch, and update it whenever forms are
 * connected to a real email/CRM service or analytics are added.
 */
const sections = [
  {
    title: "What information we collect",
    body: "When you use the contact or quote forms on this website, you may provide information such as your name, business name, email address, phone number, country and a description of your project. We only collect the information you choose to send us.",
  },
  {
    title: "How we use your information",
    body: "The information you submit is used to respond to your request, prepare quotes, and communicate with you about your project. We do not sell your personal information, and we do not use it for unrelated marketing without your consent.",
  },
  {
    title: "Cookies and analytics",
    body: "This website currently does not use tracking cookies. If analytics tools are added in the future, this policy will be updated to describe what is measured and how.",
  },
  {
    title: "Data storage and security",
    body: "Messages sent through this website are handled through secure services. We take reasonable technical and organizational measures to protect the information you share with us.",
  },
  {
    title: "Your rights",
    body: "You may ask us at any time what information we hold about you, request a correction, or ask us to delete it. Contact us using the email address below and we will respond as soon as possible.",
  },
  {
    title: "Contact",
    body: `For any privacy-related question, contact Modexa at ${siteConfig.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Modexa handles personal information on this website."
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
