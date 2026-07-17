import type { IconName } from "@/components/ui/icons";

/** A Modexa service (websites, AI agents, automation, …). */
export interface Service {
  slug: string;
  name: string;
  icon: IconName;
  shortDescription: string;
  problem: string;
  solution: string;
  benefits: string[];
  features: string[];
  examples: string[];
}

export type ProductStatus =
  | "available"
  | "coming-soon"
  | "in-development"
  | "by-request";

/** A Modexa product (Modexa POS is the main active product). */
export interface Product {
  slug: string;
  name: string;
  icon: IconName;
  status: ProductStatus;
  shortDescription: string;
  highlights: string[];
  href?: string;
}

/** CMS-managed customer record (content/customers/*.json). */
export interface Customer {
  name: string;
  slug: string;
  logo: string;
  industry: string;
  website: string;
  testimonial: string;
  projectType: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

/** CMS-managed testimonial record (content/testimonials/*.json). */
export interface Testimonial {
  slug: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export type PortfolioCategory =
  | "websites"
  | "modexa-pos"
  | "ai"
  | "automation"
  | "web-applications";

export type ProjectStatus = "concept" | "in-progress" | "completed";

/** CMS-managed portfolio project record (content/portfolio/*.json). */
export interface PortfolioProject {
  title: string;
  slug: string;
  category: PortfolioCategory;
  shortDescription: string;
  fullDescription: string;
  thumbnail: string;
  galleryImages: string[];
  technologies: string[];
  customerName: string;
  websiteUrl: string;
  projectStatus: ProjectStatus;
  featured: boolean;
  published: boolean;
  displayOrder: number;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Technology {
  name: string;
  category: "frontend" | "backend" | "data" | "ai" | "platform";
}

export interface ProcessStep {
  step: number;
  title: string;
  icon: IconName;
  description: string;
}

export interface PosFeatureGroup {
  title: string;
  icon: IconName;
  description: string;
  features: string[];
}

export interface WebsiteType {
  name: string;
  icon: IconName;
  description: string;
}

export interface AutomationUseCase {
  name: string;
  icon: IconName;
  description: string;
  /** Honest availability wording, e.g. "Can be developed based on project requirements." */
  availability?: string;
}
