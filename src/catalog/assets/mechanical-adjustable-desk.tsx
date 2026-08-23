import { DESKTOP_ZONE, roundCoord } from "@/workspace/zones";
import { DeskShadow, DeskSurface, LEG_FLOOR, legX } from "./desk-surface";

const { v } = DESKTOP_ZONE;

const PALETTE = { top: "#C08A5A", front: "#A87246", side: "#94623B" };
const FRAME = "#3B444D";
const FRAME_LIGHT = "#586470";

const LEFT_LEG = legX(0.12);
const RIGHT_LEG = legX(0.88);

/** A flat foot plate laid along the surface's depth, rather than a round foot. */
function Leg({ cx }: { cx: number }) {
  const footReach = 0.3;
  return (
    <g>
      <polygon
        points={[
          `${roundCoord(cx - footReach * v.x - 9)},${roundCoord(LEG_FLOOR - footReach * v.y)}`,
          `${roundCoord(cx + footReach * v.x - 9)},${roundCoord(LEG_FLOOR + footReach * v.y)}`,
          `${roundCoord(cx + footReach * v.x + 9)},${roundCoord(LEG_FLOOR + footReach * v.y)}`,
          `${roundCoord(cx - footReach * v.x + 9)},${roundCoord(LEG_FLOOR - footReach * v.y)}`,
        ].join(" ")}
        fill={FRAME}
      />
      <rect
        x={roundCoord(cx - 17)}
        y={120}
        width={34}
        height={roundCoord(LEG_FLOOR - 120)}
        fill={FRAME}
      />
      <rect x={roundCoord(cx - 13)} y={46} width={26} height={78} fill={FRAME_LIGHT} />
    </g>
  );
}

/**
 * Anchored at the desktop Zone's origin, exactly as the other desk is. Its
 * surface is the same component, so the desktop Zone stays constant across
 * both desks and swapping preserves every Position for free (ADR-0001).
 */
export function MechanicalAdjustableDesk() {
  return (
    <g>
      <DeskShadow />
      <Leg cx={LEFT_LEG} />
      <Leg cx={RIGHT_LEG} />
      {/* The crossbar that makes this an H-frame rather than two free posts. */}
      <rect
        x={LEFT_LEG}
        y={168}
        width={roundCoord(RIGHT_LEG - LEFT_LEG)}
        height={16}
        fill={FRAME}
      />
      <DeskSurface palette={PALETTE} />
      {/* Hand crank — the "mechanical" of a Mechanical Adjustable Desk. It hangs
          from the underside of the front edge and stops above the crossbar,
          clear of both legs, so it reads as a crank rather than as frame. */}
      <g stroke={FRAME_LIGHT} strokeWidth={10} strokeLinecap="round" fill="none">
        <path d="M290,104 L290,140" />
        <path d="M290,140 L322,150" />
      </g>
      <circle cx={326} cy={152} r={10} fill={FRAME} />
    </g>
  );
}
