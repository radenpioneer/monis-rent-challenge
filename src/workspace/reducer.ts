import { STARTER_WORKSPACE } from "./starter";
import type { Workspace } from "./types";

/**
 * Every product rule lives here, never in a click handler, so the rules are
 * readable and exercisable without running the app. Actions are domain verbs
 * and arrive slice by slice.
 */
export type WorkspaceAction = { type: "reset" };

export function workspaceReducer(
  workspace: Workspace,
  action: WorkspaceAction,
): Workspace {
  switch (action.type) {
    case "reset":
      return STARTER_WORKSPACE;
  }
}
