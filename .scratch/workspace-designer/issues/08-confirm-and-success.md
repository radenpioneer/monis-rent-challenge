# 08 — Confirm the rental

**What to build:** One clear action ends the flow. "Rent this setup" leads to a confirmation that restates the delivery date, the Area, the Duration, and the total, so the user knows what was recorded.

It says plainly that nothing real happened: this is a demo experience and no booking has been placed. Nobody should leave thinking they have furniture arriving.

From there they can return to their workspace, which is still exactly as they left it. The flow does not dead-end.

No request is sent anywhere, because there is nothing to send it to.

**Blocked by:** 07

**Status:** ready-for-agent

- [ ] The confirmation restates delivery date, Area, Duration, and total
- [ ] The demo disclaimer is unmissable
- [ ] Returning to the builder preserves the Workspace
- [ ] No network request is issued
