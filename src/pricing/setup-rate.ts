import { getProduct, type ProductId } from "@/catalog/products";
import type { Cycle, Workspace } from "@/workspace/types";

/**
 * The recurring price of the Workspace alone, per Cycle. This is the figure
 * shown live in the builder.
 *
 * A rate rather than a total: it takes a Workspace and a Cycle and nothing
 * else. Duration and delivery belong to the Rental and arrive with the Quote,
 * so this number cannot quietly become a checkout figure.
 *
 * Pure — no React, no scene, no UI. Every rule about money is reachable by
 * calling these functions directly.
 */

/** How many weekly cycles a month is compared against. */
const WEEKS_COMPARED_TO_A_MONTH = 4;

/**
 * What one copy of a Product costs for one Cycle. Demo pricing, USD.
 *
 * Private until something outside asks for it — the review breakdown will,
 * when it lists a rate against each line.
 */
function rateFor(productId: ProductId, cycle: Cycle): number {
  const product = getProduct(productId);
  return cycle === "weekly" ? product.weeklyRate : product.monthlyRate;
}

export function setupRate(workspace: Workspace, cycle: Cycle): number {
  const placed = workspace.placed.reduce(
    (total, entry) => total + rateFor(entry.productId, cycle) * entry.positions.length,
    0,
  );

  // The desk and the chair are never in `placed` — they live on the Workspace
  // itself, so they are counted here rather than iterated over.
  return rateFor(workspace.deskId, cycle) + rateFor(workspace.chairId, cycle) + placed;
}

/**
 * What renting this Workspace by the month saves against four weekly cycles.
 *
 * Every Product's monthly rate beats four of its weekly cycles, so this is
 * always positive — the arithmetic is here rather than in the UI so the claim
 * and the figure behind it can never be stated from two different places.
 */
export function monthlySaving(workspace: Workspace): number {
  return (
    setupRate(workspace, "weekly") * WEEKS_COMPARED_TO_A_MONTH -
    setupRate(workspace, "monthly")
  );
}
