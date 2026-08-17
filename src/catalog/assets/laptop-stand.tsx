import { roundCoord } from "@/workspace/zones";
import { ContactShadow, planeFrontEdge, planeOffset, planePoints } from "./plane";

const RISER = "#7F8890";
const RISER_EDGE = "#6E7780";
const CHASSIS = "#3B444D";
const CHASSIS_EDGE = "#2F373F";
const GLARE = "#59646F";

const PLATE = { width: 92, depth: 56 };
const PLATE_HEIGHT = 40;
const LAPTOP = { width: 68, depth: 42 };
const LAPTOP_HEIGHT = PLATE_HEIGHT + 7;
const LID_HEIGHT = 52;
/** The lid leans back, so its top edge sits a little behind its hinge. */
const LID_LEAN = 7;

const hingeLeft = planeOffset(-LAPTOP.width / 2, -LAPTOP.depth / 2, LAPTOP_HEIGHT);
const hingeRight = planeOffset(LAPTOP.width / 2, -LAPTOP.depth / 2, LAPTOP_HEIGHT);

function lid(inset: number, height: number): string {
  return [
    `M${roundCoord(hingeLeft.x + inset)},${roundCoord(hingeLeft.y - inset)}`,
    `L${roundCoord(hingeRight.x - inset)},${roundCoord(hingeRight.y - inset)}`,
    `L${roundCoord(hingeRight.x - inset - LID_LEAN)},${roundCoord(hingeRight.y - height)}`,
    `L${roundCoord(hingeLeft.x + inset - LID_LEAN)},${roundCoord(hingeLeft.y - height)}`,
    "Z",
  ].join(" ");
}

export const LAPTOP_STAND_VIEW_BOX = "-70 -120 140 148";

/**
 * The Ergonomic Laptop Stand, with the laptop it exists to raise. Anchored
 * where the stand's feet meet the desk.
 *
 * The laptop is drawn in the monitors' graphite rather than a silver, so a desk
 * carrying both reads as one set of screens instead of two unrelated objects.
 */
export function LaptopStand() {
  return (
    <g>
      <ContactShadow width={PLATE.width + 10} depth={PLATE.depth + 8} />

      {/* Two struts holding the plate at working height. */}
      <g stroke={RISER_EDGE} strokeWidth={8} strokeLinecap="round">
        <line x1={-28} y1={-3} x2={-21} y2={-PLATE_HEIGHT} />
        <line x1={28} y1={-3} x2={21} y2={-PLATE_HEIGHT} />
      </g>

      <polygon
        points={planeFrontEdge(PLATE.width, PLATE.depth, PLATE_HEIGHT)}
        fill={RISER_EDGE}
      />
      <polygon points={planePoints(PLATE.width, PLATE.depth, PLATE_HEIGHT)} fill={RISER} />

      <path d={lid(0, LID_HEIGHT)} fill={CHASSIS_EDGE} />
      <path d={lid(5, LID_HEIGHT - 6)} fill={CHASSIS} />
      <path
        d={[
          `M${roundCoord(hingeLeft.x + 5)},${roundCoord(hingeLeft.y - 5)}`,
          `L${roundCoord(hingeLeft.x + 38)},${roundCoord(hingeLeft.y - 5)}`,
          `L${roundCoord(hingeLeft.x + 5 - LID_LEAN)},${roundCoord(hingeLeft.y - LID_HEIGHT + 6)}`,
          "Z",
        ].join(" ")}
        fill={GLARE}
        opacity={0.5}
      />

      <polygon
        points={planeFrontEdge(LAPTOP.width, LAPTOP.depth, LAPTOP_HEIGHT)}
        fill={CHASSIS_EDGE}
      />
      <polygon
        points={planePoints(LAPTOP.width, LAPTOP.depth, LAPTOP_HEIGHT)}
        fill={CHASSIS}
      />
    </g>
  );
}
