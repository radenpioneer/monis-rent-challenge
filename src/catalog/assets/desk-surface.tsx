import { DESKTOP_ZONE, roundCoord } from "@/workspace/zones";

const { u, v } = DESKTOP_ZONE;

const TOP_THICKNESS = 14;
/** Surface top down to the floor, in scene units (~73cm at the scene's scale). */
const SURFACE_TO_FLOOR = 219;
/** Legs sit halfway back along the surface's depth. */
const LEG_DEPTH = 0.5;
export const LEG_FLOOR = LEG_DEPTH * v.y + SURFACE_TO_FLOOR;

/** The x of a leg centred at `alongEdge` (0..1) across the surface's width. */
export const legX = (alongEdge: number) =>
  roundCoord(alongEdge * u.x + LEG_DEPTH * v.x);

/** The centre of the surface, in the desk's own coordinates. */
const SURFACE_CENTRE = {
  x: roundCoord(0.5 * u.x + 0.5 * v.x),
  y: roundCoord(0.5 * u.y + 0.5 * v.y),
};

/**
 * The desk top traces the desktop Zone exactly, so the art and the Zone the
 * user drops things onto cannot drift apart.
 *
 * Both desks draw through this component rather than repeating the geometry,
 * because ADR-0001 holds the desktop Zone constant across desks — a second
 * copy of these points is a second thing that can drift out of the Zone.
 */
const SURFACE = [
  `0,0`,
  `${roundCoord(u.x)},${roundCoord(u.y)}`,
  `${roundCoord(u.x + v.x)},${roundCoord(u.y + v.y)}`,
  `${roundCoord(v.x)},${roundCoord(v.y)}`,
].join(" ");

const FRONT_EDGE = [
  `${roundCoord(v.x)},${roundCoord(v.y)}`,
  `${roundCoord(u.x + v.x)},${roundCoord(u.y + v.y)}`,
  `${roundCoord(u.x + v.x)},${roundCoord(u.y + v.y + TOP_THICKNESS)}`,
  `${roundCoord(v.x)},${roundCoord(v.y + TOP_THICKNESS)}`,
].join(" ");

const SIDE_EDGE = [
  `0,0`,
  `${roundCoord(v.x)},${roundCoord(v.y)}`,
  `${roundCoord(v.x)},${roundCoord(v.y + TOP_THICKNESS)}`,
  `0,${TOP_THICKNESS}`,
].join(" ");

/**
 * The frame a catalog card draws a desk in. Derived from the desktop Zone like
 * the art itself, so a desk cannot be drawn to the Zone and then cropped by a
 * hand-guessed number.
 */
const PADDING = 10;
/** The floor shadow reaches a little past the legs; this is how far. */
const SHADOW_REACH = 36;
const LEFT = Math.min(0, v.x) - PADDING;
const RIGHT = Math.max(u.x, u.x + v.x) + PADDING;
const TOP = -PADDING;
const BOTTOM = LEG_FLOOR + SHADOW_REACH;

export const DESK_VIEW_BOX = [
  roundCoord(LEFT),
  roundCoord(TOP),
  roundCoord(RIGHT - LEFT),
  roundCoord(BOTTOM - TOP),
].join(" ");

export type SurfacePalette = { top: string; front: string; side: string };

export function DeskSurface({ palette }: { palette: SurfacePalette }) {
  return (
    <g>
      <polygon points={SIDE_EDGE} fill={palette.side} />
      <polygon points={FRONT_EDGE} fill={palette.front} />
      <polygon points={SURFACE} fill={palette.top} />
    </g>
  );
}

/** The soft contact shadow every desk drops on the floor. */
export function DeskShadow() {
  return (
    <ellipse
      cx={SURFACE_CENTRE.x}
      cy={roundCoord(LEG_FLOOR + 10)}
      rx={255}
      ry={26}
      fill="#2B2721"
      opacity={0.07}
    />
  );
}
