"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import { SelectField, TextAreaField, TextField, isValidEmail } from "./fields";

type Status = "idle" | "submitting" | "success" | "error";

/*
 * NEXT_PUBLIC_FORMSPREE_QUOTE_ID is a public Formspree form id (safe to
 * expose in the browser). Never put passwords, API secrets or email
 * credentials in this component.
 */
const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_QUOTE_ID}`
  : null;

export function QuoteForm() {
  const { locale, dict } = useI18n();
  const t = dict.forms;
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Spam-protection placeholder (honeypot) — see ContactForm for details.
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (!String(data.get("name") ?? "").trim()) nextErrors.name = t.errors.name;
    if (!isValidEmail(String(data.get("email") ?? ""))) nextErrors.email = t.errors.email;
    if (!String(data.get("service") ?? "")) nextErrors.service = t.errors.service;
    if (String(data.get("goals") ?? "").trim().length < 10) nextErrors.goals = t.errors.goals;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      return;
    }

    if (!endpoint) {
      setSubmitError(t.errors.quoteNotConfigured);
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);

    try {
      // Keep the submission readable in Formspree: drop the empty honeypot
      // field, tag which form it came from and in which language.
      data.delete("company_website");
      data.append("form_source", "Modexa Quote Request");
      data.append("language", locale === "ar" ? "Arabic" : "English");

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) {
        throw new Error(`Formspree responded with ${response.status}`);
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      // Logged for debugging only — never shown to the visitor.
      console.error("Quote form submission failed:", err);
      // Entered values stay in the form so the visitor can simply retry.
      setSubmitError(t.errors.sendFailed);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <span className="flex size-12 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand-accent">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="text-2xl font-semibold">{t.quote.successTitle}</h2>
        <p className="max-w-md leading-relaxed text-soft/80">{t.quote.successBody}</p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          {t.quote.again}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — visually hidden, should stay empty. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField id="name" label={t.fields.yourName} autoComplete="name" required error={errors.name} />
        <TextField id="company" label={t.fields.company} autoComplete="organization" />
        <TextField
          id="email"
          label={t.fields.email}
          type="email"
          dir="ltr"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField id="phone" label={t.fields.phone} type="tel" dir="ltr" autoComplete="tel" />
        <TextField id="country" label={t.fields.country} autoComplete="country-name" />
        <TextField id="industry" label={t.fields.industry} placeholder={t.fields.industryPlaceholder} />
      </div>

      <SelectField
        id="service"
        label={t.fields.service}
        options={t.options.service}
        placeholder={t.selectPlaceholder}
        required
        error={errors.service}
      />

      <TextAreaField
        id="goals"
        label={t.fields.goals}
        placeholder={t.fields.goalsPlaceholder}
        required
        error={errors.goals}
      />
      <TextAreaField id="features" label={t.fields.features} placeholder={t.fields.featuresPlaceholder} rows={4} />

      <div className="grid gap-5 sm:grid-cols-3">
        <SelectField
          id="budget"
          label={t.fields.budget}
          options={t.options.budget}
          placeholder={t.selectPlaceholder}
        />
        <SelectField
          id="timeline"
          label={t.fields.timeline}
          options={t.options.timeline}
          placeholder={t.selectPlaceholder}
        />
        <TextField id="existingUrl" label={t.fields.existingUrl} type="url" dir="ltr" placeholder="https://" />
      </div>

      <TextAreaField id="notes" label={t.fields.notes} rows={3} />

      {status === "error" && submitError ? (
        <p role="alert" className="text-sm text-red-400">
          {submitError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="sm:self-start">
        {status === "submitting" ? t.sending : t.quote.submit}
        {status !== "submitting" ? <Icon name="arrowRight" className="size-4" /> : null}
      </Button>
    </form>
  );
}
