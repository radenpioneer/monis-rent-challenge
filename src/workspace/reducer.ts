import type { AreaId } from "@/catalog/areas";
import type { ChairId, DeskId, PlaceableId } from "@/catalog/products";
import {
  accessoryPosition,
  addRefusal,
  admitMonitor,
  copiesOf,
  isMonitor,
  maxCopies,
} from "./constraints";
import type { IsoDate } from "./dates";
import { durationInRange, STARTER_RENTAL } from "./rental";
import type { Cycle, PlacedProduct, Position, Rental, Workspace } from "./types";
import { clampPosition } from "./zones";

/**
 * Every rule about the Workspace and the Rental lives here, never in a click
 * handler, so the rules are readable and exercisable without running the app.
 * Actions are domain verbs and arrive slice by slice.
 *
 * The two rules that need something this function cannot hold sit beside it as
 * pure predicates the interface calls: the monitor cap's reason in
 * `constraints.ts`, and whether a delivery date has passed in `dates.ts`, which
 * needs a clock. Both are still one function away from a test.
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
  | { type: "moveChair"; position: Position }
  | { type: "moveProduct"; productId: PlaceableId; copy: number; position: Position };

/**
 * The whole dispatch surface: what the user does to the room, plus what they
 * say about delivery. One reducer rather than two, because the room and its
 * delivery details are one thing the user is composing.
 */
export type RentalAction =
  | WorkspaceAction
  | { type: "setArea"; areaId: AreaId }
  /** A null date is "as soon as possible", which is what an untouched Rental holds. */
  | { type: "setDeliveryDate"; date: IsoDate | null }
  | { type: "setCycle"; cycle: Cycle }
  | { type: "setDuration"; duration: number }
  | { type: "reset" };

export function rentalReducer(rental: Rental, action: RentalAction): Rental {
  switch (action.type) {
    case "setArea":
      return rental.areaId === action.areaId ? rental : { ...rental, areaId: action.areaId };

    case "setDeliveryDate":
      // Whether a date is in the past is not a fact this function can know —
      // it has no clock, deliberately. Today is resolved at the one edge that
      // has one and the refusal happens there, next to the input's own `min`.
      return rental.deliveryDate === action.date
        ? rental
        : { ...rental, deliveryDate: action.date };

    case "setCycle":
      if (rental.cycle === action.cycle) return rental;

      return {
        ...rental,
        cycle: action.cycle,
        // A Duration the new Cycle cannot express drops back to one, so the
        // user is never shown a total computed from something they didn't mean.
        duration: durationInRange(rental.duration, action.cycle) ? rental.duration : 1,
      };

    case "setDuration":
      // A Duration outside the range changes nothing, the same way a refused
      // third monitor does. Nothing can reach here with one — the control only
      // offers what the Cycle allows — so this is the guard behind that, not a
      // message the user ever reads.
      return durationInRange(action.duration, rental.cycle)
        ? { ...rental, duration: action.duration }
        : rental;

    case "reset":
      // Reset is a Rental action rather than a Workspace one: it returns the
      // starter room *and* the default delivery details, which is what the PRD
      // means by a default configuration.
      return STARTER_RENTAL;

    default: {
      const workspace = workspaceReducer(rental.workspace, action);
      return workspace === rental.workspace ? rental : { ...rental, workspace };
    }
  }
}

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

    case "moveChair": {
      const chairPosition = clampPosition(action.position);
      return samePosition(workspace.chairPosition, chairPosition)
        ? workspace
        : { ...workspace, chairPosition };
    }

    case "moveProduct": {
      const position = clampPosition(action.position);
      const placed = workspace.placed.map((entry) => {
        if (entry.productId !== action.productId || !entry.positions[action.copy]) return entry;
        if (samePosition(entry.positions[action.copy], position)) return entry;

        return {
          ...entry,
          positions: entry.positions.map((current, index) =>
            index === action.copy ? position : current,
          ),
        };
      });

      return placed.every((entry, index) => entry === workspace.placed[index])
        ? workspace
        : { ...workspace, placed };
    }
  }
}

function samePosition(a: Position, b: Position): boolean {
  return a.x === b.x && a.y === b.y;
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
