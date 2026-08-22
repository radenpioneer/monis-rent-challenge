"use client";

import { formatRate, formatUsd } from "@/pricing/format";
import { monthlySaving, setupRate } from "@/pricing/setup-rate";
import type { Cycle } from "@/workspace/types";
import { ChoicePill } from "./choice-pill";
import { ResetWorkspace } from "./reset-workspace";
import { useRental } from "./rental-provider";

const LABEL_ID = "setup-rate-label";

const CYCLE_CHOICES: { cycle: Cycle; label: string }[] = [
  { cycle: "weekly", label: "Weekly" },
  { cycle: "monthly", label: "Monthly" },
];

/**
 * The Setup rate, at the top of the rail where it cannot be scrolled past.
 *
 * It reads the Workspace and the Cycle and nothing else, so it moves the
 * instant anything is added, removed, or swapped — price is a thing the user
 * steers by rather than discovers at the end.
 *
 * The Cycle sits here rather than with the delivery details because it is the
 * one Rental choice that changes this number: the control is next to the figure
 * it rewrites. Both figures are `tabular-nums`, so a changing rate does not
 * shift sideways under the user's hands.
 */
export function SetupRatePanel() {
  const { rental, dispatch } = useRental();
  const { workspace, cycle } = rental;

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
          {formatRate(setupRate(workspace, cycle), cycle)}
        </p>
      </div>

      {/* The group's visible label is the figure above it: the rate already
          reads "per week", so a "Rental cycle" heading between them would
          restate in words what the number says. The legend stays for the
          screen reader, which cannot see that adjacency. */}
      <fieldset className="mt-3">
        <legend className="sr-only">Rental cycle</legend>
        <div className="flex flex-wrap gap-2">
          {CYCLE_CHOICES.map((choice) => (
            <ChoicePill
              key={choice.cycle}
              name="rental-cycle"
              label={choice.label}
              selected={choice.cycle === cycle}
              onSelect={() => dispatch({ type: "setCycle", cycle: choice.cycle })}
            />
          ))}
        </div>
      </fieldset>

      {/* The case for the longer commitment, made only while the shorter one is
          chosen. Once the user is on monthly they have taken the saving, and
          restating it would be selling them something they already hold. */}
      {cycle === "weekly" ? (
        <p aria-live="polite" className="mt-3 text-sm leading-snug text-ink-muted">
          Monthly is{" "}
          <span className="font-medium tabular-nums text-ink">
            {formatRate(setupRate(workspace, "monthly"), "monthly")}
          </span>{" "}
          —{" "}
          <span className="tabular-nums">{formatUsd(monthlySaving(workspace))}</span> less
          than four weeks
        </p>
      ) : null}

      {/* Each panel carries the whole fact rather than half of it, so a price
          is never read without it — the two sentences differ by subject, not
          by how much they admit. */}
      <p className="mt-3 text-xs text-ink-muted">
        Demo pricing — this figure is invented for this concept, not a real Monis quote.
      </p>

      <div className="mt-4 border-t border-line pt-3">
        <ResetWorkspace />
      </div>
    </section>
  );
}
