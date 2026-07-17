"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import {
  SelectField,
  TextAreaField,
  TextField,
  budgetOptions,
  isValidEmail,
  serviceOptions,
  timelineOptions,
} from "./fields";

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
    if (!String(data.get("name") ?? "").trim()) {
      nextErrors.name = "Please enter your name.";
    }
    if (!isValidEmail(String(data.get("email") ?? ""))) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!String(data.get("service") ?? "")) {
      nextErrors.service = "Please choose the service you need.";
    }
    if (String(data.get("goals") ?? "").trim().length < 10) {
      nextErrors.goals = "Please describe your project goals in a few sentences.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!endpoint) {
      setSubmitError(
        "The quote form is not configured yet (missing NEXT_PUBLIC_FORMSPREE_QUOTE_ID). Please email us directly instead."
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    try {
      // Keep the submission readable in Formspree: drop the empty honeypot
      // field and tag which form the request came from.
      data.delete("company_website");
      data.append("form_source", "Modexa Quote Request");

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
    } catch {
      // Entered values stay in the form so the visitor can simply retry.
      setSubmitError(
        "Something went wrong while sending your request. Please try again."
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="card-surface flex flex-col items-center gap-4 rounded-3xl p-10 text-center"
      >
        <span className="flex size-14 items-center justify-center rounded-full border border-brand/40 bg-brand/10 text-brand-accent">
          <Icon name="check" className="size-7" />
        </span>
        <h3 className="text-xl font-semibold">Request received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thank you. Modexa will review your project details and reply with a
          custom quote and recommendations — no automatic pricing, a real
          answer.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {/* Honeypot — visually hidden, should stay empty. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField
          id="name"
          label="Your name"
          autoComplete="name"
          required
          error={errors.name}
        />
        <TextField id="company" label="Company" autoComplete="organization" />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField id="phone" label="Phone" type="tel" autoComplete="tel" />
        <TextField id="country" label="Country" autoComplete="country-name" />
        <SelectField
          id="service"
          label="Required service"
          options={serviceOptions}
          required
          error={errors.service}
        />
        <TextField
          id="industry"
          label="Business industry"
          placeholder="e.g. Restaurant, Retail, Consulting"
        />
        <SelectField
          id="budget"
          label="Budget range"
          options={budgetOptions}
        />
      </div>

      <TextAreaField
        id="goals"
        label="Project goals"
        placeholder="What should this project achieve for your business?"
        required
        error={errors.goals}
      />

      <TextAreaField
        id="features"
        label="Required features"
        placeholder="List the features or capabilities you already know you need…"
        rows={4}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <SelectField
          id="timeline"
          label="Expected timeline"
          options={timelineOptions}
        />
        <TextField
          id="existingUrl"
          label="Existing website URL"
          type="url"
          placeholder="https://…"
        />
      </div>

      <TextAreaField
        id="notes"
        label="Additional notes"
        rows={3}
        placeholder="Anything else Modexa should know?"
      />

      {status === "error" && submitError ? (
        <p role="alert" className="text-sm text-red-400">
          {submitError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="sm:self-start"
      >
        {status === "submitting" ? "Sending…" : "Request My Quote"}
        {status !== "submitting" ? (
          <Icon name="arrowRight" className="size-4" />
        ) : null}
      </Button>
    </form>
  );
}
