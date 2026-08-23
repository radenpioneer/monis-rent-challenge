import { roundCoord } from "@/workspace/zones";

const FRAME = "#3E4A56";
const SHELL = "#46515C";
const MESH = "#5E6B78";
const WEAVE = "#7A8794";

/** The five-star base, drawn as spokes on an ellipse so it reads as 2.5D. */
const SPOKES = [90, 162, 234, 306, 18].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: roundCoord(76 * Math.cos(radians)),
    y: roundCoord(-14 + 26 * Math.sin(radians)),
  };
});

/** The mesh back: narrow at the lumbar, widening toward the shoulders. */
const BACKREST =
  "M-40,-140 C-46,-190 -54,-248 -56,-288 Q-57,-300 -44,-300 L62,-300 Q75,-300 74,-288 C72,-248 64,-190 52,-140 Z";

const WEFT = [
  { y: -175, x1: -35, x2: 48 },
  { y: -210, x1: -39, x2: 53 },
  { y: -245, x1: -42, x2: 59 },
  { y: -280, x1: -46, x2: 64 },
];

const WARP = [-20, 6, 32];

/**
 * Anchored at the point where the chair stands on the floor, so a floor Zone
 * Position places it directly. Drawn upright — the Zone's skew is never
 * applied to this group.
 */
export function ErgonomicOfficeChair() {
  return (
    <g>
      <ellipse cx={0} cy={-2} rx={78} ry={18} fill="#2B2721" opacity={0.08} />

      {SPOKES.map((spoke) => (
        <g key={`${spoke.x},${spoke.y}`}>
          <line
            x1={0}
            y1={-14}
            x2={spoke.x}
            y2={spoke.y}
            stroke="#6E7780"
            strokeWidth={11}
            strokeLinecap="round"
          />
          <circle cx={spoke.x} cy={spoke.y} r={6.5} fill={FRAME} />
        </g>
      ))}

      <rect x={-9} y={-117} width={18} height={103} rx={5} fill="#7A838C" />

      {/* Seat: a parallelogram carrying the room's oblique skew, with a darker
          copy behind it standing in for the seat's thickness. */}
      <polygon
        points="-75,-122 75,-122 49,-92 -101,-92"
        fill="#37414B"
        stroke="#37414B"
        strokeWidth={12}
        strokeLinejoin="round"
      />
      <polygon
        points="-75,-133 75,-133 49,-103 -101,-103"
        fill={SHELL}
        stroke={SHELL}
        strokeWidth={12}
        strokeLinejoin="round"
      />

      {/* Left armrest, drawn before the back so the shell overlaps it. */}
      <rect x={-79} y={-180} width={11} height={50} rx={5} fill={FRAME} />
      <rect x={-106} y={-192} width={72} height={14} rx={7} fill={FRAME} />

      <path d={BACKREST} fill={MESH} stroke={FRAME} strokeWidth={7} strokeLinejoin="round" />
      <g stroke={WEAVE} strokeWidth={2.5} strokeLinecap="round" opacity={0.85}>
        {WEFT.map((line) => (
          <line key={line.y} x1={line.x1} y1={line.y} x2={line.x2} y2={line.y} />
        ))}
        {WARP.map((x) => (
          <line key={x} x1={x} y1={-158} x2={x + 10} y2={-284} />
        ))}
      </g>
      {/* Lumbar support */}
      <rect x={-42} y={-166} width={96} height={16} rx={8} fill={FRAME} />

      <rect x={66} y={-186} width={11} height={52} rx={5} fill={FRAME} />
      <rect x={38} y={-198} width={74} height={14} rx={7} fill={FRAME} />

      <rect x={-6} y={-314} width={10} height={18} rx={4} fill={FRAME} />
      <rect x={32} y={-314} width={10} height={18} rx={4} fill={FRAME} />
      <rect x={-20} y={-344} width={88} height={32} rx={14} fill={SHELL} />
    </g>
  );
}
