"use client";

import Link from "next/link";
import { WorkspaceScene } from "@/scene/workspace-scene";
import { CatalogPanel } from "./catalog-panel";
import { useWorkspace } from "./workspace-provider";

export function Builder() {
  const { workspace } = useWorkspace();

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-16 sm:px-6 lg:flex-row lg:items-start">
      {/* The scene keeps its 3:2 aspect and stays whole on screen: its width is
          capped by the height left over once the header and caption are placed. */}
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <div className="mx-auto w-full max-w-[calc((100dvh-13rem)*1.5)] overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-28px_rgba(43,39,33,0.45)] ring-1 ring-stone-900/5">
          <WorkspaceScene workspace={workspace} />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-sm text-stone-600">
            Swap the desk or the chair — the room changes as you choose.
          </p>
          <Link
            href="/review"
            className="text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
          >
            Review setup
          </Link>
        </div>
      </div>

      <div className="w-full lg:max-w-sm">
        <CatalogPanel />
      </div>
    </div>
  );
}
