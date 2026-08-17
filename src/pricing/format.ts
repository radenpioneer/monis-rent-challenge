/**
 * All price formatting lives here, so the figure on a catalog card and the
 * figure in the review breakdown cannot drift apart.
 *
 * Prices are demo values in USD. Nothing here computes a total — the Setup
 * rate and the full Quote arrive with their own slices.
 */
const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd(amount: number): string {
  return USD.format(amount);
}

export function formatWeeklyRate(weeklyRate: number): string {
  return `${formatUsd(weeklyRate)} / week`;
}
