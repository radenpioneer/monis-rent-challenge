"use client";

import { useState } from "react";
import {
  browsableCategories,
  CATEGORY_LABELS,
  productsInCategory,
  type CatalogProduct,
} from "@/catalog/products";
import type { WorkspaceAction } from "@/workspace/reducer";
import type { Workspace } from "@/workspace/types";
import { ProductCard } from "./product-card";
import { useWorkspace } from "./workspace-provider";

const CATEGORIES = browsableCategories();

/**
 * What a card offers for a Product, decided once per Category rather than in
 * several places that could disagree: whether it is already in the Workspace,
 * what the card offers to do about it, and the action that does it.
 *
 * Desks and chairs are the two Categories that are always exactly one, so the
 * offer is a swap — there is no action here that could leave the room with
 * nothing to sit at. Later slices answer this for the Categories that are
 * counted instead.
 */
function offerFor(
  product: CatalogProduct,
  workspace: Workspace,
): { selected: boolean; actionLabel: string; action: WorkspaceAction | null } {
  switch (product.category) {
    case "desk":
      return {
        selected: workspace.deskId === product.id,
        actionLabel: "Swap in",
        action: { type: "swapDesk", deskId: product.id },
      };
    case "chair":
      return {
        selected: workspace.chairId === product.id,
        actionLabel: "Swap in",
        action: { type: "swapChair", chairId: product.id },
      };
    default:
      return { selected: false, actionLabel: "", action: null };
  }
}

export function CatalogPanel() {
  const { workspace, dispatch } = useWorkspace();
  const [category, setCategory] = useState(CATEGORIES[0]);

  return (
    <section
      aria-label="Product catalog"
      className="flex flex-col gap-4 rounded-3xl bg-white p-4 shadow-[0_18px_46px_-30px_rgba(43,39,33,0.5)] ring-1 ring-stone-900/5"
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
        {CATEGORIES.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={option === category}
            onClick={() => setCategory(option)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${
              option === category
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            }`}
          >
            {CATEGORY_LABELS[option]}
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-3">
        {productsInCategory(category).map((product) => {
          const offer = offerFor(product, workspace);
          return (
            <li key={product.id}>
              <ProductCard
                product={product}
                selected={offer.selected}
                actionLabel={offer.actionLabel}
                onSelect={() => {
                  if (offer.action) dispatch(offer.action);
                }}
              />
            </li>
          );
        })}
      </ul>

      <p className="text-xs text-stone-400">
        Demo pricing — invented for this concept, not a real Monis quote.
      </p>
    </section>
  );
}
