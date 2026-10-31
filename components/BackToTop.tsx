"use client";

import { useEffect, useState } from "react";

/**
 * The floating "Back to top" button. Hidden at the top of the page, it
 * fades in once the visitor has scrolled past one screen (or half the
 * page, on a page shorter than two screens), sits bottom right clear of
 * the device's safe-area insets, and takes the visitor back to the top:
 * smoothly, or in one jump when they prefer reduced motion ("instant",
 * because "auto" would follow the smooth `scroll-behavior` on <html>).
 *
 * Tloumoka's own button (Ray, 2026-10-31: the button must not look the
 * same on every site). The site is a product showcase in a spec-sheet
 * voice: warm studio greys, fine linework, one considered blue, gold kept
 * for the crescent mark, quiet motion. So the button is a minimal chevron
 * (Remixicon's ri-arrow-up-s-line, inline) on a frosted disc of the page
 * ground with a hairline `line-2` rule, like a callout on a technical
 * drawing; on hover the disc fills with `brand` and the chevron turns
 * white and nudges up. Gold is its focus ring (`outline-gold!`: the global
 * `:focus-visible` outline in globals.css is unlayered and would otherwise
 * win over the utility). Motion is the site's own `ease-out-quint` at
 * 500ms, motion-safe only. It sits under the mobile menu sheet (z-50), so
 * an open menu covers it.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = scrollable > 0 ? Math.min(window.innerHeight, scrollable / 2) : window.innerHeight;
      setVisible(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = (event: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    event.currentTarget.blur();
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      data-back-to-top={visible ? "shown" : "hidden"}
      className={`group fixed z-40 grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-page/80 text-ink backdrop-blur-md [--btt-gap:1rem] hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-gold! md:[--btt-gap:1.5rem] motion-safe:transition-[opacity,transform,background-color,border-color,color] motion-safe:duration-500 motion-safe:ease-out-quint ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        right: "calc(var(--btt-gap) + env(safe-area-inset-right, 0px))",
        bottom: "calc(var(--btt-gap) + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out-quint group-hover:-translate-y-0.5"
      >
        <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z" />
      </svg>
    </button>
  );
}
