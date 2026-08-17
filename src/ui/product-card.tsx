"use client";

import { ProductThumbnail } from "@/catalog/assets";
import type { CatalogProduct } from "@/catalog/products";
import { formatWeeklyRate } from "@/pricing/format";

/**
 * One catalog entry, as much of it as a decision needs: what it looks like,
 * what it is, what it costs. No specification dump — the PRD rules those out
 * of the builder.
 *
 * Selected state is carried by `aria-pressed`, by a tick, and by the word
 * "Selected", never by colour alone.
 */
export function ProductCard({
  product,
  selected,
  actionLabel,
  onSelect,
}: {
  product: CatalogProduct;
  selected: boolean;
  actionLabel: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={`flex w-full gap-3 rounded-2xl border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
        selected
          ? "border-ink bg-cream ring-1 ring-ink"
          : "border-line bg-surface hover:border-ink-faint hover:bg-cream"
      }`}
    >
      <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-ground p-1.5">
        <ProductThumbnail productId={product.id} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-semibold text-ink">{product.name}</span>

        <span className="text-xs leading-snug text-ink-muted">{product.description}</span>

        {product.concept ? (
          <span className="mt-0.5 flex items-center gap-1.5">
            <span className="rounded-full bg-signal px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
              Concept
            </span>
            <span className="text-[0.7rem] text-ink-muted">
              Not rented by Monis today
            </span>
          </span>
        ) : null}

        <span className="mt-1 flex items-baseline justify-between gap-2">
          <span
            className={`text-xs font-medium ${
              selected ? "text-ink" : "text-ink-muted"
            }`}
          >
            {selected ? (
              <>
                <svg
                  viewBox="0 0 16 16"
                  className="mr-1 inline-block size-3.5 align-[-2px]"
                  aria-hidden
                  focusable="false"
                >
                  <path
                    d="M3 8.5 6.3 12 13 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                In your workspace
              </>
            ) : (
              actionLabel
            )}
          </span>
          <span className="shrink-0 text-sm font-medium tabular-nums text-ink">
            {formatWeeklyRate(product.weeklyRate)}
          </span>
        </span>
      </span>
    </button>
  );
}
