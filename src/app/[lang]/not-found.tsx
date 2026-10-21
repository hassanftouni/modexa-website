"use client";

import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/icons";
import { LocaleLink, useI18n } from "@/i18n/client";

export default function NotFound() {
  const { dict } = useI18n();

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden px-5 pt-24 pb-16 text-center">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative flex max-w-xl flex-col items-center gap-6">
        <Logo size={48} withWordmark={false} />
        <p className="eyebrow">{dict.notFound.eyebrow}</p>
        <h1 className="display text-4xl sm:text-5xl">{dict.notFound.title}</h1>
        <p className="text-lg leading-relaxed text-soft/80">{dict.notFound.body}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            {dict.common.backHome}
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            {dict.common.contactUs}
          </Button>
        </div>
        <LocaleLink
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          {dict.notFound.servicesLink}
          <Icon name="arrowRight" className="size-4" />
        </LocaleLink>
      </div>
    </div>
  );
}
