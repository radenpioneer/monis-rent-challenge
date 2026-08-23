# 11 — The whole flow without a pointer

**What to build:** A keyboard-only user builds a workspace, configures the rental, reviews it, and confirms it — start to finish, no mouse, no touch. Dragging is never the only route to a valid Workspace.

This is a P0 requirement, not polish. A configurator that can only be operated by dragging is not usable.

Scene objects are vector groups, so they do not inherit button semantics and need explicit roles, focus handling, and accessible names — ADR-0001 recorded this as the known cost of the SVG scene.

Selected states must survive a greyscale screenshot, so colour is never the only signal.

**Blocked by:** 08

**Status:** done

- [x] The complete flow — build, configure, review, confirm — is finishable by keyboard alone
- [x] Every interactive element has a meaningful accessible name
- [x] Focus is always visible and never trapped
- [x] Selected states are legible in greyscale
- [x] Contrast is sufficient throughout
- [x] Focusable scene objects announce what they are
