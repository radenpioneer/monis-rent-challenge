const POT = "#C4693F";
const POT_SIDE = "#A9552F";
const POT_RIM = "#D07C52";
const SOIL = "#7A4A33";
const LEAF_FILL = "#7FB89F";
const LEAF_BACK = "#6FA894";
const STEM = "#6FA894";

/** The same leaf the window foliage is drawn from, so the room reads as one place. */
const LEAF = "M0,0 C22,-30 60,-32 76,-6 C60,20 22,22 0,0 Z";

type Frond = { stem: string; x: number; y: number; rotate: number; scale: number; back?: boolean };

const FRONDS: Frond[] = [
  { stem: "M-6,-74 C-14,-100 -26,-122 -40,-136", x: -40, y: -136, rotate: 200, scale: 0.9 },
  { stem: "M-4,-76 C-10,-112 -16,-146 -22,-172", x: -22, y: -172, rotate: 172, scale: 0.78, back: true },
  { stem: "M-2,-76 C-4,-118 -4,-158 -2,-190", x: -2, y: -190, rotate: 236, scale: 0.72, back: true },
  { stem: "M2,-76 C6,-116 12,-154 20,-178", x: 20, y: -178, rotate: 300, scale: 0.7 },
  { stem: "M4,-76 C12,-110 22,-140 34,-160", x: 34, y: -160, rotate: 350, scale: 0.82, back: true },
  { stem: "M6,-74 C18,-102 32,-124 46,-136", x: 46, y: -136, rotate: 22, scale: 0.92 },
];

export const PLANT_VIEW_BOX = "-118 -246 240 262";

/**
 * A plant, anchored where the pot meets the floor. A concept Product — Monis
 * lists no plants — and drawn in the same terracotta that marks the concept
 * chair, so the two odd ones out share a material.
 */
export function Plant() {
  return (
    <g>
      <ellipse cx={0} cy={-3} rx={52} ry={13} fill="#2B2721" opacity={0.08} />

      {FRONDS.map((frond) => (
        <g key={frond.stem}>
          <path
            d={frond.stem}
            fill="none"
            stroke={STEM}
            strokeWidth={6}
            strokeLinecap="round"
          />
          <path
            d={LEAF}
            fill={frond.back ? LEAF_BACK : LEAF_FILL}
            transform={`translate(${frond.x} ${frond.y}) rotate(${frond.rotate}) scale(${frond.scale})`}
          />
        </g>
      ))}

      <path d="M-30,-70 L30,-70 L23,-4 L-23,-4 Z" fill={POT} />
      <path d="M12,-70 L30,-70 L23,-4 L9,-4 Z" fill={POT_SIDE} />
      <ellipse cx={0} cy={-70} rx={30} ry={8} fill={SOIL} />
      <path
        d="M-34,-78 L34,-78 L31,-64 L-31,-64 Z"
        fill={POT_RIM}
      />
    </g>
  );
}
