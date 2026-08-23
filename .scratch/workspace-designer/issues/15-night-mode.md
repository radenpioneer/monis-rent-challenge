# 15 — See the room after dark (P1)

**What to build:** A toggle between day and night, so someone who works evenings can picture the room they'd actually be working in.

At night the room darkens, monitors pick up a subtle glow, and the Smart LED Desk Lamp visibly lights the desk when it is present — which quietly makes the lamp worth renting.

This affects the scene only. Panels, cards, and controls do not change, because the product has one light interface and this is a property of the room, not of the application.

[DESIGN.md](../../../DESIGN.md) has no night palette, deliberately — designing one for the first item on the cut list is exactly the waste the cut order exists to prevent. So this ticket writes it, and it extends **The Room** palette only. The chrome tokens — Ink, Ground, Surface, Cream, Line — stay exactly as they are, and The Quiet Frame Rule still holds: every saturated colour belongs to the room.

The crossfade animates a wrapping element rather than the scene's vector content.

First item on the cut list. If time is short, this goes and nothing important is lost.

**Blocked by:** 03

**Design:** `colorize`, in place of `shape`

**Status:** done

- [x] A day/night toggle is available and obvious
- [x] Night darkens the room and adds a subtle monitor glow
- [x] The desk lamp visibly lights the desk at night when present, and its absence is noticeable
- [x] Panels, cards, and controls are unaffected
- [x] DESIGN.md gains a night palette under The Room, and the chrome tokens are untouched
