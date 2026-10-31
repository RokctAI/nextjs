"use client";

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WomensWorksuits from "@/components/WomensWorksuits";
import CertBand from "@/components/CertBand";
import PpeGrid from "@/components/PpeGrid";
import Hydraulics from "@/components/Hydraulics";
import QuoteDrawer from "@/components/QuoteDrawer";
import Footer from "@/components/Footer";
import { QUOTE_ON_APPLICATION, type CartItem, type RfqItem } from "@/components/types";

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddItem = useCallback((item: RfqItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((i) => i.id === item.id);
      if (existing) {
        return prevCart.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 10 } : i));
      }
      // If the item doesn't have an application-based price, start with 50 units (standard bulk)
      const defaultQty = item.price === QUOTE_ON_APPLICATION ? 1 : 50;
      return [...prevCart, { ...item, quantity: defaultQty }];
    });
  }, []);

  const handleRemoveItem = useCallback((id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  }, []);

  const handleUpdateQty = useCallback((id: string, qty: number) => {
    setCart((prevCart) => prevCart.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  }, []);

  const handleClearCart = useCallback(() => setCart([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItemsCount = cart.reduce(
    (acc, item) => acc + (item.price === QUOTE_ON_APPLICATION ? 1 : item.quantity),
    0
  );

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-hivis focus:px-4 focus:py-2 focus:font-semibold focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar cartCount={totalItemsCount} onOpenCart={openCart} />

      <main id="main" className="flex-1">
        <Hero />
        <WomensWorksuits onAddProduct={handleAddItem} />
        <CertBand />
        <PpeGrid onAddProduct={handleAddItem} />
        <Hydraulics onAddService={handleAddItem} />
      </main>

      <Footer />

      <QuoteDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        items={cart}
        onRemoveItem={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
