import type { ChairId, DeskId, PlaceableId } from "@/catalog/products";

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
