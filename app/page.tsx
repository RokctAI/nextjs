"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WomensWorksuits from "@/components/WomensWorksuits";
import PpeGrid from "@/components/PpeGrid";
import Hydraulics from "@/components/Hydraulics";
import QuoteDrawer from "@/components/QuoteDrawer";
import { Shield, Sparkles, Hammer, CheckCircle, Mail, Phone, MapPin, ExternalLink, Globe } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  category: string;
  price: string;
  quantity: number;
}

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddItem = (item: { id: string; name: string; category: string; price: string }) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 10 } : i
        );
      }
      // If the item doesn't have an application-based price, start with 50 units (standard bulk)
      const defaultQty = item.price === "Quote on Application" ? 1 : 50;
      return [...prevCart, { ...item, quantity: defaultQty }];
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const handleUpdateQty = (id: string, qty: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + (item.price === "Quote on Application" ? 1 : item.quantity), 0);

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <Navbar cartCount={totalItemsCount} onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Page Layout */}
      <main className="flex-1">
        
        {/* 1. Hero Block */}
        <Hero />

        {/* 2. Signature Product Focus: Women's Tailored Safety Worksuits (Flagship Range) */}
        <WomensWorksuits onAddProduct={handleAddItem} />

        {/* 3. Mid-Page Technical Feature Callout Banner */}
        <section className="bg-black py-16 border-b border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.02),transparent_50%)]"></div>
          <div className="mx-auto max-w-7xl px-6 relative">
            <div className="rounded-2xl border border-white/5 bg-gradient-to-r from-zinc-950 via-zinc-900/50 to-zinc-950 p-8 md:p-12 text-center">
              <div className="grid gap-8 md:grid-cols-3">
                <div className="space-y-2 text-left md:text-center">
                  <div className="mx-auto md:mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 mb-3">
                    <Shield className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">SABS & CE Safety Certified</h4>
                  <p className="text-xs text-zinc-500">Every fabric, stitch, and steel component matches strict SANS regulations for harsh conditions.</p>
                </div>

                <div className="space-y-2 text-left md:text-center border-t md:border-t-0 md:border-x border-white/5 pt-8 md:pt-0">
                  <div className="mx-auto md:mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400 mb-3">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">Anatomical Gender-Fit</h4>
                  <p className="text-xs text-zinc-500">Eliminating ill-fitting gear to prevent work-site accidents and dynamic mobility issues.</p>
                </div>

                <div className="space-y-2 text-left md:text-center border-t md:border-t-0 pt-8 md:pt-0">
                  <div className="mx-auto md:mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 mb-3">
                    <Hammer className="h-5 w-5" />
                  </div>
                  <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">700 BAR Tested System</h4>
                  <p className="text-xs text-zinc-500">Advanced mine cylinders honed and quality-checked under absolute max hydraulic threshold.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Full PPE Catalog Grid (Products First) */}
        <PpeGrid onAddProduct={handleAddItem} />

        {/* 5. Mine Hydraulics Engineering solutions (Services Later) */}
        <Hydraulics onAddService={handleAddItem} />

      </main>

      {/* Global Product RFQ Slide-Over Drawer */}
      <QuoteDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />

      {/* Footer (Product-Focused, Premium layout) */}
      <footer className="border-t border-white/5 bg-black py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.01),transparent_50%)]"></div>
        <div className="mx-auto max-w-7xl px-6 relative">
          <div className="grid gap-10 md:grid-cols-4 border-b border-white/5 pb-12 mb-12">
            
            {/* Branding Column */}
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 shadow-md">
                  <span className="font-display text-lg font-black text-white">R</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-display text-xl font-black tracking-widest text-white">ROK</span>
                  <span className="text-[8px] font-bold tracking-widest text-orange-500 uppercase">Industrial</span>
                </div>
              </a>
              <p className="text-[11px] text-zinc-500 leading-relaxed max-w-xs">
                ROK is a registered manufacturer and service provider of heavy-duty industrial mining equipment, certified PPE wear, and hydraulic automation rigs.
              </p>
            </div>

            {/* Catalog Links */}
            <div className="space-y-3 text-left">
              <h4 className="font-display text-xs font-black tracking-widest text-white uppercase">PPE Catalog</h4>
              <ul className="space-y-2 text-xs text-zinc-500 font-medium">
                <li><a href="#womens-suits" className="hover:text-white transition-colors">Women's Worksuits Range</a></li>
                <li><a href="#ppe" className="hover:text-white transition-colors">Full-Body Fall Harnesses</a></li>
                <li><a href="#ppe" className="hover:text-white transition-colors">SABS Steel-Toe Boots</a></li>
                <li><a href="#ppe" className="hover:text-white transition-colors">Arc-Flash Mine Helmets</a></li>
              </ul>
            </div>

            {/* Engineering Links */}
            <div className="space-y-3 text-left">
              <h4 className="font-display text-xs font-black tracking-widest text-white uppercase">Hydraulics</h4>
              <ul className="space-y-2 text-xs text-zinc-500 font-medium">
                <li><a href="#hydraulics" className="hover:text-white transition-colors">Excavator Cylinder Reman</a></li>
                <li><a href="#hydraulics" className="hover:text-white transition-colors">Field Contamination Audits</a></li>
                <li><a href="#hydraulics" className="hover:text-white transition-colors">Custom High-Pressure Crimping</a></li>
                <li><a href="#hydraulics" className="hover:text-white transition-colors">Emergency Fluid Purges</a></li>
              </ul>
            </div>

            {/* Enterprise Support Column */}
            <div className="space-y-4 text-left">
              <h4 className="font-display text-xs font-black tracking-widest text-white uppercase">Mine Operations</h4>
              <div className="space-y-2.5 text-xs text-zinc-500 font-medium">
                <div className="flex items-center gap-2">
                  <Phone className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  <span>+27 (0) 11 405 ROKT</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  <span>ops@rokct.io</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                  <span>Industria West, Johannesburg, South Africa</span>
                </div>
              </div>
            </div>

          </div>

          {/* Sub-Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-zinc-600">
            <p>© {new Date().getFullYear()} ROK INDUSTRIAL. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-zinc-400 transition-colors">SABS Certifications</a>
              <a href="#" className="hover:text-zinc-400 transition-colors flex items-center gap-1">
                <span>Verification Gateway</span>
                <ExternalLink className="h-2.5 w-2.5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
