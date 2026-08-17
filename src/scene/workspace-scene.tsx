import { ProductAsset } from "@/catalog/assets";
import { getProduct, type PlaceableId } from "@/catalog/products";
import { isOnDesktop, isOnFloor } from "@/workspace/constraints";
import type { Workspace } from "@/workspace/types";
import {
  DESKTOP_ZONE,
  FLOOR_ZONE,
  SCENE,
  project,
  roundCoord,
  type Point,
  type Zone,
} from "@/workspace/zones";
import { Room } from "./room";

/** One copy of one Placed Product, resolved to the point it is drawn at. */
type PlacedCopy = { key: string; productId: PlaceableId; point: Point };

/**
 * Every copy of every Placed Product belonging to one Zone, back to front.
 *
 * Sorting by the Position's depth is what lets a keyboard overlap the foot of
 * the monitor behind it instead of disappearing under it. Layering between
 * Zones is fixed rather than sorted: the floor is drawn before the desk, the
 * desktop after it.
 */
function copiesIn(
  workspace: Workspace,
  zone: Zone,
  belongsHere: (productId: PlaceableId) => boolean,
): PlacedCopy[] {
  return workspace.placed
    .filter((entry) => belongsHere(entry.productId))
    .flatMap((entry) =>
      entry.positions.map((position, copy) => ({
        key: `${entry.productId}-${copy}`,
        productId: entry.productId,
        position,
      })),
    )
    .sort((a, b) => a.position.y - b.position.y)
    .map(({ key, productId, position }) => ({
      key,
      productId,
      point: project(zone, position),
    }));
}

function at(point: Point) {
  return `translate(${roundCoord(point.x)} ${roundCoord(point.y)})`;
}

/** What the room holds, for a screen reader that cannot see it. */
function describe(workspace: Workspace): string {
  const contents = [
    getProduct(workspace.deskId).name,
    getProduct(workspace.chairId).name,
    ...workspace.placed.map((entry) => {
      const { name } = getProduct(entry.productId);
      return entry.positions.length > 1 ? `${entry.positions.length} × ${name}` : name;
    }),
  ];

  return `A workspace containing ${contents.join(", ")}.`;
}

/**
 * The room, drawn from Workspace state. One inline SVG with a single viewBox,
 * per ADR-0001, so the whole scene scales with its container without any
 * Position moving relative to the furniture.
 *
 * Objects are translated to their projected point and drawn upright — the
 * Zone's skew is never applied to an object's own group.
 */
export function WorkspaceScene({ workspace }: { workspace: Workspace }) {
  const chairPoint = project(FLOOR_ZONE, workspace.chairPosition);
  const onFloor = copiesIn(workspace, FLOOR_ZONE, isOnFloor);
  const onDesktop = copiesIn(workspace, DESKTOP_ZONE, isOnDesktop);

  return (
    <svg
      viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
      className="block h-auto w-full"
      role="img"
      aria-label={describe(workspace)}
    >
      <Room />

      <g transform={at(chairPoint)}>
        <ProductAsset productId={workspace.chairId} />
      </g>
      {onFloor.map((copy) => (
        <g key={copy.key} transform={at(copy.point)}>
          <ProductAsset productId={copy.productId} />
        </g>
      ))}

      {/* The desk has fixed Placement, so it is drawn at the desktop Zone's
          origin rather than projected. Products placed on the desktop Zone are
          drawn after it, above the surface. */}
      <g transform={`translate(${DESKTOP_ZONE.origin.x} ${DESKTOP_ZONE.origin.y})`}>
        <ProductAsset productId={workspace.deskId} />
      </g>

      {onDesktop.map((copy) => (
        <g key={copy.key} transform={at(copy.point)}>
          <ProductAsset productId={copy.productId} />
        </g>
      ))}
    </svg>
  );
}
