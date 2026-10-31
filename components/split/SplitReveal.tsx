"use client";

import Image, { type StaticImageData } from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface Callout {
  /** Anchor point on the drawing, in the photo's pixel space. */
  x: number;
  y: number;
  /** Height of the label's leader line, in the same space. */
  ly: number;
  label: string;
}

interface Props {
  photo: StaticImageData;
  alt: string;
  /** What the cutaway shows, read by screen readers alongside the photo's alt text. */
  drawingLabel: string;
  /** SVG contents drawn in the photo's pixel space (viewBox = photo width × height). */
  drawing: ReactNode;
  callouts: Callout[];
  sizes: string;
  eager?: boolean;
  className?: string;
}

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** Demo sweep keyframes: [time 0–1, position]. 50 → 38 → 62 → 50. */
const SWEEP: [number, number][] = [
  [0, 50],
  [0.28, 38],
  [0.72, 62],
  [1, 50],
];
const SWEEP_MS = 1600;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
function sweepAt(t: number) {
  for (let i = 1; i < SWEEP.length; i++) {
    const [t1, p1] = SWEEP[i];
    const [t0, p0] = SWEEP[i - 1];
    if (t <= t1) return p0 + (p1 - p0) * easeInOut((t - t0) / (t1 - t0));
  }
  return SWEEP[SWEEP.length - 1][1];
}

/** Remixicon "arrow-left-right-line", inlined. */
function ArrowsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.05 12.05 21 17l-4.95 4.95-1.414-1.414L17.172 18H4v-2h13.172l-2.536-2.536 1.414-1.414Zm-8.1-10 1.414 1.414L6.828 6H20v2H6.828l2.536 2.536L7.95 11.95 3 7l4.95-4.95Z" />
    </svg>
  );
}

/**
 * Photo / cutaway reveal. A real photograph on the left, the same object as a
 * technical cutaway on the right, split by a handle the visitor can drag.
 * A native range input carries keyboard and screen-reader control; pointer
 * events on the frame handle mouse and touch (vertical swipes still scroll).
 */
export default function SplitReveal({ photo, alt, drawingLabel, drawing, callouts, sizes, eager, className = "" }: Props) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  // The visitor has moved the slider themselves: the "Drag" hint fades out.
  const [moved, setMoved] = useState(false);
  // The one-off demo sweep is running.
  const [demo, setDemo] = useState(false);
  const demoRaf = useRef(0);
  const frame = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const uid = useId().replace(/:/g, "");
  const W = photo.width;
  const H = photo.height;

  const gesture = useRef<{ id: number; x: number; y: number; live: boolean } | null>(null);
  const end = useCallback(() => {
    gesture.current = null;
    setDragging(false);
  }, []);

  const stopDemo = useCallback(() => {
    if (demoRaf.current) cancelAnimationFrame(demoRaf.current);
    demoRaf.current = 0;
    setDemo(false);
  }, []);

  const touched = useCallback(() => {
    stopDemo();
    setMoved(true);
  }, [stopDemo]);

  // When the split first scrolls into view, sweep the handle once to show it
  // moves. Skipped under prefers-reduced-motion (the static label stays).
  useEffect(() => {
    const el = frame.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (started || !entries.some((e) => e.isIntersecting)) return;
        started = true;
        io.disconnect();
        let t0 = 0;
        const step = (now: number) => {
          if (!t0) t0 = now;
          const t = Math.min(1, (now - t0) / SWEEP_MS);
          setPos(Math.round(sweepAt(t) * 10) / 10);
          if (t < 1) demoRaf.current = requestAnimationFrame(step);
          else {
            demoRaf.current = 0;
            setDemo(false);
          }
        };
        // Short pause so the frame has settled into view before it moves.
        demoRaf.current = requestAnimationFrame(() => {
          setDemo(true);
          const wait = performance.now() + 450;
          const hold = (now: number) => {
            if (now < wait) demoRaf.current = requestAnimationFrame(hold);
            else demoRaf.current = requestAnimationFrame(step);
          };
          demoRaf.current = requestAnimationFrame(hold);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (demoRaf.current) cancelAnimationFrame(demoRaf.current);
    };
  }, []);

  const fromClientX = useCallback((clientX: number) => {
    const r = frame.current?.getBoundingClientRect();
    if (!r || r.width === 0) return;
    setPos(clamp(Math.round(((clientX - r.left) / r.width) * 1000) / 10));
  }, []);

  return (
    <figure className={className}>
      <div
        ref={frame}
        data-split=""
        data-dragging={dragging ? "" : undefined}
        data-demo={demo ? "" : undefined}
        data-moved={moved ? "" : undefined}
        className="split-frame group/split relative isolate cursor-ew-resize touch-pan-y select-none overflow-hidden rounded-[32px] bg-stage shadow-[0_40px_80px_-48px_rgba(17,18,20,0.45)] ring-1 ring-black/5"
        style={{ aspectRatio: `${W} / ${H}`, ["--pos" as string]: pos }}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          gesture.current = { id: e.pointerId, x: e.clientX, y: e.clientY, live: e.pointerType === "mouse" };
          if (e.pointerType === "mouse") {
            // Mouse: grab immediately and jump to the click.
            e.preventDefault();
            e.currentTarget.setPointerCapture(e.pointerId);
            setDragging(true);
            touched();
            fromClientX(e.clientX);
            input.current?.focus({ preventScroll: true });
          }
        }}
        onPointerMove={(e) => {
          const g = gesture.current;
          if (!g || g.id !== e.pointerId) return;
          if (!g.live) {
            // Touch / pen: only take over once the gesture is clearly horizontal,
            // so a vertical swipe over the image still scrolls the page.
            const dx = Math.abs(e.clientX - g.x);
            const dy = Math.abs(e.clientY - g.y);
            if (dx < 6 || dx < dy) return;
            g.live = true;
            e.currentTarget.setPointerCapture(e.pointerId);
            setDragging(true);
            touched();
          }
          fromClientX(e.clientX);
        }}
        onPointerUp={end}
        onPointerCancel={end}
        onLostPointerCapture={end}
      >
        {/* Photograph */}
        <Image
          src={photo}
          alt={alt}
          fill
          sizes={sizes}
          placeholder="blur"
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
          draggable={false}
          className="pointer-events-none object-cover"
        />

        {/* Cutaway, clipped to the right of the handle */}
        <div className="split-cut pointer-events-none absolute inset-0" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id={`${uid}-grid`} width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50 0H0V50" fill="none" stroke="var(--color-brand)" strokeOpacity="0.09" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </pattern>
              <pattern id={`${uid}-grid5`} width="250" height="250" patternUnits="userSpaceOnUse">
                <path d="M250 0H0V250" fill="none" stroke="var(--color-brand)" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </pattern>
              <pattern id={`${uid}-hatch`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <path d="M0 0V14" stroke="var(--color-brand)" strokeOpacity="0.55" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              </pattern>
              <pattern id={`${uid}-dots`} width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="5" cy="5" r="1.4" fill="var(--color-brand)" fillOpacity="0.35" />
              </pattern>
            </defs>
            <rect width={W} height={H} className="fill-[#f1f0ec]" />
            <rect width={W} height={H} fill={`url(#${uid}-grid)`} />
            <rect width={W} height={H} fill={`url(#${uid}-grid5)`} />
            <g
              className="split-ink"
              style={
                {
                  ["--hatch" as string]: `url(#${uid}-hatch)`,
                  ["--dots" as string]: `url(#${uid}-dots)`,
                } as CSSProperties
              }
            >
              {drawing}
            </g>
            {/* Leader lines */}
            <g fill="none" stroke="var(--color-brand-deep)" strokeWidth="1" vectorEffect="non-scaling-stroke">
              {callouts.map((c) => {
                const ex = Math.max(c.x + 40, W * 0.62);
                return (
                  <g key={c.label}>
                    <path d={`M${c.x} ${c.y} L${ex} ${c.ly} H${W * 0.975}`} vectorEffect="non-scaling-stroke" />
                    <circle cx={c.x} cy={c.y} r={W * 0.0055} fill="var(--color-page)" strokeWidth="1.25" vectorEffect="non-scaling-stroke" />
                    <circle cx={c.x} cy={c.y} r={W * 0.002} fill="var(--color-brand-deep)" stroke="none" />
                  </g>
                );
              })}
            </g>
          </svg>
          {callouts.map((c, i) => (
            <span
              key={c.label}
              className="split-label absolute right-[2.5%] flex max-w-[60%] translate-y-[-100%] items-baseline gap-1.5 pb-[3px] text-right font-mono text-[9.5px] font-medium uppercase leading-[1.25] tracking-[0.06em] text-brand-deep sm:text-[10.5px]"
              style={{ top: `${(c.ly / H) * 100}%` }}
            >
              <span className="text-brand/60 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span>{c.label}</span>
            </span>
          ))}
        </div>

        {/* Corner tags */}
        <span className="split-tag pointer-events-none absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-ink-2 shadow-sm backdrop-blur sm:left-5 sm:top-5" data-side="photo">
          Photo
        </span>
        <span className="split-tag pointer-events-none absolute right-4 top-4 rounded-full bg-brand px-3 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-white shadow-sm sm:right-5 sm:top-5" data-side="cut">
          Inside
        </span>

        {/* Accessible control: keyboard, screen readers. Pointer input is handled by the frame. */}
        <input
          ref={input}
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => {
            touched();
            setPos(clamp(Number(e.target.value)));
          }}
          aria-label={`Compare photo and cutaway: ${drawingLabel}`}
          aria-valuetext={`${Math.round(pos)}% photo, ${100 - Math.round(pos)}% cutaway`}
          className="split-input pointer-events-none absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
        />

        {/* Seam and handle */}
        <div className="split-seam pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-white shadow-[0_0_0_0.5px_rgba(15,87,148,0.35)]" aria-hidden="true">
          <span className="split-knob absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-deep shadow-[0_12px_30px_-8px_rgba(17,18,20,0.5)] ring-1 ring-black/5">
            <ArrowsIcon className="h-6 w-6" />
          </span>
          <span className="split-hint absolute left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-brand-deep px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-white shadow-[0_6px_16px_-6px_rgba(15,87,148,0.7)] ring-1 ring-white/25">
            <span className="h-1 w-1 rounded-full bg-gold" />
            Drag
          </span>
        </div>
      </div>
      <figcaption className="sr-only">
        {alt}. Cutaway: {drawingLabel}.
      </figcaption>
    </figure>
  );
}
