import { DESKTOP_ZONE, roundCoord } from "@/workspace/zones";

const { u, v } = DESKTOP_ZONE;

const TOP_THICKNESS = 14;
/** Surface top down to the floor, in scene units (~73cm at the scene's scale). */
const SURFACE_TO_FLOOR = 219;
/** Legs sit halfway back along the surface's depth. */
const LEG_DEPTH = 0.5;
const LEG_FLOOR = LEG_DEPTH * v.y + SURFACE_TO_FLOOR;

const legX = (alongEdge: number) => roundCoord(alongEdge * u.x + LEG_DEPTH * v.x);

/**
 * The desk top traces the desktop Zone exactly, so the art and the Zone the
 * user drops things onto cannot drift apart.
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

function Leg({ cx }: { cx: number }) {
  const footReach = 0.28;
  return (
    <g>
      <line
        x1={roundCoord(cx - footReach * v.x)}
        y1={roundCoord(LEG_FLOOR - footReach * v.y)}
        x2={roundCoord(cx + footReach * v.x)}
        y2={roundCoord(LEG_FLOOR + footReach * v.y)}
        stroke="#7F8890"
        strokeWidth={16}
        strokeLinecap="round"
      />
      <rect
        x={roundCoord(cx - 15)}
        y={150}
        width={30}
        height={roundCoord(LEG_FLOOR - 150)}
        rx={4}
        fill="#99A2AA"
      />
      <rect x={roundCoord(cx - 12)} y={53} width={24} height={104} rx={3} fill="#B9C0C6" />
    </g>
  );
}

/**
 * Anchored at the desktop Zone's origin — the back-left corner of the surface.
 * The desk's Placement is fixed, so it is never projected through a Zone.
 */
export function ElectricalAdjustableDesk() {
  return (
    <g>
      <ellipse
        cx={roundCoord(0.5 * u.x + 0.5 * v.x)}
        cy={roundCoord(LEG_FLOOR + 10)}
        rx={255}
        ry={26}
        fill="#2B2721"
        opacity={0.07}
      />
      <Leg cx={legX(0.14)} />
      <Leg cx={legX(0.86)} />
      <polygon points={SIDE_EDGE} fill="#BC9165" />
      <polygon points={FRONT_EDGE} fill="#CDA478" />
      <polygon points={SURFACE} fill="#E7C79E" />
      {/* Height control panel — the "electrical" of an Electrical Adjustable Desk. */}
      <rect x={250} y={104} width={54} height={13} rx={5} fill="#3B444D" />
      <circle cx={264} cy={110.5} r={2.4} fill="#7FD1C0" />
      <circle cx={277} cy={110.5} r={2.4} fill="#D9DEE3" />
      <circle cx={290} cy={110.5} r={2.4} fill="#D9DEE3" />
    </g>
  );
}
