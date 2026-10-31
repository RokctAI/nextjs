"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const subscribe = () => () => {};

/**
 * Light/dark toggle, the fleet's header control (base_sdk's header mounts the
 * host's theme-toggle.tsx: sun in light, moon in dark, flipping the `dark`
 * class through next-themes) in Tloumoka's own look: the same 44px hairline
 * disc as the header's menu and close buttons, filling with ink on hover.
 *
 * It is a toggle button: "Dark theme" with aria-pressed, so a screen reader
 * announces the state and the action is Space or Enter on a native button.
 * The icons swap in CSS off the `dark` class, so the first paint already
 * shows the right one; aria-pressed is set once mounted, when the resolved
 * theme is known on the client.
 */
export default function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label="Dark theme"
      aria-pressed={mounted ? dark : undefined}
      title={mounted ? (dark ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line-2 text-ink transition-colors hover:border-ink hover:bg-ink hover:text-white ${className}`}
    >
      <Sun className="h-5 w-5 dark:hidden" aria-hidden="true" />
      <Moon className="hidden h-5 w-5 dark:block" aria-hidden="true" />
    </button>
  );
}
