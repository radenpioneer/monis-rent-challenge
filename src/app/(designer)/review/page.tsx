"use client";

import Link from "next/link";
import { getProduct } from "@/catalog/products";
import { useRental } from "@/ui/rental-provider";

export default function ReviewPage() {
  const { rental } = useRental();
  const { workspace } = rental;

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Review setup</h1>
      <p className="text-ink">
        You are designing around the {getProduct(workspace.deskId).name} and the{" "}
        {getProduct(workspace.chairId).name}.
      </p>
      <p className="text-sm text-ink-muted">
        The itemised breakdown, delivery details and total land in a later slice. This route
        exists now so the Workspace is shared across every screen from the start.
      </p>
      <div className="flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href="/"
          className="rounded-sm text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Back to workspace
        </Link>
        <Link
          href="/success"
          className="rounded-sm text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Rent this setup
        </Link>
      </div>
    </div>
  );
}
