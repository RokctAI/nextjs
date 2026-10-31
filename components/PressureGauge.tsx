/* Bourdon-tube style pressure gauge, 0–700 BAR, needle at the 700 BAR test
   rating quoted for ROK cylinder remanufacturing. Drawn in code. */

const CX = 200;
const CY = 200;
const MAX = 700;

function polar(value: number, r: number) {
  const theta = ((225 - (value / MAX) * 270) * Math.PI) / 180;
  return { x: CX + r * Math.cos(theta), y: CY - r * Math.sin(theta) };
}

function arc(from: number, to: number, r: number) {
  const a = polar(from, r);
  const b = polar(to, r);
  const large = ((to - from) / MAX) * 270 > 180 ? 1 : 0;
  return `M${a.x.toFixed(2)} ${a.y.toFixed(2)} A${r} ${r} 0 ${large} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export default function PressureGauge({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: MAX / 10 + 1 }, (_, i) => i * 10);
  const needle = polar(MAX, 138);
  const tail = polar(MAX - 350, 28);

  return (
    <svg viewBox="0 0 400 400" className={className} role="img" aria-label="Pressure gauge reading 700 bar">
      {/* bezel */}
      <circle cx={CX} cy={CY} r="192" fill="var(--color-shaft-3)" />
      <circle cx={CX} cy={CY} r="180" fill="#f2f0e9" />
      <circle cx={CX} cy={CY} r="180" fill="none" stroke="var(--color-ink)" strokeWidth="2" />

      {/* hi-vis working band */}
      <path d={arc(0, MAX, 160)} fill="none" stroke="var(--color-hivis)" strokeWidth="10" />

      {ticks.map((v) => {
        const major = v % 100 === 0;
        const mid = v % 50 === 0;
        const a = polar(v, 153);
        const b = polar(v, major ? 128 : mid ? 136 : 143);
        return (
          <line
            key={v}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="var(--color-ink)"
            strokeWidth={major ? 3 : mid ? 2 : 1}
          />
        );
      })}

      {/* needle */}
      <line x1={tail.x} y1={tail.y} x2={needle.x} y2={needle.y} stroke="var(--color-signal)" strokeWidth="5" strokeLinecap="round" />
            {ticks
        .filter((v) => v % 100 === 0)
        .map((v) => {
          const p = polar(v, 108);
          return (
            <text
              key={v}
              x={p.x}
              y={p.y + 7}
              textAnchor="middle"
              fontFamily="var(--font-barlow-condensed)"
              fontWeight="700"
              fontSize="22"
              fill="var(--color-ink)"
              stroke="#f2f0e9"
              strokeWidth="6"
              paintOrder="stroke"
            >
              {v}
            </text>
          );
        })}

      <text x={CX} y={CY + 62} textAnchor="middle" fontFamily="var(--font-plex-mono)" fontSize="12" letterSpacing="3" fill="var(--color-ink-3)">
        BAR
      </text>
      <text x={CX} y={CY + 118} textAnchor="middle" fontFamily="var(--font-barlow-condensed)" fontWeight="800" fontSize="40" fill="var(--color-ink)">
        700
      </text>
      <text x={CX} y={CY + 138} textAnchor="middle" fontFamily="var(--font-plex-mono)" fontSize="10" letterSpacing="2" fill="var(--color-ink-3)">
        LOAD TESTED
      </text>

      <circle cx={CX} cy={CY} r="16" fill="var(--color-ink)" />
      <circle cx={CX} cy={CY} r="5" fill="var(--color-hivis)" />
    </svg>
  );
}
