"use client";

import {
  createContext,
  use,
  useReducer,
  useSyncExternalStore,
  type Dispatch,
  type ReactNode,
} from "react";
import { todayIso, type IsoDate } from "@/workspace/dates";
import { rentalReducer, type RentalAction } from "@/workspace/reducer";
import { STARTER_RENTAL } from "@/workspace/rental";
import type { Rental } from "@/workspace/types";

type RentalContextValue = {
  rental: Rental;
  /**
   * Today, in the visitor's timezone — null while the server's HTML is on
   * screen. Every date rule the interface enforces is a comparison against it,
   * and an unchosen delivery date resolves to it.
   */
  today: IsoDate | null;
  dispatch: Dispatch<RentalAction>;
};

const RentalContext = createContext<RentalContextValue | null>(null);

/**
 * Holds the Rental above every route, so navigating to the review screen and
 * back preserves what the user built without any extra machinery.
 */
export function RentalProvider({ children }: { children: ReactNode }) {
  const [rental, dispatch] = useReducer(rentalReducer, STARTER_RENTAL);

  return (
    <RentalContext value={{ rental, today: useToday(), dispatch }}>
      {children}
    </RentalContext>
  );
}

export function useRental() {
  const value = use(RentalContext);
  if (!value) {
    throw new Error("useRental must be used inside a RentalProvider");
  }
  return value;
}

/**
 * The clock, read as what it is: a value that lives outside React and is not
 * available on the server.
 *
 * These routes are prerendered, so reading a date while rendering would bake in
 * the build's date — stale in production and a hydration mismatch besides. The
 * server snapshot is therefore null and the real date arrives with hydration,
 * which is the same trade the Workspace itself will make when it is restored
 * from storage: correct one frame late, rather than wrong immediately.
 */
function useToday(): IsoDate | null {
  return useSyncExternalStore(subscribeToDayChange, todayIso, serverSnapshot);
}

/**
 * Today changes once a day, and the moment that matters is a tab coming back
 * after midnight — which is exactly when these events fire. `todayIso` returns
 * the same string until the day actually turns, so a re-read that finds no new
 * day costs no render.
 */
function subscribeToDayChange(onDayChange: () => void) {
  window.addEventListener("visibilitychange", onDayChange);
  window.addEventListener("focus", onDayChange);

  return () => {
    window.removeEventListener("visibilitychange", onDayChange);
    window.removeEventListener("focus", onDayChange);
  };
}

const serverSnapshot = () => null;
