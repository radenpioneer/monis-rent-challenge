import type { Workspace } from "./types";

/**
 * The Workspace a first-time user is given, and the Workspace that Reset
 * returns to. Never empty — there is no blank canvas to fill.
 */
export const STARTER_WORKSPACE: Workspace = {
  deskId: "electrical-adjustable-desk",
  chairId: "ergonomic-office-chair",
  chairPosition: { x: 0.5, y: 0.12 },
  placed: [],
};
