import type { IconName } from "@/components/ui/icons";
import type { LocalizedText as T } from "@/i18n/localize";

/*
 * Page-level CMS content (content/pages/*.json): headings, descriptions and
 * page-specific lists. Keep in sync with the "Pages" section of .pages.yml.
 *
 * `highlight` fields name the part of a heading shown in the accent colour;
 * it must appear word-for-word in the heading (otherwise nothing is coloured).
 */

export interface Seo {
  title: T;
  description: T;
}

interface Cta {
  primaryCta: T;
  secondaryCta: T;
}

interface Heading {
  eyebrow: T;
  title: T;
  description: T;
}

export interface HomePage {
  seo: Seo;
  hero: Heading &
    Cta & {
      highlight: T;
      facts: T[];
      showcase: {
        label: T;
        website: { tab: T; caption: T; headline: T; cta: T; nav: T[] };
        pos: { tab: T; caption: T };
        automation: { tab: T; caption: T; steps: T[] };
      };
    };
  services: Heading & {
    items: { icon: IconName; href: string; title: T; description: T }[];
  };
  pos: Heading & Cta & { highlight: T; points: T[] };
  problems: Heading & {
    items: { problem: T; solution: T; linkLabel: T; href: string }[];
  };
  process: Heading;
  work: Heading & { cta: T };
  why: {
    eyebrow: T;
    title: T;
    points: { title: T; description: T }[];
    customersTitle: T;
    testimonialsTitle: T;
  };
  faq: Heading;
  cta: Cta & { title: T; highlight: T; description: T };
}

interface CtaBlock extends Cta {
  title: T;
  highlight: T;
  description: T;
}

interface PageHeaderBlock extends Heading {
  highlight: T;
}

export interface PosPage {
  seo: Seo;
  hero: PageHeaderBlock & Cta;
  demo: Heading & {
    /** Optional real screenshots that replace the coded demo screens. */
    screenshots: { order: string; kitchen: string; sales: string; stock: string };
  };
  industries: { eyebrow: T; title: T; items: { icon: IconName; name: T }[] };
  offline: Heading & {
    points: T[];
    terminalsLabel: T;
    serverLabel: T;
    serverNote: T;
    printersLabel: T;
  };
  features: Heading;
  faq: Heading;
  cta: CtaBlock;
}

export interface ProductsPage {
  seo: Seo;
  header: PageHeaderBlock;
  flagshipLabel: T;
  otherTitle: T;
  otherDescription: T;
  cta: CtaBlock;
}

export interface PageContent {
  home: HomePage;
  pos: PosPage;
  products: ProductsPage;
}

export type PageName = keyof PageContent;
