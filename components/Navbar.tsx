"use client";

import { ClipboardList, Mail, MapPin, Phone } from "lucide-react";
import Logo from "@/components/Logo";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const LINKS = [
  { href: "#womens-suits", label: "Women's Range", code: "01" },
  { href: "#ppe", label: "PPE Products", code: "02" },
  { href: "#hydraulics", label: "Mine Hydraulics", code: "03" },
];

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 w-full">
      {/* Utility strip: contact details, like the header of a datasheet */}
      <div className="on-dark hidden bg-ink text-paper/70 md:block">
        <div className="mx-auto flex h-9 max-w-[1320px] items-center justify-between px-6 font-mono text-[11px] tracking-wide">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="h-3 w-3 text-hivis" aria-hidden="true" />
              +27 (0) 11 405 ROKT
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-3 w-3 text-hivis" aria-hidden="true" />
              ops@rokct.io
            </span>
          </div>
          <span className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-hivis" aria-hidden="true" />
            Industria West, Johannesburg, South Africa
          </span>
        </div>
      </div>

      <div className="border-b border-ink bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
        <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between gap-4 px-4 sm:px-6">
          <a href="#top" aria-label="ROK Industrial, back to top">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-stretch self-stretch lg:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group flex items-center gap-2.5 border-l border-rule px-6 text-[15px] font-semibold text-ink-2 transition-colors last:border-r hover:bg-ink hover:text-paper"
              >
                <span className="font-mono text-[10px] text-ink-3 group-hover:text-hivis">{link.code}</span>
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={onOpenCart}
            className="group flex h-11 items-center gap-3 bg-ink pl-4 pr-1.5 text-paper transition-colors hover:bg-ink-2"
            aria-label={`Open quote request, ${cartCount} items`}
          >
            <ClipboardList className="h-4 w-4 text-hivis" aria-hidden="true" />
            <span className="font-display text-[15px] font-bold uppercase tracking-[0.08em]">
              <span className="hidden sm:inline">Request </span>Bulk Quote
            </span>
            <span
              className={`flex h-8 min-w-8 items-center justify-center px-2 font-mono text-xs font-semibold tabular-nums transition-colors ${
                cartCount > 0 ? "bg-hivis text-ink" : "bg-shaft-3 text-paper/60"
              }`}
            >
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
