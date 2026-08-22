# 08 — Confirm the rental

**What to build:** One clear action ends the flow. "Rent this setup" leads to a confirmation that restates the delivery date, the Area, the Duration, and the total, so the user knows what was recorded.

It says plainly that nothing real happened: this is a demo experience and no booking has been placed. Nobody should leave thinking they have furniture arriving.

From there they can return to their workspace, which is still exactly as they left it. The flow does not dead-end.

No request is sent anywhere, because there is nothing to send it to.

**Blocked by:** 07

**Status:** ready-for-agent

- [x] The confirmation restates delivery date, Area, Duration, and total
- [x] The demo disclaimer is unmissable
- [x] Returning to the builder preserves the Workspace
- [x] No network request is issued

## Comments

**Implemented.** The review action now leads to a confirmation that derives its details directly
from the shared Rental. It makes the simulated nature of the flow explicit and returns to the
preserved Workspace without creating a booking request.
