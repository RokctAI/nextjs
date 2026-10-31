"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Marks [data-reveal] elements as shown when they enter the viewport. */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const vh = window.innerHeight;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])")).filter((el) => {
      // Anything already on screen stays visible: no flash after hydration.
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.setAttribute("data-shown", "");
        return false;
      }
      return true;
    });
    root.classList.add("reveal-ready");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-shown", ""));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
