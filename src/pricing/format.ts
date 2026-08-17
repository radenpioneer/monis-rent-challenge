import type { Cycle } from "@/workspace/types";

/**
 * All price formatting lives here, so the figure on a catalog card and the
 * figure in the review breakdown cannot drift apart.
 *
 * Prices are demo values in USD. Nothing here computes a total — the Setup
 * rate is derived in `setup-rate.ts` and the full Quote arrives with the
 * Rental.
 */
const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatUsd(amount: number): string {
  return USD.format(amount);
}

const CYCLE_SUFFIX: Record<Cycle, string> = {
  weekly: "/ week",
  monthly: "/ month",
};

/** A recurring price with the Cycle it recurs on — "$20 / week". */
export function formatRate(amount: number, cycle: Cycle): string {
  return `${formatUsd(amount)} ${CYCLE_SUFFIX[cycle]}`;
}
