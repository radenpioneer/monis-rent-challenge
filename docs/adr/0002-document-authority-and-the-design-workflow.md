# Documents carry named authority, and UI work routes through `impeccable`

Five documents now claim to bind this project — `PRD.md`, `PRODUCT.md`, `DESIGN.md`, `CONTEXT.md`, and the ADRs — and they already contradict each other in at least one place. Each document is given an exclusive domain and a slot in a single authority order, and every override of `PRD.md` is recorded as an amendment in `PRD.md` itself rather than left implicit. Alongside that, design work stops being something a ticket improvises: any ticket that changes what the user sees runs the `impeccable` skill, at fixed points in the build.

## Authority

| Document | Domain |
| --- | --- |
| `CONTEXT.md` | Domain language. Binding on code identifiers and UI copy alike. |
| `docs/adr/` | Architecture. The decisions expensive to reverse. |
| `PRD.md` | The plan: scope, feature set, cut order, acceptance criteria, edge cases. The baseline, amendable. |
| `PRODUCT.md` | Brand and design truth: *Brand Commitments*, *Evidence on Hand*, *Positioning*, *Product Principles*. |
| `DESIGN.md` | The visual world: palette, type, layout, elevation, components, named rules. |
| `.scratch/workspace-designer/spec.md` | The work plan derived from the above. |
| `.scratch/workspace-designer/issues/` | The work itself. |

Where two documents overlap, the higher row wins. `PRD.md` is the exception that gives this ADR its point: it is a baseline rather than a ceiling, so a lower document can override it — but only through a recorded amendment.

**An amendment is an entry in the `## Amendments` table at the head of `PRD.md`**, naming the superseded section, the superseding document, and the substance. The body of `PRD.md` stays untouched, because it is the record of the original plan and the README owes a reviewer the account of what changed and why.

`PRODUCT.md` sits in two halves. It is authoritative on brand and evidence. Its *Capabilities and Constraints*, *Hard product rules*, and *Explicitly out of scope* sections mirror `PRD.md` and hold no independent authority — when a product rule changes, `PRD.md` is amended first and the mirror is refreshed by re-running `impeccable init`.

`CONTEXT.md` stays a domain glossary with no visual vocabulary in it. `DESIGN.md`'s named things — Ink, Ground, the Concept badge, the Quiet Frame Rule — are the *embodiment* of domain terms, not new ones, and they are bound by `CONTEXT.md`'s `_Avoid_` lists.

## Considered Options

**No written order — the more specific document wins.** Rejected because it is what produced the conflict this ADR resolves. "More specific" is a judgement call, so each session makes it differently and the codebase ends up holding two answers.

**Freeze `PRD.md` as a historical brief and promote `PRODUCT.md` to living product truth.** Rejected: `PRODUCT.md` is `impeccable`'s input file and is shaped for brand and design work, so it is a poor home for the acceptance criteria and edge-case list that ticket 16 walks by hand. Splitting the plan across two documents costs more than amending one.

**Leave design work inline.** Rejected: it is what shipped `DESIGN.md` as an afterthought to two already-closed tickets, and it makes visual quality depend on which session picks up the ticket.

## Consequences

- Resolving a conflict is a two-part act: apply the winning document, *and* edit the losing one. A conflict settled quietly inside a ticket is a defect, because it leaves the next ticket to settle it again.
- `DESIGN.md` and `PRODUCT.md` are `impeccable` artifacts paired with `.impeccable/design.json`. Editing them by hand drifts them from the sidecar; they are changed by running `impeccable`, and `$impeccable doctor` reports the drift.
- UI tickets cost more per ticket. The `impeccable` steps are real work, and under an 8-hour budget that pressure lands on the cut order in `PRD.md` §28 — scope is cut before quality, which is the trade this project already accepted.
- `DESIGN.md` is deliberately incomplete. It describes no night palette, because ticket 15 is first on the cut list; the ticket that builds night mode is the ticket that grows the palette.
