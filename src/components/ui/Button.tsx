import type { ButtonHTMLAttributes, ReactNode } from "react";
import { LocaleLink } from "@/i18n/client";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/button inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[background-color,border-color,color,translate] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand font-semibold text-on-brand hover:bg-brand-hover",
  secondary:
    "border border-edge-strong text-foreground hover:border-foreground/50 hover:bg-foreground/[0.04]",
  ghost: "px-0! text-foreground underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[0.9375rem]",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Internal paths are written in English form and localized automatically. */
  href?: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <LocaleLink href={href} className={classes}>
        {children}
      </LocaleLink>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
