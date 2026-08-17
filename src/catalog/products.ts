import type { Category, Product } from "./types";

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
    weeklyRate: 12,
    concept: false,
  },
  "mechanical-adjustable-desk": {
    id: "mechanical-adjustable-desk",
    name: "Mechanical Adjustable Desk",
    category: "desk",
    description: "Crank-adjusted height on a solid steel frame.",
    placement: "fixed",
    weeklyRate: 9,
    concept: false,
  },
  "ergonomic-office-chair": {
    id: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    category: "chair",
    description: "Mesh back and adjustable support for full working days.",
    placement: "floor",
    weeklyRate: 8,
    concept: false,
  },
  "compact-task-chair": {
    id: "compact-task-chair",
    name: "Compact Task Chair",
    category: "chair",
    description: "Armless and small-footprint, for a corner of a rented room.",
    placement: "floor",
    weeklyRate: 5,
    concept: true,
  },
} as const satisfies Record<string, Product>;

export type ProductId = keyof typeof PRODUCTS;

/**
 * A catalog entry with its id and Category kept literal, so narrowing by
 * Category also narrows the id — that is what lets a card dispatch `swapDesk`
 * with an id the reducer accepts, without a cast or a runtime check.
 */
export type CatalogProduct = (typeof PRODUCTS)[ProductId];

/**
 * The Product ids belonging to one Category, as a type.
 *
 * This is what makes "a desk and a chair are always selected" a fact the
 * compiler holds rather than a rule the reducer has to defend at runtime.
 */
type IdsIn<C extends Category> = {
  [K in ProductId]: (typeof PRODUCTS)[K]["category"] extends C ? K : never;
}[ProductId];

export type DeskId = IdsIn<"desk">;
export type ChairId = IdsIn<"chair">;

export function getProduct(id: ProductId): Product {
  return PRODUCTS[id];
}

const ALL_PRODUCTS: CatalogProduct[] = Object.values(PRODUCTS);

/** The order Categories are offered in for browsing. */
export const CATEGORY_ORDER: Category[] = ["desk", "chair", "monitor", "accessory"];

export const CATEGORY_LABELS: Record<Category, string> = {
  desk: "Desks",
  chair: "Chairs",
  monitor: "Monitors",
  accessory: "Accessories",
};

export function productsInCategory(category: Category): CatalogProduct[] {
  return ALL_PRODUCTS.filter((product) => product.category === category);
}

/**
 * Categories that currently hold at least one Product. Later slices add
 * Products, not browsing code.
 */
export function browsableCategories(): Category[] {
  return CATEGORY_ORDER.filter((category) => productsInCategory(category).length > 0);
}
