"use client";

import Link from "next/link";
import { getArea } from "@/catalog/areas";
import { formatUsd } from "@/pricing/format";
import { quote } from "@/pricing/quote";
import { displayDeliveryDate } from "@/ui/display-delivery-date";
import { useRental } from "@/ui/rental-provider";
import { deliveryDateOf, describeDuration } from "@/workspace/rental";

export default function SuccessPage() {
  const { rental, today } = useRental();
  const area = getArea(rental.areaId);
  const deliveryDate = deliveryDateOf(rental, today);
  const { total } = quote(rental);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <header className="flex flex-col gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-ink">Your setup is confirmed</h1>
        <p className="max-w-prose text-sm font-semibold text-ink">
          This is a demo experience. No real rental has been placed and no furniture will be
          delivered.
        </p>
      </header>

      <section
        aria-labelledby="confirmation-details-label"
        className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
      >
        <h2 id="confirmation-details-label" className="text-sm font-semibold text-ink">
          Confirmed details
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-ink-muted">Delivery date</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {displayDeliveryDate(deliveryDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Delivery area</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{area.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Duration</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {describeDuration(rental.duration, rental.cycle)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Demo total</dt>
            <dd className="mt-1 text-lg font-semibold tabular-nums text-ink">{formatUsd(total)}</dd>
          </div>
        </dl>
      </section>

      <Link
        href="/"
        className="rounded-sm text-sm font-medium text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        Back to workspace
      </Link>
    </div>
  );
}
