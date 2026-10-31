"use client";

import { useEffect, useState } from "react";

/**
 * The floating "Back to top" button. Hidden at the top of the page, it
 * fades in once the visitor has scrolled past one screen, sits bottom right
 * clear of the device's safe-area insets, and takes the visitor back to the
 * top: smoothly, or in one jump when they prefer reduced motion ("instant",
 * because "auto" would follow the smooth `scroll-behavior` on <html>).
 *
 * Tloumoka blue with a white arrow (Remixicon's ri-arrow-up-line, inline),
 * deepening on hover; the gold of the crescent mark is its focus ring
 * (`outline-gold!`: the global `:focus-visible` outline in globals.css is
 * unlayered and would otherwise win over the utility). It sits under the
 * mobile menu sheet (z-50), so an open menu covers it.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight);
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
      className={`group fixed z-40 grid h-12 w-12 place-items-center rounded-full bg-brand text-white shadow-[0_14px_32px_-12px_rgba(15,87,148,0.75)] ring-1 ring-white/15 [--btt-gap:1rem] hover:bg-brand-deep focus-visible:outline-gold! md:[--btt-gap:1.5rem] motion-safe:transition-[opacity,transform,background-color] motion-safe:duration-300 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
      style={{
        right: "calc(var(--btt-gap) + env(safe-area-inset-right, 0px))",
        bottom: "calc(var(--btt-gap) + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="22"
        height="22"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className="motion-safe:transition-transform motion-safe:duration-300 group-hover:-translate-y-0.5"
      >
        <path d="M13.0001 7.82843V20H11.0001V7.82843L5.63614 13.1924L4.22192 11.7782L12.0001 4L19.7783 11.7782L18.3641 13.1924L13.0001 7.82843Z" />
      </svg>
    </button>
  );
}
