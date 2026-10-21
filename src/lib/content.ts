import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/i18n/config";
import { localize, type Resolved } from "@/i18n/localize";
import type {
  Customer,
  Faq,
  PortfolioProject,
  PosFeature,
  ProcessStep,
  Product,
  Service,
  SiteSettings,
  Testimonial,
} from "@/content/schema";
import type { PageContent, PageName } from "@/content/pages";

/**
 * Loader for CMS-managed content (content/).
 *
 * Everything in content/ is edited through Pages CMS (see .pages.yml) — the
 * team adds, edits, publishes and hides records there without touching any
 * React component. Files are read at build time; every page is statically
 * generated, so a CMS commit triggers a Vercel rebuild that picks it up.
 *
 * Each getter resolves bilingual { en, ar } fields to the requested locale.
 */
const contentDir = path.join(process.cwd(), "content");

function readJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(path.join(contentDir, relativePath), "utf8")) as T;
}

function readCollection<T extends { published: boolean; displayOrder: number }>(
  name: string
): T[] {
  const dir = path.join(contentDir, name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => readJson<T>(path.join(name, file)))
    .filter((record) => record.published)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export type Localized<T> = Resolved<T>;

export function getSettings(locale: Locale): Resolved<SiteSettings> {
  return localize(readJson<SiteSettings>("settings.json"), locale);
}

export function getPage<N extends PageName>(name: N, locale: Locale): Resolved<PageContent[N]> {
  return localize(readJson<PageContent[N]>(`pages/${name}.json`), locale);
}

export function getServices(locale: Locale) {
  return localize(readCollection<Service>("services"), locale);
}

export function getProducts(locale: Locale) {
  return localize(readCollection<Product>("products"), locale);
}

export function getPosFeatures(locale: Locale) {
  return localize(readCollection<PosFeature>("pos-features"), locale);
}

export function getFaqs(group: Faq["group"], locale: Locale) {
  return localize(
    readCollection<Faq>("faqs").filter((faq) => faq.group === group),
    locale
  );
}

export function getProcessSteps(locale: Locale) {
  return localize(readCollection<ProcessStep>("process-steps"), locale);
}

export function getPortfolioProjects(locale: Locale) {
  return localize(readCollection<PortfolioProject>("portfolio"), locale);
}

export function getFeaturedProjects(locale: Locale, limit?: number) {
  const featured = getPortfolioProjects(locale).filter((project) => project.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export function getCustomers(locale: Locale) {
  return localize(readCollection<Customer>("customers"), locale);
}

export function getTestimonials(locale: Locale) {
  return localize(readCollection<Testimonial>("testimonials"), locale);
}
