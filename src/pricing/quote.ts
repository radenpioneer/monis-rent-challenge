import { getArea } from "@/catalog/areas";
import type { Rental } from "@/workspace/types";
import { setupRate } from "./setup-rate";

/**
 * The computed price of a Rental. Derived on every read, never stored — there
 * is no state here that could fall out of step with the room.
 *
 * No tax, deposit, coupon, insurance, or processing: the PRD excludes all of
 * them, and a breakdown that shows only what the user chose is one they can
 * check themselves. The per-Product line items the glossary also names arrive
 * with the screen that lists them, since nothing yet renders one.
 */
export type Quote = {
  /** The Workspace's recurring price, per Cycle. */
  setupRate: number;
  /** That rate across the whole Duration. */
  durationTotal: number;
  /** The Area's mocked fee, charged once. */
  deliveryFee: number;
  total: number;
};

export function quote(rental: Rental): Quote {
  const rate = setupRate(rental.workspace, rental.cycle);
  const durationTotal = rate * rental.duration;
  const deliveryFee = getArea(rental.areaId).deliveryFee;

  return {
    setupRate: rate,
    durationTotal,
    deliveryFee,
    total: durationTotal + deliveryFee,
  };
}
