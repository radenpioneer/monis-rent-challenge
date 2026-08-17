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
  /** Demo pricing, USD per week. */
  weeklyRate: number;
  /**
   * A Product Monis does not currently rent. Rendered with a visible label so
   * it is never mistaken for real inventory. Required rather than optional, so
   * every catalog entry states which side of that line it falls on.
   */
  concept: boolean;
};
