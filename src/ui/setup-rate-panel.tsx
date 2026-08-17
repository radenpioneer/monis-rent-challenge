"use client";

import { formatRate, formatUsd } from "@/pricing/format";
import { monthlySaving, setupRate } from "@/pricing/setup-rate";
import { useWorkspace } from "./workspace-provider";

const LABEL_ID = "setup-rate-label";

/**
 * The Setup rate, at the top of the rail where it cannot be scrolled past.
 *
 * It reads the Workspace and nothing else, so it moves the instant anything is
 * added, removed, or swapped — price is a thing the user steers by rather than
 * discovers at the end.
 *
 * The monthly figure sits beneath the weekly one rather than behind a control:
 * a longer stay being better value is a fact worth seeing before there is any
 * Cycle to choose. Both figures are `tabular-nums`, so a changing rate does not
 * shift sideways under the user's hands.
 */
export function SetupRatePanel() {
  const { workspace } = useWorkspace();

  return (
    <section
      aria-labelledby={LABEL_ID}
      className="rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
    >
      <p id={LABEL_ID} className="text-sm text-ink-muted">
        Your setup
      </p>

      {/* Announced on change, so the cost of a decision reaches a screen
          reader user at the moment they make it rather than at review. */}
      <div aria-live="polite">
        <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums text-ink">
          {formatRate(setupRate(workspace, "weekly"), "weekly")}
        </p>
        <p className="mt-1 text-sm leading-snug text-ink-muted">
          or{" "}
          <span className="font-medium tabular-nums text-ink">
            {formatRate(setupRate(workspace, "monthly"), "monthly")}
          </span>{" "}
          — <span className="tabular-nums">{formatUsd(monthlySaving(workspace))}</span> less
          than four weeks
        </p>
      </div>

      {/* Each panel carries the whole fact rather than half of it, so a price
          is never read without it — the two sentences differ by subject, not
          by how much they admit. */}
      <p className="mt-3 text-xs text-ink-muted">
        Demo pricing — this figure is invented for this concept, not a real Monis quote.
      </p>
    </section>
  );
}
