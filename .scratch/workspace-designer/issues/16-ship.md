# 16 — Ship it

**What to build:** A public URL a reviewer can open cold, with no setup, and understand in under a minute.

This is also where the whole app gets one design pass. Tickets `01` and `02` shipped before the `impeccable` workflow existed and are not reopened — a single `polish` across every screen covers them, and it is the natural place for a product-level pass anyway, since no earlier ticket ever sees the flow end to end.

Every edge case in the PRD gets walked by hand, not assumed: a third monitor, a Product removed while placed, a Cycle change with a stale duration, a past delivery date, missing and corrupt saved data, a failed asset, and a scene made deliberately messy.

The README carries the argument. Not a feature list — the case that the workspace itself is the shopping interface, that starting from a usable setup beats a blank canvas, that constrained dragging is a deliberate refusal to become floor-planning software, and that checkout is simulated because transaction infrastructure was never the point. Plus the trade-offs taken and what more time would buy.

Once it is deployed and green, the Cache Components flag may be trialled — it is one line and five minutes, and reverts cleanly if the build or navigation misbehaves.

**Blocked by:** 09, 10, 11

**Design:** `polish`, across every screen rather than one target

**Status:** ready-for-agent

- [ ] Every PRD edge case walked by hand, reading the PRD's `## Amendments` table first
- [ ] Every PRD acceptance criterion walked by hand, as amended
- [ ] TypeScript and lint are clean
- [ ] The public URL works cold in a private window with no setup
- [ ] Source is on GitHub and `desent-bot` has read collaborator access
- [ ] The README covers approach, product decisions, design decisions, technical decisions, trade-offs, and next steps
- [ ] The README's account of what changed during the build is drawn from the PRD's `## Amendments` table
- [ ] A stranger reaches the simulated confirmation in under a minute without explanation
