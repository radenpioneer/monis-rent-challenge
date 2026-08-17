"use client";

import { useState } from "react";
import {
  browsableCategories,
  CATEGORY_LABELS,
  productsInCategory,
  type CatalogProduct,
} from "@/catalog/products";
import {
  addRefusal,
  copiesOf,
  monitorCount,
  MONITOR_LIMIT,
  MONITOR_LIMIT_REASON,
} from "@/workspace/constraints";
import type { WorkspaceAction } from "@/workspace/reducer";
import type { Workspace } from "@/workspace/types";
import { ProductCard, type CardOffer } from "./product-card";
import { useWorkspace } from "./workspace-provider";

const CATEGORIES = browsableCategories();
const MONITOR_NOTICE_ID = "monitor-limit";

/**
 * What a card offers for a Product, decided once per Category rather than in
 * several places that could disagree.
 *
 * Desks and chairs are the two Categories that are always exactly one, so the
 * offer is a swap — no action here could leave the room with nothing to sit at.
 * Monitors are the one Category with a real quantity, so they count. Everything
 * else is wanted once, so it toggles.
 */
function offerFor(
  product: CatalogProduct,
  workspace: Workspace,
  dispatch: (action: WorkspaceAction) => void,
): CardOffer {
  switch (product.category) {
    case "desk":
      return {
        kind: "swap",
        selected: workspace.deskId === product.id,
        onActivate: () => dispatch({ type: "swapDesk", deskId: product.id }),
      };
    case "chair":
      return {
        kind: "swap",
        selected: workspace.chairId === product.id,
        onActivate: () => dispatch({ type: "swapChair", chairId: product.id }),
      };
    case "monitor":
      return {
        kind: "count",
        count: copiesOf(workspace.placed, product.id),
        limitReason: addRefusal(workspace, product.id),
        limitNoticeId: MONITOR_NOTICE_ID,
        onAdd: () => dispatch({ type: "addProduct", productId: product.id }),
        onRemove: () => dispatch({ type: "removeProduct", productId: product.id }),
      };
    case "accessory": {
      const placed = copiesOf(workspace.placed, product.id) > 0;
      return {
        kind: "toggle",
        placed,
        onActivate: () =>
          dispatch({
            type: placed ? "removeProduct" : "addProduct",
            productId: product.id,
          }),
      };
    }
  }
}

export function CatalogPanel() {
  const { workspace, dispatch } = useWorkspace();
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <section
      aria-label="Product catalog"
      className="flex flex-col gap-4 rounded-3xl bg-surface p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)]"
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
        {CATEGORIES.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === category}
            onClick={() => setCategory(option)}
            className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink ${
              option === category
                ? "border-ink bg-ink text-surface"
                : "border-line bg-surface text-ink-muted hover:border-ink-faint hover:bg-cream"
            }`}
          >
            {CATEGORY_LABELS[option]}
          </button>
        ))}
      </div>

      {category === "monitor" ? <MonitorLimitNotice workspace={workspace} /> : null}

      <ul className="flex flex-col gap-3">
        {productsInCategory(category).map((product) => (
          <li key={product.id}>
            <ProductCard product={product} offer={offerFor(product, workspace, dispatch)} />
          </li>
        ))}
      </ul>

      <p className="text-xs text-ink-muted">
        Demo pricing — invented for this concept, not a real Monis quote.
      </p>
    </section>
  );
}

/**
 * The monitor cap, stated before it is reached rather than only once it bites.
 * At the limit it becomes the reducer's own refusal sentence, so the rule the
 * user reads is the rule the Workspace enforces.
 */
function MonitorLimitNotice({ workspace }: { workspace: Workspace }) {
  const count = monitorCount(workspace.placed);

  return (
    <p id={MONITOR_NOTICE_ID} aria-live="polite" className="text-xs text-ink-muted">
      {count >= MONITOR_LIMIT
        ? MONITOR_LIMIT_REASON
        : `${count} of ${MONITOR_LIMIT} monitors.`}
    </p>
  );
}
