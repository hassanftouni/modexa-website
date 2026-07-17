/**
 * Central site configuration.
 * Set NEXT_PUBLIC_SITE_URL (e.g. in Vercel project settings) to the final
 * Modexa domain once it is connected — it drives canonical URLs, the sitemap
 * and Open Graph metadata.
 */
export const siteConfig = {
  name: "Modexa",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://modexa.vercel.app",
  tagline: "Technology built for modern businesses.",
  description:
    "Modexa builds modern software, websites, AI agents and automation solutions for businesses ready to grow.",
  // PLACEHOLDER: replace with the official Modexa contact email before launch.
  email: "hello@modexa.example",
  social: {
    // PLACEHOLDER: add real social profile URLs when available.
    linkedin: "#",
    instagram: "#",
    x: "#",
    github: "#",
  },
} as const;
