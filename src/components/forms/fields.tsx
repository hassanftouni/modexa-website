"use client";

import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/** Shared, accessible form controls used by ContactForm and QuoteForm. */

const controlClasses =
  "w-full rounded-xl border border-edge bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted/70 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent aria-[invalid=true]:border-red-400/60";

interface FieldWrapperProps {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}

function FieldWrapper({ id, label, required, error, children }: FieldWrapperProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {required ? (
          <span className="ml-1 text-brand-accent" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextField({ id, label, error, required, ...props }: TextFieldProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses}
        required={required}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextAreaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function TextAreaField({
  id,
  label,
  error,
  required,
  ...props
}: TextAreaFieldProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error}>
      <textarea
        id={id}
        name={id}
        rows={5}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${controlClasses} resize-y`}
        required={required}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
  options: string[];
  placeholder?: string;
}

export function SelectField({
  id,
  label,
  error,
  required,
  options,
  placeholder = "Select an option",
  ...props
}: SelectFieldProps) {
  return (
    <FieldWrapper id={id} label={label} required={required} error={error}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={controlClasses}
        required={required}
        defaultValue=""
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}

interface CheckboxFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function CheckboxField({ id, label, error, ...props }: CheckboxFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="flex items-start gap-3 text-sm text-muted">
        <input
          id={id}
          name={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-0.5 size-4 shrink-0 accent-[#6366f1]"
          {...props}
        />
        <span>{label}</span>
      </label>
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs text-red-400">
          {error}
        </p>
      ) : null}
    </div>
  );
}

/** Service options shared by both forms. */
export const serviceOptions = [
  "Modexa POS",
  "Business Website",
  "Portfolio Website",
  "E-commerce Website",
  "Web Application",
  "AI Agent",
  "Business Automation",
  "Custom Software",
  "API Integration",
  "Other",
];

export const budgetOptions = [
  "To be discussed",
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
];

export const timelineOptions = [
  "Flexible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
];

export const contactMethodOptions = ["Email", "Phone", "WhatsApp"];

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
