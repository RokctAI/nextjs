import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { Callout } from "@/components/split/SplitReveal";
import { SILHOUETTE as S } from "@/components/split/silhouettes";
import worksuitPhoto from "@/public/images/worksuit-coverall.webp";
import cylinderPhoto from "@/public/images/hydraulic-cylinder.webp";
import bearingPhoto from "@/public/images/tapered-roller-bearing.webp";
import enginePhoto from "@/public/images/rebuilt-engine.webp";
import washerPhoto from "@/public/images/pressure-washer.webp";
import hardhatPhoto from "@/public/images/hard-hat.webp";

/* Technical cutaways drawn over each photograph's own pixel grid, so the
   outline and parts line up with the real object on the other side of the
   seam. Line classes live in globals.css under .split-ink:
   o outline · l line · f fine · h hidden · c centre line · sec section hatch ·
   paper fill · oil dotted fluid · seal gold accent · tape retroreflective. */

export type SplitKey = "worksuit" | "cylinder" | "bearing" | "engine" | "washer" | "hardhat";

export interface SplitSpec {
  photo: StaticImageData;
  alt: string;
  drawingLabel: string;
  callouts: Callout[];
  drawing: ReactNode;
}

/* ---------- Worksuit (1200 × 1500) ---------- */
const worksuit = (
  <>
    <defs>
      <clipPath id="cut-ws">
        <path d={S.worksuit} />
      </clipPath>
      <clipPath id="cut-ws-a">
        <circle cx="1010" cy="760" r="116" />
      </clipPath>
    </defs>
    <path className="h" d="M0 1296H1200" />
    <path className="paper o" d={S.worksuit} />
    <g clipPath="url(#cut-ws)">
      {[356, 1082, 1148].map((y, i) => (
        <g key={y}>
          <rect className="tape" x="300" y={y} width="620" height={i === 0 ? 28 : 24} />
          <path className="f stitch" d={`M300 ${y + 5}H920M300 ${y + (i === 0 ? 23 : 19)}H920`} />
        </g>
      ))}
    </g>
    {/* Collar, zip and storm flap */}
    <path className="l" d="M468 4L548 64L603 50L658 64L742 4" />
    <path className="l" d="M597 52V708M610 52V708" />
    <path className="f stitch" d="M603 60V700" />
    <path className="f" d="M620 60V700" strokeDasharray="1 7" />
    {/* Chest pockets and flaps */}
    <path className="l" d="M450 140H548V300H450ZM450 188H548M675 140H762V300H675ZM675 188H762" />
    <path className="f stitch" d="M457 196V292H541V196M682 196V292H755V196" />
    {/* Waist seam, sleeves, cuffs */}
    <path className="l" d="M452 427Q603 434 758 427" />
    <path className="l" d="M760 246L766 612M450 246L446 612M766 594L866 604M336 594L446 592" />
    {/* Triple-stitched sleeve inseam and leg seams (wearer's left shown in cutaway) */}
    <path className="f stitch" d="M770 252L776 588M779 252L785 586M788 254L794 584" />
    <path className="l" d="M603 712V1240M772 720L742 1238M432 720L470 1238" />
    <path className="f stitch" d="M762 728L733 1232M753 728L724 1232M744 730L715 1232" />
    <path className="f stitch" d="M611 720V1232M619 720V1232M627 722V1232" />
    {/* Crotch gusset with bar tacks */}
    <path className="l" d="M578 700L603 740L628 700" />
    <path className="seal-l" d="M592 712h22M590 726h26" />
    {/* Turn-ups */}
    <path className="l" d="M469 1240H600M606 1240H738M470 1300H600M606 1300H736" />

    {/* Fabric layers peeled back at the hip */}
    <rect className="paper l" x="622" y="458" width="126" height="218" />
    <path className="oil l" d="M644 480H748V676H644Z" />
    <path className="mesh l" d="M666 502H748V676H666Z" />
    <path className="f" d="M622 458L644 480L666 502" />

    {/* Knee-pad pocket with segmented pad */}
    <rect className="l" x="628" y="900" width="104" height="146" rx="14" />
    <rect className="paper l" x="640" y="912" width="80" height="122" rx="10" />
    {[934, 956, 978, 1000, 1022].map((y) => (
      <path key={y} className="f" d={`M644 ${y}H716`} />
    ))}
    <path className="f stitch" d="M636 908V1038H724V908" />

    {/* Detail A: tape cross-section */}
    <path className="h" d="M742 1094L928 846" />
    <circle className="seal-l" cx="742" cy="1094" r="10" />
    <circle className="paper" cx="1010" cy="760" r="116" />
    <g clipPath="url(#cut-ws-a)">
      {Array.from({ length: 22 }, (_, i) => (
        <circle key={i} className="bead" cx={900 + i * 11} cy="706" r="5" />
      ))}
      <path className="l" d="M880 712H1140" />
      <rect className="sec" x="880" y="716" width="260" height="20" />
      <rect className="mesh" x="880" y="740" width="260" height="50" />
      <rect className="oil" x="880" y="794" width="260" height="22" />
      <path className="l" d="M880 740H1140M880 790H1140M880 816H1140" />
      <path className="l stitch" d="M936 700V820M1084 700V820" />
    </g>
    <circle className="seal-l" cx="1010" cy="760" r="116" strokeWidth="1.5" />
    <text x="1120" y="650" className="tag">A</text>
  </>
);

/* ---------- Hydraulic cylinder (1200 × 1200), axis x = 551 ---------- */
const cylinder = (
  <>
    <path className="paper o" d={S.cylinder} />
    <path className="c" d="M551 0V1200" />
    {/* Exterior (near half): collar, flange, cap screws, gland and rod */}
    <path className="l" d="M86 150Q320 206 551 200M30 300Q290 392 551 392M15 452Q290 504 551 500" />
    <path className="f" d="M60 220Q300 290 551 290" />
    {[
      [83, 612],
      [150, 556],
      [338, 506],
      [520, 494],
    ].map(([cx, cy]) => (
      <g key={cx}>
        <rect className="paper l" x={cx - 38} y={cy - 46} width="76" height="92" rx="12" />
        <ellipse className="f" cx={cx} cy={cy + 34} rx="24" ry="9" />
        <path className="f" d={`M${cx - 30} ${cy - 30}H${cx + 30}`} />
      </g>
    ))}
    <path className="l" d="M188 520V1000Q370 1026 551 1024M188 1000L196 1020" />
    <path className="f" d="M210 540V990M308 1024V1200M350 1030V1200M372 1030V1200" />
    <path className="h" d="M308 300V1024M188 470H551" />
    {/* Barrel wall in section, cap-side and rod-side oil */}
    <rect className="oil" x="551" y="0" width="389" height="116" />
    <rect className="oil" x="795" y="300" width="145" height="170" />
    <rect className="sec" x="940" y="0" width="70" height="470" />
    {/* Piston with seal pack and nut */}
    <rect className="paper l" x="551" y="150" width="389" height="150" />
    <rect className="paper l" x="551" y="116" width="110" height="34" />
    <rect className="seal" x="922" y="198" width="18" height="54" />
    <rect className="band" x="928" y="164" width="12" height="22" />
    <rect className="band" x="928" y="264" width="12" height="22" />
    <path className="f" d="M560 180H900M560 270H900" />
    {/* Rod */}
    <path className="l" d="M795 300V1200" />
    <path className="f" d="M762 1030V1200M776 1030V1200" />
    {/* Head / gland in section, seal grooves */}
    <path className="sec" d="M795 470H1010V540H905V1020H795Z" />
    {[
      [560, 30, "band"],
      [650, 30, "band"],
      [756, 40, "seal"],
      [838, 44, "seal"],
    ].map(([y, h, k]) => (
      <g key={y as number}>
        <rect className="paper" x="795" y={y as number} width="42" height={h as number} />
        <rect className={k as string} x="797" y={(y as number) + 4} width="34" height={(h as number) - 8} />
      </g>
    ))}
    <path className="seal" d="M797 972H836V1008H812L797 990Z" />
    <path className="l" d="M760 1020H905" />
    {/* Cap screw through the flange */}
    <rect className="paper l" x="925" y="600" width="64" height="90" rx="6" />
    <path className="f" d="M944 690V650H970V690" />
    <path className="h" d="M935 600V420M979 600V420" />
    {/* Port block (phantom) with drillings to each chamber */}
    <path className="ph" d="M676 8H1120L1180 300L1140 430H700L676 300Z" />
    <circle className="paper l" cx="848" cy="83" r="38" />
    <circle className="h" cx="848" cy="83" r="24" />
    <circle className="paper l" cx="848" cy="248" r="38" />
    <circle className="h" cx="848" cy="248" r="24" />
    <path className="h" d="M886 73H940M886 93H940" />
    <path className="h" d="M838 286V410H940M858 286V430H940" />
    <path className="seal-l" d="M900 420H930M922 412L932 420L922 428" />
    <text x="886" y="50" className="tag">A</text>
    <text x="886" y="216" className="tag">B</text>
  </>
);

/* ---------- Tapered roller bearing (1200 × 1200) ---------- */
const ROLLERS: [number, number][] = [
  [158, 248],
  [300, 428],
  [480, 623],
  [675, 818],
  [848, 968],
  [1002, 1073],
];
const APEX = { x: 600, y: 2400 };
const bearing = (
  <>
    <path className="paper o" d={S.bearing} />
    {/* Cup */}
    <path className="l" d="M40 746Q600 698 1172 708" />
    <path className="f" d="M46 944Q600 992 1168 916M44 770Q600 724 1170 732" />
    {/* Cage rims */}
    <path className="l" d="M70 440Q600 446 1090 520M70 690Q600 722 1100 692" />
    <path className="f" d="M76 470Q600 480 1094 548" />
    {/* Rollers and their axes, converging on the bearing axis */}
    {ROLLERS.map(([a, b]) => {
      const xc = (a + b) / 2;
      const w = b - a;
      const t = 500 + (xc / 1200) * 30;
      return (
        <g key={a}>
          <rect className="l" x={a} y={t} width={w} height={706 - t} rx="8" />
          <path className="paper l" d={`M${a + w * 0.16} ${t + 14}H${b - w * 0.16}L${b - w * 0.1} ${692}H${a + w * 0.1}Z`} />
          <path className="f" d={`M${a + w * 0.16} ${t + 30}Q${xc} ${t + 40} ${b - w * 0.16} ${t + 30}`} />
          <path className="c" d={`M${xc} ${t - 70}L${xc + (APEX.x - xc) * ((1200 - t + 70) / (APEX.y - t + 70))} 1200`} />
        </g>
      );
    })}
    {/* Cone (inner race), hidden */}
    <path className="h" d="M250 474Q600 488 948 522M118 716Q600 750 1086 716" />
    {/* Quarter section at the near end */}
    <path className="sec" d="M1104 708L1172 710V922L1112 930Z" />
    <path className="paper l" d="M1060 548L1100 542L1110 700L1070 706Z" />
    <path className="sec" d="M1028 502H1060L1074 712H1100V736H1036Z" />
  </>
);

/* ---------- Rebuilt engine (1200 × 1200) ---------- */
const CYL = [
  { x: 518, w: 80, p: 70 },
  { x: 615, w: 76, p: 150 },
  { x: 698, w: 72, p: 30 },
  { x: 780, w: 68, p: 110 },
  { x: 863, w: 64, p: 170 },
  { x: 953, w: 60, p: 60 },
];
const deck = (x: number) => 490 - (x - 330) * 0.096;
const crank = (x: number) => 868 - (x - 330) * 0.07;
const cam = (x: number) => 372 - (x - 330) * 0.07;
const engine = (
  <>
    <path className="paper o" d={S.engine} />
    {/* Cam cover, head and the new head gasket */}
    <path className="l" d="M450 106L1050 166L1118 300L1080 345L345 300L300 196Z" />
    <path className="f" d="M345 300L330 492M1080 345L1062 420" />
    <path className="seal-l" d="M330 490L1062 420" strokeWidth="2" />
    {/* Flywheel and clutch */}
    <circle className="l" cx="180" cy="788" r="218" />
    <circle className="f" cx="180" cy="788" r="196" />
    <circle className="f" cx="180" cy="788" r="72" />
    <path className="l" d="M675 820V1110M735 820V1110M650 1110H760" />
    {/* Camshaft */}
    <path className="l" d={`M440 ${cam(440) - 10}L1060 ${cam(1060) - 10}M440 ${cam(440) + 10}L1060 ${cam(1060) + 10}`} />
    {/* Crankshaft */}
    <path className="c" d={`M380 ${crank(380)}L1080 ${crank(1080)}`} />
    {CYL.map(({ x, w, p }) => {
      const d = deck(x);
      const py = d + p * 0.6 + 20;
      const ph = 64;
      const cy = crank(x);
      const thr = p > 100 ? 26 : -26;
      return (
        <g key={x}>
          {/* Bore */}
          <path className="l" d={`M${x - w / 2} ${d}V${d + 250}M${x + w / 2} ${d}V${d + 250}`} />
          {/* Piston, rings, pin */}
          <rect className="paper l" x={x - w / 2 + 3} y={py} width={w - 6} height={ph} rx="4" />
          <path className="f" d={`M${x - w / 2 + 3} ${py + 10}H${x + w / 2 - 3}M${x - w / 2 + 3} ${py + 18}H${x + w / 2 - 3}M${x - w / 2 + 3} ${py + 26}H${x + w / 2 - 3}`} />
          <circle className="l" cx={x} cy={py + 44} r="7" />
          {/* Con-rod to crank throw */}
          <path className="l" d={`M${x - 7} ${py + 50}L${x + thr - 10} ${cy}M${x + 7} ${py + 50}L${x + thr + 10} ${cy}`} />
          <circle className="paper l" cx={x + thr} cy={cy} r="20" />
          {/* Valves */}
          <path className="l" d={`M${x - 15} ${d - 6}V${cam(x) + 18}M${x + 15} ${d - 6}V${cam(x) + 18}`} />
          <path className="l" d={`M${x - 27} ${d - 4}H${x - 3}M${x + 3} ${d - 4}H${x + 27}`} />
          <path className="f" d={`M${x - 22} ${cam(x) + 46}h14M${x + 8} ${cam(x) + 46}h14`} />
          <ellipse className="paper l" cx={x - 15} cy={cam(x)} rx="12" ry="18" />
          <ellipse className="paper l" cx={x + 15} cy={cam(x)} rx="12" ry="18" />
        </g>
      );
    })}
    {/* Timing chain at the front */}
    <circle className="h" cx="1052" cy="352" r="40" />
    <circle className="h" cx="1036" cy={crank(1036)} r="28" />
    <path className="h" d={`M1012 352L1008 ${crank(1036)}M1092 352L1064 ${crank(1036)}`} />
  </>
);

/* ---------- Pressure washer (1200 × 1200) ---------- */
const washer = (
  <>
    <path className="paper o" d={S.washer} />
    <path className="l" d="M318 440Q700 456 1086 448M330 300Q700 268 1060 300" />
    <path className="f" d="M640 300V246Q640 214 672 212H792Q824 214 824 246V300" />
    <rect className="f" x="533" y="413" width="112" height="247" />
    {/* Motor */}
    <rect className="paper l" x="790" y="470" width="270" height="170" rx="26" />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} className="f" d={`M${822 + i * 24} 478Q${812 + i * 24} 555 ${822 + i * 24} 632`} />
    ))}
    <path className="c" d="M560 555H1090" />
    {/* Axial three-piston pump with wobble plate */}
    <path className="paper l" d="M620 482H790V628H620Z" />
    <path className="l" d="M760 486L782 624" />
    {[512, 548, 584].map((y) => (
      <rect key={y} className="paper l" x="648" y={y} width="104" height="22" rx="4" />
    ))}
    <rect className="sec" x="620" y="482" width="26" height="146" />
    {/* Unloader valve */}
    <rect className="paper l" x="650" y="404" width="70" height="78" rx="6" />
    <path className="f" d="M672 414l26 8l-26 8l26 8l-26 8l26 8l-26 8" />
    {/* Inlet with filter, high-pressure outlet */}
    <path className="h" d="M512 772L560 742L640 742L660 628" />
    <rect className="mesh l" x="560" y="722" width="44" height="40" />
    <path className="h" d="M620 600L460 600L310 410" />
    {/* Wheels */}
    {[
      [319, 698, 86, 172],
      [810, 757, 135, 188],
      [1057, 728, 97, 90],
    ].map(([cx, cy, rx, ry]) => (
      <g key={cx}>
        <ellipse className="paper l" cx={cx} cy={cy} rx={rx} ry={ry} />
        <ellipse className="f" cx={cx} cy={cy} rx={rx * 0.62} ry={ry * 0.66} />
        <ellipse className="l" cx={cx} cy={cy} rx={rx * 0.24} ry={ry * 0.24} />
      </g>
    ))}
    <path className="c" d="M319 698L1057 728" />
  </>
);

/* ---------- Hard hat (1200 × 1200) ---------- */
const hardhat = (
  <>
    <path className="paper o" d={S.hardhat} />
    <path className="c" d="M600 230V980" />
    {/* Shell wall in section (wearer's left) */}
    <path className="sec" d="M600 270C744 272 884 380 910 604L884 610C858 400 730 298 600 296Z" />
    {/* Centre rib */}
    <path className="l" d="M556 280L560 520M614 280L620 522" />
    {/* Brim junction, peak and accessory slots */}
    <path className="l" d="M300 704Q400 800 495 818Q600 846 705 840Q800 818 840 780Q880 742 902 704" />
    <rect className="paper l" x="833" y="660" width="52" height="76" rx="6" transform="rotate(-14 859 698)" />
    <rect className="l" x="405" y="765" width="90" height="52" rx="6" />
    {/* Suspension: headband, crown straps, ratchet */}
    <ellipse className="h" cx="600" cy="700" rx="250" ry="58" />
    <path className="paper l" d="M350 708Q600 790 850 708L850 722Q600 806 350 722Z" />
    <path className="oil" d="M380 724Q600 796 820 724L820 732Q600 806 380 732Z" />
    <path className="strap" d="M610 382C720 384 820 470 842 700" />
    <path className="strap" d="M590 382C480 384 380 470 358 700" />
    <path className="h" d="M600 382C640 420 660 560 650 646" />
    <rect className="paper l" x="830" y="610" width="26" height="40" rx="4" />
    <circle className="h" cx="700" cy="646" r="20" />
    {/* Crown clearance dimension */}
    <path className="seal-l" d="M630 298H680M630 380H680M660 302V376M652 316L660 302L668 316M652 362L660 376L668 362" />
  </>
);

export const SPLITS: Record<SplitKey, SplitSpec> = {
  worksuit: {
    photo: worksuitPhoto,
    alt: "Hi-vis orange worksuit with silver reflective tape, photographed front-on against a studio wall",
    drawingLabel: "the worksuit's fabric layers, retroreflective tape construction, triple-stitched seams and knee-pad pocket",
    drawing: worksuit,
    callouts: [
      { x: 606, y: 250, ly: 200, label: "Concealed zip, storm flap" },
      { x: 848, y: 370, ly: 320, label: "Retroreflective tape" },
      { x: 700, y: 560, ly: 450, label: "Twill shell, inner lining" },
      { x: 782, y: 540, ly: 600, label: "Triple-stitched seams" },
      { x: 1010, y: 876, ly: 940, label: "A · Tape section" },
      { x: 690, y: 972, ly: 1040, label: "Knee-pad pocket" },
    ],
  },
  cylinder: {
    photo: cylinderPhoto,
    alt: "Close-up of an orange hydraulic cylinder: the barrel head, flange bolts, port block and chrome rod",
    drawingLabel: "a half-section through the cylinder showing the piston and seal pack, rod, gland seals and the two pressure ports",
    drawing: cylinder,
    callouts: [
      { x: 848, y: 248, ly: 200, label: "Pressure ports A · B" },
      { x: 930, y: 226, ly: 360, label: "Piston and seal pack" },
      { x: 816, y: 665, ly: 600, label: "Gland and wear bands" },
      { x: 816, y: 860, ly: 860, label: "Rod seal and wiper" },
      { x: 700, y: 1120, ly: 1100, label: "Hard-chrome rod" },
    ],
  },
  bearing: {
    photo: bearingPhoto,
    alt: "A tapered roller bearing resting on a bench: the outer cup with the cone, cage and rollers on top",
    drawingLabel: "the bearing's cup, cone, cage and tapered rollers, with a section through the near end",
    drawing: bearing,
    callouts: [
      { x: 960, y: 508, ly: 220, label: "Pressed-steel cage" },
      { x: 746, y: 600, ly: 340, label: "Tapered rollers" },
      { x: 1046, y: 620, ly: 440, label: "Cone · inner race" },
      { x: 880, y: 860, ly: 1080, label: "Cup · outer race" },
      { x: 800, y: 1120, ly: 1170, label: "Roller axes meet at one apex" },
    ],
  },
  engine: {
    photo: enginePhoto,
    alt: "A rebuilt inline six-cylinder engine on a display stand, with flywheel and clutch fitted",
    drawingLabel: "the engine's bores, pistons, con-rods, crankshaft, valves, camshaft and timing chain",
    drawing: engine,
    callouts: [
      { x: 863, y: 422, ly: 240, label: "Skimmed head, new gasket, valves" },
      { x: 780, y: 640, ly: 1000, label: "Re-bored cylinders, new pistons" },
      { x: 891, y: 829, ly: 1085, label: "Reground crankshaft" },
      { x: 1036, y: 818, ly: 1170, label: "Timing chain and sprockets" },
    ],
  },
  washer: {
    photo: washerPhoto,
    alt: "A blue electric pressure washer on wet paving with its garden hose connected",
    drawingLabel: "the pressure washer's motor, axial piston pump, unloader valve, inlet filter and wheels",
    drawing: washer,
    callouts: [
      { x: 685, y: 430, ly: 190, label: "Unloader valve" },
      { x: 930, y: 520, ly: 320, label: "Electric motor" },
      { x: 700, y: 560, ly: 1010, label: "Axial three-piston pump" },
      { x: 582, y: 742, ly: 1090, label: "Inlet filter" },
      { x: 900, y: 880, ly: 1170, label: "Transport wheels" },
    ],
  },
  hardhat: {
    photo: hardhatPhoto,
    alt: "An orange safety hard hat on a pale grey surface",
    drawingLabel: "the hard hat's shell section, crown clearance, suspension straps, headband and accessory slots",
    drawing: hardhat,
    callouts: [
      { x: 660, y: 340, ly: 200, label: "Crown clearance" },
      { x: 880, y: 470, ly: 340, label: "Impact-resistant shell" },
      { x: 780, y: 520, ly: 560, label: "Suspension cradle" },
      { x: 862, y: 696, ly: 880, label: "Accessory slot" },
      { x: 720, y: 760, ly: 1020, label: "Adjustable headband" },
    ],
  },
};

/** Which split leads each service page. */
export const SERVICE_SPLIT: Record<string, SplitKey> = {
  "ppe-supply-and-management": "hardhat",
  "hydraulic-systems": "cylinder",
  "plant-maintenance": "bearing",
  "cleaning-services": "washer",
  "machine-rebuilding-and-refurbishment": "engine",
};
