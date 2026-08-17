"use client";

import { createContext, use, useReducer, type Dispatch, type ReactNode } from "react";
import { workspaceReducer, type WorkspaceAction } from "@/workspace/reducer";
import { STARTER_WORKSPACE } from "@/workspace/starter";
import type { Workspace } from "@/workspace/types";

type WorkspaceContextValue = {
  workspace: Workspace;
  dispatch: Dispatch<WorkspaceAction>;
};

const WorkspaceContext = createContext<WorkspaceContextValue | null>(null);

/**
 * Holds the Workspace above every route, so navigating to the review screen
 * and back preserves what the user built without any extra machinery.
 */
export function WorkspaceProvider({ children }: { children: ReactNode }) {
  const [workspace, dispatch] = useReducer(workspaceReducer, STARTER_WORKSPACE);

  return (
    <WorkspaceContext value={{ workspace, dispatch }}>{children}</WorkspaceContext>
  );
}

export function useWorkspace() {
  const value = use(WorkspaceContext);
  if (!value) {
    throw new Error("useWorkspace must be used inside a WorkspaceProvider");
  }
  return value;
}
