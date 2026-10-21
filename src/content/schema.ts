import type { IconName } from "@/components/ui/icons";
import type { LocalizedText } from "@/i18n/localize";

/*
 * Shapes of the CMS records in content/. Every visitor-facing text is a
 * LocalizedText ({ en, ar }); the loader in src/lib/content.ts resolves it
 * to plain strings for the requested locale. Keep these in sync with
 * .pages.yml, which defines the editing forms.
 */

interface Ordered {
  slug: string;
  published: boolean;
  displayOrder: number;
}

export interface SiteSettings {
  email: string;
  phone: string;
  whatsapp: string;
  responseTime: LocalizedText;
  social: { linkedin: string; instagram: string; x: string; github: string };
}

export interface Service extends Ordered {
  icon: IconName;
  name: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  benefits: LocalizedText[];
  features: LocalizedText[];
  examples: LocalizedText[];
}

export type ProductStatus = "available" | "coming-soon" | "in-development" | "by-request";

export interface Product extends Ordered {
  icon: IconName;
  status: ProductStatus;
  href: string;
  name: LocalizedText;
  summary: LocalizedText;
  highlights: LocalizedText[];
}

export interface PosFeature extends Ordered {
  icon: IconName;
  title: LocalizedText;
  description: LocalizedText;
  features: LocalizedText[];
}

export interface Faq extends Ordered {
  group: "general" | "pos";
  question: LocalizedText;
  answer: LocalizedText;
}

export interface ProcessStep extends Ordered {
  icon: IconName;
  title: LocalizedText;
  description: LocalizedText;
}

export type PortfolioCategory =
  | "websites"
  | "modexa-pos"
  | "ai"
  | "automation"
  | "web-applications";

export type ProjectStatus = "concept" | "in-progress" | "completed";

export interface PortfolioProject extends Ordered {
  title: LocalizedText;
  category: PortfolioCategory;
  shortDescription: LocalizedText;
  fullDescription: LocalizedText;
  thumbnail: string;
  galleryImages: string[];
  technologies: string[];
  customerName: string;
  websiteUrl: string;
  projectStatus: ProjectStatus;
  featured: boolean;
}

export interface Customer extends Ordered {
  name: string;
  logo: string;
  industry: LocalizedText;
  website: string;
  testimonial: LocalizedText;
  projectType: string;
  featured: boolean;
}

export interface Testimonial extends Ordered {
  quote: LocalizedText;
  author: string;
  role: LocalizedText;
  company: string;
  featured: boolean;
}
