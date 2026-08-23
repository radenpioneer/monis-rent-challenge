import type { AccessoryId } from "@/catalog/products";
import { copiesOf, monitorCount } from "./constraints";
import type { Workspace } from "./types";

const LAPTOP_STAND_ID = "laptop-stand" as const;
const DESK_LAMP_ID = "smart-desk-lamp" as const;

/**
 * The one Product that would make this Workspace more complete, if any.
 *
 * A monitor makes the laptop stand the first priority. Otherwise, the room
 * gets its lamp. Keeping this as a pure Workspace rule means the interface
 * only presents a Recommendation it was given; it never decides what to sell.
 */
export function recommendationFor(workspace: Workspace): AccessoryId | null {
  if (
    monitorCount(workspace.placed) > 0 &&
    copiesOf(workspace.placed, LAPTOP_STAND_ID) === 0
  ) {
    return LAPTOP_STAND_ID;
  }

  return copiesOf(workspace.placed, DESK_LAMP_ID) === 0 ? DESK_LAMP_ID : null;
}
