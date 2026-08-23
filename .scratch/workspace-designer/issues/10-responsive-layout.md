# 10 — Usable on a phone

**What to build:** Someone on a phone in a Canggu café can build a complete workspace and reach the confirmation. Not a shrunken desktop — a layout that assumes a thumb.

Most of this layout is already decided. [DESIGN.md](../../../DESIGN.md) fixes the split at `lg` (1024px), the rail at a `24rem` cap, the container widths, and the Whole-Room Rule that sizes the scene from leftover viewport height. Below `lg` the rail drops beneath the scene — not tabs, not a bottom sheet, which supersedes PRD §20. This ticket realises that behaviour rather than inventing one.

What DESIGN.md does **not** yet describe is the pinned footer total, and that is the design work here: the running total has to stay visible without scrolling while the scene keeps its prominence, and the two are competing for the same vertical space on a 375px screen. `adapt` is what grows DESIGN.md's mobile specification to cover it.

Tapping is the primary way to add things; dragging keeps working where it can, but the product must never require precise touch dragging to produce a valid Workspace. Desktop remains the primary target for visual polish.

Any motion that slides or transforms an element animates a wrapping element rather than the scene's vector content, since browsers largely do not hardware-accelerate transforms on SVG.

**Blocked by:** 07

**Design:** `adapt`, in place of `shape`

**Status:** done

- [x] The full flow is comfortable on desktop
- [x] The full flow is usable at 375px width
- [x] A complete Workspace can be built on a phone without dragging anything
- [x] The scene stays visually prominent on mobile
- [x] The running total is visible without scrolling on mobile
- [x] The rail drops beneath the scene below `lg`, per DESIGN.md
- [x] DESIGN.md gains the mobile specification it was missing, written by `adapt` rather than by hand

## Comments

**Implemented.** Below `lg`, the rail remains beneath the 3:2 scene and the
mobile footer keeps a read-only Setup rate in view. Tapping a Product updates
that rate without dragging. Category, choice, field, and stepper controls grow
to 44px touch targets below `lg`; desktop sizing is unchanged. Verified in a
375px browser viewport and at desktop width.
