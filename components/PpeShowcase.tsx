"use client";

import { useState } from "react";
import { ProductTile } from "@/components/Tiles";
import { PPE_PRODUCTS } from "@/lib/site";

const CATEGORIES = ["All", "Safety Gear", "Footwear", "Accessories"] as const;

export default function PpeShowcase() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const list = cat === "All" ? PPE_PRODUCTS : PPE_PRODUCTS.filter((p) => p.category === cat);

  return (
    <div>
      <div role="group" aria-label="Filter by category" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0">
        {CATEGORIES.map((c) => {
          const n = c === "All" ? PPE_PRODUCTS.length : PPE_PRODUCTS.filter((p) => p.category === c).length;
          const on = c === cat;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCat(c)}
              aria-pressed={on}
              className={`flex h-11 shrink-0 items-center gap-2 rounded-full px-5 text-[14px] font-medium transition-colors ${
                on ? "bg-ink text-white" : "bg-stage text-ink-2 hover:bg-stage-2 hover:text-ink"
              }`}
            >
              {c}
              <span className={`text-[12px] tabular-nums ${on ? "text-white/60" : "text-ink-3"}`}>{n}</span>
            </button>
          );
        })}
      </div>

      <ul className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <li key={`${cat}-${p.id}`} className="animate-pop" style={{ animationDelay: `${i * 60}ms` }}>
            <ProductTile name={p.name} note={p.description} render={p.render} meta={p.category} specs={p.specs} />
          </li>
        ))}
      </ul>
    </div>
  );
}
