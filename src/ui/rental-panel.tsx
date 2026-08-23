"use client";

import Link from "next/link";
import { useState } from "react";
import { AREA_LIST, getArea } from "@/catalog/areas";
import { formatUsd } from "@/pricing/format";
import { quote } from "@/pricing/quote";
import { isDeliverable } from "@/workspace/dates";
import {
  cycleUnits,
  deliveryDateOf,
  describeDuration,
  durationOptions,
} from "@/workspace/rental";
import { ChoicePill } from "./choice-pill";
import { useRental } from "./rental-provider";

const LABEL_ID = "rental-label";
const DATE_ID = "delivery-date";
const DATE_HINT_ID = "delivery-date-hint";
const DURATION_ID = "rental-duration";

const DATE_PASSED = "That date has passed. Choose today or later — same-day delivery is fine.";

const CONTROL =
  "h-11 w-full rounded-full border border-line bg-surface px-4 text-base text-ink transition hover:border-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:h-10";

/**
 * Where the workspace goes, when it arrives, and for how long — the last block
 * in the rail, because it is the last thing the user has to decide. The room is
 * composed above it and the total below it, so the panel reads in the order the
 * questions actually arrive.
 *
 * The Cycle is deliberately not here. It changes the Setup rate, so it lives
 * beside that figure; this panel holds the choices that do not move the rate.
 */
export function RentalPanel() {
  const { rental, today, dispatch } = useRental();
  const { areaId, cycle, duration } = rental;
  const area = getArea(areaId);
  const { deliveryFee, total } = quote(rental);

  // A date the user typed rather than picked can be in the past, and is refused
  // — a field that silently snaps back reads as broken.
  const [refusedDate, setRefusedDate] = useState(false);

  // A date chosen yesterday is in the past today. The clock is re-read whenever
  // the tab comes back, so the same sentence covers both ways a date goes
  // stale: one the user just typed, and one a night passed over.
  const chosenDate = deliveryDateOf(rental, today);
  const datePassed =
    refusedDate || (!!chosenDate && !!today && !isDeliverable(chosenDate, today));

  function chooseDate(value: string) {
    // A date field reports an empty value while it is being typed into, so an
    // empty change is never treated as a choice — it would wipe the date the
    // user is halfway through replacing. Clearing is handled on blur instead.
    if (!value) return;

    if (today && !isDeliverable(value, today)) {
      setRefusedDate(true);
      return;
    }

    setRefusedDate(false);
    dispatch({ type: "setDeliveryDate", date: value });
  }

  /** A field left empty means the soonest date, which is what an untouched Rental holds. */
  function clearDateIfEmpty(value: string) {
    if (value) return;
    setRefusedDate(false);
    dispatch({ type: "setDeliveryDate", date: null });
  }

  return (
    <section
      aria-labelledby={LABEL_ID}
      className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
    >
      <h2 id={LABEL_ID} className="text-sm font-semibold text-ink">
        Delivery and duration
      </h2>

      <fieldset className="flex flex-col gap-2">
        <legend className="text-sm font-semibold text-ink">Delivery area</legend>
        <div className="flex flex-wrap gap-2">
          {AREA_LIST.map((option) => (
            <ChoicePill
              key={option.id}
              name="delivery-area"
              label={option.name}
              selected={option.id === areaId}
              onSelect={() => dispatch({ type: "setArea", areaId: option.id })}
            />
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor={DATE_ID} className="text-sm font-semibold text-ink">
          Delivery date
        </label>
        <input
          id={DATE_ID}
          type="date"
          name="delivery-date"
          // The picker refuses past days itself. The check in `chooseDate` is
          // for the other way in — a date typed straight into the field.
          min={today ?? undefined}
          value={chosenDate ?? ""}
          aria-describedby={DATE_HINT_ID}
          aria-invalid={datePassed || undefined}
          onChange={(event) => chooseDate(event.target.value)}
          onBlur={(event) => clearDateIfEmpty(event.target.value)}
          className={`${CONTROL} tabular-nums [&::-webkit-calendar-picker-indicator]:cursor-pointer`}
        />
        <p id={DATE_HINT_ID} aria-live="polite" className="text-xs text-ink-muted">
          {datePassed ? DATE_PASSED : "Today or later. Same-day delivery is fine."}
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {/* The label is the unit, so it changes with the Cycle rather than
            leaving the user to remember which one they picked. */}
        <label
          htmlFor={DURATION_ID}
          className="text-sm font-semibold text-ink capitalize"
        >
          {cycleUnits(cycle)}
        </label>
        <Select
          id={DURATION_ID}
          value={duration}
          onChange={(value) => dispatch({ type: "setDuration", duration: value })}
          options={durationOptions(cycle)}
        />
      </div>

      {/* The two figures the choices above just moved. Quieter than the Setup
          rate on purpose — that figure is the builder's headline, and this is
          the consequence of the Rental rather than the price of the room. The
          itemised breakdown belongs to the review screen. */}
      <div
        aria-live="polite"
        className="flex flex-col gap-1 border-t border-line pt-3 text-sm"
      >
        <p className="flex items-baseline justify-between gap-3 text-ink-muted">
          <span>Delivery to {area.name}</span>
          <span className="shrink-0 tabular-nums">{formatUsd(deliveryFee)}</span>
        </p>
        <p className="flex items-baseline justify-between gap-3 font-semibold text-ink">
          <span>Total for {describeDuration(duration, cycle)}</span>
          <span className="shrink-0 text-base tabular-nums">{formatUsd(total)}</span>
        </p>
      </div>

      {/* Two panels above already say the prices are invented, so this one
          carries the part they don't: the fee is this concept's, not Monis's. */}
      <p className="text-xs text-ink-muted">
        Demo pricing — the delivery fee is invented for this concept. Real Monis includes
        delivery and setup at no extra fee.
      </p>

      {datePassed ? (
        <p className="text-sm font-medium text-ink-muted">
          Choose a valid delivery date before reviewing your setup.
        </p>
      ) : (
        <Link
          href="/review"
          className="self-start rounded-sm text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Review setup
        </Link>
      )}
    </section>
  );
}

/**
 * A native select, styled down to the border and the chevron.
 *
 * Native because twelve options is where a visible set stops being scannable
 * and starts being a wall — and because the platform's own picker is the one a
 * phone user already knows how to use. Only the closed control is restyled; the
 * open list stays the browser's, which no design system can improve on.
 */
function Select({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: number;
  options: number[];
  onChange: (value: number) => void;
}) {
  return (
    <span className="relative block">
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`${CONTROL} cursor-pointer appearance-none pr-10 tabular-nums`}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Chevron />
    </span>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden
      focusable="false"
      className="pointer-events-none absolute top-1/2 right-4 size-3.5 -translate-y-1/2 text-ink-muted"
    >
      <path
        d="M4 6.5 8 10.5 12 6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
