"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * The fleet's theme seam (base_sdk components/custom/theme-provider.client.tsx),
 * ported directly because this site is not composed from base_sdk: next-themes
 * writes the `dark` class on <html> (`attribute="class"`), keeps the visitor's
 * choice under the `theme` key in localStorage, and injects its blocking inline
 * script ahead of hydration so the stored or system theme paints on the first
 * frame, with no flash. Unlike base_sdk's platform default (dark), Tloumoka
 * follows the visitor's system setting until they choose.
 */
export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme" disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  );
}
