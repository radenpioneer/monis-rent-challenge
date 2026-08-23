import { DESKTOP_ZONE, roundCoord } from "@/workspace/zones";
import { DeskShadow, DeskSurface, LEG_FLOOR, legX } from "./desk-surface";

const { v } = DESKTOP_ZONE;

const PALETTE = { top: "#E7C79E", front: "#CDA478", side: "#BC9165" };

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
      <DeskShadow />
      <Leg cx={legX(0.14)} />
      <Leg cx={legX(0.86)} />
      <DeskSurface palette={PALETTE} />
      {/* Height control panel — the "electrical" of an Electrical Adjustable Desk. */}
      <rect x={250} y={104} width={54} height={13} rx={5} fill="#3B444D" />
      <circle cx={264} cy={110.5} r={2.4} fill="#7FD1C0" />
      <circle cx={277} cy={110.5} r={2.4} fill="#D9DEE3" />
      <circle cx={290} cy={110.5} r={2.4} fill="#D9DEE3" />
    </g>
  );
}
