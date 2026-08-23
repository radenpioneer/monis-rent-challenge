# 02 — Swap the desk and the chair

**What to build:** A user browsing the room can change what they're sitting at and sitting on. Categories appear, Product cards appear, and choosing a different desk or chair visibly changes the scene.

A desk and a chair are always selected — there is no state where the room has neither. That is why these are Swap actions, not Add and Remove.

The second chair is a concept Product and must be labelled as such, so nobody mistakes it for something Monis rents today.

**Blocked by:** 01

**Status:** done

- [x] Two desks and two chairs are browsable as cards showing image, name, a short descriptor, and price
- [x] Choosing a different desk visibly changes the scene
- [x] Choosing a different chair visibly changes the scene
- [x] The currently selected desk and chair are marked, and not by colour alone
- [x] Neither the desk nor the chair can be removed
- [x] The concept chair carries a visible label distinguishing it from real inventory
- [x] Cards carry no specification dumps

## Comments

**Implemented.** The catalog gains a Mechanical Adjustable Desk and a Compact Task Chair (concept),
each with a hand-authored asset. `CatalogPanel` groups Products into Category tabs — only
Categories holding a Product are offered, so tickets 03 and later add Products, not browsing code.

**"Neither can be removed" is held by the type system, not by a guard.** `Workspace.deskId` and
`chairId` are narrowed to `DeskId` / `ChairId`, derived from the catalog's own `category` literals.
There is no action that removes them and no id that could be stored in the wrong slot, so the
invariant is unrepresentable rather than defended.

**Selected state avoids colour alone**: `aria-pressed`, a tick glyph, and the words "In your
workspace", on top of the border and ring.

**Both desks draw through one `DeskSurface`** derived from `DESKTOP_ZONE` (01's note). The Zone and
the art cannot drift because there is only one copy of the geometry, and the card's `viewBox` is
derived from the same Zone rather than hand-guessed.

Verified by TypeScript, ESLint, `next build` (all routes still static), and by driving the running
app: clicking the second desk card moved the scene's `aria-label` to "Mechanical Adjustable Desk",
the Chairs tab plus the second chair card moved it to "Compact Task Chair", `aria-pressed` tracked
both, and the page contains zero remove controls.

### Scope pulled forward, deliberately

`Product.weeklyRate` and `pricing/format.ts` arrive here, against 01's note that pricing belongs to
04, because this ticket's own checklist requires a price on every card. Only the weekly rate and its
formatting land; the monthly rate, the "monthly beats four weekly" rule, and the Setup rate are
still 04's. The "Demo pricing" footnote comes with them — a price on screen without it would be
misleading.

### Notes for later tickets

- **Ticket 03** extends `offerFor` in `catalog-panel.tsx`: one place per Category deciding whether a
  Product is in the Workspace, what the card offers, and which action fires. Monitors and
  accessories are counted rather than swapped, so their branch returns Add or Remove and needs the
  refusal reason for the third monitor.
- **Ticket 07 (review)** must carry the concept label too. Today it lives only on the catalog card,
  so a user who selects the Compact Task Chair and walks to review sees no trace of it being a
  concept Product. The scene's `aria-label` has the same gap.
- **The floor Zone still paints behind the desk.** The compact chair's back is lower than the
  ergonomic chair's, so less of it clears the desk top at the starter Position. Nothing is broken,
  but it sharpens 01's note that ticket 06 owes floor objects a depth sort.
