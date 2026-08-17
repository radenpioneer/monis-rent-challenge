import { roundCoord } from "@/workspace/zones";

const FRAME = "#4A4038";
const SHELL = "#C4693F";
const PAD = "#DA855C";
const STITCH = "#A9532F";

/** A smaller five-star base than the ergonomic chair's — the compact footprint. */
const SPOKES = [90, 162, 234, 306, 18].map((degrees) => {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: roundCoord(58 * Math.cos(radians)),
    y: roundCoord(-12 + 20 * Math.sin(radians)),
  };
});

/** A low back that stops at the shoulder blades, not the head. */
const BACKREST =
  "M-30,-130 C-35,-180 -40,-235 -40,-258 Q-40,-272 -27,-272 L45,-272 Q58,-272 57,-258 C56,-235 50,-180 41,-130 Z";

/**
 * Anchored at the point where the chair stands on the floor, so a floor Zone
 * Position places it directly. Drawn upright — the Zone's skew is never
 * applied to this group.
 */
export function CompactTaskChair() {
  return (
    <g>
      <ellipse cx={0} cy={-2} rx={60} ry={14} fill="#2B2721" opacity={0.08} />

      {SPOKES.map((spoke) => (
        <g key={`${spoke.x},${spoke.y}`}>
          <line
            x1={0}
            y1={-12}
            x2={spoke.x}
            y2={spoke.y}
            stroke="#6E6259"
            strokeWidth={9}
            strokeLinecap="round"
          />
          <circle cx={spoke.x} cy={spoke.y} r={5.5} fill={FRAME} />
        </g>
      ))}

      <rect x={-7} y={-114} width={14} height={102} rx={4} fill="#7A6E63" />

      {/* Seat: the same oblique parallelogram the room is drawn in, one size down. */}
      <polygon
        points="-56,-119 56,-119 37,-96 -75,-96"
        fill="#8F4E2E"
        stroke="#8F4E2E"
        strokeWidth={10}
        strokeLinejoin="round"
      />
      <polygon
        points="-56,-129 56,-129 37,-106 -75,-106"
        fill={SHELL}
        stroke={SHELL}
        strokeWidth={10}
        strokeLinejoin="round"
      />

      {/* No armrests — that is the compact part, and it is the silhouette
          difference a user should be able to see from across the room. */}
      <path d={BACKREST} fill={PAD} stroke={FRAME} strokeWidth={6} strokeLinejoin="round" />
      <g stroke={STITCH} strokeWidth={2.5} strokeLinecap="round" opacity={0.8}>
        <line x1={-34} y1={-182} x2={45} y2={-182} />
        <line x1={-38} y1={-230} x2={51} y2={-230} />
      </g>
    </g>
  );
}
