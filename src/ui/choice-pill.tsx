"use client";

import { pillWrapperClasses } from "./pill";

/**
 * One option in a set the user picks exactly one of, as a real radio wearing
 * the category chip's clothes.
 *
 * The category filters are buttons carrying `aria-pressed`, because filtering
 * is an action. Choosing an Area or a Cycle answers a question about the
 * Rental, so these are radios instead: one tab stop for the whole group, arrow
 * keys between the options, and the chosen one announced as checked. Every
 * option is visible at once, which is what a set this small is owed — a
 * dropdown would hide four choices to save one line.
 */
export function ChoicePill({
  name,
  label,
  selected,
  onSelect,
}: {
  /** Shared by every pill in one group — this is what makes them one radio set. */
  name: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <label className={pillWrapperClasses(selected)}>
      <input
        type="radio"
        name={name}
        className="sr-only"
        checked={selected}
        onChange={onSelect}
      />
      {label}
    </label>
  );
}
