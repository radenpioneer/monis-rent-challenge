import type { ChairId, DeskId } from "@/catalog/products";
import { STARTER_WORKSPACE } from "./starter";
import type { Workspace } from "./types";

/**
 * Every product rule lives here, never in a click handler, so the rules are
 * readable and exercisable without running the app. Actions are domain verbs
 * and arrive slice by slice.
 *
 * Desk and chair are swapped rather than added and removed: there is no state
 * in which the Workspace has neither, so there is no action that could produce
 * one.
 */
export type WorkspaceAction =
  | { type: "swapDesk"; deskId: DeskId }
  | { type: "swapChair"; chairId: ChairId }
  | { type: "reset" };

export function workspaceReducer(
  workspace: Workspace,
  action: WorkspaceAction,
): Workspace {
  switch (action.type) {
    case "swapDesk":
      // Nothing but `deskId` changes. The desktop Zone is constant across desks
      // (ADR-0001), so every Position stays valid without clamping.
      return workspace.deskId === action.deskId
        ? workspace
        : { ...workspace, deskId: action.deskId };

    case "swapChair":
      // The chair keeps where it stands, so swapping compares two chairs in the
      // same spot rather than resetting the room.
      return workspace.chairId === action.chairId
        ? workspace
        : { ...workspace, chairId: action.chairId };

    case "reset":
      return STARTER_WORKSPACE;
  }
}
