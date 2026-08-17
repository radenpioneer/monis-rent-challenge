/**
 * The one pill geometry in this product, in one place.
 *
 * A Category Chip and a Choice Pill are the same shape doing different jobs —
 * a button that filters, a radio that answers — so the classes live here and
 * only the element differs. Two copies of this string is how the filter row and
 * the Area row would start looking like two design systems.
 *
 * Bordered in both states, so selection moving across a group never shifts it
 * by a pixel. Selected inverts to an Ink fill rather than tinting: an inversion
 * survives a greyscale screenshot, which selection here is required to.
 */
const PILL = "rounded-full border px-3.5 py-1.5 text-sm font-medium transition";

const SELECTED = "border-ink bg-ink text-surface";

const REST = "border-line bg-surface text-ink-muted hover:border-ink-faint hover:bg-cream";

/** A pill that is itself the focusable control — a filter button. */
export function pillClasses(selected: boolean): string {
  return `${PILL} ${selected ? SELECTED : REST} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink`;
}

/**
 * A pill wrapping the focusable control — a label around a visually hidden
 * radio. The ring is drawn on the pill, because the input it belongs to is one
 * pixel wide.
 */
export function pillWrapperClasses(selected: boolean): string {
  return `${PILL} ${selected ? SELECTED : REST} cursor-pointer has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-ink`;
}
