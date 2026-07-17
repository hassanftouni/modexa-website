"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { isActiveRoute, navItems } from "./navigation";

interface MobileMenuProps {
  open: boolean;
  pathname: string;
  /** Called when a link is clicked, so the parent can close the menu. */
  onNavigate: () => void;
}

export function MobileMenu({ open, pathname, onNavigate }: MobileMenuProps) {
  // Lock page scroll while the menu is open.
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "calc(100dvh - 4rem)" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="overflow-hidden border-t border-edge bg-background/95 backdrop-blur-xl xl:hidden"
        >
          <nav
            aria-label="Mobile navigation"
            className="flex h-full flex-col overflow-y-auto px-6 py-6"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-lg px-3 py-3 text-lg font-medium transition-colors ${
                        active
                          ? "bg-white/[0.06] text-foreground"
                          : "text-muted hover:text-foreground"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children ? (
                      <ul className="mt-1 mb-2 flex flex-col gap-1 border-l border-edge pl-5">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={onNavigate}
                              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div className="mt-6 border-t border-edge pt-6 pb-10">
              <Button href="/request-quote" size="lg" className="w-full">
                Request a Quote
              </Button>
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
