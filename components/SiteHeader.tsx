"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { BRAND, CONTACT, NAV, SERVICES } from "@/lib/site";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    toggleRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu is a modal dialog: focus the close button, Escape closes, page scroll is locked.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-page/90 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl" : "bg-page"
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-[1360px] items-center justify-between gap-6 px-4 sm:px-8">
        <Link href="/" aria-label={`${BRAND} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {NAV.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative rounded-full px-4 py-2 text-[15px] font-medium transition-colors ${
                isActive(l.href) ? "text-ink" : "text-ink-2 hover:text-ink"
              }`}
            >
              {l.label}
              <span
                className={`absolute inset-x-4 -bottom-0.5 h-[2px] origin-left rounded-full bg-brand transition-transform duration-300 ${
                  isActive(l.href) ? "scale-x-100" : "scale-x-0"
                }`}
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact#enquiry"
            className="group hidden h-11 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-semibold text-white transition-colors hover:bg-brand sm:inline-flex"
          >
            Request a quote
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:bg-ink hover:text-white lg:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex animate-sheet flex-col bg-page lg:hidden"
        >
          <div className="flex h-[72px] items-center justify-between px-4 sm:px-8">
            <Link href="/" onClick={() => setOpen(false)} aria-label={`${BRAND} home`}>
              <Logo />
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-ink"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 pb-10 pt-6 sm:px-8">
            <ul className="space-y-1">
              {[{ href: "/", label: "Home" }, ...NAV].map((l, i) => (
                <li key={l.href} className="animate-rise" style={{ animationDelay: `${60 + i * 50}ms` }}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="display block py-2 text-[44px] text-ink aria-[current=page]:text-brand"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="eyebrow mt-10 text-ink-3">Services</p>
            <ul className="mt-3 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} onClick={() => setOpen(false)} className="text-[17px] text-ink-2">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 border-t border-line pt-6 text-[15px] text-ink-2">
              <a href={`mailto:${CONTACT.email}`} className="block py-1 text-ink">
                {CONTACT.email}
              </a>
              <a href={CONTACT.phones[0].href} className="block py-1">
                {CONTACT.phones[0].display}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
