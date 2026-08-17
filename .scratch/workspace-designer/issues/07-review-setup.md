# 07 — Review what I'm about to rent

**What to build:** A screen that answers three questions at once: what exactly am I renting, when does it arrive, and what does it cost.

It shows the room the user designed, then every Product in it with image, name, quantity, rate, and line total, then the delivery Area and date, the Cycle, the Duration and the resulting end date, then the full breakdown — setup subtotal, duration, delivery fee, total.

Getting back to the builder costs nothing and loses nothing.

Opening this screen directly, without having built anything, shows the starter Workspace. That is the specified fallback, not a broken state.

**Blocked by:** 05

**Status:** ready-for-agent

- [ ] Every Product in the Workspace is listed with the correct quantity
- [ ] A visual snapshot of the room appears
- [ ] Area, delivery date, Cycle, and Duration are all shown
- [ ] The breakdown separates setup subtotal, duration, and delivery fee
- [ ] The total equals the Setup rate times the Duration plus delivery, and nothing else
- [ ] Returning to the builder preserves the Workspace exactly
- [ ] No payment fields appear anywhere
- [ ] Opening the screen cold shows the starter Workspace rather than an error
