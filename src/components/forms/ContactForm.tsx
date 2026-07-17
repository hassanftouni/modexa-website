"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import {
  CheckboxField,
  SelectField,
  TextAreaField,
  TextField,
  budgetOptions,
  contactMethodOptions,
  isValidEmail,
  serviceOptions,
  timelineOptions,
} from "./fields";

type Status = "idle" | "submitting" | "success" | "error";

/*
 * NEXT_PUBLIC_FORMSPREE_CONTACT_ID is a public Formspree form id (safe to
 * expose in the browser). Never put passwords, API secrets or email
 * credentials in this component.
 */
const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID
  ? `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ID}`
  : null;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Spam-protection placeholder: hidden honeypot field. Real bots fill it in;
    // replace or augment with a real service (e.g. Cloudflare Turnstile) later.
    if (data.get("company_website")) {
      setStatus("success");
      return;
    }

    const nextErrors: Record<string, string> = {};
    if (!String(data.get("fullName") ?? "").trim()) {
      nextErrors.fullName = "Please enter your full name.";
    }
    if (!isValidEmail(String(data.get("email") ?? ""))) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!String(data.get("service") ?? "")) {
      nextErrors.service = "Please choose the service you need.";
    }
    if (String(data.get("description") ?? "").trim().length < 10) {
      nextErrors.description =
        "Please describe your project in a few sentences.";
    }
    if (!data.get("consent")) {
      nextErrors.consent =
        "Please agree so Modexa can contact you about your request.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!endpoint) {
      setSubmitError(
        "The contact form is not configured yet (missing NEXT_PUBLIC_FORMSPREE_CONTACT_ID). Please email us directly instead."
      );
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setSubmitError(null);
    try {
      // Keep the submission readable in Formspree: drop the empty honeypot
      // field and tag which form the message came from.
      data.delete("company_website");
      data.append("form_source", "Modexa Contact Form");

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
      console.error("Contact form submission failed:", err);
      // Entered values stay in the form so the visitor can simply retry.
      setSubmitError(
        "Something went wrong while sending your message. Please try again."
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
        <h3 className="text-xl font-semibold">Message received</h3>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Thank you for contacting Modexa. We will review your message and get
          back to you as soon as possible.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send another message
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
          id="fullName"
          label="Full name"
          autoComplete="name"
          required
          error={errors.fullName}
        />
        <TextField
          id="businessName"
          label="Business name"
          autoComplete="organization"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
        />
        <TextField
          id="country"
          label="Country"
          autoComplete="country-name"
        />
        <SelectField
          id="service"
          label="Service needed"
          options={serviceOptions}
          required
          error={errors.service}
        />
        <SelectField
          id="budget"
          label="Estimated budget range"
          options={budgetOptions}
        />
        <SelectField
          id="contactMethod"
          label="Preferred contact method"
          options={contactMethodOptions}
        />
      </div>

      <TextAreaField
        id="description"
        label="Project description"
        placeholder="Tell us about your business and what you need…"
        required
        error={errors.description}
      />

      <SelectField
        id="timeline"
        label="Desired completion period"
        options={timelineOptions}
      />

      <CheckboxField
        id="consent"
        label="I agree that Modexa may store my details and contact me about this request."
        error={errors.consent}
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
        {status === "submitting" ? "Sending…" : "Send Message"}
        {status !== "submitting" ? (
          <Icon name="arrowRight" className="size-4" />
        ) : null}
      </Button>
    </form>
  );
}
