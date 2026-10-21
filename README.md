# Modexa Website

The official website of **Modexa** — a software company building websites,
web applications, AI agents, business automation, custom software and
**Modexa POS**. Available in English and Arabic.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 (English) or http://localhost:3000/ar (Arabic).

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # production build (all pages statically generated)
npm run start   # serve the production build
```

## Project structure

```text
.pages.yml             Pages CMS configuration (editing forms for content/)
content/               All visitor-facing content, English + Arabic (JSON)
├── settings.json      Contact email, phone, WhatsApp, social links
├── pages/             Headings and text for every page (home, pos, …)
├── services/          Services (Services page)
├── products/          Products (Products page)
├── pos-features/      Modexa POS feature list
├── faqs/              FAQs (group: general or pos)
├── process-steps/     "How we work" steps
├── portfolio/         Portfolio projects
├── customers/         Customers
└── testimonials/      Testimonials
public/images/         Images (brand/, customers/, portfolio/, pos/, …)
src/app/[lang]/        Routes — every page exists in English and Arabic
src/proxy.ts           Locale routing (English unprefixed, Arabic under /ar)
src/i18n/              Locale config + interface strings (menus, forms, demo)
src/components/        layout/, home/, ui/, forms/, products/, shared/, …
src/content/           TypeScript types for the content/ files
src/lib/               Content loader, metadata helper, site config
```

## Languages

- English uses the original URLs (`/services`); Arabic lives under `/ar`
  (`/ar/services`) with a right-to-left layout and IBM Plex Sans Arabic.
- The language switcher in the header remembers the visitor's choice
  (a `NEXT_LOCALE` cookie), so it persists across pages and visits.
- Page content is translated in `content/` (edited in Pages CMS).
  Interface text — menus, buttons, form labels and errors, the POS demo —
  is in `src/i18n/dictionaries/en.ts` and `ar.ts`.

## Editing content (no code needed)

Everything visitors read is managed through [Pages CMS](https://pagescms.org):

1. Log in to Pages CMS with GitHub and open this repository.
2. Choose what to edit:
   - **Site settings** — email, phone, WhatsApp, social links.
   - **Pages / …** — headings, descriptions and lists for each page.
   - **Services**, **Products**, **Modexa POS features**, **FAQs**,
     **How we work**, **Portfolio projects**, **Customers**, **Testimonials**.
3. Every text field has an **English** and an **Arabic** box. If the Arabic
   box is empty, the website shows the English text.
4. "Highlighted words" must be copied exactly from the heading — they are
   shown in the accent colour.
5. Save — Pages CMS commits to GitHub and Vercel rebuilds automatically.
6. In collections, only records with **Published** enabled appear.

Only publish real customers, projects and testimonials that the client has
approved.

### Modexa POS demo screenshots

The Modexa POS page shows an interactive demo with sample data. To replace
any of its four screens with a real screenshot, upload it under
**Pages / Modexa POS page → Demo → Demo screenshots**.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel (framework preset: Next.js — no extra config needed).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the final domain
   (e.g. `https://modexa.example`) so canonical URLs, sitemap and Open Graph
   metadata are correct.
4. Set `NEXT_PUBLIC_FORMSPREE_CONTACT_ID` and `NEXT_PUBLIC_FORMSPREE_QUOTE_ID`
   (same values as in `.env.local`) so the contact and quote forms can submit.
   These are public Formspree form ids — no secrets belong in frontend env vars.

The contact and quote forms submit to Formspree
(`src/components/forms/ContactForm.tsx` / `QuoteForm.tsx`). Submissions are
tagged with `form_source` (which form) and `language` (English or Arabic);
dropdown answers are always sent in English.

## Before launch

- Publish real, approved customers and testimonials (currently none).
- Real social links and, if wanted, phone/WhatsApp (Site settings).
- Legal review of the Privacy Policy and Terms of Service.
- Real Modexa POS screenshots for the demo (optional).
