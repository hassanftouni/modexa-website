# Modexa Website

The official website of **Modexa** — a technology company building digital
products, business software and intelligent automation solutions, including
**Modexa POS**.

Built with Next.js 16 (App Router), TypeScript, Tailwind CSS 4 and Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts:

```bash
npm run lint    # ESLint
npm run build   # production build (all pages statically generated)
npm run start   # serve the production build
```

## Project structure

```text
.pages.yml           Pages CMS configuration (admin UI for content)
content/             CMS-managed content (JSON records)
├── customers/       Trusted-customer records (logo, industry, published, …)
├── portfolio/       Portfolio project records
└── testimonials/    Testimonial records
public/images/       Images (brand/, customers/, portfolio/, products/, …)
src/app/             Routes (App Router)
src/components/      layout/, home/, ui/, forms/, products/, portfolio/, …
src/content/         Editable TypeScript content (services, products, FAQs, …)
src/lib/             site config + content loaders
```

## Editing content

- **Services, products, FAQs, technologies, process steps, POS features**:
  edit the files in `src/content/` — components render whatever is there.
- **Customers, portfolio projects, testimonials**: managed through
  [Pages CMS](https://pagescms.org) — no code changes needed:
  1. Log in to Pages CMS with GitHub and open this repository.
  2. Open *Customers*, *Portfolio projects* or *Testimonials*.
  3. Add or edit a record, upload logo/project images.
  4. Save — Pages CMS commits to GitHub and Vercel rebuilds automatically.
  5. Only records with **Published** enabled appear on the website.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import it in Vercel (framework preset: Next.js — no extra config needed).
3. Set the environment variable `NEXT_PUBLIC_SITE_URL` to the final domain
   (e.g. `https://modexa.example`) so canonical URLs, sitemap and Open Graph
   metadata are correct.

## Before launch — placeholders to replace

- Placeholder customers, testimonials and concept portfolio projects
  (via Pages CMS).
- Contact email + social links in `src/lib/site.ts`.
- Privacy Policy and Terms of Service copy (legal review).
- Wire the contact/quote forms to a real service (Resend, Formspree or a
  route handler) — see comments in `src/components/forms/`.
- Real Modexa POS screenshots (currently a CSS mockup + placeholder images).
