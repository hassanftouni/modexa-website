import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Section";
import type { LegalPage as LegalContent } from "@/content/pages";
import type { Localized } from "@/lib/content";

/*
 * Shared layout for the privacy policy and terms. The text is edited in
 * Pages CMS; have it reviewed by a legal professional before relying on it.
 */
export function LegalPage({ page, email }: { page: Localized<LegalContent>; email: string }) {
  return (
    <>
      <PageHeader eyebrow={page.header.eyebrow} title={page.header.title} description={page.header.description} />
      <Container className="py-16 lg:py-24">
        <div className="flex max-w-3xl flex-col gap-12">
          <p className="text-sm text-muted">{page.updated}</p>
          {page.sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <p className="mt-3 text-lg leading-relaxed text-soft/80">{section.body}</p>
            </section>
          ))}
          <p className="border-t border-edge pt-8 text-soft/80">
            {page.contactLabel}{" "}
            <a href={`mailto:${email}`} className="text-foreground underline underline-offset-4">
              <bdi dir="ltr">{email}</bdi>
            </a>
          </p>
        </div>
      </Container>
    </>
  );
}
