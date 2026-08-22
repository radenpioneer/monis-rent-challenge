"use client";

import { useRef } from "react";
import { useRental } from "./rental-provider";

/**
 * The escape hatch for experimenting in the room. This stays in the sticky
 * setup panel so it is available wherever the builder rail is being read.
 */
export function ResetWorkspace() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { dispatch } = useRental();

  function openConfirmation() {
    dialogRef.current?.showModal();
  }

  function resetIfConfirmed(event: React.SyntheticEvent<HTMLDialogElement>) {
    if (event.currentTarget.returnValue === "reset") dispatch({ type: "reset" });
  }

  return (
    <>
      <button
        type="button"
        onClick={openConfirmation}
        className="rounded-sm text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Reset workspace
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="reset-workspace-title"
        aria-describedby="reset-workspace-description"
        onClose={resetIfConfirmed}
        className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-surface p-0 text-ink shadow-[0_24px_60px_-28px_rgba(43,39,33,0.65)] backdrop:bg-ink/30"
      >
        <form method="dialog" className="flex flex-col gap-5 p-6">
          <div className="flex flex-col gap-2">
            <h2 id="reset-workspace-title" className="text-lg font-semibold tracking-tight">
              Reset this workspace?
            </h2>
            <p id="reset-workspace-description" className="text-sm leading-6 text-ink-muted">
              Your room arrangement and rental details will return to the starter setup.
            </p>
          </div>
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="submit"
              className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition hover:border-ink-faint hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Keep editing
            </button>
            <button
              type="submit"
              value="reset"
              className="rounded-full bg-ink px-4 py-2 text-sm font-medium text-surface transition hover:bg-ink/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              Reset workspace
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
}
