import type { ComponentType } from "react";
import { getProduct, type ProductId } from "../products";
import { ElectricalAdjustableDesk } from "./electrical-adjustable-desk";
import { ErgonomicOfficeChair } from "./ergonomic-office-chair";
import { MissingAsset } from "./missing-asset";

/**
 * Hand-authored SVG, one per Product, resolved by Product id. The same
 * component serves the scene and the catalog card, so a Product cannot look
 * like two different things in two places.
 */
const ASSETS: Partial<Record<ProductId, ComponentType>> = {
  "electrical-adjustable-desk": ElectricalAdjustableDesk,
  "ergonomic-office-chair": ErgonomicOfficeChair,
};

/** Draws a Product's asset anchored at the local origin, or a labelled placeholder. */
export function ProductAsset({ productId }: { productId: ProductId }) {
  const Asset = ASSETS[productId];
  if (!Asset) return <MissingAsset label={getProduct(productId).name} />;
  return <Asset />;
}
