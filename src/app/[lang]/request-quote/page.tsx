import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/icons";
import { isLocale } from "@/i18n/config";
import { getPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/request-quote";

export async function generateMetadata({ params }: PageProps<"/[lang]/request-quote">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("request-quote", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function RequestQuotePage({ params }: PageProps<"/[lang]/request-quote">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const page = getPage("request-quote", lang);
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
            <QuoteForm />
          </div>

          <aside className="lg:col-span-5">
            <div className="flex flex-col gap-8 lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">{page.stepsTitle}</h2>
              <ol className="flex flex-col gap-7">
                {page.steps.map((step, index) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-edge-strong text-sm font-semibold tabular-nums">
                      {index + 1}
                    </span>
                    <div className="flex flex-col gap-1 pt-1.5">
                      <p className="flex items-center gap-2 font-semibold">
                        <Icon name={step.icon} className="size-4 text-brand-accent" />
                        {step.title}
                      </p>
                      <p className="leading-relaxed text-soft/75">{step.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="flex items-start gap-3 border-t border-edge pt-6 text-sm text-muted">
                <Icon name="clock" className="mt-0.5 size-4 shrink-0" />
                {settings.responseTime}
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
