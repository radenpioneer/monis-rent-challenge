"use client";

import Link from "next/link";
import { ProductThumbnail } from "@/catalog/assets";
import { getProduct } from "@/catalog/products";
import { getArea } from "@/catalog/areas";
import { formatRate, formatUsd } from "@/pricing/format";
import { quote } from "@/pricing/quote";
import { WorkspaceScene } from "@/scene/workspace-scene";
import { useRental } from "@/ui/rental-provider";
import { deliveryDateOf, describeDuration, rentalEndDate } from "@/workspace/rental";

type ReviewItem = { productId: Parameters<typeof getProduct>[0]; quantity: number };

function itemsInReview(workspace: ReturnType<typeof useRental>["rental"]["workspace"]): ReviewItem[] {
  return [
    { productId: workspace.deskId, quantity: 1 },
    { productId: workspace.chairId, quantity: 1 },
    ...workspace.placed.map(({ productId, positions }) => ({
      productId,
      quantity: positions.length,
    })),
  ];
}

function displayDeliveryDate(date: string | null) {
  if (!date) return "As soon as possible";

  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}

export default function ReviewPage() {
  const { rental, today } = useRental();
  const { workspace } = rental;
  const area = getArea(rental.areaId);
  const itemisedProducts = itemsInReview(workspace);
  const { setupRate, durationTotal, deliveryFee, total } = quote(rental);
  const deliveryDate = deliveryDateOf(rental, today);
  const endDate = rentalEndDate(deliveryDate, rental.duration, rental.cycle);

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 pb-16 sm:px-6">
      <h1 className="text-2xl font-semibold tracking-tight text-ink">Review setup</h1>
      <p className="text-sm text-ink-muted">
        Check the Workspace, delivery, and demo Quote before you continue.
      </p>

      <section aria-labelledby="workspace-preview-label" className="flex flex-col gap-3">
        <h2 id="workspace-preview-label" className="text-sm font-semibold text-ink">
          Your workspace
        </h2>
        <div className="overflow-hidden rounded-3xl bg-surface shadow-[0_24px_60px_-28px_rgba(43,39,33,0.45)]">
          <WorkspaceScene
            workspace={workspace}
            interactive={false}
            onMoveChair={() => undefined}
            onMoveProduct={() => undefined}
          />
        </div>
      </section>

      <section
        aria-labelledby="products-label"
        className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
      >
        <h2 id="products-label" className="text-sm font-semibold text-ink">
          In your workspace
        </h2>
        <ul className="flex flex-col divide-y divide-line">
          {itemisedProducts.map(({ productId, quantity }) => {
            const product = getProduct(productId);
            const rate = rental.cycle === "weekly" ? product.weeklyRate : product.monthlyRate;
            const lineTotal = rate * quantity;

            return (
              <li key={productId} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                <div className="size-20 shrink-0 rounded-xl bg-ground p-1.5" aria-hidden>
                  <ProductThumbnail productId={productId} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-ink">{product.name}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {quantity} {quantity === 1 ? "item" : "items"} · {formatRate(rate, rental.cycle)}
                  </p>
                </div>
                <p className="shrink-0 self-center text-sm font-semibold tabular-nums text-ink">
                  {formatUsd(lineTotal)}
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="delivery-label"
        className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
      >
        <h2 id="delivery-label" className="text-sm font-semibold text-ink">
          Delivery and duration
        </h2>
        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs text-ink-muted">Delivery area</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">{area.name}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Delivery date</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {displayDeliveryDate(deliveryDate)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Cycle</dt>
            <dd className="mt-1 text-sm font-semibold capitalize text-ink">{rental.cycle}</dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">Duration</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {describeDuration(rental.duration, rental.cycle)}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-ink-muted">End date</dt>
            <dd className="mt-1 text-sm font-semibold text-ink">
              {displayDeliveryDate(endDate)}
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="quote-label"
        className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
      >
        <h2 id="quote-label" className="text-sm font-semibold text-ink">
          Quote
        </h2>
        <dl className="flex flex-col gap-2 text-sm">
          <div className="flex items-baseline justify-between gap-4 text-ink-muted">
            <dt>Setup rate</dt>
            <dd className="tabular-nums">{formatRate(setupRate, rental.cycle)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 text-ink-muted">
            <dt>Duration · {describeDuration(rental.duration, rental.cycle)}</dt>
            <dd className="tabular-nums">{formatUsd(durationTotal)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4 text-ink-muted">
            <dt>Delivery to {area.name}</dt>
            <dd className="tabular-nums">{formatUsd(deliveryFee)}</dd>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-line pt-3 text-base font-semibold text-ink">
            <dt>Total</dt>
            <dd className="tabular-nums">{formatUsd(total)}</dd>
          </div>
        </dl>
        <p className="text-xs text-ink-muted">
          Demo pricing — this is not a real Monis quote. The delivery fee is invented for this
          concept; real Monis includes delivery and setup at no extra fee.
        </p>
      </section>

      <nav aria-label="Review setup actions" className="flex flex-wrap gap-4 text-sm font-medium">
        <Link
          href="/"
          className="rounded-sm text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Back to workspace
        </Link>
        <Link
          href="/success"
          className="rounded-sm text-ink underline decoration-ink-faint underline-offset-4 transition-colors hover:decoration-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
        >
          Rent this setup
        </Link>
      </nav>
    </div>
  );
}
