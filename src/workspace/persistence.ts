import { AREAS } from "../catalog/areas";
import { PRODUCTS, type PlaceableId } from "../catalog/products";
import { maxCopies, MONITOR_LIMIT } from "./constraints";
import { durationInRange, STARTER_RENTAL } from "./rental";
import type { Rental } from "./types";

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

type PersistedRental = {
  version: number;
  rental: Rental;
};

/** The single saved shape. Bump this instead of trying to guess older data. */
export const PERSISTED_RENTAL_VERSION = 1;
export const PERSISTED_RENTAL_KEY = "monis-workspace:rental";

/**
 * Reads a returning visitor's Rental without letting browser storage become an
 * app dependency. Private browsing, quota errors, invalid JSON, and an older
 * shape are all indistinguishable from a first visit.
 */
export function readPersistedRental(storage: StorageLike | null = browserStorage()): Rental {
  try {
    const value = storage?.getItem(PERSISTED_RENTAL_KEY);
    if (!value) return STARTER_RENTAL;

    const parsed: unknown = JSON.parse(value);
    return isPersistedRental(parsed) ? parsed.rental : STARTER_RENTAL;
  } catch {
    return STARTER_RENTAL;
  }
}

/** Saves only the user's compositional state; derived pricing is never stored. */
export function savePersistedRental(rental: Rental, storage: StorageLike | null = browserStorage()) {
  try {
    storage?.setItem(
      PERSISTED_RENTAL_KEY,
      JSON.stringify({ version: PERSISTED_RENTAL_VERSION, rental } satisfies PersistedRental),
    );
  } catch {
    // Browser storage can be disabled or full. There is no recovery action to show the visitor.
  }
}

/** Reset is also a storage boundary: the next visit is a genuine first visit. */
export function clearPersistedRental(storage: StorageLike | null = browserStorage()) {
  try {
    storage?.removeItem(PERSISTED_RENTAL_KEY);
  } catch {
    // Keep Reset usable even when storage is unavailable.
  }
}

function browserStorage(): StorageLike | null {
  if (typeof window === "undefined") return null;

  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function isPersistedRental(value: unknown): value is PersistedRental {
  if (!isRecord(value) || value.version !== PERSISTED_RENTAL_VERSION) return false;
  return isRental(value.rental);
}

function isRental(value: unknown): value is Rental {
  if (!isRecord(value) || !isWorkspace(value.workspace)) return false;
  if (
    typeof value.areaId !== "string" ||
    !(value.areaId in AREAS) ||
    !isDeliveryDate(value.deliveryDate)
  ) {
    return false;
  }
  if (value.cycle !== "weekly" && value.cycle !== "monthly") return false;
  return typeof value.duration === "number" && durationInRange(value.duration, value.cycle);
}

function isWorkspace(value: unknown): boolean {
  if (!isRecord(value) || !isPosition(value.chairPosition) || !Array.isArray(value.placed)) return false;
  if (!isProductInCategory(value.deskId, "desk") || !isProductInCategory(value.chairId, "chair")) {
    return false;
  }

  const placedIds = new Set<string>();
  let monitors = 0;
  return value.placed.every((entry) => {
    if (!isRecord(entry) || typeof entry.productId !== "string" || !Array.isArray(entry.positions)) {
      return false;
    }
    if (!isProductInCategory(entry.productId, "monitor") && !isProductInCategory(entry.productId, "accessory")) {
      return false;
    }
    if (placedIds.has(entry.productId) || entry.positions.length === 0) return false;
    placedIds.add(entry.productId);
    const product = PRODUCTS[entry.productId as keyof typeof PRODUCTS];
    if (product.category === "monitor") monitors += entry.positions.length;
    return (
      monitors <= MONITOR_LIMIT &&
      entry.positions.length <= maxCopies(entry.productId as PlaceableId) &&
      entry.positions.every(isPosition)
    );
  });
}

function isProductInCategory(id: unknown, category: "desk" | "chair" | "monitor" | "accessory") {
  return typeof id === "string" && id in PRODUCTS && PRODUCTS[id as keyof typeof PRODUCTS].category === category;
}

function isPosition(value: unknown): boolean {
  return (
    isRecord(value) &&
    typeof value.x === "number" &&
    Number.isFinite(value.x) &&
    value.x >= 0 &&
    value.x <= 1 &&
    typeof value.y === "number" &&
    Number.isFinite(value.y) &&
    value.y >= 0 &&
    value.y <= 1
  );
}

function isDeliveryDate(value: unknown): boolean {
  if (value === null) return true;
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
