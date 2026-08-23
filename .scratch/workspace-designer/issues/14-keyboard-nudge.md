# 14 — Nudge objects with the arrow keys (P1)

**What to build:** A user who has focused an object in the scene moves it with the arrow keys, in small steps, bounded by the same Zone that bounds dragging.

This is the P1 half of the accessibility requirement: arranging stops being something only a pointer can do.

Nudging and dragging produce identical changes to the Workspace — two inputs, one path. If they diverge, one of them is wrong.

**Blocked by:** 06, 11

**Status:** done

- [x] Arrow keys move a focused scene object in small steps
- [x] Nudging respects the same Zone bounds as dragging
- [x] A nudge and a drag to the same place produce the same state
- [x] The moved object stays focused after moving
