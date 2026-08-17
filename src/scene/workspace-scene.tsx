import { ProductAsset } from "@/catalog/assets";
import { getProduct } from "@/catalog/products";
import type { Workspace } from "@/workspace/types";
import { DESKTOP_ZONE, FLOOR_ZONE, SCENE, project, roundCoord } from "@/workspace/zones";
import { Room } from "./room";

/**
 * The room, drawn from Workspace state. One inline SVG with a single viewBox,
 * per ADR-0001, so the whole scene scales with its container without any
 * Position moving relative to the furniture.
 *
 * Objects are translated to their projected point and drawn upright — the
 * Zone's skew is never applied to an object's own group.
 */
export function WorkspaceScene({ workspace }: { workspace: Workspace }) {
  const desk = getProduct(workspace.deskId);
  const chair = getProduct(workspace.chairId);
  const chairPoint = project(FLOOR_ZONE, workspace.chairPosition);

  return (
    <svg
      viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
      className="block h-auto w-full"
      role="img"
      aria-label={`A workspace containing ${desk.name} and ${chair.name}.`}
    >
      <Room />
      <g transform={`translate(${roundCoord(chairPoint.x)} ${roundCoord(chairPoint.y)})`}>
        <ProductAsset productId={workspace.chairId} />
      </g>
      {/* The desk has fixed Placement, so it is drawn at the desktop Zone's
          origin rather than projected. Products placed on the desktop Zone are
          drawn after it, above the surface. */}
      <g transform={`translate(${DESKTOP_ZONE.origin.x} ${DESKTOP_ZONE.origin.y})`}>
        <ProductAsset productId={workspace.deskId} />
      </g>
    </svg>
  );
}
