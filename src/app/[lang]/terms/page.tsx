import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/shared/LegalPage";
import { isLocale } from "@/i18n/config";
import { getPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/terms";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("terms", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LegalPage page={getPage("terms", lang)} email={getSettings(lang).email} />;
}
