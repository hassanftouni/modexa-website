import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/shared/LegalPage";
import { isLocale } from "@/i18n/config";
import { getPage, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

const path = "/privacy";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { seo } = getPage("privacy", lang);
  return pageMetadata({ locale: lang, path, title: seo.title, description: seo.description });
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return <LegalPage page={getPage("privacy", lang)} email={getSettings(lang).email} />;
}
