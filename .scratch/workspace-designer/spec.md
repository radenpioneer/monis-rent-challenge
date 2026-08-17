# Monis Workspace Designer

Status: ready-for-agent

Source: [PRD.md](../../PRD.md), sharpened through a grilling session, and amended since — read its `## Amendments` table before treating any PRD section as current.

Five documents bind this plan, and [ADR-0002](../../docs/adr/0002-document-authority-and-the-design-workflow.md) sets which one wins where they overlap. Vocabulary is [CONTEXT.md](../../CONTEXT.md). Scene architecture is [ADR-0001](../../docs/adr/0001-svg-scene-with-projected-zones.md). Brand and evidence are [PRODUCT.md](../../PRODUCT.md). The visual world is [DESIGN.md](../../DESIGN.md).

## Problem Statement

Someone has just landed in Bali for a few months and has nowhere to work. They need a desk, a chair, probably a monitor, and the small things that make a day at a desk bearable — within days, not weeks.

What they get instead is a catalog. Desks on one page, chairs on another, monitors on a third. To find out whether a setup works, they have to hold it in their head: does this chair go with that desk, do two monitors fit, what does the whole thing cost for the eleven weeks they're staying. Nothing on screen shows them the thing they actually want, which is a room they can work in.

Price makes it worse. Rental pricing is per-cycle and per-item, so the only way to learn what a setup costs is to assemble it in a cart and reach checkout. By then they have already done the work of choosing, and the number can still surprise them.

The result is a customer who either over-researches or gives up and rents too little.

## Solution

Turn the catalog inside out: make the workspace itself the interface.

The app opens on a room that already contains a usable Workspace — an Electrical Adjustable Desk and an Ergonomic Office Chair — so there is no blank canvas to fill. From there the user swaps the desk, swaps the chair, adds monitors and accessories, and drags things around the desk surface until the room looks like somewhere they'd work. The scene updates as they go.

The price updates with it. The Setup rate sits on screen the entire time, so cost is a thing they steer by rather than a thing they discover at the end.

Freedom is deliberately bounded. Chairs stay on the floor, monitors stay on the desk, the desk itself is swapped rather than dragged. The product should feel flexible without becoming floor-planning software — a user cannot produce a nonsensical room, so they can experiment without care.

When they're ready, they set the delivery Area, a delivery date, a weekly or monthly Cycle, and a Duration, then review a complete, itemised summary and confirm a simulated rental. All pricing is demo pricing, labelled as such throughout.

## User Stories

### Arriving and orienting

1. As a new arrival in Bali, I want the app to open on a workspace that already works, so that I can start adjusting instead of starting from nothing.
2. As a new arrival, I want to understand within seconds that I am designing a rentable workspace, so that I don't have to be told what the product is.
3. As someone unfamiliar with Monis, I want the room to look like a real place to work rather than a diagram, so that I can judge whether I'd want it.
4. As a browser of the product, I want the scene to dominate the screen, so that I understand it is the thing I am meant to interact with.

### Choosing furniture

5. As a workspace renter, I want to choose between two adjustable desks, so that I can pick the one that suits how I work.
6. As a workspace renter, I want to choose between two chairs, so that I am not forced into a single option.
7. As a workspace renter, I want a desk and a chair to always be selected, so that I can never accidentally build a workspace with nothing to sit at.
8. As a workspace renter, I want swapping the desk to keep everything else exactly where it was, so that I can compare desks without rebuilding my setup each time.
9. As a workspace renter, I want to see which Product is currently selected, so that I know what I'm comparing against.
10. As a careful shopper, I want concept Products clearly labelled as not currently rentable, so that I am not misled about what Monis actually offers.

### Adding equipment

11. As a remote worker, I want to add up to two monitors, so that I can build the multi-screen setup I actually work on.
12. As a remote worker, I want to mix different monitor models, so that I can pair a large primary with a smaller secondary.
13. As a workspace renter, I want to be told why a third monitor was refused, so that the limit feels like a rule rather than a bug.
14. As a workspace renter, I want to add a lamp, keyboard, mouse, laptop stand, or plant, so that the setup covers a whole working day.
15. As a workspace renter, I want to remove anything I've added, so that I can undo a decision without resetting.
16. As a workspace renter, I want each added item to land somewhere sensible, so that my desk doesn't become a pile in one corner.
17. As a browser, I want each Product card to tell me what the thing is and what it costs, without a specification sheet, so that I can decide quickly.
18. As a browser, I want Products grouped into categories, so that I can find the kind of thing I'm looking for.

### Arranging the room

19. As a workspace renter, I want to drag a monitor across the desk, so that the scene matches the setup I have in mind.
20. As a workspace renter, I want to move the chair around the floor, so that the room feels like mine.
21. As a workspace renter, I want objects to stay where physics says they belong, so that I cannot accidentally produce an absurd room.
22. As a workspace renter, I want dragging to feel immediate, so that the scene responds at the speed of my hand.
23. As a workspace renter, I want a messy room to be recoverable, so that experimenting carries no risk.
24. As a workspace renter, I want Reset to return me to a working starter setup rather than an empty room, so that recovering never means starting over.
25. As a workspace renter, I want Reset to confirm before it fires, so that I don't lose arrangement work by misclicking.

### Understanding cost

26. As a cost-conscious renter, I want the Setup rate on screen at all times, so that I never have to reach checkout to learn what something costs.
27. As a cost-conscious renter, I want the price to change the instant I add or remove something, so that I can feel the cost of each decision.
28. As a longer-term visitor, I want to switch between weekly and monthly pricing, so that I can see whether staying longer is better value.
29. As a longer-term visitor, I want monthly pricing to actually beat four weeks, so that the longer commitment is worth making.
30. As a prospective customer, I want prices marked as demo pricing, so that I don't mistake them for a real Monis quote.

### Configuring the rental

31. As a customer in Bali, I want to choose my delivery area from the places people actually stay, so that I don't have to type an address.
32. As a customer, I want to see the delivery fee for my area, so that the total holds no surprises.
33. As a customer with a move-in date, I want to pick a delivery date, so that the setup arrives when I need it.
34. As a customer, I want past dates blocked, so that I cannot configure something impossible.
35. As a customer, I want to choose how many weeks or months I need, so that the total reflects my actual stay.
36. As a customer, I want a nonsensical duration to be corrected when I switch cycle, so that I never see a total computed from something I didn't mean.

### Reviewing and confirming

37. As a customer about to commit, I want one screen answering what I'm renting, when it arrives, and what it costs, so that I can commit with confidence.
38. As a customer, I want to see the room I designed on the review screen, so that I recognise the thing I'm confirming.
39. As a customer, I want every item listed with its quantity, rate, and line total, so that I can check the maths myself.
40. As a customer, I want the breakdown to show setup subtotal, duration, and delivery separately, so that I understand how the total was built.
41. As a customer, I want to go back and change something, so that reviewing doesn't trap me.
42. As a customer, I want confirming to be one clear action with no payment details, so that trying the product costs me nothing.
43. As a customer, I want a confirmation that restates the date, area, duration, and total, so that I know what was recorded.
44. As a customer, I want the confirmation to say plainly that no real booking happened, so that I am never misled.
45. As a customer, I want to return to my workspace after confirming, so that the experience doesn't dead-end.

### Access and device

46. As a mobile user, I want to build a complete workspace by tapping, so that I don't have to drag precisely on a small screen.
47. As a mobile user, I want the scene to stay prominent, so that the product still feels like what it is on my phone.
48. As a mobile user, I want the running total always visible, so that I don't have to scroll to check cost.
49. As a keyboard-only user, I want to complete the entire flow without a pointer, so that the product is usable at all.
50. As a keyboard user, I want to nudge a selected object with arrow keys, so that arranging isn't gated behind dragging.
51. As a colour-blind user, I want selected state signalled by more than colour, so that I can tell what I've chosen.
52. As a screen reader user, I want every control to have a meaningful name, so that I know what I'm activating.

### Returning and completing

53. As a returning visitor, I want my workspace to still be there after a reload, so that I don't rebuild it every visit.
54. As a returning visitor, I want a corrupted or missing saved workspace to quietly become the starter workspace, so that I never face an error I cannot fix.
55. As an undecided shopper, I want one contextual suggestion for completing my setup, so that I don't forget something obvious.
56. As a shopper, I want at most one suggestion at a time, so that helpfulness doesn't turn into pressure.
57. As a night worker, I want to see the room in evening light, so that I can imagine working in it after dark.

### Evaluating the submission

58. As a reviewer opening the link cold, I want to reach a simulated confirmation within a minute without explanation, so that I can judge the product on its own.
59. As a reviewer, I want each feature to read as an answer to a user problem, so that I can see product thinking rather than technique.
60. As a reviewer, I want the README to state the approach, the trade-offs, and what more time would buy, so that I can see the reasoning behind the build.

## Implementation Decisions

### Scene

The scene is one inline SVG with a single `viewBox` — not positioned DOM elements over a background, and not canvas. Recorded with its rejected alternatives in ADR-0001.

Positions are normalized `{ x, y }` in 0..1. A Zone is defined by four corner points in scene coordinates and exposes a `project` / `unproject` pair. Objects are translated to the projected point and drawn upright; the Zone transform is never applied to an object's own group, or monitors and lamps would visibly skew.

Two Zones exist: the desktop Zone and the floor Zone. Because desk size variants are out of PRD scope, **the desktop Zone is constant across both desks**. This is the mechanism that makes "swapping the desk preserves the setup" free rather than a clamping exercise; the clamp remains only as a defensive fallback.

Product assets are hand-authored SVG components, one per Product, resolved through a registry keyed by Product id. The same component serves both the catalog card and the scene, so a Product cannot look like two different things in two places. A failed or unknown asset degrades to a labelled placeholder. Coordinates carry one decimal place.

### State

A single `useReducer` with domain-verb actions: `swapDesk`, `swapChair`, `addProduct`, `removeProduct`, `moveProduct`, `setArea`, `setDeliveryDate`, `setCycle`, `setDuration`, `reset`, `restore`.

Every product rule lives in the reducer, never in a click handler — the monitor cap, the always-one-desk invariant, position preservation across desk swap, position removal on product removal, and the duration reset when the Cycle changes. A refused action returns unchanged state plus a reason the UI renders, so the limit is stated once and displayed anywhere.

The monitor cap is **two across the whole monitor Category**, with mixed models permitted. The PRD offered same-model-only as a simplification; it buys nothing, because the cap is computed over the Category either way.

No global state library. The PRD rules one out and React state is sufficient.

### Modules

Five: `catalog` (static Products and their SVG components), `workspace` (types, reducer, Zones, constraints, persistence, recommendation rules), `pricing` (Quote), `scene` (room, projection, drag, scene objects), `ui` (panels, cards, controls, breakdown).

The binding rule: **`workspace` and `pricing` import nothing from React**, and nothing in them imports `scene` or `ui`. This is what makes the product rules readable and exercisable without running the app, and it is the seam described under Testing Decisions.

### Rendering

Three routes — builder, review, success — sharing one Workspace through a provider placed in a route group layout, not the root layout. The root layout stays fully server-rendered; Next's own guidance is to render providers as deep as the tree allows. Navigating between routes therefore preserves the Workspace without any additional machinery.

`cacheComponents` stays off. It would bring PPR, which buys nothing for three fully static routes with zero data fetching, and React `<Activity>` state preservation, which is redundant because the Workspace already lives above all three routes. The only thing given up is trivial local UI state on back-navigation. It is a one-line flag and may be trialled after deployment.

### Performance

`reactCompiler` is already enabled, so manual `useMemo` and `useCallback` are not written.

Three constraints bind implementation:

- **A drag must not re-render per frame.** During a drag the dragged group's `transform` is written directly through a ref; the reducer is dispatched once, on pointer release. React Compiler removes memo boilerplate, not renders.
- **Transform-based animation lives outside the SVG.** Browsers largely do not hardware-accelerate CSS transforms on SVG elements, so panel slides and the day/night crossfade animate a wrapping element. Motion inside the scene is limited to opacity and attribute changes.
- **Authored SVG uses one-decimal precision.**

### Pricing

Prices are USD, matching the PRD's own worked example, and every Product's monthly rate beats four weekly cycles. Formatting is centralised in `pricing` so the live Setup rate and the review breakdown cannot drift apart.

The Setup rate is derivable from a Workspace and a Cycle alone, with no delivery or Duration involved, because it is the figure shown live in the builder. The full Quote adds duration and the Area's mocked delivery fee. Nothing else — no tax, deposit, coupon, insurance, or processing.

### Persistence

The Rental is persisted under a versioned key, with reads and writes wrapped in `try/catch` because storage throws in private browsing and on quota exhaustion. Missing data, malformed JSON, or a shape that fails validation all fall back silently to the starter Workspace.

Restore happens after mount, inside a transition. The accepted consequence: a returning user sees one frame of the starter Workspace before their own appears. The alternative — withholding the scene until mount — gives every first-time visitor a blank first paint, which is worse for the reviewer this product exists to convince. The flicker is chosen deliberately.

### Interface

The visual world is fixed by [DESIGN.md](../../DESIGN.md) — palette, type, layout, elevation, components, and its named rules. What follows is only the part that constrains implementation.

One light theme. The create-next-app `prefers-color-scheme` dark block is removed: Night mode is a property of the scene, not of the application chrome, and keeping both would produce four combinations to design and three of them bad. Consistent with this, DESIGN.md's two palettes never mix — every saturated colour belongs to the room, and the chrome holds ink, three papers, and a hairline.

Desktop is the primary visual target, with the scene carrying the most weight. Below `lg` (1024px) the catalog rail drops beneath the scene rather than becoming tabs or a bottom sheet — this supersedes PRD §20, recorded in the PRD's `## Amendments` table. The scene stays prominent, the running total pins to the footer, and tapping is the primary interaction; dragging is supported but never required.

## Testing Decisions

**There is no test framework.** This is a deliberate scope decision: the submission is evaluated on product thinking, and test infrastructure would consume hours that the PRD's own cut list says belong to the core interaction.

That decision does not excuse untestable code, so the seams are still built as if tests existed:

**Seam 1 — `workspace`.** The reducer is a pure function from state and action to state. Every product rule is reachable by calling it directly: refusing a third monitor, preserving positions across a desk swap, resetting duration on a cycle change, dropping a position when its Product is removed, and returning the starter Workspace on reset. The recommendation rule is a pure function of the Workspace and belongs to the same seam.

**Seam 2 — `pricing`.** `quote(rental)` and `setupRate(workspace, cycle)` are pure functions returning plain data.

Two seams rather than the ideal one, because pricing is a derivation over the Workspace while the reducer owns state. Merging them would teach the reducer about money for no benefit.

Nothing below these seams is a candidate for testing. Zone projection is geometry verified by eye in the running scene; drag is pointer behaviour; the UI is layout. A good test here would assert external behaviour — "adding a third monitor changes nothing and reports a reason" — never that a particular action was dispatched or a particular function called.

There is no prior art in the codebase; this is a fresh Next.js install with no tests of any kind.

Verification in practice is: TypeScript, ESLint, the PRD's own edge-case list walked by hand, the PRD acceptance checklist walked by hand, and the running app in a browser. If written evidence of the pricing rules is wanted in the README, a thin Vitest file over Seam 2 is the cheapest thing to add and does not disturb this decision.

## Design Decisions

Design is not improvised per ticket. Any ticket that changes what the user sees runs the `impeccable` skill — `shape` before writing code, `polish` once the checklist is green and before `/code-review`. Tickets confined to `workspace` or `pricing` skip it entirely. The runbook is [docs/agents/design-workflow.md](../../docs/agents/design-workflow.md); the reasoning is in [ADR-0002](../../docs/adr/0002-document-authority-and-the-design-workflow.md).

A ticket that wants a different sub-command says so in a `Design:` line. Three do: `10` runs `adapt`, `15` runs `colorize`, `16` runs `polish` across the whole app.

The design detector hook is on, so UI edits surface findings as they happen. They are handled in one batch at the end of the ticket, never chased per edit — `impeccable` verifies in bounded passes, and an open-ended polish loop is exactly what the 8-hour budget cannot afford.

`DESIGN.md` is deliberately incomplete where a ticket may be cut. It defines no night palette, because ticket 15 is first on the cut list and a palette for a feature that may never ship is the waste the cut order exists to prevent.

## Out of Scope

Everything the PRD excludes: authentication, accounts, any backend, any database, real booking, payments, Stripe, real Monis API integration, real inventory, live availability, address autocomplete, maps, arbitrary room layouts, collision physics, product dimension simulation, desk size variants, 3D, WebGL, a CMS, an admin UI, analytics, promo codes, deposits, tax, insurance, and returns.

Additionally dropped during grilling:

- **Shareable configuration URL** (PRD P2). It adds a serialization surface that nothing in the evaluation rewards.
- **Photographic product imagery.** Real Monis photography would clash with the stylized 2.5D scene and carries licensing questions for a public submission.
- **A test framework**, as reasoned above.
- **`cacheComponents`**, until the app is deployed and green.

No collision system is built. Overlap is tolerated; sensible default positions, light snapping, and fixed layering are what keep the scene from looking broken.

## Further Notes

Work is split across sixteen tickets in `issues/`, each a vertical slice that is demoable on its own and each carrying its blocking edges. P0 is `01`–`11`. Accessibility (`11`) is P0, not polish, because the PRD lists it as such and because a configurator that can only be operated by dragging is not usable. P1 is `12`–`15`, cut in reverse order under time pressure per the PRD's own cut list. `16` is shipping and is not optional.

`01` through `04` are closed. The frontier is `05`.

Product assets are authored per slice rather than up front — each ticket draws only the Products it makes interactive. An earlier breakdown gathered all twelve into one ticket that gated the entire scene and whose cost was bounded by taste rather than logic; slicing vertically removes that gate. The residual risk is unchanged in kind but far smaller in blast radius: if a slice's assets run long, the honest lever is fewer accessories, not rougher drawings, since the PRD's cut order protects the visual preview above almost everything else.
