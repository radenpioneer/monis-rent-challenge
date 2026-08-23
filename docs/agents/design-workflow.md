# Design workflow: `impeccable`

Any ticket that changes what the user sees runs the `impeccable` skill. A ticket confined to `src/workspace/` or `src/pricing/` skips it. Authority over the documents named here is set by [ADR-0002](../adr/0002-document-authority-and-the-design-workflow.md).

## Per ticket

1. **`shape`** — plan the UX and UI against the ticket's checklist. Planning only, before any code.
2. **Build**, driving `/tdd` as usual.
3. **`polish`** — once the checklist is green, before `/code-review`.

A ticket names a different sub-command with a `Design:` line near its `Blocked by:` line; that line replaces the default it corresponds to.

Every `/implement` starts from an empty context, so `impeccable`'s own setup step runs again on every UI ticket.

## Bounded passes

`impeccable` verifies in bounded passes rather than a loop: build fully, inspect once with desktop and mobile together, fix everything that round shows in one batch, confirm with at most one more round, then stop. Findings from the design detector hook join that same batch at the end of the ticket rather than being chased per edit.

## Changing the design system

`DESIGN.md` and `PRODUCT.md` are `impeccable` artifacts paired with `.impeccable/design.json`. Grow them by running `impeccable`, and use `$impeccable doctor` to report drift between them.

`DESIGN.md` is deliberately incomplete wherever a ticket may be cut. Night mode has no palette until ticket 15 builds one, and the ticket that needs a token is the ticket that adds it.
