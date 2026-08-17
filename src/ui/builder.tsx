"use client";

import Link from "next/link";
import { WorkspaceScene } from "@/scene/workspace-scene";
import { CatalogPanel } from "./catalog-panel";
import { SetupRatePanel } from "./setup-rate-panel";
import { useWorkspace } from "./workspace-provider";

export function Builder() {
  const { workspace } = useWorkspace();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:flex-row lg:items-start">
      {/* The scene keeps its 3:2 aspect and stays whole on screen: its width is
          capped by the height left over once the header and caption are placed. */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="mx-auto w-full max-w-[calc((100dvh-13rem)*1.5)] overflow-hidden rounded-3xl bg-surface shadow-[0_24px_60px_-28px_rgba(43,39,33,0.45)]">
          <WorkspaceScene workspace={workspace} />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-ink-muted">
            Tap a card to swap, add, or remove — the room changes as you choose.
          </p>
          <Link
            href="/review"
            className="rounded-sm text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Review setup
          </Link>
        </div>
      </div>

      {/* The rate leads the rail: it is level with the top of the scene, so the
          price of the room is never something the user has to scroll to find. */}
      <div className="flex w-full flex-col gap-4 lg:max-w-sm">
        <SetupRatePanel />
        <CatalogPanel />
      </div>
    </div>
  );
}
