/**
 * Dates are held as `YYYY-MM-DD` strings, which is what the date input reads
 * and writes and what `localStorage` will hold later without a parse step.
 * That format also sorts lexicographically, so "is this date in the past" is a
 * string comparison rather than a timezone question.
 */
export type IsoDate = string;

/**
 * Today, in the browser's own timezone.
 *
 * The one function here that reads the clock, so every other date rule stays a
 * pure comparison. It must be called after mount rather than while rendering:
 * these routes are prerendered, so a date read during render is the build's
 * date — stale in production and a hydration mismatch besides.
 *
 * Built from the local date parts on purpose. `toISOString()` would convert to
 * UTC first, which lands on the wrong day for most of the evening in Bali.
 */
export function todayIso(): IsoDate {
  const now = new Date();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const day = `${now.getDate()}`.padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Whether a delivery date is one the user may choose.
 *
 * Same-day is allowed — a stated simplification, and consistent with Monis
 * offering same-day delivery in Bali for selected products.
 */
export function isDeliverable(date: IsoDate, today: IsoDate): boolean {
  return date >= today;
}
