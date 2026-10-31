"use client";

import { useId, type ReactNode } from "react";

/* Studio product renders, drawn in code on a 400×400 canvas.
   Each is lit from the top left: a base gradient for form, a darker
   occlusion pass, specular highlights and a soft contact shadow. */

export type ProductKind = "boot" | "helmet" | "glove" | "respirator" | "harness" | "goggles";

interface RenderProps {
  className?: string;
  title: string;
}

function useIds() {
  const uid = useId().replace(/:/g, "");
  return {
    id: (n: string) => `${uid}-${n}`,
    url: (n: string) => `url(#${uid}-${n})`,
  };
}

function Frame({ className, title, children }: RenderProps & { children: ReactNode }) {
  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label={title}>
      {children}
    </svg>
  );
}

function Blur({ id, sd = 9 }: { id: string; sd?: number }) {
  return (
    <filter id={id} x="-30%" y="-80%" width="160%" height="260%">
      <feGaussianBlur stdDeviation={sd} />
    </filter>
  );
}

function Metal({ id, angle = 0 }: { id: string; angle?: number }) {
  return (
    <linearGradient id={id} x1="0" x2="1" y1="0" y2="1" gradientTransform={`rotate(${angle} .5 .5)`}>
      <stop offset="0" stopColor="#fbfbfc" />
      <stop offset="0.38" stopColor="#a5acb6" />
      <stop offset="0.6" stopColor="#eef0f3" />
      <stop offset="1" stopColor="#7d848f" />
    </linearGradient>
  );
}

/* ---------- Boot ---------- */
export function BootRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("leather")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#d6aa78" />
          <stop offset="0.55" stopColor="#a87648" />
          <stop offset="1" stopColor="#6e4a2b" />
        </linearGradient>
        <linearGradient id={id("rubber")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3a3d" />
          <stop offset="1" stopColor="#141416" />
        </linearGradient>
        <linearGradient id={id("collar")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#5c3f26" />
          <stop offset="1" stopColor="#3b2818" />
        </linearGradient>
        <radialGradient id={id("sheen")} cx="0.35" cy="0.3" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <Blur id={id("blur")} />
      </defs>

      <ellipse cx="212" cy="342" rx="150" ry="12" fill="#1b1a17" opacity="0.32" filter={url("blur")} />

      {/* upper */}
      <path
        d="M104 82 C104 72 110 66 120 66 L198 66 C208 66 213 72 213 82 L216 176 C244 190 278 206 310 222 C340 238 354 258 354 280 L354 298 L80 298 C78 270 82 240 90 214 C98 186 104 150 104 82 Z"
        fill={url("leather")}
      />
      <path
        d="M104 82 C104 72 110 66 120 66 L198 66 C208 66 213 72 213 82 L216 176 C244 190 278 206 310 222 C340 238 354 258 354 280 L354 298 L80 298 C78 270 82 240 90 214 C98 186 104 150 104 82 Z"
        fill={url("sheen")}
      />
      {/* heel counter */}
      <path d="M80 298 C78 266 84 238 94 214 L152 226 C150 252 152 276 158 298 Z" fill="#5d3d22" opacity="0.55" />
      <path d="M94 214 L152 226 C150 252 152 276 158 298" fill="none" stroke="#f1d7b4" strokeOpacity="0.5" strokeDasharray="3 3" />
      {/* tongue */}
      <path d="M190 56 C202 50 222 52 228 62 L232 180 L212 176 Z" fill="#8f633b" />
      <path d="M194 58 C204 54 218 55 224 62" fill="none" stroke="#e8c79c" strokeOpacity="0.6" />
      {/* padded collar */}
      <path d="M102 66 C102 58 110 52 120 52 L200 52 C210 52 216 58 216 66 L216 84 L102 84 Z" fill={url("collar")} />
      <path d="M106 80 L212 80" stroke="#c39a6b" strokeOpacity="0.45" strokeDasharray="3 3" />
      {/* pull tab */}
      <path d="M96 58 C86 58 84 76 92 92 L104 90 C100 78 100 66 104 60 Z" fill="#2b2b2e" />
      {/* lacing */}
      <g>
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const x = 214 + i * 9;
          const y = 96 + i * 19;
          return (
            <g key={i}>
              <circle cx={x} cy={y} r="4.2" fill={url("rubber")} />
              <circle cx={x} cy={y} r="1.8" fill="#c9ccd1" />
            </g>
          );
        })}
        <path
          d="M214 96 L232 115 M223 115 L241 134 M232 134 L250 153 M241 153 L259 172 M250 172 L262 186"
          stroke="#1d1d20"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>
      {/* quarter stitching */}
      <path d="M216 176 C218 214 224 250 236 298" fill="none" stroke="#f1d7b4" strokeOpacity="0.45" strokeDasharray="3 3" />
      {/* steel-cap bumper */}
      <path d="M284 214 C326 228 354 252 354 282 L354 298 L258 298 C258 264 268 234 284 214 Z" fill={url("rubber")} />
      <path d="M290 222 C318 234 338 252 344 276" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" strokeLinecap="round" />
      {/* sole: dual density */}
      <path d="M72 300 C72 294 76 290 84 290 L344 290 C354 290 360 296 360 304 L360 314 L72 314 Z" fill="#4b4b50" />
      <path d="M72 314 L360 314 L360 330 C360 338 354 342 346 342 L84 342 C76 342 72 338 72 330 Z" fill={url("rubber")} />
      <g fill="#0c0c0d" opacity="0.8">
        {Array.from({ length: 14 }, (_, i) => (
          <rect key={i} x={84 + i * 19.5} y="332" width="11" height="10" rx="2" />
        ))}
      </g>
      <path d="M78 302 L354 302" stroke="#fff" strokeOpacity="0.18" />
    </Frame>
  );
}

/* ---------- Helmet ---------- */
export function HelmetRender(props: RenderProps) {
  const { id, url } = useIds();
  return (
    <Frame {...props}>
      <defs>
        <radialGradient id={id("shell")} cx="0.36" cy="0.28" r="0.82">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#ecedea" />
          <stop offset="0.85" stopColor="#c5c7c3" />
          <stop offset="1" stopColor="#a9aca7" />
        </radialGradient>
        <linearGradient id={id("brim")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f4f5f2" />
          <stop offset="1" stopColor="#bfc2bd" />
        </linearGradient>
        <linearGradient id={id("rib")} x1="0" x2="1">
          <stop offset="0" stopColor="#d9dbd7" />
          <stop offset="0.5" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c6c8c4" />
        </linearGradient>
        <linearGradient id={id("bracket")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3d44" />
          <stop offset="1" stopColor="#15171b" />
        </linearGradient>
        <Blur id={id("blur")} sd={10} />
        <Blur id={id("spec")} sd={6} />
      </defs>

      <ellipse cx="205" cy="318" rx="150" ry="14" fill="#1b1a17" opacity="0.3" filter={url("blur")} />

      {/* under-brim (far side) */}
      <path d="M62 262 C62 240 124 228 206 228 C292 228 350 240 350 262 C350 270 330 276 300 280 L110 280 C82 276 62 270 62 262 Z" fill="#8c8f8a" />
      {/* dome */}
      <path d="M96 258 C92 168 146 96 210 96 C276 96 322 160 318 252 Z" fill={url("shell")} />
      {/* ribs */}
      <path d="M206 98 C200 140 198 196 200 256" fill="none" stroke={url("rib")} strokeWidth="16" strokeLinecap="round" />
      <path d="M206 98 C200 140 198 196 200 256" fill="none" stroke="#9fa29d" strokeOpacity="0.35" strokeWidth="1" transform="translate(9 0)" />
      <path d="M160 116 C140 150 132 200 134 254" fill="none" stroke="#fff" strokeOpacity="0.6" strokeWidth="6" strokeLinecap="round" />
      <path d="M256 116 C276 150 284 200 282 254" fill="none" stroke="#b3b6b1" strokeOpacity="0.55" strokeWidth="6" strokeLinecap="round" />
      {/* specular */}
      <ellipse cx="160" cy="150" rx="34" ry="20" fill="#fff" opacity="0.85" filter={url("spec")} transform="rotate(-30 160 150)" />
      {/* lamp bracket */}
      <path d="M182 196 L222 196 L226 238 L178 238 Z" fill={url("bracket")} />
      <rect x="190" y="206" width="24" height="7" rx="2" fill="#5d616a" />
      <rect x="186" y="222" width="32" height="5" rx="2" fill="#0a0b0d" />
      {/* earmuff lock slot */}
      <path d="M298 228 C304 230 308 236 308 246 L296 248 C296 240 296 234 298 228 Z" fill="#2a2c31" />
      {/* brim */}
      <path
        d="M56 258 C56 246 92 240 130 238 C156 254 252 254 286 238 C324 240 354 248 354 260 C354 280 290 296 206 296 C120 296 56 280 56 258 Z"
        fill={url("brim")}
      />
      <path d="M62 262 C90 282 150 290 206 290 C262 290 320 282 348 262" fill="none" stroke="#fff" strokeOpacity="0.9" strokeWidth="2" />
      <path d="M96 258 C140 270 270 270 318 252" fill="none" stroke="#9c9f9a" strokeOpacity="0.6" strokeWidth="2" />
    </Frame>
  );
}

/* ---------- Glove ---------- */
export function GloveRender(props: RenderProps) {
  const { id, url } = useIds();
  const fingers = [
    { x: 136, y: 78, h: 110, r: -8 },
    { x: 170, y: 58, h: 124, r: -2 },
    { x: 204, y: 66, h: 118, r: 4 },
    { x: 236, y: 98, h: 92, r: 10 },
  ];
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("nitrile")} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#24493f" />
          <stop offset="0.4" stopColor="#3f7b6a" />
          <stop offset="0.6" stopColor="#4a8a77" />
          <stop offset="1" stopColor="#1f3f36" />
        </linearGradient>
        <linearGradient id={id("cuff")} x1="0" x2="1">
          <stop offset="0" stopColor="#1f3f36" />
          <stop offset="0.45" stopColor="#3a7362" />
          <stop offset="1" stopColor="#173129" />
        </linearGradient>
        <pattern id={id("grip")} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.1" fill="#0d211c" fillOpacity="0.45" />
        </pattern>
        <Blur id={id("blur")} sd={10} />
      </defs>

      <ellipse cx="206" cy="386" rx="120" ry="10" fill="#1b1a17" opacity="0.28" filter={url("blur")} />

      <g transform="rotate(-10 200 220)">
        {/* gauntlet sleeve */}
        <path d="M146 250 L254 250 L290 384 C258 394 150 394 112 384 Z" fill={url("cuff")} />
        <path d="M112 384 C150 394 258 394 290 384 L292 396 C256 406 148 406 110 396 Z" fill="#14281f" />
        <path d="M130 300 C176 308 228 308 270 300" fill="none" stroke="#fff" strokeOpacity="0.12" strokeWidth="2" />
        <path d="M176 262 C170 300 164 340 156 384" fill="none" stroke="#fff" strokeOpacity="0.14" strokeWidth="8" strokeLinecap="round" />
        {/* thumb */}
        <path d="M146 218 C128 206 108 188 98 166 C92 152 100 140 112 144 C124 148 140 170 160 186 Z" fill={url("nitrile")} />
        {/* fingers */}
        {fingers.map((f, i) => (
          <rect
            key={i}
            x={f.x}
            y={f.y}
            width="32"
            height={f.h}
            rx="16"
            fill={url("nitrile")}
            transform={`rotate(${f.r} ${f.x + 16} ${f.y + f.h})`}
          />
        ))}
        {/* palm */}
        <path d="M138 160 L268 166 C270 200 264 232 254 252 L146 252 C138 226 134 196 138 160 Z" fill={url("nitrile")} />
        <path d="M138 160 L268 166 C270 200 264 232 254 252 L146 252 C138 226 134 196 138 160 Z" fill={url("grip")} />
        {/* finger separations + highlights */}
        <g stroke="#0e221c" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round">
          <path d="M168 168 L166 132" />
          <path d="M203 168 L204 128" />
          <path d="M236 170 L240 140" />
        </g>
        <g stroke="#fff" strokeOpacity="0.3" strokeWidth="3" strokeLinecap="round">
          <path d="M148 98 L146 150" />
          <path d="M182 80 L181 140" />
          <path d="M216 88 L218 140" />
          <path d="M248 118 L252 150" />
        </g>
        <path d="M150 230 C180 240 222 240 250 232" fill="none" stroke="#0e221c" strokeOpacity="0.35" strokeWidth="2" />
      </g>
    </Frame>
  );
}

/* ---------- Respirator ---------- */
export function RespiratorRender(props: RenderProps) {
  const { id, url } = useIds();
  const cartridge = (cx: number, flip: 1 | -1) => (
    <g transform={`translate(${cx} 252) scale(${flip} 1)`}>
      <ellipse cx="0" cy="0" rx="62" ry="66" fill={url("cart")} />
      <ellipse cx="4" cy="2" rx="52" ry="56" fill="none" stroke="var(--color-brand)" strokeWidth="7" />
      <ellipse cx="6" cy="3" rx="40" ry="43" fill={url("cartFace")} />
      {[32, 24, 16].map((r) => (
        <ellipse key={r} cx="7" cy="3" rx={r} ry={r * 1.07} fill="none" stroke="#0b0c0e" strokeOpacity="0.55" strokeWidth="2" />
      ))}
      <ellipse cx="-18" cy="-26" rx="22" ry="12" fill="#fff" opacity="0.22" transform="rotate(-30 -18 -26)" />
    </g>
  );
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("face")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#7c818a" />
          <stop offset="0.5" stopColor="#4c5058" />
          <stop offset="1" stopColor="#25282d" />
        </linearGradient>
        <radialGradient id={id("cart")} cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#4b4f57" />
          <stop offset="1" stopColor="#15171a" />
        </radialGradient>
        <radialGradient id={id("cartFace")} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#3a3d44" />
          <stop offset="1" stopColor="#1b1d21" />
        </radialGradient>
        <linearGradient id={id("strap")} x1="0" x2="1">
          <stop offset="0" stopColor="#2a2c31" />
          <stop offset="1" stopColor="#3d4047" />
        </linearGradient>
        <Blur id={id("blur")} sd={10} />
      </defs>

      <ellipse cx="200" cy="350" rx="140" ry="12" fill="#1b1a17" opacity="0.28" filter={url("blur")} />

      {/* head harness straps */}
      <path d="M150 128 C110 96 80 60 64 22 L84 14 C100 50 128 84 166 114 Z" fill={url("strap")} />
      <path d="M250 128 C290 96 320 60 336 22 L316 14 C300 50 272 84 234 114 Z" fill={url("strap")} />
      <path d="M128 298 C96 316 62 330 22 336 L22 316 C60 310 92 298 120 282 Z" fill={url("strap")} />
      <path d="M272 298 C304 316 338 330 378 336 L378 316 C340 310 308 298 280 282 Z" fill={url("strap")} />

      {/* silicone facepiece */}
      <path
        d="M200 104 C238 104 264 132 274 168 C286 212 288 254 270 286 C254 314 230 328 200 328 C170 328 146 314 130 286 C112 254 114 212 126 168 C136 132 162 104 200 104 Z"
        fill={url("face")}
      />
      <path d="M200 112 C232 112 254 136 263 166" fill="none" stroke="#fff" strokeOpacity="0.3" strokeWidth="4" strokeLinecap="round" />
      <path d="M182 120 C176 160 176 200 182 232" fill="none" stroke="#fff" strokeOpacity="0.16" strokeWidth="10" strokeLinecap="round" />
      {/* exhalation valve */}
      <rect x="172" y="222" width="56" height="70" rx="20" fill="#1c1e22" />
      <rect x="176" y="226" width="48" height="62" rx="17" fill="#2c2f35" />
      {[238, 250, 262, 274].map((y) => (
        <rect key={y} x="186" y={y} width="28" height="4" rx="2" fill="#0d0e10" />
      ))}
      <rect x="180" y="228" width="16" height="6" rx="3" fill="#fff" opacity="0.18" />

      {cartridge(116, 1)}
      {cartridge(284, -1)}
    </Frame>
  );
}

/* ---------- Harness ---------- */
export function HarnessRender(props: RenderProps) {
  const { id, url } = useIds();
  const web = (d: string, key: string) => (
    <g key={key}>
      <path d={d} fill="none" stroke={url("web")} strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
      <path d={d} fill="none" stroke="#6fb3ec" strokeOpacity="0.55" strokeWidth="13" strokeDasharray="3 4" strokeLinecap="butt" />
      <path d={d} fill="none" stroke={url("web")} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
  const buckle = (x: number, y: number, w = 34, h = 22) => (
    <g>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx="5" fill={url("metal")} />
      <rect x={x - w / 2 + 5} y={y - h / 2 + 5} width={w - 10} height={h - 10} rx="2" fill="#2a2d33" />
      <rect x={x - w / 2 + 2} y={y - h / 2 + 2} width={w / 2} height="3" rx="1.5" fill="#fff" opacity="0.7" />
    </g>
  );
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("web")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#3a3e47" />
          <stop offset="1" stopColor="#1b1d22" />
        </linearGradient>
        <linearGradient id={id("pad")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#30343c" />
          <stop offset="1" stopColor="#15171b" />
        </linearGradient>
        <pattern id={id("mesh")} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.1" fill="#000" fillOpacity="0.45" />
        </pattern>
        <Metal id={id("metal")} />
        <Blur id={id("blur")} sd={10} />
      </defs>

      <ellipse cx="200" cy="378" rx="120" ry="10" fill="#1b1a17" opacity="0.22" filter={url("blur")} />

      {/* dorsal D-ring */}
      <path d="M182 34 h36 v10 a18 18 0 0 1 -36 0 z" fill="none" stroke={url("metal")} strokeWidth="6" strokeLinejoin="round" />

      {[
        web("M168 46 C160 100 152 150 150 230", "ls"),
        web("M232 46 C240 100 248 150 250 230", "rs"),
        web("M150 230 C140 280 120 300 108 330", "ll"),
        web("M250 230 C260 280 280 300 292 330", "rl"),
        web("M146 152 L254 152", "chest"),
      ]}

      {/* lumbar support belt */}
      <path d="M96 218 C140 206 260 206 304 218 L300 258 C258 248 142 248 100 258 Z" fill={url("pad")} />
      <path d="M96 218 C140 206 260 206 304 218 L300 258 C258 248 142 248 100 258 Z" fill={url("mesh")} />
      <path d="M104 224 C146 214 254 214 296 224" fill="none" stroke="#6fb3ec" strokeOpacity="0.6" strokeDasharray="3 4" />
      <path d="M102 250 C146 242 254 242 298 250" fill="none" stroke="#6fb3ec" strokeOpacity="0.6" strokeDasharray="3 4" />
      {/* tool loops on the belt */}
      <rect x="112" y="230" width="18" height="16" rx="4" fill={url("metal")} />
      <rect x="270" y="230" width="18" height="16" rx="4" fill={url("metal")} />

      {/* leg loops */}
      <ellipse cx="128" cy="330" rx="46" ry="26" fill="none" stroke={url("web")} strokeWidth="18" />
      <ellipse cx="128" cy="330" rx="46" ry="26" fill="none" stroke="#6fb3ec" strokeOpacity="0.5" strokeWidth="12" strokeDasharray="3 4" />
      <ellipse cx="128" cy="330" rx="46" ry="26" fill="none" stroke={url("web")} strokeWidth="10" />
      <ellipse cx="272" cy="330" rx="46" ry="26" fill="none" stroke={url("web")} strokeWidth="18" />
      <ellipse cx="272" cy="330" rx="46" ry="26" fill="none" stroke="#6fb3ec" strokeOpacity="0.5" strokeWidth="12" strokeDasharray="3 4" />
      <ellipse cx="272" cy="330" rx="46" ry="26" fill="none" stroke={url("web")} strokeWidth="10" />

      {/* quick-connect rescue handles */}
      <path d="M160 84 c-14 0 -18 20 -4 24" fill="none" stroke="var(--color-brand)" strokeWidth="5" strokeLinecap="round" />
      <path d="M240 84 c14 0 18 20 4 24" fill="none" stroke="var(--color-brand)" strokeWidth="5" strokeLinecap="round" />

      {buckle(200, 152)}
      {buckle(150, 300, 30, 20)}
      {buckle(250, 300, 30, 20)}
      {buckle(166, 100, 26, 16)}
      {buckle(234, 100, 26, 16)}
    </Frame>
  );
}

/* ---------- Goggles ---------- */
export function GogglesRender(props: RenderProps) {
  const { id, url } = useIds();
  const FRAME =
    "M66 184 C66 144 108 126 200 126 C292 126 334 144 334 184 L334 228 C334 264 304 284 264 284 C236 284 222 264 200 264 C178 264 164 284 136 284 C96 284 66 264 66 228 Z";
  const LENS =
    "M82 186 C82 154 116 142 200 142 C284 142 318 154 318 186 L318 226 C318 254 294 268 264 268 C240 268 226 250 200 250 C174 250 160 268 136 268 C106 268 82 254 82 226 Z";
  return (
    <Frame {...props}>
      <defs>
        <linearGradient id={id("frame")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#4a4e57" />
          <stop offset="1" stopColor="#1a1c20" />
        </linearGradient>
        <linearGradient id={id("lens")} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#c5d3ea" />
          <stop offset="0.5" stopColor="#8099c2" />
          <stop offset="1" stopColor="#4a5f86" />
        </linearGradient>
        <linearGradient id={id("strap")} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#2f86cf" />
          <stop offset="1" stopColor="#0f5794" />
        </linearGradient>
        <clipPath id={id("lensClip")}>
          <path d={LENS} />
        </clipPath>
        <Blur id={id("blur")} sd={10} />
      </defs>

      <ellipse cx="200" cy="318" rx="140" ry="12" fill="#1b1a17" opacity="0.26" filter={url("blur")} />

      {/* strap */}
      <path d="M8 186 C30 178 50 176 70 178 L70 226 C50 226 30 230 8 238 Z" fill={url("strap")} />
      <path d="M392 186 C370 178 350 176 330 178 L330 226 C350 226 370 230 392 238 Z" fill={url("strap")} />
      <path d="M10 200 C32 194 50 192 68 193 M10 224 C32 218 50 214 68 214" stroke="#fff" strokeOpacity="0.2" strokeDasharray="3 4" fill="none" />
      <path d="M390 200 C368 194 350 192 332 193 M390 224 C368 218 350 214 332 214" stroke="#fff" strokeOpacity="0.2" strokeDasharray="3 4" fill="none" />

      {/* frame */}
      <path d={FRAME} fill={url("frame")} />
      <path d="M80 150 C110 136 160 132 200 132 C240 132 290 136 320 150" fill="none" stroke="#fff" strokeOpacity="0.25" strokeWidth="2" />
      {/* vent ports */}
      {[150, 172, 194, 216, 238].map((x) => (
        <rect key={x} x={x} y="131" width="12" height="4" rx="2" fill="#0d0e10" />
      ))}

      {/* lens with reflections */}
      <path d={LENS} fill={url("lens")} opacity="0.92" />
      <g clipPath={url("lensClip")}>
        <path d="M70 290 L180 120 L222 120 L112 290 Z" fill="#fff" opacity="0.28" />
        <path d="M132 290 L242 120 L256 120 L146 290 Z" fill="#fff" opacity="0.22" />
        <path d="M82 150 C140 158 260 158 318 150 L318 160 C260 168 140 168 82 160 Z" fill="#fff" opacity="0.18" />
      </g>
      <path d={LENS} fill="none" stroke="#0b0c0e" strokeOpacity="0.5" strokeWidth="2" />
    </Frame>
  );
}

const MAP: Record<ProductKind, (p: RenderProps) => ReactNode> = {
  boot: BootRender,
  helmet: HelmetRender,
  glove: GloveRender,
  respirator: RespiratorRender,
  harness: HarnessRender,
  goggles: GogglesRender,
};

export function ProductRender({ kind, ...props }: RenderProps & { kind: ProductKind }) {
  const Cmp = MAP[kind];
  return <Cmp {...props} />;
}
