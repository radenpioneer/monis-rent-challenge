"use client";

import Link from "next/link";
import { getProduct } from "@/catalog/products";
import { useWorkspace } from "@/ui/workspace-provider";

export default function ReviewPage() {
  const { workspace } = useWorkspace();

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-stone-900">Review setup</h1>
      <p className="text-stone-800">
        You are designing around the {getProduct(workspace.deskId).name} and the{" "}
        {getProduct(workspace.chairId).name}.
      </p>
      <p className="text-sm text-stone-500">
        The itemised breakdown, delivery details and total land in a later slice. This route
        exists now so the Workspace is shared across every screen from the start.
      </p>
      <div className="flex flex-wrap gap-4 text-sm font-medium">
        <Link href="/" className="text-emerald-800 underline underline-offset-4">
          Back to workspace
        </Link>
        <Link href="/success" className="text-emerald-800 underline underline-offset-4">
          Rent this setup
        </Link>
      </div>
    </div>
  );
}
