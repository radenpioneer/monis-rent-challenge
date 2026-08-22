# 13 — My workspace is still there when I come back (P1)

**What to build:** A returning visitor finds the desk, chair, accessories, positions, and rental configuration they left behind, instead of rebuilding from scratch.

Storage fails in real conditions — private browsing, exhausted quota, a user who cleared it, data written by an older version of the app. Every one of those quietly becomes the starter Workspace. The user never sees an error about storage, because there is nothing they could do about it.

Known and accepted trade-off: the server-rendered page shows the starter Workspace, so a returning user sees one frame of it before their own appears. The alternative — holding the scene back until the browser is ready — gives every first-time visitor a blank first paint, which is worse for the reviewer this product exists to convince.

Reset clears the saved workspace along with everything else.

**Blocked by:** 05

**Status:** ready-for-agent

- [x] Reloading restores desk, chair, added Products, their positions, and the Rental configuration
- [x] Corrupt saved data falls back to the starter Workspace with no visible error
- [x] Storage being unavailable entirely does not break the app
- [x] Saved data is versioned so a future shape change cannot poison it
- [x] Reset clears the saved workspace

## Comments

Persistence is browser-only and restores after mount in a transition, so the
server-rendered starter Workspace remains the intentional first frame. The
saved envelope is versioned and fully validated against catalog and Workspace
constraints before it can be restored; all storage and parse failures quietly
fall back to the starter Rental.
