# 09 — Start over without starting from nothing

**What to build:** A user who has made a mess of the room can recover. Reset returns the Electrical Adjustable Desk, the Ergonomic Office Chair, no accessories, and the default Rental configuration — a working starter Workspace, never an empty room, because an empty room is a worse place to be than a messy one.

Because Reset discards arranging work the user did by hand, it confirms before it fires.

It stays reachable at all times. It is the reason experimenting with the scene carries no risk.

**Blocked by:** 05

**Status:** ready-for-agent

- [x] Reset is reachable from the builder at any point
- [x] It confirms before discarding anything
- [x] It restores the starter Workspace, not an empty room
- [x] It restores the default Rental configuration too

## Comments

**Implemented.** Reset now stays in the builder's sticky setup panel and opens a native
confirmation dialog. Confirming dispatches the existing `reset` Rental action, which restores
the starter Workspace and default Rental configuration; cancelling and Escape preserve the
current composition.
