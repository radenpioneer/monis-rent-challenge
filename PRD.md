# Product Requirements Document

## Monis Workspace Designer

**Status:** Ready for implementation
**Target build time:** ~8 hours, with limited overtime acceptable
**Primary evaluation goal:** Demonstrate strong **product thinking**
**Required stack:** Next.js, Tailwind CSS, deployed on Vercel

---

## Amendments

This document is the baseline plan, and its body is never edited. Where development has moved past it, the change is recorded here. Authority and the amendment rule are set by [ADR-0002](docs/adr/0002-document-authority-and-the-design-workflow.md).

| PRD section | Amended by | Substance |
| --- | --- | --- |
| §7 Product Catalog | `PRODUCT.md` → *Evidence on Hand* | Superseded. Every Product carries its real Monis name and descriptor verbatim — the lamp is the Smart LED Desk Lamp **1S**, the mouse the MX Master **S3**, the 34" is a **4K Gaming Monitor** rather than "Curved". Descriptions written for this project are never presented as Monis copy. |
| §20 Responsive Behavior | `DESIGN.md` → *Layout* | Superseded on one point. The catalog is a rail that drops beneath the scene below `lg` (1024px), not tabs or a bottom sheet. The sticky footer summary, tap-to-add, and scene prominence all stand. |
| Brand and visual identity | `PRODUCT.md` → *Brand Commitments*, and `DESIGN.md` | Extended. The PRD is silent on brand; the real monis.rent identity — Inter, near-black on near-white, hairline pills, one cream fill — is now binding, and the full visual world is fixed by `DESIGN.md`. |
| §27 8-Hour Implementation Strategy | [ADR-0002](docs/adr/0002-document-authority-and-the-design-workflow.md) | Extended. Tickets that change what the user sees carry `impeccable` steps. See `docs/agents/design-workflow.md`. |

---

## 1. Product Summary

Build a visual workspace configurator for Monis, a Bali-based equipment rental service.

Instead of browsing a conventional catalog, users compose a complete workspace visually: choose a desk and chair, add monitors and accessories, reposition items inside a room scene, configure their rental period, see the price update, and review the setup before simulating a rental.

The coding challenge explicitly requires at least two desk choices, two chair choices, accessories, a live visual preview, a setup summary, a public deployment, and source code on GitHub. Desent prioritizes a polished user-centric product over a feature-heavy implementation.

This implementation should feel like a **conceptual reimagination of Monis**, rather than a pixel-for-pixel extension of the existing website.

---

## 2. Product Goal

Help someone arriving in Bali answer three questions quickly:

1. **What workspace do I want?**
2. **What will it roughly look like?**
3. **What will it cost for the period I need it?**

The product should turn furniture rental from a catalog-browsing problem into a lightweight spatial design experience.

### Reviewer takeaway

> **“This candidate clearly understands product thinking.”**

Engineering sophistication and visual polish support this goal, but neither should overshadow it.

---

## 3. Primary User

### User profile

A remote worker, digital nomad, founder, freelancer, or similar customer temporarily living in Bali.

No narrow profession-specific assumptions are required.

### Core job to be done

> When I need a temporary workspace in Bali, I want to assemble a complete setup visually and understand its rental cost, so I can confidently rent everything I need without comparing products across many catalog pages.

### Example scenario

The user has recently arrived in Bali and needs a comfortable workspace within the next few days.

They care more about quickly getting a complete, sensible setup than researching every furniture specification independently.

---

## 4. Product Principles

### 4.1 Visual first

The workspace itself is the primary interface.

The product catalog supports the scene rather than dominating it.

### 4.2 Start useful, not empty

Users should see a viable starter workspace immediately.

Default:

* Electrical Adjustable Desk
* Ergonomic Office Chair
* No optional accessories

The user customizes from there.

### 4.3 Constrained freedom beats unrestricted freedom

Users can move objects, but objects behave according to real-world expectations.

Examples:

* chair belongs on the floor
* monitors belong on the desk
* lamps belong on the desk
* desk itself is swapped rather than arbitrarily repositioned

The app should feel flexible without becoming room-layout software.

### 4.4 Preserve user effort

Changing the desk or another primary item should not unnecessarily reset the rest of the workspace.

### 4.5 Help users complete a workspace

The configurator may recommend one contextually useful item based on the current setup.

It should assist rather than upsell aggressively.

### 4.6 Show meaningful pricing early

Rental cost should update while the workspace changes.

Users should not have to reach checkout before understanding cost.

---

# 5. Scope

## P0 — Must Ship

These define the product.

### Workspace builder

* Interactive visual workspace scene
* Starter setup
* 2 desk options
* 2 chair options
* Accessories
* Add/remove accessories
* Swap desk
* Swap chair
* Reposition supported items
* Live visual updates
* Live pricing

### Rental configuration

* Delivery area
* Delivery date
* Weekly/monthly rental cycle
* Rental duration
* Calculated rental total
* Mock delivery fee

### Checkout/review

* Visual setup summary
* Selected products
* Quantities
* Rental cycle
* Duration
* Delivery information
* Pricing breakdown
* Simulated Rent CTA
* Success state

### Platform

* Responsive UI
* Next.js
* Tailwind CSS
* Vercel deployment
* GitHub repository
* README write-up

---

## P1 — Ship If P0 Is Healthy

* Contextual product recommendation
* localStorage persistence
* Better mobile positioning controls
* Simple keyboard/nudge positioning
* Polished drag animations
* Improved object snapping
* Day/night workspace toggle

---

## P2 — Explicitly Disposable

Only build these if implementation finishes unusually early.

* Shareable configuration URL
* More products
* More contextual recommendations
* Advanced animation
* Additional visual room themes

---

# 6. Out of Scope

Do **not** spend challenge time implementing:

* authentication
* user accounts
* backend
* database
* actual booking
* payment processing
* Stripe
* real Monis API integration
* real inventory
* live availability
* real address autocomplete
* maps
* arbitrary room layouts
* sophisticated collision physics
* product dimension simulation
* desk size variants
* full 3D
* WebGL
* CMS
* administration UI
* analytics dashboard
* promo codes
* deposits
* tax calculation
* insurance
* return management

These are intentionally excluded to protect the core interaction.

---

# 7. Product Catalog

Use real Monis products where practical.

Monis currently lists two adjustable desks but only one chair in its furniture catalog, so the second chair may be a clearly treated concept/demo product. Monis also lists monitors, desk lighting, keyboards, mice, and laptop stands suitable for the experience.

Recommended initial catalog:

### Desks

1. **Electrical Adjustable Desk**
2. **Mechanical Adjustable Desk**

Exactly one desk must always be selected.

### Chairs

1. **Ergonomic Office Chair**
2. **Compact Task Chair — Concept**

Exactly one chair must always be selected.

Do not present the concept chair as an actual currently rentable Monis product.

### Monitors

1. 24" Full HD Office Monitor
2. 27" 4K Multimedia Monitor
3. 34" Curved Monitor

User may add up to **2 monitors total**.

Multiple copies of the same monitor may be allowed if implementation is simpler than supporting mixed-monitor constraints.

### Accessories

* Smart LED Desk Lamp
* Logitech MX Keyboard
* Logitech MX Master Mouse
* Ergonomic Laptop Stand
* Plant — Concept/decorative rental item

Accessories default to quantity 0 and generally max out at 1.

### Total initial catalog

**12 products.**

---

# 8. Main User Flow

```text
Open app
   ↓
See starter workspace
   ↓
Explore product categories
   ↓
Swap desk / chair
   ↓
Add monitors and accessories
   ↓
Drag/reposition supported items
   ↓
Configure delivery + rental period
   ↓
See live total
   ↓
Review setup
   ↓
Confirm simulated rental
   ↓
Success state
```

The builder must remain useful without forcing users through a wizard.

---

# 9. Screen 1 — Workspace Builder

## Desktop layout

Recommended structure:

```text
┌────────────────────────────────────────────────────┐
│ Monis                               Rental controls │
├─────────────┬───────────────────────────┬──────────┤
│             │                           │          │
│ Categories  │      Workspace Scene      │ Products │
│             │                           │          │
│             │                           │          │
├─────────────┴───────────────────────────┴──────────┤
│              Current rental + Review Setup         │
└────────────────────────────────────────────────────┘
```

Exact layout may change if another composition produces a clearer experience.

The **workspace scene should receive the most visual emphasis**.

---

## Categories

Recommended:

* Desks
* Chairs
* Monitors
* Accessories

Selecting a category updates the available product cards.

---

## Product card

Minimum information:

* image
* product name
* short useful descriptor
* rental price
* selected state
* Add / Swap action

Avoid dumping full technical specifications into the builder.

---

# 10. Workspace Scene

## Visual direction

Use a stylized **2.5D / lightly isometric workspace room**.

Desired feeling:

* modern
* playful
* uncluttered
* digital-nomad oriented
* subtle Bali/tropical cues
* professional enough to plausibly belong to a rental business

Avoid turning the visual style into either:

* corporate SaaS dashboard sterility, or
* elaborate interior-design realism.

---

# 11. Positioning Rules

## Desk

* Exactly one
* Cannot be removed
* Changed using Swap
* Position itself is fixed

## Chair

* Exactly one
* Cannot be removed
* May be dragged within the floor zone

## Desktop objects

Examples:

* monitors
* lamp
* keyboard
* mouse
* laptop stand
* plant

These may be repositioned inside a defined **desktop zone**.

### Constraints

Positions are stored as normalized coordinates:

```ts
{
  x: number // 0..1
  y: number // 0..1
}
```

Benefits:

* positions survive responsive changes better
* desk swaps can preserve approximate positions
* implementation remains simple

### Collision

No advanced collision system.

Some overlap is acceptable.

Use:

* sensible default positions
* snap constraints
* layering/z-index

to reduce ugly outcomes.

---

# 12. Drag-and-Drop Behavior

### Desktop

Pointer drag is the primary positioning mechanism.

### Mobile

Tap-to-add is the primary interaction.

Drag may still work, but the experience should not depend exclusively on precise touch dragging.

### Adding a product

New products receive a sensible predefined position.

Examples:

* first monitor → center of desk
* second monitor → beside first monitor
* lamp → back corner
* keyboard → front-center
* mouse → beside keyboard

This prevents products from appearing stacked at `(0,0)`.

---

# 13. Desk Swap Behavior

When changing desks:

* preserve all accessories
* preserve selected chair
* preserve monitor quantities
* preserve normalized object positions
* clamp any invalid position into the valid desk region if necessary

Never silently wipe the workspace.

---

# 14. Reset Behavior

Provide:

**Reset setup**

Reset returns to:

* Electrical Adjustable Desk
* Ergonomic Office Chair
* no accessories
* default rental configuration

Do not reset to a completely empty room.

---

# 15. Rental Configuration

Monis operates using weekly and monthly rental cycles, with monthly positioned as the better-value longer-term option. It also incorporates delivery location and start date into its normal rental flow.

Support:

### Delivery area

Simple Bali-area selector:

* Canggu
* Seminyak
* Ubud
* Uluwatu
* Denpasar

Each may have a mocked fixed delivery fee.

No address autocomplete.

### Delivery date

Calendar/date input.

Past dates are disabled.

For this concept, same-day selection may be permitted as a simplifying assumption. Monis promotes same-day delivery for selected products, while its standard delivery flow otherwise describes next-day delivery.

No real availability check occurs.

### Rental cycle

```text
Weekly | Monthly
```

### Duration

When Weekly:

```text
1–12 weeks
```

When Monthly:

```text
1–12 months
```

Exact upper bound is implementation-level rather than a core business requirement.

---

# 16. Pricing

Pricing is **demo pricing**, not a representation of live Monis availability or quotes.

Monis's current catalog often resolves product pricing through availability and displays products as “From /week”, so hard-coded prices in this challenge should be explicitly understood as mock/demo values.

Suggested pricing data:

```ts
{
  weekly: number
  monthly: number
}
```

Monthly pricing should be cheaper than four equivalent weekly cycles.

### Builder

Always show current recurring setup price prominently:

```text
Your setup
$42 / week
```

### Review calculation

Example:

```text
Electrical Desk            $12/w
Ergonomic Chair             $8/w
4K Monitor ×2              $14/w
Laptop Stand                $2/w
────────────────────────────────
Setup rental               $36/w

4 weeks                    $144
Delivery                    $15
────────────────────────────────
Total                      $159
```

Exclude:

* tax
* deposit
* payment processing
* coupons
* insurance

Add a subtle:

**Demo pricing**

label.

---

# 17. Contextual Recommendation

Include **one recommendation slot** when context makes sense.

Example:

User adds external monitor:

> **Complete your setup**
> Ergonomic Laptop Stand
> Raise your laptop beside your external display.

Or:

User selects desk without lighting:

> **Popular addition**
> Smart LED Desk Lamp

Only one recommendation should be shown at a time.

No algorithm is required.

Rules may simply be deterministic:

```ts
if (hasMonitor && !hasLaptopStand)
  recommend(laptopStand)

else if (!hasLamp)
  recommend(lamp)
```

Monis itself currently promotes curated workspace bundles, making contextual workspace completion consistent with its existing product model.

---

# 18. Screen 2 — Review Setup

Opened through:

**Review setup**

The review screen should answer:

> “What exactly am I about to rent, when will I get it, and how much will it cost?”

Show:

### Workspace

Visual snapshot / scene preview.

### Products

For every selected item:

* image
* name
* quantity
* rate
* line total

### Rental

* delivery area
* delivery date
* rental cycle
* duration
* computed end date if convenient

### Price

* setup subtotal
* duration multiplier
* delivery fee
* total

### Primary CTA

**Rent this setup**

### Secondary CTA

**Back to workspace**

No payment details.

---

# 19. Success State

After clicking **Rent this setup**:

## Your workspace is reserved 🎉

Show:

* selected delivery date
* delivery area
* duration
* setup total

Primary action:

**Back to workspace**

Include clear disclaimer:

> Demo experience. No real booking has been placed.

No API request is required.

---

# 20. Responsive Behavior

## Desktop

Primary design target.

Workspace remains visible and central.

Product catalog may appear as side panels.

## Mobile

Workspace remains visually prominent.

Recommended interaction:

* scene on top
* product catalog in tabs or bottom sheet
* rental summary as sticky footer
* tap-to-add as primary item interaction
* drag supported where practical

The mobile version should be usable, but desktop receives the majority of visual optimization.

---

# 21. Persistence

P1 feature.

Persist configuration to `localStorage`:

```ts
{
  desk,
  chair,
  items,
  itemPositions,
  deliveryArea,
  deliveryDate,
  rentalCycle,
  duration
}
```

On return/reload:

restore workspace.

Reset explicitly clears persisted configuration.

No account persistence.

---

# 22. Accessibility

P0:

* product selection usable without drag
* meaningful buttons
* keyboard-focusable controls
* appropriate labels
* sufficient contrast
* selected states not communicated through color alone

P1:

* keyboard or button-based position nudging
* arrow controls for selected scene objects

Dragging should never be the only way to create a valid workspace.

---

# 23. Suggested State Model

Keep state intentionally simple.

```ts
type RentalCycle = "weekly" | "monthly"

type Position = {
  x: number
  y: number
}

type SelectedItem = {
  productId: string
  quantity: number
  positions: Position[]
}

type WorkspaceConfig = {
  deskId: string
  chairId: string

  chairPosition: Position

  items: SelectedItem[]

  deliveryArea: string
  deliveryDate: string

  rentalCycle: RentalCycle
  duration: number
}
```

Product definitions remain static data.

```ts
type Product = {
  id: string
  name: string
  category:
    | "desk"
    | "chair"
    | "monitor"
    | "accessory"

  description: string

  pricing: {
    weekly: number
    monthly: number
  }

  image: string

  placement:
    | "fixed"
    | "floor"
    | "desktop"

  maxQuantity: number
}
```

Avoid introducing a global state library unless implementation genuinely benefits from it.

React state/context is sufficient for the challenge.

---

# 24. Visual Delight

## P1: Day/Night Mode

If time remains, add a small visual toggle:

```text
☀ Day  /  ☾ Night
```

Night mode:

* room darkens
* monitor gains subtle glow
* desk lamp visibly illuminates the desk when present

This is deliberately secondary.

Do not sacrifice core usability, checkout clarity, or recommendation behavior for it.

---

# 25. Edge Cases

### User attempts third monitor

Prevent addition.

Explain briefly:

> Maximum 2 monitors per workspace.

### Product removed while selected in scene

Remove visual object and its saved position.

### Changing rental cycle

Retain duration only when sensible.

Otherwise reset duration to `1`.

### Delivery date in past

Prevent selection.

### Missing localStorage data

Fall back safely to starter workspace.

### Corrupt localStorage

Ignore it and initialize starter state.

### Product asset fails

UI should remain usable and show a fallback representation.

### Scene becomes visually messy

Reset remains available.

---

# 26. Acceptance Criteria

A submission is functionally complete when:

### Products

* [ ] User can choose between at least 2 desks.
* [ ] User can choose between at least 2 chairs.
* [ ] User can add monitors.
* [ ] User can add other accessories.
* [ ] Monitor quantity cannot exceed 2.
* [ ] Desk and chair always remain selected.

### Scene

* [ ] Scene visually changes when desk changes.
* [ ] Scene visually changes when chair changes.
* [ ] Accessories appear when added.
* [ ] Accessories disappear when removed.
* [ ] Supported objects can be repositioned.
* [ ] Swapping desk does not destroy the rest of the setup.

### Rental

* [ ] User can select delivery area.
* [ ] User can select a valid delivery date.
* [ ] User can select weekly/monthly.
* [ ] User can select duration.
* [ ] Pricing updates when products change.
* [ ] Pricing updates when rental cycle/duration changes.

### Review

* [ ] Review screen shows selected products.
* [ ] Quantities are correct.
* [ ] Delivery information is shown.
* [ ] Rental duration is shown.
* [ ] Total is calculated.
* [ ] User can return to editing.
* [ ] Rent CTA opens success state.

### Responsive

* [ ] App is comfortably usable on desktop.
* [ ] App remains usable at typical mobile width.
* [ ] Mobile user does not require precise dragging to add items.

### Submission

* [ ] Deployed to Vercel.
* [ ] Public URL works without setup.
* [ ] Source exists on GitHub.
* [ ] `desent-bot` has read collaborator access.
* [ ] README documents approach.
* [ ] README explains tradeoffs.
* [ ] README states what would be improved with more time.

The final four submission requirements follow Desent's published challenge instructions.

---

# 27. 8-Hour Implementation Strategy

## Hour 0–1

**Foundation**

* Next.js project
* Tailwind
* static product data
* workspace state model
* basic builder shell

Goal: products can already be selected.

## Hour 1–3

**Hero interaction**

* scene composition
* desk swap
* chair swap
* add/remove accessories
* item layers
* basic positioning
* drag constraints

This is the most important engineering block.

## Hour 3–4

**Rental model**

* weekly/monthly
* duration
* delivery area
* delivery date
* live pricing

## Hour 4–5

**Review flow**

* Review Setup
* itemized summary
* pricing
* success state

At the end of Hour 5, every P0 requirement should be functionally complete.

## Hour 5–6

**UX refinement**

* recommendation slot
* empty/selected states
* drag feedback
* reset
* responsive improvements

## Hour 6–7

**Visual polish**

* typography
* spacing
* scene polish
* animation
* hover/focus states
* mobile catalog treatment

## Hour 7–8

**Ship**

* test edge cases
* deploy Vercel
* README
* GitHub cleanup
* collaborator access
* final QA

---

# 28. Cut Order If Time Runs Out

Cut features in this order:

1. Day/night mode
2. keyboard position nudging
3. localStorage
4. advanced drag animation
5. contextual recommendation

Do **not** cut:

* workspace visual preview
* desk/chair choice
* accessories
* core drag/reposition behavior
* live pricing
* rental configuration
* review screen
* responsive basic usability

The project should become **simpler but complete**, never ambitious but broken.

---

# 29. README Narrative

The submission README should briefly communicate the thinking behind the implementation.

Suggested framing:

### Approach

Rather than reproducing a conventional product catalog, the experience treats the workspace itself as the shopping interface. Users begin with a usable setup and customize it visually.

### Product decisions

* Starter setup reduces blank-canvas friction.
* Constrained drag-and-drop provides creative control without turning the product into a floor planner.
* Rental pricing stays visible while designing.
* Contextual recommendations help users build a complete workspace.
* Checkout is intentionally simulated because transaction infrastructure is outside the core challenge.

### Technical decisions

* Next.js
* Tailwind CSS
* static product dataset
* normalized item positioning
* client-side workspace state
* optional localStorage persistence

### With more time

Potential improvements:

* real Monis catalog/availability API
* real location-aware delivery pricing
* improved asset composition
* collision-aware positioning
* shareable workspace links
* richer accessibility controls
* actual checkout integration

---

# 30. Product Definition of Done

The product is successful if a reviewer can open the link with no explanation and, within roughly one minute:

1. understand that they are designing a rentable workspace,
2. change the desk or chair,
3. add equipment,
4. move something visually,
5. understand the rental price,
6. configure when/how long they need it,
7. review the complete setup,
8. reach the simulated rental confirmation.

More importantly, every major feature should feel like a deliberate answer to a user problem rather than an attempt to demonstrate another frontend technique.
