import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/ContactForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";
import { LocaleLink } from "@/i18n/client";
import { isLocale } from "@/i18n/config";
import { getFaqs, getPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/contact";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("contact", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("contact", lang);
  const settings = getSettings(lang);

  return (
    <>
      <PageHeader
        eyebrow={page.header.eyebrow}
        title={page.header.title}
        highlight={page.header.highlight}
        description={page.header.description}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-10 lg:col-span-5">
            <div className="flex flex-col gap-4 border-s-2 border-brand ps-6">
              <h2 className="text-lg font-semibold">{page.directTitle}</h2>
              <a
                href={`mailto:${settings.email}`}
                className="flex w-fit items-center gap-3 text-lg text-foreground underline decoration-edge-strong underline-offset-4 hover:decoration-brand"
              >
                <Icon name="mail" className="size-5 text-brand-accent" />
                <bdi dir="ltr">{settings.email}</bdi>
              </a>
              {settings.phone ? (
                <a href={`tel:${settings.phone}`} className="flex w-fit items-center gap-3 text-soft">
                  <Icon name="phone" className="size-5 text-brand-accent" />
                  <bdi dir="ltr">{settings.phone}</bdi>
                </a>
              ) : null}
              <p className="flex items-start gap-3 text-sm text-muted">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
                {settings.responseTime}
              </p>
            </div>

            <div className="flex flex-col gap-3 rounded-xl border border-edge p-6">
              <p className="leading-relaxed text-soft/80">{page.quoteHint}</p>
              <LocaleLink
                href="/request-quote"
                className="inline-flex w-fit items-center gap-2 font-semibold text-brand-accent underline-offset-4 hover:underline"
              >
                {page.quoteLink}
                <Icon name="arrowRight" className="size-4" />
              </LocaleLink>
            </div>

            <div>
              <h2 className="mb-2 text-lg font-semibold">{page.faqTitle}</h2>
              <FaqAccordion faqs={getFaqs("general", lang)} />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
