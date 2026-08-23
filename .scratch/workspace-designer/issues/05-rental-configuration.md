# 05 — Say where, when, and for how long

**What to build:** The user turns a Workspace into a Rental. They pick a Bali delivery Area from a short list of the places people actually stay, pick a delivery date, choose weekly or monthly, and choose how many of those they need. The price responds to all of it.

Past dates cannot be selected. Same-day is allowed as a stated simplification. No address typing, no autocomplete, no map, no availability check — there is nothing behind this to check against.

Switching between weekly and monthly relabels the duration control and drops a duration that no longer makes sense back to one, so the user is never shown a total computed from something they didn't mean.

**Blocked by:** 04

**Status:** done

- [x] An Area can be chosen from the five Bali destinations, each with a mocked delivery fee
- [x] A delivery date can be chosen and past dates are unselectable
- [x] Weekly and monthly can be toggled, and the displayed rate follows
- [x] Duration runs 1–12 and its label follows the Cycle
- [x] Switching Cycle with an out-of-range Duration resets it to 1
- [x] Every control is keyboard reachable and has a visible label

## Comments

**Duration ranges coincide, so the reset cannot fire.** PRD §15 puts both Cycles at 1–12, which leaves no Duration that one Cycle can express and the other cannot. The rule is implemented against a per-Cycle range in `DURATION_RANGE` rather than a shared one, so it is stated and correct; today nothing reaches it. Narrowing one range to make the guard observable would have meant inventing a business constraint the PRD does not ask for, which needs an amendment and buys nothing.

**The delivery date is nullable.** The three routes are prerendered, so a date resolved while rendering is the build's date — in production, a date in the past. `Rental.deliveryDate` is therefore `null` for "as soon as possible" and `deliveryDateOf` resolves that against the visitor's own clock, read through `useSyncExternalStore` with a null server snapshot. This diverges from the PRD's suggested state model, which types it as a plain string. It also means a Rental left open overnight quotes today rather than yesterday.

**The scene column now sticks on the wide layout.** A third rail panel made the rail taller than the viewport, which would have scrolled the room off screen and broken the Whole-Room Rule. `DESIGN.md` grew the rule's implementation consequence, plus the two components this ticket added — the Choice Pill and the Field Control.

**Deferred to `10` (`adapt`).** Touch targets in the rail sit at 34–40px, matching the chips already shipped rather than the 48px a phone wants; raising them is one pass across every control, not a change to this panel alone. Mobile was verified down to 520px only — headless Chrome on this machine refuses viewports below roughly 500px, and renders a wider layout while cropping the capture, which reads as overflow that is not there.
