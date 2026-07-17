import fs from "node:fs";
import path from "node:path";
import type {
  Customer,
  PortfolioProject,
  Testimonial,
} from "@/content/types";

/**
 * Loader for CMS-managed content collections (content/*.json).
 *
 * These folders are edited through Pages CMS (see .pages.yml) — the website
 * owner adds, edits, publishes and hides records there without touching any
 * React component. Files are read at build time; every page consuming them is
 * statically generated, so Vercel rebuilds pick up CMS commits automatically.
 */
const contentDir = path.join(process.cwd(), "content");

function readCollection<T>(name: string): T[] {
  const dir = path.join(contentDir, name);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map(
      (file) =>
        JSON.parse(fs.readFileSync(path.join(dir, file), "utf8")) as T
    );
}

function byDisplayOrder(a: { displayOrder: number }, b: { displayOrder: number }) {
  return a.displayOrder - b.displayOrder;
}

/** Published customers, ordered for display. */
export function getCustomers(): Customer[] {
  return readCollection<Customer>("customers")
    .filter((customer) => customer.published)
    .sort(byDisplayOrder);
}

export function getFeaturedCustomers(): Customer[] {
  return getCustomers().filter((customer) => customer.featured);
}

/** Published testimonials, ordered for display. */
export function getTestimonials(): Testimonial[] {
  return readCollection<Testimonial>("testimonials")
    .filter((testimonial) => testimonial.published)
    .sort(byDisplayOrder);
}

/** Published portfolio projects, ordered for display. */
export function getPortfolioProjects(): PortfolioProject[] {
  return readCollection<PortfolioProject>("portfolio")
    .filter((project) => project.published)
    .sort(byDisplayOrder);
}

export function getFeaturedProjects(limit?: number): PortfolioProject[] {
  const featured = getPortfolioProjects().filter((project) => project.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}
