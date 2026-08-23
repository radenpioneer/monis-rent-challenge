import type { Category, Product } from "./types";

/**
 * The catalog. Static data, never mutated.
 *
 * Products are added slice by slice alongside the SVG asset that draws them,
 * so the catalog never advertises something the scene cannot render.
 *
 * Names and descriptions are Monis's own copy, verbatim from the *Evidence on
 * Hand* table in PRODUCT.md. The two exceptions are the Compact Task Chair and
 * the Potted Plant: Monis rents neither, so there is no Monis copy to quote and
 * theirs is written for this project — which is why neither imitates the voice
 * of the entries around it.
 *
 * Every rate is demo pricing, invented for this concept. Monthly rates are set
 * at roughly three and a half weeks, which is the rule the whole catalog obeys:
 * a month always costs less than four weekly cycles, so a longer stay is a
 * better deal on every Product rather than on a chosen few.
 */
export const PRODUCTS = {
  "electrical-adjustable-desk": {
    id: "electrical-adjustable-desk",
    name: "Electrical Adjustable Desk",
    category: "desk",
    description: "Electric height adjustment (70-118cm), smooth and quiet",
    placement: "fixed",
    weeklyRate: 12,
    monthlyRate: 40,
    concept: false,
  },
  "mechanical-adjustable-desk": {
    id: "mechanical-adjustable-desk",
    name: "Mechanical Adjustable Desk",
    category: "desk",
    description: "Effortlessly adjust the height from 70-120cm",
    placement: "fixed",
    weeklyRate: 9,
    monthlyRate: 30,
    concept: false,
  },
  "ergonomic-office-chair": {
    id: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    category: "chair",
    description: "Breathable mesh back, high-density molded foam seat",
    placement: "floor",
    weeklyRate: 8,
    monthlyRate: 27,
    concept: false,
  },
  "compact-task-chair": {
    id: "compact-task-chair",
    name: "Compact Task Chair",
    category: "chair",
    description: "Armless and small-footprint, for a corner of a rented room.",
    placement: "floor",
    weeklyRate: 5,
    monthlyRate: 17,
    concept: true,
  },
  "office-monitor-24": {
    id: "office-monitor-24",
    name: '24" Full HD Office Monitor A24i',
    category: "monitor",
    description: "Xiaomi Mi 23.8 Desktop Monitor A24i at 100 Hz",
    placement: "desktop",
    weeklyRate: 7,
    monthlyRate: 24,
    concept: false,
  },
  "multimedia-monitor-27": {
    id: "multimedia-monitor-27",
    name: '27" 4K Multimedia Monitor',
    category: "monitor",
    description: 'Redmi 27" monitor with USB-C or HDMI connection',
    placement: "desktop",
    weeklyRate: 11,
    monthlyRate: 37,
    concept: false,
  },
  "gaming-monitor-34": {
    id: "gaming-monitor-34",
    name: '34" 4K Gaming Monitor',
    category: "monitor",
    description: 'Xiaomi Mi Curved 34" Gaming Monitor at 180Hz',
    placement: "desktop",
    weeklyRate: 16,
    monthlyRate: 54,
    concept: false,
  },
  "smart-desk-lamp": {
    id: "smart-desk-lamp",
    name: "Smart LED Desk Lamp 1S",
    category: "accessory",
    description: "520 lm luminous flux, Ra 90 high color rendering",
    placement: "desktop",
    weeklyRate: 3,
    monthlyRate: 10,
    concept: false,
  },
  "mx-keyboard": {
    id: "mx-keyboard",
    name: "Logitech MX Keyboard",
    category: "accessory",
    description: "Up to 10 meters wireless range, Easy-Switch™ keys",
    placement: "desktop",
    weeklyRate: 4,
    monthlyRate: 13,
    concept: false,
  },
  "mx-master-mouse": {
    id: "mx-master-mouse",
    name: "Logitech MX Master Mouse S3",
    category: "accessory",
    description: "Compatible with Windows and macOS, wireless connection",
    placement: "desktop",
    weeklyRate: 3,
    monthlyRate: 10,
    concept: false,
  },
  "laptop-stand": {
    id: "laptop-stand",
    name: "Ergonomic Laptop Stand",
    category: "accessory",
    description: "With all laptops from 10''-17\", raises and angles",
    placement: "desktop",
    weeklyRate: 2,
    monthlyRate: 7,
    concept: false,
  },
  plant: {
    id: "plant",
    name: "Plant",
    category: "accessory",
    description: "A little life in the corner, for the months you are here.",
    placement: "floor",
    weeklyRate: 2,
    monthlyRate: 7,
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
export type MonitorId = IdsIn<"monitor">;
export type AccessoryId = IdsIn<"accessory">;

/**
 * A Product that is added and removed rather than swapped.
 *
 * Desks and chairs are excluded by the type rather than by a runtime guard, so
 * `addProduct("electrical-adjustable-desk")` is not a call the reducer has to
 * defend against — it does not compile.
 */
export type PlaceableId = MonitorId | AccessoryId;

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
