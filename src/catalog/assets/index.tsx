import type { ComponentType } from "react";
import { getProduct, type ProductId } from "../products";
import { CompactTaskChair } from "./compact-task-chair";
import { DESK_VIEW_BOX } from "./desk-surface";
import { ElectricalAdjustableDesk } from "./electrical-adjustable-desk";
import { ErgonomicOfficeChair } from "./ergonomic-office-chair";
import { GamingMonitor34, GAMING_MONITOR_34_VIEW_BOX } from "./gaming-monitor-34";
import { LaptopStand, LAPTOP_STAND_VIEW_BOX } from "./laptop-stand";
import { MechanicalAdjustableDesk } from "./mechanical-adjustable-desk";
import { MissingAsset } from "./missing-asset";
import {
  MultimediaMonitor27,
  MULTIMEDIA_MONITOR_27_VIEW_BOX,
} from "./multimedia-monitor-27";
import { MxKeyboard, MX_KEYBOARD_VIEW_BOX } from "./mx-keyboard";
import { MxMasterMouse, MX_MASTER_MOUSE_VIEW_BOX } from "./mx-master-mouse";
import { OfficeMonitor24, OFFICE_MONITOR_24_VIEW_BOX } from "./office-monitor-24";
import { Plant, PLANT_VIEW_BOX } from "./plant";
import { SmartDeskLamp, SMART_DESK_LAMP_VIEW_BOX } from "./smart-desk-lamp";

/**
 * Hand-authored SVG, one per Product, resolved by Product id. The same
 * component serves the scene and the catalog card, so a Product cannot look
 * like two different things in two places.
 *
 * `viewBox` is the asset's own extent, which the card needs and the scene does
 * not: assets are anchored at a meaningful point (a desk's back-left corner, a
 * chair's floor contact) rather than centred, so a card cannot guess the frame.
 */
type Asset = { Component: ComponentType; viewBox: string };

const ASSETS: Partial<Record<ProductId, Asset>> = {
  "electrical-adjustable-desk": {
    Component: ElectricalAdjustableDesk,
    viewBox: DESK_VIEW_BOX,
  },
  "mechanical-adjustable-desk": {
    Component: MechanicalAdjustableDesk,
    viewBox: DESK_VIEW_BOX,
  },
  "ergonomic-office-chair": {
    Component: ErgonomicOfficeChair,
    viewBox: "-116 -354 238 380",
  },
  "compact-task-chair": {
    Component: CompactTaskChair,
    viewBox: "-85 -284 155 306",
  },
  "office-monitor-24": {
    Component: OfficeMonitor24,
    viewBox: OFFICE_MONITOR_24_VIEW_BOX,
  },
  "multimedia-monitor-27": {
    Component: MultimediaMonitor27,
    viewBox: MULTIMEDIA_MONITOR_27_VIEW_BOX,
  },
  "gaming-monitor-34": {
    Component: GamingMonitor34,
    viewBox: GAMING_MONITOR_34_VIEW_BOX,
  },
  "smart-desk-lamp": {
    Component: SmartDeskLamp,
    viewBox: SMART_DESK_LAMP_VIEW_BOX,
  },
  "mx-keyboard": {
    Component: MxKeyboard,
    viewBox: MX_KEYBOARD_VIEW_BOX,
  },
  "mx-master-mouse": {
    Component: MxMasterMouse,
    viewBox: MX_MASTER_MOUSE_VIEW_BOX,
  },
  "laptop-stand": {
    Component: LaptopStand,
    viewBox: LAPTOP_STAND_VIEW_BOX,
  },
  plant: {
    Component: Plant,
    viewBox: PLANT_VIEW_BOX,
  },
};

const MISSING_VIEW_BOX = "-80 -150 160 160";

/** Draws a Product's asset anchored at the local origin, or a labelled placeholder. */
export function ProductAsset({ productId }: { productId: ProductId }) {
  const asset = ASSETS[productId];
  if (!asset) return <MissingAsset label={getProduct(productId).name} />;
  return <asset.Component />;
}

/**
 * The same asset framed for a catalog card. Decorative: the card names the
 * Product in text, so the image adds nothing for a screen reader.
 */
export function ProductThumbnail({ productId }: { productId: ProductId }) {
  const asset = ASSETS[productId];
  return (
    <svg
      viewBox={asset?.viewBox ?? MISSING_VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      aria-hidden
      focusable="false"
    >
      <ProductAsset productId={productId} />
    </svg>
  );
}
