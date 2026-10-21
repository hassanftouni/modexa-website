import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Archivo, Geist, IBM_Plex_Sans_Arabic } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { I18nProvider } from "@/i18n/client";
import { dirOf, isLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getSettings } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Display face for Latin headings. The wdth axis lets headings run slightly
// condensed (font-stretch in globals.css) for a tighter, editorial feel.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

// Arabic text and headings. Not preloaded: English pages never use it, and
// Arabic pages request it as soon as the stylesheet applies.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-plex-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const dict = getDictionary(lang);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: dict.meta.siteTitle,
      template: "%s — Modexa",
    },
    description: dict.meta.siteDescription,
    openGraph: {
      type: "website",
      siteName: "Modexa",
      locale: dict.meta.ogLocale,
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.siteTitle,
      description: dict.meta.siteDescription,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const dict = getDictionary(lang);
  const settings = getSettings(lang);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Modexa",
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/brand/modexa-icon.svg`,
    description: dict.meta.siteDescription,
    email: settings.email,
  };

  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={`${geistSans.variable} ${archivo.variable} ${plexArabic.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <I18nProvider locale={lang} dict={dict}>
          <a
            href="#main"
            className="sr-only z-50 rounded-md bg-brand px-4 py-2 font-semibold text-on-brand focus:not-sr-only focus:fixed focus:top-4 focus:start-4"
          >
            {dict.a11y.skipToContent}
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer dict={dict} settings={settings} />
        </I18nProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
