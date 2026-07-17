"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/icons";
import { MobileMenu } from "./MobileMenu";
import { isActiveRoute, navItems } from "./navigation";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);

  // Close menus whenever the route changes (state adjustment during render).
  if (lastPathname !== pathname) {
    setLastPathname(pathname);
    setOpenDropdown(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the dropdown when focus or clicks move outside the nav.
  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "border-b border-edge bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        ref={navRef}
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6"
      >
        <Link
          href="/"
          className="rounded-md"
          aria-label="Modexa — home"
        >
          <Logo size={28} />
        </Link>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            return (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() =>
                  item.children &&
                  setOpenDropdown((current) =>
                    current === item.label ? null : current
                  )
                }
              >
                <span className="flex items-center">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3 py-2 text-sm transition-colors ${
                      active
                        ? "text-foreground"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {item.label}
                    {active ? (
                      <span
                        className="absolute inset-x-3 -bottom-0.5 h-px bg-[linear-gradient(90deg,#a855f7,#3fa2f7)]"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>
                  {item.children ? (
                    <button
                      type="button"
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                      aria-label={`Open ${item.label} menu`}
                      className="-ml-2 rounded-full p-1 text-muted hover:text-foreground"
                      onClick={() =>
                        setOpenDropdown((current) =>
                          current === item.label ? null : item.label
                        )
                      }
                    >
                      <Icon
                        name="chevronDown"
                        className={`size-3.5 transition-transform duration-200 ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  ) : null}
                </span>

                <AnimatePresence>
                  {item.children && openDropdown === item.label ? (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.98 }}
                      transition={{ duration: 0.16, ease: "easeOut" }}
                      className="absolute top-full left-0 pt-2"
                    >
                      <ul className="w-60 rounded-xl border border-edge bg-raised/95 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              className="block rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden xl:block">
            <Button href="/request-quote">Request a Quote</Button>
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-foreground xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <Icon name={mobileOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        pathname={pathname}
        onNavigate={() => setMobileOpen(false)}
      />
    </header>
  );
}
