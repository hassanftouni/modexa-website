import type { MetadataRoute } from "next";
import { localizePath } from "@/i18n/config";
import { siteConfig } from "@/lib/site";

const routes = [
  "/",
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

/** Every page in English and Arabic, each listing the other as an alternate. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) => {
    const languages = {
      en: `${siteConfig.url}${localizePath("en", route)}`,
      ar: `${siteConfig.url}${localizePath("ar", route)}`,
    };
    const priority = route === "/" ? 1 : route === "/products/modexa-pos" ? 0.9 : 0.7;
    return (["en", "ar"] as const).map((locale) => ({
      url: languages[locale],
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
