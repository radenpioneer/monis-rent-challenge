/** The grouping a Product belongs to for browsing. */
export type Category = "desk" | "chair" | "monitor" | "accessory";

/**
 * The rule describing where a Product lives in the scene.
 * A property of the Product, not of the user's choices.
 */
export type Placement = "fixed" | "floor" | "desktop";

/** A static catalog entry that can be rented. Never mutated by the app. */
export type Product = {
  id: string;
  name: string;
  category: Category;
  description: string;
  placement: Placement;
};
