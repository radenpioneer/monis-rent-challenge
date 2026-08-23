import type { IsoDate } from "./dates";
import { STARTER_WORKSPACE } from "./starter";
import type { Cycle, Rental } from "./types";

/**
 * The Rental rules that are not about the room: how long a Rental may run for,
 * and what the starter Rental is.
 *
 * Pure, like the rest of this module — no React, no clock. The one date fact
 * that needs the clock lives in `dates.ts` and is passed in.
 */

/**
 * How many Cycles a Rental may run for, declared per Cycle.
 *
 * The PRD puts both at 1–12 and calls the upper bound implementation-level.
 * They are written per Cycle anyway, because the rule that depends on them —
 * a Duration dropping to one when the Cycle changes — is a rule about ranges
 * that can differ, and stating it against a single shared range would hide
 * that. Today the two ranges coincide, so that fallback cannot fire; it is the
 * range declaration, not the guard, that would have to change first.
 */
export const DURATION_RANGE: Record<Cycle, { min: number; max: number }> = {
  weekly: { min: 1, max: 12 },
  monthly: { min: 1, max: 12 },
};

/** Whether a Duration is one the given Cycle can express. */
export function durationInRange(duration: number, cycle: Cycle): boolean {
  const { min, max } = DURATION_RANGE[cycle];
  return Number.isInteger(duration) && duration >= min && duration <= max;
}

/** Every Duration the given Cycle offers, in order, for a list of choices. */
export function durationOptions(cycle: Cycle): number[] {
  const { min, max } = DURATION_RANGE[cycle];
  return Array.from({ length: max - min + 1 }, (_, index) => min + index);
}

/**
 * What one Cycle is counted in. The only place this product decides that a
 * weekly Rental is measured in weeks, so a control's label and a sentence about
 * the same Rental cannot disagree.
 */
const CYCLE_UNIT: Record<Cycle, string> = { weekly: "week", monthly: "month" };

/** What a Duration in this Cycle counts, plural — "weeks", "months". */
export function cycleUnits(cycle: Cycle): string {
  return `${CYCLE_UNIT[cycle]}s`;
}

/**
 * A Duration and its Cycle in words — "1 week", "11 weeks", "3 months".
 *
 * Here rather than in the UI so the builder's total line and the review
 * breakdown cannot describe the same Rental two different ways.
 */
export function describeDuration(duration: number, cycle: Cycle): string {
  const unit = CYCLE_UNIT[cycle];
  return `${duration} ${unit}${duration === 1 ? "" : "s"}`;
}

/**
 * When the workspace arrives: the date the user chose, or the soonest one there
 * is. Null only while the server's HTML is on screen, since "soonest" is a fact
 * about the visitor's clock rather than the build's.
 *
 * Storing "as soon as possible" rather than a resolved date is what keeps a tab
 * left open overnight from quoting yesterday.
 */
export function deliveryDateOf(rental: Rental, today: IsoDate | null): IsoDate | null {
  return rental.deliveryDate ?? today;
}

/**
 * The date a Rental finishes, counted in the Cycle the customer selected.
 * Keeping this beside `describeDuration` means the review screen renders a
 * Rental fact rather than reimplementing calendar arithmetic in its JSX.
 */
export function rentalEndDate(
  deliveryDate: IsoDate | null,
  duration: number,
  cycle: Cycle,
): IsoDate | null {
  if (!deliveryDate) return null;

  const date = new Date(`${deliveryDate}T12:00:00`);
  if (cycle === "weekly") date.setDate(date.getDate() + duration * 7);
  else {
    const day = date.getDate();
    date.setDate(1);
    date.setMonth(date.getMonth() + duration);
    date.setDate(Math.min(day, new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()));
  }

  return date.toLocaleDateString("en-CA");
}

/**
 * The Rental a first-time user is given, and the one Reset returns to.
 *
 * Canggu because it is where this product's user is most likely to be, weekly
 * because that is how Monis quotes its own catalog, and one Cycle because a
 * default should be the smallest commitment the user might make rather than
 * the most flattering total.
 */
export const STARTER_RENTAL: Rental = {
  workspace: STARTER_WORKSPACE,
  areaId: "canggu",
  deliveryDate: null,
  cycle: "weekly",
  duration: 1,
};
