"use client";

import React, { useState } from "react";
import { Shield, ShoppingCart, Tag, Filter, Check } from "lucide-react";

interface PpeGridProps {
  onAddProduct: (item: { id: string; name: string; category: string; price: string }) => void;
}

const PRODUCTS = [
  {
    id: "boots-b01",
    name: "IronFort Steel-Toe Mining Boots",
    category: "Footwear",
    price: "R 1,450.00",
    description: "SABS approved double-reinforced steel cap, anti-puncture steel shank, oil and acid-resistant rubber sole.",
    specs: ["Duo-density polyurethane", "Thermal insulating lining"]
  },
  {
    id: "respirator-r04",
    name: "Sentinel Dust & Gas Respirator",
    category: "Safety Gear",
    price: "R 2,100.00",
    description: "Advanced active charcoal multi-gas filter designed for low-oxygen high-silica dust levels inside active galleries.",
    specs: ["SABS Class 3 rated", "Silicon leak-free facepiece"]
  },
  {
    id: "harness-m1",
    name: "Summit Full-Body Mining Harness",
    category: "Safety Gear",
    price: "R 1,890.00",
    description: "Engineered fallback protection featuring integrated lumbar tool support and quick-connect rescue handles.",
    specs: ["Webbing strength 25kN", "Salt-spray rustproof buckles"]
  },
  {
    id: "helmet-h12",
    name: "ROK Titan Arc-Flash Hardhat",
    category: "Accessories",
    price: "R 850.00",
    description: "High-density poly-carbonate mine shell with fully integrated heavy-duty lamp bracket and sound-muffling earmuff locks.",
    specs: ["Tested up to 20kV", "6-point textile suspension"]
  },
  {
    id: "gloves-g07",
    name: "ThermaShield Fire & Acid Gloves",
    category: "Safety Gear",
    price: "R 320.00",
    description: "Heavy nitrile-coated safety gauntlets providing high chemical resistance and protection up to 250°C.",
    specs: ["EN 388 Level 4 abrasion", "Elbow length protective sleeve"]
  },
  {
    id: "goggles-g11",
    name: "Viper Ballistic Goggles",
    category: "Accessories",
    price: "R 280.00",
    description: "Anti-fog, scratch-resistant polycarbonate lens providing full panoramic seal against fine dust particle ingestion.",
    specs: ["99.9% UVA/UVB shield", "Soft thermal-plastic body"]
  }
];

const CATEGORIES = ["All", "Safety Gear", "Footwear", "Accessories"];

export default function PpeGrid({ onAddProduct }: PpeGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts = selectedCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    onAddProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price
    });
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <section id="ppe" className="bg-black py-24 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/5 px-4 py-1.5 text-xs font-semibold text-orange-500">
              <Shield className="h-3.5 w-3.5" />
              <span>ROK OFF-THE-SHELF PPE</span>
            </div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              MINING-GRADE PROTECTIVE CATALOG
            </h2>
            <p className="text-zinc-400">
              Built to meet and exceed SABS safety regulations. Explore our high-durability frontline gear catalog. Combine items to build a custom bulk procurement request.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center bg-zinc-900/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-sm self-start md:self-end">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-white text-black shadow-md"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const isAdded = justAddedId === product.id;
            return (
              <div
                key={product.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-zinc-900/20 p-6 hover-glow"
              >
                {/* Visual Accent Corner */}
                <div className="absolute top-0 right-0 h-16 w-16 bg-gradient-to-bl from-orange-500/5 to-transparent group-hover:from-orange-500/10 transition-colors"></div>

                <div className="space-y-4">
                  {/* Category and SKU Badge */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Tag className="h-3 w-3 text-orange-500" />
                      {product.category.toUpperCase()}
                    </span>
                    <span>SKU: {product.id.toUpperCase()}</span>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-orange-400 transition-colors duration-200">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-zinc-400 leading-relaxed min-h-[50px]">
                    {product.description}
                  </p>

                  {/* Tech specs bullets */}
                  <ul className="space-y-1.5 pt-2">
                    {product.specs.map((spec, i) => (
                      <li key={i} className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium">
                        <span className="h-1 w-1 rounded-full bg-orange-500"></span>
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to RFQ Action Bar */}
                <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] font-mono tracking-wider text-zinc-500">RFQ EST. PRICE</span>
                    <span className="text-lg font-black text-white">{product.price}</span>
                  </div>

                  <button
                    onClick={() => handleAdd(product)}
                    className={`flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-xs font-bold transition-all duration-200 ${
                      isAdded
                        ? "bg-green-600 text-white"
                        : "bg-zinc-800 hover:bg-orange-600 text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="h-4 w-4" />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4" />
                        Add to RFQ
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
