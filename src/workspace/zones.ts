import type { Position } from "./types";

/** A point in scene coordinates — the units of the scene's single SVG viewBox. */
export type Point = { x: number; y: number };

/** The scene's coordinate space. Everything below is expressed in these units. */
export const SCENE = { width: 1200, height: 800, horizon: 440 } as const;

/**
 * A region of the scene a Placed Product may be positioned within.
 *
 * Modelled as a parallelogram — `origin + x·u + y·v` — which keeps the mapping
 * from a normalized Position to a scene Point affine and exactly invertible,
 * per ADR-0001. Objects are translated to the projected point and drawn
 * upright; this transform is never applied to an object's own group.
 */
export type Zone = { origin: Point; u: Point; v: Point };

/** Authored scene coordinates carry one decimal place. */
export function roundCoord(n: number): number {
  return Math.round(n * 10) / 10;
}

/**
 * Three corners rather than the four ADR-0001 describes: for a parallelogram the
 * fourth is determined, so taking it as well would let a caller state a corner the
 * transform then silently ignores.
 */
function zoneFromCorners(topLeft: Point, topRight: Point, bottomLeft: Point): Zone {
  return {
    origin: topLeft,
    u: { x: topRight.x - topLeft.x, y: topRight.y - topLeft.y },
    v: { x: bottomLeft.x - topLeft.x, y: bottomLeft.y - topLeft.y },
  };
}

/**
 * The surface of the desk.
 *
 * Constant across both desks (ADR-0001) — desk size variants are out of scope,
 * so swapping the desk preserves every Position for free.
 */
export const DESKTOP_ZONE = zoneFromCorners(
  { x: 420, y: 360 },
  { x: 880, y: 360 },
  { x: 340, y: 450 },
);

/**
 * The floor area a floor-placed Product may stand on. It reaches behind the
 * desk, so a chair can be tucked under it as well as pulled out.
 */
export const FLOOR_ZONE = zoneFromCorners(
  { x: 250, y: 500 },
  { x: 950, y: 500 },
  { x: 130, y: 740 },
);

/** Resolve a normalized Position into a scene Point. */
export function project(zone: Zone, position: Position): Point {
  return {
    x: zone.origin.x + position.x * zone.u.x + position.y * zone.v.x,
    y: zone.origin.y + position.x * zone.u.y + position.y * zone.v.y,
  };
}

/** Resolve a scene Point back into a normalized Position. */
export function unproject(zone: Zone, point: Point): Position {
  const determinant = zone.u.x * zone.v.y - zone.u.y * zone.v.x;
  const dx = point.x - zone.origin.x;
  const dy = point.y - zone.origin.y;
  return {
    x: (dx * zone.v.y - dy * zone.v.x) / determinant,
    y: (zone.u.x * dy - zone.u.y * dx) / determinant,
  };
}

/** Keep a Position inside the Zone that resolves it. */
export function clampPosition(position: Position): Position {
  return {
    x: Math.min(1, Math.max(0, position.x)),
    y: Math.min(1, Math.max(0, position.y)),
  };
}
