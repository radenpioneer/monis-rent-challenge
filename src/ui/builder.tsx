"use client";

import Link from "next/link";
import { WorkspaceScene } from "@/scene/workspace-scene";
import { useWorkspace } from "./workspace-provider";

export function Builder() {
  const { workspace } = useWorkspace();

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-16 sm:px-6">
      {/* The scene keeps its 3:2 aspect and stays whole on screen: its width is
          capped by the height left over once the header and caption are placed. */}
      <div className="mx-auto w-full max-w-[calc((100dvh-11rem)*1.5)] overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-28px_rgba(43,39,33,0.45)] ring-1 ring-stone-900/5">
        <WorkspaceScene workspace={workspace} />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-stone-600">
          This is your starter workspace — a desk and a chair, ready to rent.
        </p>
        <Link
          href="/review"
          className="text-sm font-medium text-emerald-800 underline underline-offset-4 hover:text-emerald-900"
        >
          Review setup
        </Link>
      </div>
    </div>
  );
}
