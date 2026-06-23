"use client";

import React from "react";
import { Shield, Hammer, ClipboardList, ShoppingCart, Sparkles } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-display text-xl font-extrabold tracking-tighter text-white">R</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black tracking-widest text-white group-hover:text-orange-500 transition-colors duration-300">ROK</span>
            <span className="text-[9px] font-bold tracking-widest text-orange-500 uppercase">Industrial</span>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#ppe" className="flex items-center gap-2 hover:text-white transition-colors duration-200 py-2">
            <Shield className="h-4 w-4 text-orange-500" />
            <span>PPE Products</span>
          </a>
          <a href="#womens-suits" className="flex items-center gap-2 hover:text-white transition-colors duration-200 py-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            <span className="relative">
              Women's Range
              <span className="absolute -top-1 -right-4 h-1.5 w-1.5 rounded-full bg-pink-500"></span>
            </span>
          </a>
          <a href="#hydraulics" className="flex items-center gap-2 hover:text-white transition-colors duration-200 py-2">
            <Hammer className="h-4 w-4 text-amber-500" />
            <span>Mine Hydraulics</span>
          </a>
        </nav>

        {/* Actions (RFQ Cart & Inquiry Button) */}
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenCart}
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-zinc-900/50 hover:bg-zinc-800/80 transition-colors duration-200 hover:border-orange-500/20"
            aria-label="Inquiry Basket"
          >
            <ShoppingCart className="h-5 w-5 text-zinc-300 hover:text-white" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-orange-600 text-[10px] font-extrabold text-white animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenCart}
            className="hidden sm:flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-black hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <ClipboardList className="h-4 w-4" />
            Request Bulk Quote
          </button>
        </div>
      </div>
    </header>
  );
}
