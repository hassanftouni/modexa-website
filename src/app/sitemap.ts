import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

const routes = [
  "",
  "/services",
  "/products",
  "/products/modexa-pos",
  "/ai-automation",
  "/websites",
  "/portfolio",
  "/about",
  "/customers",
  "/contact",
  "/request-quote",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
