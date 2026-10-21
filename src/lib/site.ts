/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL (e.g. in Vercel project settings) to the final
 * Modexa domain once it is connected — it drives canonical URLs, the sitemap
 * and Open Graph metadata.
 *
 * Contact email, phone and social links are edited in Pages CMS
 * (Site settings → content/settings.json).
 */
export const siteConfig = {
  name: "Modexa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modexa.vercel.app",
} as const;
