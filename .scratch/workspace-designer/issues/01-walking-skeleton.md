# 01 — Walking skeleton: the starter Workspace is visible

**What to build:** Someone opens the app and sees a room. Not a loading state, not an empty canvas — a stylized 2.5D workspace already containing an Electrical Adjustable Desk and an Ergonomic Office Chair, drawn from the Workspace state rather than hardcoded into the picture. This is the first thing a reviewer sees and the thing every later ticket adds to.

The route structure for the whole product goes in here, with the Workspace shared across all of it so nothing later has to retrofit that. Create-next-app boilerplate goes out: the default page, the unused sample assets, and the automatic dark-mode block, since the product has one light theme and Night mode is a scene concern.

**Blocked by:** None — can start immediately.

**Status:** ready-for-agent

- [x] Opening the app shows a room containing a desk and a chair, with no interaction required
- [x] Both objects are drawn from Workspace state, so changing that state changes the picture
- [x] Positions are normalized 0..1 and resolved through a Zone, per ADR-0001
- [x] The desktop Zone and floor Zone are both defined, even though nothing moves yet
- [x] Objects render upright, not skewed by the Zone's perspective
- [x] The scene is the visually dominant element and scales with its container without distorting positions
- [x] The root layout is fully server-rendered and contains no client boundary
- [x] No create-next-app boilerplate or dark-mode block remains

## Comments

**Implemented.** Routes are `/`, `/review`, `/success` under a `(designer)` route group whose
layout holds the `WorkspaceProvider`; the root layout stays server-only. Review and success are
deliberately thin — they exist so the Workspace is shared from the start, and tickets 07 and 08
fill them in.

Verified by TypeScript, ESLint, `next build` (all three routes prerender static), and by eye in
the browser: moving `STARTER_WORKSPACE.chairPosition` to `{ x: 0.15, y: 0.85 }` moved the chair to
`translate(253 704)`, exactly `project(FLOOR_ZONE, …)`, still drawn upright. Shrinking the scene's
container to 360px held the viewBox ratio at exactly 1.500 with no position drift.

### Notes for later tickets

- **Ticket 06 (drag) needs depth ordering.** Floor objects are painted before the desk, which is
  correct for the starter chair — its floor contact is scene y≈528.8, behind the desk's feet at
  y≈599–649. But the floor Zone runs to y=740, so any Position past roughly `y = 0.41` puts the
  chair *in front of* the desk while still being painted behind it. Sort floor objects against the
  desk's floor footprint before the chair becomes draggable.
- **Ticket 02 owns a decision:** the desk asset imports `DESKTOP_ZONE` so its surface traces the
  Zone exactly and the two cannot drift. The second desk must do the same, or the invariant is
  only half-held.
- **Ticket 04 adds pricing.** `Product` deliberately carries no `pricing` field yet — the demo
  values and the "monthly beats four weekly" rule belong to that slice.
- `Position` (normalized) and `Point` (scene units) are structurally identical, so the compiler
  cannot catch one being passed where the other is meant. Two call sites today; worth branding if
  drag multiplies them.
