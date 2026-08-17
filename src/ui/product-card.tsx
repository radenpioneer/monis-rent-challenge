"use client";

import type { ReactNode } from "react";
import { ProductThumbnail } from "@/catalog/assets";
import type { CatalogProduct } from "@/catalog/products";
import { formatWeeklyRate } from "@/pricing/format";

/**
 * What this card offers for its Product. One shape per product rule, so the
 * control a user sees is the rule they are actually subject to:
 *
 * - `swap` — a Category that is always exactly one. Choosing replaces.
 * - `toggle` — wanted once or not at all. The whole card adds and removes.
 * - `count` — a Category with a real quantity. Only monitors have one.
 */
export type CardOffer = SwapOffer | ToggleOffer | CountOffer;

type SwapOffer = { kind: "swap"; selected: boolean; onActivate: () => void };

type ToggleOffer = { kind: "toggle"; placed: boolean; onActivate: () => void };

type CountOffer = {
  kind: "count";
  count: number;
  /** Why another cannot be added, or `null` while one can be. */
  limitReason: string | null;
  /** The element already stating that reason, for the dimmed control. */
  limitNoticeId: string;
  onAdd: () => void;
  onRemove: () => void;
};

const CARD = "flex w-full gap-3 rounded-2xl border p-3 text-left transition";
const CARD_REST = "border-line bg-surface";
const CARD_ACTIVE = "border-ink bg-cream ring-1 ring-ink";
const HOVER = "hover:border-ink-faint hover:bg-cream";
const FOCUS = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

function surface(active: boolean): string {
  return `${CARD} ${active ? CARD_ACTIVE : CARD_REST}`;
}

/**
 * One catalog entry, as much of it as a decision needs: what it looks like,
 * what it is, what it costs. No specification dump — the PRD rules those out
 * of the builder.
 */
export function ProductCard({
  product,
  offer,
}: {
  product: CatalogProduct;
  offer: CardOffer;
}) {
  switch (offer.kind) {
    case "swap":
      return <SwapCard product={product} offer={offer} />;
    case "toggle":
      return <ToggleCard product={product} offer={offer} />;
    case "count":
      return <CountCard product={product} offer={offer} />;
  }
}

/**
 * A Category that always holds exactly one. The whole card is the control, and
 * the selected state is deliberately over-specified — fill, border, ring, a
 * drawn tick, and a sentence — because selection may never rest on colour.
 */
function SwapCard({ product, offer }: { product: CatalogProduct; offer: SwapOffer }) {
  return (
    <button
      type="button"
      aria-pressed={offer.selected}
      aria-label={offer.selected ? undefined : `Swap in the ${product.name}`}
      onClick={offer.onActivate}
      className={`${surface(offer.selected)} ${HOVER} ${FOCUS}`}
    >
      <Contents
        product={product}
        action={offer.selected ? <InWorkspace /> : <ActionWord>Swap in</ActionWord>}
      />
    </button>
  );
}

/**
 * A Product wanted once or not at all. The whole card toggles, which is the
 * largest tap target the rail can offer and the one mobile relies on.
 */
function ToggleCard({ product, offer }: { product: CatalogProduct; offer: ToggleOffer }) {
  return (
    <button
      type="button"
      aria-pressed={offer.placed}
      aria-label={
        offer.placed
          ? `Remove the ${product.name} from your workspace`
          : `Add the ${product.name} to your workspace`
      }
      onClick={offer.onActivate}
      className={`${surface(offer.placed)} ${HOVER} ${FOCUS}`}
    >
      <Contents
        product={product}
        action={
          offer.placed ? (
            <InWorkspace hint="Remove" />
          ) : (
            <ActionWord>Add</ActionWord>
          )
        }
      />
    </button>
  );
}

/**
 * A Category with a real quantity. The card itself is not a button here: a
 * quantity deserves a stepper, and a stepper cannot live inside one.
 *
 * Presence is signalled by fill, border, ring, and the figure itself. That is a
 * deliberate narrowing of DESIGN.md's "a mark and a word" for this one variant
 * — the sentence will not fit beside a three-part control at the narrowest
 * width the rail is laid out at, and the PRD's actual rule, that selection
 * never rests on colour alone, is met by the figure.
 */
function CountCard({ product, offer }: { product: CatalogProduct; offer: CountOffer }) {
  return (
    <div className={surface(offer.count > 0)}>
      <Contents product={product} action={<Stepper product={product} offer={offer} />} />
    </div>
  );
}

/** The parts of a card that never depend on the rule: image, name, price. */
function Contents({ product, action }: { product: CatalogProduct; action: ReactNode }) {
  return (
    <>
      <span className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-xl bg-ground p-1.5">
        <ProductThumbnail productId={product.id} />
      </span>

      <span className="flex min-w-0 flex-1 flex-col gap-1">
        <span className="text-sm font-semibold text-balance text-ink">{product.name}</span>

        <span className="text-xs leading-snug text-ink-muted">{product.description}</span>

        {product.concept ? (
          <span className="mt-0.5 flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className="rounded-full bg-signal px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink">
              Concept
            </span>
            <span className="text-xs text-ink-muted">Not rented by Monis today</span>
          </span>
        ) : null}

        {/* The rate is pushed right rather than spaced apart, so a wide control
            beside a long rate wraps onto its own line instead of clipping at
            the narrowest width the rail is ever laid out at. */}
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          {action}
          <span className="ml-auto shrink-0 text-sm font-medium tabular-nums text-ink">
            {formatWeeklyRate(product.weeklyRate)}
          </span>
        </span>
      </span>
    </>
  );
}

function ActionWord({ children }: { children: ReactNode }) {
  return <span className="text-xs font-medium text-ink-muted">{children}</span>;
}

/** The tick and sentence a card carries once its Product is in the Workspace. */
function InWorkspace({ hint }: { hint?: string }) {
  return (
    <span className="flex flex-col gap-0.5 text-xs font-medium text-ink">
      <span className="flex items-center">
        <Tick />
        In your workspace
      </span>
      {hint ? <span className="font-normal text-ink-muted">{hint}</span> : null}
    </span>
  );
}

/**
 * The quantity control. The add button is present in every state — as "Add" at
 * zero and as "+" above it — so activating it never pulls the focused element
 * out from under a keyboard user.
 *
 * At the limit it is dimmed with `aria-disabled` rather than `disabled`, which
 * keeps it reachable: a keyboard user can land on it and hear why. A card
 * holding none of a Product says "Limit reached" outright, because a fill
 * change alone is not a state this system is allowed to communicate with.
 */
function Stepper({ product, offer }: { product: CatalogProduct; offer: CountOffer }) {
  const { count, limitReason } = offer;

  const addLabel =
    limitReason && count === 0
      ? `Limit reached. ${limitReason}`
      : count > 0
        ? `Add another ${product.name}`
        : `Add the ${product.name} to your workspace`;

  return (
    <span
      role="group"
      aria-label={`Number of ${product.name}`}
      className="flex items-center gap-2"
    >
      {count > 0 ? (
        <StepButton square label={`Remove one ${product.name}`} onClick={offer.onRemove}>
          <Glyph plus={false} />
        </StepButton>
      ) : null}

      {count > 0 ? (
        <span className="min-w-3 text-center text-sm font-semibold tabular-nums text-ink">
          {count}
        </span>
      ) : null}

      <StepButton
        square={count > 0}
        label={addLabel}
        describedBy={limitReason ? offer.limitNoticeId : undefined}
        dimmed={limitReason !== null}
        onClick={offer.onAdd}
      >
        {count > 0 ? <Glyph plus /> : limitReason ? "Limit reached" : "Add"}
      </StepButton>
    </span>
  );
}

function StepButton({
  label,
  describedBy,
  dimmed = false,
  square = false,
  onClick,
  children,
}: {
  label: string;
  describedBy?: string;
  dimmed?: boolean;
  /** An icon control, which needs no more width than its own height. */
  square?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-disabled={dimmed || undefined}
      aria-describedby={describedBy}
      onClick={dimmed ? undefined : onClick}
      className={`grid h-9 shrink-0 place-items-center rounded-full border text-sm font-medium transition ${FOCUS} ${
        square ? "w-9" : "px-3.5"
      } ${
        dimmed
          ? "cursor-not-allowed border-line bg-ground text-ink-muted"
          : `border-line bg-surface text-ink ${HOVER}`
      }`}
    >
      {children}
    </button>
  );
}

function Glyph({ plus = false }: { plus?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden focusable="false">
      <g fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
        <path d="M3.5 8h9" />
        {plus ? <path d="M8 3.5v9" /> : null}
      </g>
    </svg>
  );
}

function Tick() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="mr-1 size-3.5 shrink-0"
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
  );
}
