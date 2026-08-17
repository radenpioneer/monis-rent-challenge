/**
 * The Bali delivery destinations, and what delivery to each one costs.
 *
 * Static reference data the app never mutates — the same kind of table as
 * `products.ts`, which is why it lives beside it rather than in `workspace`.
 * An Area is a delivery destination, never a Zone: a Zone is a region of the
 * scene, and the two words are kept apart deliberately (CONTEXT.md).
 *
 * The fees are demo values. Real Monis includes delivery, setup, and pickup at
 * no extra fee — this fee exists only so the Quote breakdown has something to
 * break down, and every screen showing it says so.
 */
export type Area = {
  id: string;
  name: string;
  /** Demo pricing, USD, charged once per Rental rather than per Cycle. */
  deliveryFee: number;
};

/**
 * Five destinations, in the PRD's own order. Denpasar is cheapest as the
 * arrival hub; Ubud and Uluwatu cost more for the drive.
 *
 * Canggu is $15, which is the figure the PRD's worked example uses, so the
 * default Rental produces the total that document already shows.
 */
export const AREAS = {
  canggu: { id: "canggu", name: "Canggu", deliveryFee: 15 },
  seminyak: { id: "seminyak", name: "Seminyak", deliveryFee: 15 },
  ubud: { id: "ubud", name: "Ubud", deliveryFee: 20 },
  uluwatu: { id: "uluwatu", name: "Uluwatu", deliveryFee: 25 },
  denpasar: { id: "denpasar", name: "Denpasar", deliveryFee: 10 },
} as const satisfies Record<string, Area>;

export type AreaId = keyof typeof AREAS;

/**
 * An Area with its id kept literal, so a pill can dispatch `setArea` with an id
 * the reducer accepts without a cast.
 */
export type CatalogArea = (typeof AREAS)[AreaId];

export function getArea(id: AreaId): Area {
  return AREAS[id];
}

export const AREA_LIST: CatalogArea[] = Object.values(AREAS);
