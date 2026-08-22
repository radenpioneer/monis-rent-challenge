"use client";

import { useState } from "react";
import { WorkspaceScene } from "@/scene/workspace-scene";
import { CatalogPanel } from "./catalog-panel";
import { RentalPanel } from "./rental-panel";
import { useRental } from "./rental-provider";
import { MobileSetupRate, SetupRatePanel } from "./setup-rate-panel";

export function Builder() {
  const { rental, dispatch } = useRental();
  const [night, setNight] = useState(false);

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 pb-28 sm:px-6 lg:flex-row lg:items-start lg:pb-16">
      {/* The scene keeps its 3:2 aspect and stays whole on screen: its width is
          capped by the height left over once the header and caption are placed.
          It sticks on the wide layout because the rail is taller than the
          viewport once delivery is in it — the room is the interface, so it
          stays on screen while the rail scrolls under it. The cap is what makes
          this safe: a column sized from leftover height always fits. */}
      <div className="flex min-w-0 flex-1 flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
        <div className="relative mx-auto w-full max-w-[calc((100dvh-13rem)*1.5)] overflow-hidden rounded-3xl bg-surface shadow-[0_24px_60px_-28px_rgba(43,39,33,0.45)]">
          {/* Two wrappers crossfade rather than animating SVG transforms. The
              inactive scene cannot receive pointer or keyboard interaction. */}
          <div
            className={`transition-opacity duration-500 ease-out motion-reduce:transition-none ${night ? "pointer-events-none absolute inset-0 opacity-0" : "relative opacity-100"}`}
            aria-hidden={night || undefined}
          >
            <WorkspaceScene
              workspace={rental.workspace}
              interactive={!night}
              onMoveChair={(position) => dispatch({ type: "moveChair", position })}
              onMoveProduct={(productId, copy, position) =>
                dispatch({ type: "moveProduct", productId, copy, position })
              }
            />
          </div>
          <div
            className={`transition-opacity duration-500 ease-out motion-reduce:transition-none ${night ? "relative opacity-100" : "pointer-events-none absolute inset-0 opacity-0"}`}
            aria-hidden={!night || undefined}
          >
            <WorkspaceScene
              workspace={rental.workspace}
              interactive={night}
              night
              onMoveChair={(position) => dispatch({ type: "moveChair", position })}
              onMoveProduct={(productId, copy, position) =>
                dispatch({ type: "moveProduct", productId, copy, position })
              }
            />
          </div>
          <button
            type="button"
            aria-pressed={night}
            onClick={() => setNight((current) => !current)}
            className="absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 text-xs font-semibold text-ink transition-colors hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
              {night ? (
                <path d="M20.4 15.3A8.7 8.7 0 0 1 8.7 3.6 8.7 8.7 0 1 0 20.4 15.3Z" />
              ) : (
                <>
                  <circle cx="12" cy="12" r="3.6" />
                  <path d="M12 2.4v2.2M12 19.4v2.2M21.6 12h-2.2M4.6 12H2.4M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6M18.8 18.8l-1.6-1.6M6.8 6.8 5.2 5.2" />
                </>
              )}
            </svg>
            {night ? "Night view" : "Day view"}
          </button>
        </div>
        <p className="text-center text-sm text-ink-muted">
          Drag the chair or a monitor, or focus one and nudge it with the arrow keys.
        </p>
      </div>

      {/* The rail reads in the order the questions arrive: what the room costs,
          what is in it, then where it goes and for how long. The way out sits at
          the end of that sequence rather than beside the scene.
          The rate leads the rail and sticks there, so the price of the room is
          never something the user has to scroll back up to find — the rail is
          taller than the viewport now that delivery is in it. */}
      <div className="flex w-full flex-col gap-4 lg:max-w-sm">
        <div className="lg:sticky lg:top-6 lg:z-10">
          <SetupRatePanel />
        </div>
        <CatalogPanel />
        <RentalPanel />
      </div>

      {/* On a phone the full rate panel belongs in the rail, but its headline
          would disappear while someone compares Products. This small, visual
          duplicate keeps the changing figure in the thumb zone without adding
          another control or live announcement. */}
      <MobileSetupRate />
    </div>
  );
}
