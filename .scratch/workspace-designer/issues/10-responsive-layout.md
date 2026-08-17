# 10 — Usable on a phone

**What to build:** Someone on a phone in a Canggu café can build a complete workspace and reach the confirmation. Not a shrunken desktop — a layout that assumes a thumb.

The scene stays prominent, because it is still the product. The catalog moves into tabs or a bottom sheet. The running total pins to the footer so cost never requires scrolling. Tapping is the primary way to add things; dragging keeps working where it can, but the product must never require precise touch dragging to produce a valid Workspace.

Desktop remains the primary target for visual polish.

Any motion that slides or transforms an element animates a wrapping element rather than the scene's vector content, since browsers largely do not hardware-accelerate transforms on SVG.

**Blocked by:** 07

**Status:** ready-for-agent

- [ ] The full flow is comfortable on desktop
- [ ] The full flow is usable at 375px width
- [ ] A complete Workspace can be built on a phone without dragging anything
- [ ] The scene stays visually prominent on mobile
- [ ] The running total is visible without scrolling on mobile
