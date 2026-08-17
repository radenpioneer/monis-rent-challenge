import { ContactShadow, planeFrontEdge, planePoints } from "./plane";

const BODY = "#B9C0C6";
const EDGE = "#7F8890";
const BASE = "#99A2AA";
const HEAD = "#3B444D";
const LIGHT = "#FFF7E4";

const PLATE = { width: 50, depth: 34 };
/**
 * Tall enough that the head clears a monitor standing in front of it. A lamp
 * belongs in the back corner of a desk, and at desk height it would simply
 * disappear behind whatever screen took that corner first.
 */
const POST = -170;
const REACH = 56;

export const SMART_DESK_LAMP_VIEW_BOX = "-40 -180 108 196";

/**
 * The Smart LED Desk Lamp 1S: a plate, a post, and a bar of light on an arm.
 *
 * Anchored where the base meets the desk. The pool it throws is drawn on the
 * room's oblique, so the lamp reads as lighting the surface rather than
 * hovering above it — the one thing in the scene that emits rather than sits.
 */
export function SmartDeskLamp() {
  return (
    <g>
      <ContactShadow width={PLATE.width + 8} depth={PLATE.depth + 6} />

      <g transform={`translate(${REACH / 2} 0)`} opacity={0.42}>
        <polygon points={planePoints(84, 52)} fill={LIGHT} />
      </g>

      <polygon points={planeFrontEdge(PLATE.width, PLATE.depth, 6)} fill={EDGE} />
      <polygon points={planePoints(PLATE.width, PLATE.depth, 6)} fill={BASE} />

      <rect x={-4} y={POST} width={8} height={-POST - 6} rx={3} fill={BODY} />
      <rect x={-4} y={POST} width={REACH + 4} height={8} rx={4} fill={BODY} />

      <rect x={REACH - 40} y={POST + 8} width={44} height={9} rx={4} fill={HEAD} />
      <rect x={REACH - 38} y={POST + 13} width={40} height={4} rx={2} fill={LIGHT} />

      {/* The touch control the "smart" in the name refers to. */}
      <circle cx={0} cy={-13} r={3.5} fill={HEAD} />
    </g>
  );
}
