import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[70vh] flex-col items-center justify-center gap-6 overflow-hidden px-6 pt-24 text-center">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative flex flex-col items-center gap-6">
        <Logo size={56} withWordmark={false} />
        <p className="text-sm font-medium tracking-widest text-brand-accent uppercase">
          404 — Page not found
        </p>
        <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          This page doesn’t exist — but your next project could.
        </h1>
        <p className="max-w-md text-muted">
          The page you were looking for was moved or never existed. Head back
          home or tell us what you were trying to find.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/">Back to Home</Button>
          <Button href="/contact" variant="secondary">
            Contact Modexa
          </Button>
        </div>
        <Link
          href="/services"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          Or explore our services →
        </Link>
      </div>
    </div>
  );
}
