# 05 — Say where, when, and for how long

**What to build:** The user turns a Workspace into a Rental. They pick a Bali delivery Area from a short list of the places people actually stay, pick a delivery date, choose weekly or monthly, and choose how many of those they need. The price responds to all of it.

Past dates cannot be selected. Same-day is allowed as a stated simplification. No address typing, no autocomplete, no map, no availability check — there is nothing behind this to check against.

Switching between weekly and monthly relabels the duration control and drops a duration that no longer makes sense back to one, so the user is never shown a total computed from something they didn't mean.

**Blocked by:** 04

**Status:** ready-for-agent

- [ ] An Area can be chosen from the five Bali destinations, each with a mocked delivery fee
- [ ] A delivery date can be chosen and past dates are unselectable
- [ ] Weekly and monthly can be toggled, and the displayed rate follows
- [ ] Duration runs 1–12 and its label follows the Cycle
- [ ] Switching Cycle with an out-of-range Duration resets it to 1
- [ ] Every control is keyboard reachable and has a visible label
