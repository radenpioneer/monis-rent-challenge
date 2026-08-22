import {
  getProduct,
  type AccessoryId,
  type MonitorId,
  type PlaceableId,
  type ProductId,
} from "@/catalog/products";
import type { PlacedProduct, Position, Workspace } from "./types";

/**
 * What the Workspace will accept, and where it puts things that arrive. Pure
 * functions over the Workspace — no React, no scene, no UI.
 *
 * Not named for `Placement`: that word already means which Zone a Product
 * belongs to, and it is a property of the Product rather than a rule about the
 * Workspace.
 */

/** At most two monitors across the whole monitor Category. Models mix freely. */
export const MONITOR_LIMIT = 2;

/**
 * Why a third monitor is refused, in words the user can act on. The reducer
 * refuses by this sentence and the catalog states it, so the limit is worded
 * once and cannot drift into two different explanations.
 */
export const MONITOR_LIMIT_REASON =
  "Maximum 2 monitors per workspace. Remove one to add another.";

/**
 * A lone monitor sits centred on the desk. A pair takes the two slots, which
 * are far enough apart that even two 34" monitors leave a gap: their centres
 * are 231.6 scene units apart and the widest pair spans 218.
 */
const SOLO: Position = { x: 0.5, y: 0.28 };
const SLOTS: readonly [Position, Position] = [
  { x: 0.26, y: 0.28 },
  { x: 0.76, y: 0.26 },
];

/**
 * Where each accessory lands, so a full desk reads as a desk someone works at:
 * light in the back corner, keyboard and mouse where hands go, the laptop off
 * to one side, and the plant on the floor beside it all.
 *
 * Total over the accessory ids, so a new accessory cannot reach the catalog
 * without somewhere to stand.
 */
const ACCESSORY_POSITIONS: Record<AccessoryId, Position> = {
  "smart-desk-lamp": { x: 0.1, y: 0.14 },
  "laptop-stand": { x: 0.85, y: 0.6 },
  "mx-keyboard": { x: 0.5, y: 0.82 },
  "mx-master-mouse": { x: 0.72, y: 0.84 },
  plant: { x: 0.97, y: 0.45 },
};

export function isMonitor(productId: PlaceableId): productId is MonitorId {
  return getProduct(productId).category === "monitor";
}

export function isOnFloor(productId: ProductId): boolean {
  return getProduct(productId).placement === "floor";
}

export function isOnDesktop(productId: ProductId): boolean {
  return getProduct(productId).placement === "desktop";
}

/** How many copies of one Product stand in the Workspace. */
export function copiesOf(placed: PlacedProduct[], productId: ProductId): number {
  return placed.find((entry) => entry.productId === productId)?.positions.length ?? 0;
}

/** How many monitors stand in the Workspace, counted across the Category. */
export function monitorCount(placed: PlacedProduct[]): number {
  return placed
    .filter((entry) => isMonitor(entry.productId))
    .reduce((total, entry) => total + entry.positions.length, 0);
}

/**
 * How many copies of one Product the Workspace holds at once. Monitors are the
 * only Category that counts past one; everything else is wanted once or not at
 * all, which is why the catalog offers them Remove rather than a second Add.
 */
export function maxCopies(productId: PlaceableId): number {
  return isMonitor(productId) ? MONITOR_LIMIT : 1;
}

/**
 * Why this Product cannot be added right now, in a sentence the UI renders, or
 * `null` when it can be.
 *
 * Only the monitor cap answers here. The one-copy rule on everything else is
 * enforced by the reducer but has no sentence, because the catalog never offers
 * the action that would break it and an unreachable message is not copy.
 */
export function addRefusal(workspace: Workspace, productId: PlaceableId): string | null {
  return isMonitor(productId) && monitorCount(workspace.placed) >= MONITOR_LIMIT
    ? MONITOR_LIMIT_REASON
    : null;
}

function samePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
}

/** Every Position a monitor currently stands at. */
function monitorPositions(placed: PlacedProduct[]): Position[] {
  return placed
    .filter((entry) => isMonitor(entry.productId))
    .flatMap((entry) => entry.positions);
}

/**
 * Make room for one more monitor, and say where it stands.
 *
 * A lone monitor is centred, because a desk with one screen on it should look
 * like one. When a second arrives they take the two-up slots instead — that
 * move is the only way to honour both "the first monitor centred" and "two
 * monitors do not overlap", since a centred monitor leaves no room beside it
 * for a wide one.
 *
 * Only a monitor still standing exactly where it was put is moved: exact
 * equality is the test for "the user has not touched this". One that has been
 * dragged keeps the Position they gave it, and the arriving monitor takes
 * whichever slot is free — their arrangement outranks ours.
 */
export function admitMonitor(placed: PlacedProduct[]): {
  placed: PlacedProduct[];
  position: Position;
} {
  if (monitorCount(placed) === 0) return { placed, position: SOLO };

  const reslotted = placed.map((entry) =>
    isMonitor(entry.productId)
      ? {
          ...entry,
          positions: entry.positions.map((position) =>
            samePosition(position, SOLO) ? SLOTS[0] : position,
          ),
        }
      : entry,
  );

  const taken = monitorPositions(reslotted);
  const free = SLOTS.find((slot) => !taken.some((position) => samePosition(position, slot)));

  return { placed: reslotted, position: free ?? SLOTS[1] };
}

/** Where a newly added copy of a non-monitor Product goes. */
export function accessoryPosition(productId: AccessoryId): Position {
  return ACCESSORY_POSITIONS[productId];
}
