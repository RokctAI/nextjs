"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import Pictogram, { type PictogramKind } from "@/components/Pictograms";
import type { AddToRfq } from "@/components/types";

interface PpeGridProps {
  onAddProduct: AddToRfq;
}

const PRODUCTS: {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string;
  specs: string[];
  pictogram: PictogramKind;
}[] = [
  {
    id: "boots-b01",
    name: "IronFort Steel-Toe Mining Boots",
    category: "Footwear",
    price: "R 1,450.00",
    description: "SABS approved double-reinforced steel cap, anti-puncture steel shank, oil and acid-resistant rubber sole.",
    specs: ["Duo-density polyurethane", "Thermal insulating lining"],
    pictogram: "boot",
  },
  {
    id: "respirator-r04",
    name: "Sentinel Dust & Gas Respirator",
    category: "Safety Gear",
    price: "R 2,100.00",
    description: "Advanced active charcoal multi-gas filter designed for low-oxygen high-silica dust levels inside active galleries.",
    specs: ["SABS Class 3 rated", "Silicon leak-free facepiece"],
    pictogram: "respirator",
  },
  {
    id: "harness-m1",
    name: "Summit Full-Body Mining Harness",
    category: "Safety Gear",
    price: "R 1,890.00",
    description: "Engineered fallback protection featuring integrated lumbar tool support and quick-connect rescue handles.",
    specs: ["Webbing strength 25kN", "Salt-spray rustproof buckles"],
    pictogram: "harness",
  },
  {
    id: "helmet-h12",
    name: "ROK Titan Arc-Flash Hardhat",
    category: "Accessories",
    price: "R 850.00",
    description: "High-density poly-carbonate mine shell with fully integrated heavy-duty lamp bracket and sound-muffling earmuff locks.",
    specs: ["Tested up to 20kV", "6-point textile suspension"],
    pictogram: "helmet",
  },
  {
    id: "gloves-g07",
    name: "ThermaShield Fire & Acid Gloves",
    category: "Safety Gear",
    price: "R 320.00",
    description: "Heavy nitrile-coated safety gauntlets providing high chemical resistance and protection up to 250°C.",
    specs: ["EN 388 Level 4 abrasion", "Elbow length protective sleeve"],
    pictogram: "glove",
  },
  {
    id: "goggles-g11",
    name: "Viper Ballistic Goggles",
    category: "Accessories",
    price: "R 280.00",
    description: "Anti-fog, scratch-resistant polycarbonate lens providing full panoramic seal against fine dust particle ingestion.",
    specs: ["99.9% UVA/UVB shield", "Soft thermal-plastic body"],
    pictogram: "goggles",
  },
];

const CATEGORIES = ["All", "Safety Gear", "Footwear", "Accessories"];

export default function PpeGrid({ onAddProduct }: PpeGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const filteredProducts =
    selectedCategory === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAdd = (product: (typeof PRODUCTS)[number]) => {
    onAddProduct({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
    });
    setJustAddedId(product.id);
    window.setTimeout(() => setJustAddedId(null), 1500);
  };

  return (
    <section id="ppe" className="scroll-mt-28 border-b border-ink bg-paper-2">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6">
        {/* Section head */}
        <div className="grid gap-6 py-12 md:grid-cols-12 md:py-16">
          <div className="md:col-span-2">
            <span className="font-display text-7xl font-extrabold leading-none text-ink md:text-8xl">02</span>
          </div>
          <div className="md:col-span-6">
            <p className="eyebrow text-ink-3">ROK off-the-shelf PPE</p>
            <h2 className="mt-3 font-display text-5xl font-extrabold uppercase leading-[0.9] text-ink md:text-6xl lg:text-7xl">
              Mining-grade protective catalog
            </h2>
          </div>
          <p className="self-end text-lg leading-relaxed text-ink-2 md:col-span-4">
            Built to meet and exceed SABS safety regulations. Explore our high-durability frontline gear catalog. Combine items to build a custom bulk procurement request.
          </p>
        </div>

        {/* Index tabs */}
        <div role="group" aria-label="Filter by category" className="flex overflow-x-auto border-b border-ink [scrollbar-width:none]">
          {CATEGORIES.map((cat) => {
            const count = cat === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => p.category === cat).length;
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={active}
                className={`-mb-px flex shrink-0 items-baseline gap-2 border border-b-0 px-4 py-3 font-display text-base font-bold uppercase tracking-[0.06em] transition-colors sm:px-5 ${
                  active
                    ? "border-ink bg-paper text-ink"
                    : "border-transparent text-ink-3 hover:text-ink"
                }`}
              >
                {cat}
                <span className="font-mono text-[10px] font-medium tabular-nums">{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        {/* Ledger header */}
        <div className="hidden grid-cols-12 gap-6 border-b border-rule bg-paper px-6 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3 lg:grid">
          <span className="col-span-2">Item / SKU</span>
          <span className="col-span-5">Description</span>
          <span className="col-span-2">Specification</span>
          <span className="col-span-3 text-right">RFQ est. price</span>
        </div>

        {/* Ledger rows */}
        <ul className="mb-16 border-b border-ink bg-paper md:mb-24">
          {filteredProducts.map((product) => {
            const isAdded = justAddedId === product.id;
            const index = PRODUCTS.indexOf(product) + 1;
            return (
              <li
                key={product.id}
                className="group grid grid-cols-[64px_1fr] gap-x-4 gap-y-4 border-b border-rule px-4 py-6 last:border-b-0 sm:grid-cols-[88px_1fr] sm:px-6 lg:grid-cols-12 lg:gap-6 lg:py-7"
              >
                <div className="row-span-2 lg:col-span-2 lg:row-span-1 lg:flex lg:gap-4">
                  <span
                    className="flex aspect-square w-full items-center justify-center bg-ink text-paper transition-colors group-hover:bg-hivis group-hover:text-ink lg:w-[88px]"
                   
                  >
                    <Pictogram kind={product.pictogram} className="h-[60%] w-[60%] [--cut:var(--color-ink)] group-hover:[--cut:var(--color-hivis)]" />
                  </span>
                  <div className="mt-2 font-mono text-[10px] uppercase leading-snug tracking-[0.08em] text-ink-3 lg:mt-0">
                    <span className="block text-ink">{String(index).padStart(2, "0")}</span>
                    <span className="hidden break-all lg:block">{product.id}</span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-3">
                    {product.category}
                    <span className="lg:hidden"> · {product.id}</span>
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold uppercase leading-tight text-ink md:text-[28px]">
                    {product.name}
                  </h3>
                  <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-2">{product.description}</p>
                </div>

                <ul className="col-start-2 space-y-1.5 self-start font-mono text-xs text-ink-2 lg:col-span-2 lg:col-start-auto lg:pt-5">
                  {product.specs.map((spec) => (
                    <li key={spec} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-hivis-deep" aria-hidden="true" />
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="col-span-2 flex items-center justify-between gap-4 border-t border-rule pt-4 lg:col-span-3 lg:flex-col lg:items-end lg:justify-start lg:border-t-0 lg:pt-4">
                  <p className="font-display text-3xl font-bold tabular-nums text-ink lg:text-4xl">{product.price}</p>
                  <button
                    type="button"
                    onClick={() => handleAdd(product)}
                    aria-label={`Add ${product.name} to RFQ`}
                    className={`flex h-11 items-center gap-2 px-4 font-display text-[15px] font-bold uppercase tracking-[0.06em] transition-colors ${
                      isAdded ? "bg-hivis text-ink" : "border border-ink text-ink hover:bg-ink hover:text-paper"
                    }`}
                  >
                    {isAdded ? <Check className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                    {isAdded ? "Added" : "Add to RFQ"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
