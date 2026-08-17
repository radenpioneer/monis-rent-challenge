import type { ProductId } from "@/catalog/products";

/** A normalized coordinate in the range 0..1, resolved against a Zone. */
export type Position = { x: number; y: number };

/**
 * One Product present in the Workspace.
 * Quantity is `positions.length` — one Position per copy.
 */
export type PlacedProduct = {
  productId: ProductId;
  positions: Position[];
};

/**
 * The user's current composition. Holds no delivery or pricing information —
 * those belong to the Rental.
 */
export type Workspace = {
  deskId: ProductId;
  chairId: ProductId;
  chairPosition: Position;
  placed: PlacedProduct[];
};
