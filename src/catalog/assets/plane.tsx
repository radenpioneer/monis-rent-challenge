import { DESKTOP_ZONE, roundCoord } from "@/workspace/zones";

const { u, v } = DESKTOP_ZONE;

function normalize(vector: { x: number; y: number }) {
  const length = Math.hypot(vector.x, vector.y);
  return { x: vector.x / length, y: vector.y / length };
}

/**
 * The room's one oblique, as unit directions: `ALONG` runs across the desk,
 * `INTO` runs back into it.
 *
 * Every horizontal plane in the scene — a monitor foot, a keyboard, a lamp base
 * — derives its parallelogram from these rather than from a hand-guessed skew.
 * A second oblique is how the scene starts looking broken.
 */
const ALONG = normalize(u);
const INTO = normalize(v);

function corner(across: number, into: number, lift: number) {
  return {
    x: across * ALONG.x + into * INTO.x,
    y: across * ALONG.y + into * INTO.y - lift,
  };
}

/**
 * A horizontal plane lying on the desk, centred on the local origin.
 *
 * `width` runs across the desk and `depth` back into it, both at the scene's
 * own scale. `lift` raises the plane off the surface, which is what gives a
 * keyboard or a foot its thickness — the same plane drawn twice, with
 * `planeFrontEdge` filling the gap.
 */
export function planePoints(width: number, depth: number, lift = 0): string {
  const halfWidth = width / 2;
  const halfDepth = depth / 2;

  return (
    [
      [-halfWidth, -halfDepth],
      [halfWidth, -halfDepth],
      [halfWidth, halfDepth],
      [-halfWidth, halfDepth],
    ] as const
  )
    .map(([across, into]) => {
      const { x, y } = corner(across, into, lift);
      return `${roundCoord(x)},${roundCoord(y)}`;
    })
    .join(" ");
}

/**
 * The scene point `across`/`into` units from the local origin, for placing a
 * detail on the room's oblique — a key row on a keyboard, the back edge a
 * laptop lid rises from.
 */
export function planeOffset(across: number, into: number, lift = 0) {
  const { x, y } = corner(across, into, lift);
  return { x: roundCoord(x), y: roundCoord(y) };
}

/** The front face of a lifted plane — its visible thickness. */
export function planeFrontEdge(width: number, depth: number, lift: number): string {
  const left = corner(-width / 2, depth / 2, 0);
  const right = corner(width / 2, depth / 2, 0);

  return [
    `${roundCoord(left.x)},${roundCoord(left.y - lift)}`,
    `${roundCoord(right.x)},${roundCoord(right.y - lift)}`,
    `${roundCoord(right.x)},${roundCoord(right.y)}`,
    `${roundCoord(left.x)},${roundCoord(left.y)}`,
  ].join(" ");
}

/**
 * The soft contact shadow a desktop object drops on the surface under it.
 * Drawn on the room's oblique rather than as an ellipse, so it sits on the desk
 * instead of hovering over it.
 */
export function ContactShadow({ width, depth }: { width: number; depth: number }) {
  return <polygon points={planePoints(width, depth)} fill="#2B2721" opacity={0.07} />;
}
