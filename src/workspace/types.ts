import type { AreaId } from "@/catalog/areas";
import type { ChairId, DeskId, PlaceableId } from "@/catalog/products";
import type { IsoDate } from "./dates";

/** A normalized coordinate in the range 0..1, resolved against a Zone. */
export type Position = { x: number; y: number };

/**
 * One Product present in the Workspace.
 * Quantity is `positions.length` — one Position per copy.
 *
 * The id is a `PlaceableId`, so the desk and the chair cannot appear here at
 * all: they live on the Workspace itself and are swapped, never placed.
 */
export type PlacedProduct = {
  productId: PlaceableId;
  positions: Position[];
};

/**
 * The user's current composition. Holds no delivery or pricing information —
 * those belong to the Rental.
 *
 * The desk and chair are single ids rather than entries in `placed`, which is
 * what makes "exactly one of each, never removable" unrepresentable otherwise.
 * Narrowing them to their Category's ids puts the same guarantee on the
 * Product itself: a chair id cannot be stored as the desk.
 */
export type Workspace = {
  deskId: DeskId;
  chairId: ChairId;
  chairPosition: Position;
  placed: PlacedProduct[];
};

/**
 * The recurring billing period a Rental is priced in.
 *
 * It belongs to the Rental rather than the Workspace — a Workspace has no
 * Cycle, which is why the Setup rate takes one as an argument instead of
 * reading it off the room.
 */
export type Cycle = "weekly" | "monthly";

/**
 * A Workspace plus everything delivery needs to know about it. This is what
 * the user is about to simulate renting, and the only thing a Quote is
 * computed from.
 *
 * The Workspace is nested rather than spread across this type, so the rule
 * that the Setup rate is derivable from the room alone stays a fact about the
 * types and not a promise in a comment.
 */
export type Rental = {
  workspace: Workspace;
  areaId: AreaId;
  /**
   * The date the user chose, or null for "as soon as possible" — which is what
   * an untouched Rental means. Read it through `deliveryDateOf`, which resolves
   * that to today.
   *
   * The PRD's suggested state model types this as a plain string. It is nullable
   * here because the soonest delivery date is a fact about the visitor's clock,
   * and these routes are prerendered: a date resolved while rendering would be
   * the build's date, which in production is a date in the past.
   */
  deliveryDate: IsoDate | null;
  cycle: Cycle;
  /** How many Cycles the Rental runs for. Bounded by `DURATION_RANGE`. */
  duration: number;
};
