import type { Product } from "./types";

/**
 * The catalog. Static data, never mutated.
 *
 * Products are added slice by slice alongside the SVG asset that draws them,
 * so the catalog never advertises something the scene cannot render.
 */
export const PRODUCTS = {
  "electrical-adjustable-desk": {
    id: "electrical-adjustable-desk",
    name: "Electrical Adjustable Desk",
    category: "desk",
    description: "Sit or stand at the touch of a button.",
    placement: "fixed",
  },
  "ergonomic-office-chair": {
    id: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    category: "chair",
    description: "Mesh back and adjustable support for full working days.",
    placement: "floor",
  },
} satisfies Record<string, Product>;

export type ProductId = keyof typeof PRODUCTS;

export function getProduct(id: ProductId): Product {
  return PRODUCTS[id];
}
