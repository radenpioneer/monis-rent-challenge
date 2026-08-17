import type { ChairId, DeskId, PlaceableId } from "@/catalog/products";
import {
  accessoryPosition,
  addRefusal,
  admitMonitor,
  copiesOf,
  isMonitor,
  maxCopies,
} from "./constraints";
import { STARTER_WORKSPACE } from "./starter";
import type { PlacedProduct, Position, Workspace } from "./types";

/**
 * Every product rule lives here, never in a click handler, so the rules are
 * readable and exercisable without running the app. Actions are domain verbs
 * and arrive slice by slice.
 *
 * Desk and chair are swapped rather than added and removed: there is no state
 * in which the Workspace has neither, so there is no action that could produce
 * one. Everything else is added and removed a copy at a time.
 */
export type WorkspaceAction =
  | { type: "swapDesk"; deskId: DeskId }
  | { type: "swapChair"; chairId: ChairId }
  | { type: "addProduct"; productId: PlaceableId }
  | { type: "removeProduct"; productId: PlaceableId }
  | { type: "reset" };

export function workspaceReducer(
  workspace: Workspace,
  action: WorkspaceAction,
): Workspace {
  switch (action.type) {
    case "swapDesk":
      // Nothing but `deskId` changes. The desktop Zone is constant across desks
      // (ADR-0001), so every Position stays valid without clamping.
      return workspace.deskId === action.deskId
        ? workspace
        : { ...workspace, deskId: action.deskId };

    case "swapChair":
      // The chair keeps where it stands, so swapping compares two chairs in the
      // same spot rather than resetting the room.
      return workspace.chairId === action.chairId
        ? workspace
        : { ...workspace, chairId: action.chairId };

    case "addProduct":
      return added(workspace, action.productId);

    case "removeProduct": {
      // Removing a copy takes its Position with it — there is no orphaned
      // position left behind to resurface if the Product is added again.
      const placed = withoutCopy(workspace.placed, action.productId);
      return placed === workspace.placed ? workspace : { ...workspace, placed };
    }

    case "reset":
      return STARTER_WORKSPACE;
  }
}

/**
 * A refused add changes nothing at all — the same Workspace comes back out.
 *
 * Two rules refuse. The monitor cap has a sentence the catalog shows, which is
 * why it is asked for by name. The one-copy rule on everything else has none:
 * the catalog offers Remove instead of a second Add, so it is a guard rather
 * than a message.
 */
function added(workspace: Workspace, productId: PlaceableId): Workspace {
  if (addRefusal(workspace, productId)) return workspace;
  if (copiesOf(workspace.placed, productId) >= maxCopies(productId)) return workspace;

  if (!isMonitor(productId)) {
    return {
      ...workspace,
      placed: withCopy(workspace.placed, productId, accessoryPosition(productId)),
    };
  }

  // A monitor arriving can move the one already standing, so where it goes and
  // what that costs the others is decided together rather than in two steps.
  const { placed, position } = admitMonitor(workspace.placed);
  return { ...workspace, placed: withCopy(placed, productId, position) };
}

function withCopy(
  placed: PlacedProduct[],
  productId: PlaceableId,
  position: Position,
): PlacedProduct[] {
  const existing = placed.find((entry) => entry.productId === productId);
  if (!existing) return [...placed, { productId, positions: [position] }];

  return placed.map((entry) =>
    entry === existing ? { ...entry, positions: [...entry.positions, position] } : entry,
  );
}

/** Drops the most recently added copy, and the Product itself once none remain. */
function withoutCopy(placed: PlacedProduct[], productId: PlaceableId): PlacedProduct[] {
  if (!placed.some((entry) => entry.productId === productId)) return placed;

  return placed.flatMap((entry) => {
    if (entry.productId !== productId) return [entry];
    const positions = entry.positions.slice(0, -1);
    return positions.length > 0 ? [{ ...entry, positions }] : [];
  });
}
