"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { LocaleLink, useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { isActiveRoute, navItems } from "./navigation";

interface MobileMenuProps {
  open: boolean;
  /** Locale-stripped pathname. */
  pathname: string;
  /** Called when a link is clicked, so the parent can close the menu. */
  onNavigate: () => void;
}

/** Full-height menu for phones and tablets: large tap targets, CTA at the bottom. */
export function MobileMenu({ open, pathname, onNavigate }: MobileMenuProps) {
  const { dict } = useI18n();

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-[calc(100dvh-4rem)] border-t border-edge bg-background lg:hidden"
        >
          <nav
            aria-label={dict.a11y.mobileNav}
            className="flex h-full flex-col overflow-y-auto px-5 pt-4 pb-8 sm:px-8"
          >
            <ul className="flex flex-col">
              {navItems.map((item, index) => {
                const active = isActiveRoute(pathname, item.href);
                return (
                  <motion.li
                    key={item.key}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: 0.03 * index }}
                    className="border-b border-edge"
                  >
                    <LocaleLink
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className="flex items-center justify-between py-4 text-xl font-medium"
                    >
                      <span className={active ? "text-foreground" : "text-soft"}>
                        {dict.nav[item.key]}
                      </span>
                      <Icon
                        name="arrowRight"
                        className={`size-5 ${active ? "text-brand-accent" : "text-muted"}`}
                      />
                    </LocaleLink>
                  </motion.li>
                );
              })}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Button href="/request-quote" size="lg" className="w-full">
                {dict.nav.cta}
              </Button>
              <LanguageSwitcher className="h-12 w-full sm:hidden" />
            </div>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
