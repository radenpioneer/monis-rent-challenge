import { roundCoord } from "@/workspace/zones";
import { ContactShadow, planeFrontEdge, planePoints } from "./plane";

/**
 * The frame all three monitors are drawn through, so the catalog reads as one
 * family and a monitor differs from its neighbours by size and stance rather
 * than by a second person's drawing habits.
 *
 * Anchored where the foot meets the desk, so a desktop Zone Position places it
 * directly. Drawn upright — only the foot carries the room's oblique.
 */
export type MonitorShape = {
  /** The lit area, in scene units. */
  screen: { width: number; height: number };
  bezel: number;
  /** Desk surface to the bottom of the panel. */
  standHeight: number;
  neckWidth: number;
  foot: { width: number; depth: number };
  /**
   * How far the centre of a curved panel falls behind its ends. `0` is flat;
   * the 34" is the only monitor Monis lists as curved.
   */
  curve: number;
  /** Two splayed legs instead of a single plate — the gaming monitor's stance. */
  splayedLegs?: boolean;
};

const BEZEL = "#2F373F";
const SCREEN = "#3B444D";
const GLARE = "#59646F";
const STAND = "#7F8890";
const STAND_EDGE = "#6E7780";
const NECK = "#99A2AA";
const FOOT_THICKNESS = 6;

/**
 * The panel outline. A flat panel is a rounded rectangle; a curved one bows
 * both long edges toward the viewer by the same amount, so it reads as a band
 * bending around the desk rather than as a trapezoid.
 */
function panelPath(width: number, height: number, top: number, curve: number): string {
  const halfWidth = roundCoord(width / 2);
  const bottom = roundCoord(top + height);
  const dip = roundCoord(curve);

  return [
    `M${-halfWidth},${roundCoord(top)}`,
    `Q0,${roundCoord(top + dip)} ${halfWidth},${roundCoord(top)}`,
    `L${halfWidth},${bottom}`,
    `Q0,${roundCoord(bottom + dip)} ${-halfWidth},${bottom}`,
    "Z",
  ].join(" ");
}

/**
 * The panel around the lit area. The bottom bezel is deeper than the others —
 * that is where a monitor's chin is.
 */
function panelSize(shape: MonitorShape) {
  return {
    width: shape.screen.width + shape.bezel * 2,
    height: shape.screen.height + shape.bezel * 3,
  };
}

export function MonitorFrame({ shape }: { shape: MonitorShape }) {
  const panel = panelSize(shape);
  const panelWidth = panel.width;
  const panelHeight = panel.height;
  const panelTop = roundCoord(-(shape.standHeight + panelHeight));
  const screenTop = roundCoord(panelTop + shape.bezel);

  return (
    <g>
      <ContactShadow width={shape.foot.width + 10} depth={shape.foot.depth + 8} />

      {shape.splayedLegs ? (
        <g stroke={STAND_EDGE} strokeWidth={11} strokeLinecap="round" fill="none">
          <path d={`M0,${-shape.standHeight} L${roundCoord(-shape.foot.width / 2)},-4`} />
          <path d={`M0,${-shape.standHeight} L${roundCoord(shape.foot.width / 2)},-4`} />
        </g>
      ) : (
        <g>
          <polygon
            points={planeFrontEdge(shape.foot.width, shape.foot.depth, FOOT_THICKNESS)}
            fill={STAND_EDGE}
          />
          <polygon
            points={planePoints(shape.foot.width, shape.foot.depth, FOOT_THICKNESS)}
            fill={STAND}
          />
        </g>
      )}

      <rect
        x={roundCoord(-shape.neckWidth / 2)}
        y={roundCoord(-shape.standHeight - 6)}
        width={shape.neckWidth}
        height={roundCoord(shape.standHeight)}
        rx={4}
        fill={NECK}
      />

      <path d={panelPath(panelWidth, panelHeight, panelTop, shape.curve)} fill={BEZEL} />
      <path
        d={panelPath(shape.screen.width, shape.screen.height, screenTop, shape.curve)}
        fill={SCREEN}
      />

      {/* Light from the window, falling across the top-left of the glass. */}
      <polygon
        points={[
          `${roundCoord(-shape.screen.width / 2)},${screenTop}`,
          `${roundCoord(-shape.screen.width / 2 + shape.screen.width * 0.44)},${screenTop}`,
          `${roundCoord(-shape.screen.width / 2)},${roundCoord(screenTop + shape.screen.height * 0.78)}`,
        ].join(" ")}
        fill={GLARE}
        opacity={0.5}
      />

      <circle
        cx={0}
        cy={roundCoord(panelTop + panelHeight - shape.bezel * 1.4)}
        r={2.2}
        fill={STAND}
      />
    </g>
  );
}

/** The frame a catalog card draws a monitor in, derived from the shape itself. */
export function monitorViewBox(shape: MonitorShape): string {
  const panel = panelSize(shape);
  const width = Math.max(panel.width, shape.foot.width) + 20;
  const height = shape.standHeight + panel.height + 24;

  return [
    roundCoord(-width / 2),
    roundCoord(-(shape.standHeight + panel.height) - 12),
    roundCoord(width),
    roundCoord(height),
  ].join(" ");
}
