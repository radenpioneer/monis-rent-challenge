# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A remote worker, digital nomad, founder, or freelancer temporarily living in Bali — weeks to months, not years. They have just arrived, have nowhere to work, and need a desk, a chair, probably a monitor, and the small things that make a working day bearable, within days rather than weeks.

Their job: assemble a complete workspace and understand what it costs for the period they are staying, without comparing products across many catalog pages.

They care more about getting a complete, sensible setup quickly than about researching every furniture specification. They are not furnishing a home; they are solving a problem that has a departure date.

A second audience evaluates this build: the reviewer at Desent assessing the Monis coding challenge. Their takeaway target is "this candidate clearly understands product thinking" — engineering sophistication and visual polish support that, never overshadow it.

## Product Purpose

A visual workspace configurator for Monis, a Bali equipment rental service. It turns furniture rental from a catalog-browsing problem into a lightweight spatial design experience.

It answers three questions quickly: what workspace do I want, what will it roughly look like, and what will it cost for the period I need it.

Success is defined behaviorally: a reviewer opening the link with no explanation should, within roughly one minute, understand they are designing a rentable workspace, change the desk or chair, add equipment, move something, understand the price, set when and how long they need it, review the setup, and reach a simulated confirmation.

## Positioning

The workspace itself is the shopping interface, not a view onto a catalog.

Two mechanisms a neighboring rental site could not truthfully copy without rebuilding around them:

- **The room is the browse surface.** The app opens on a working room — Electrical Adjustable Desk, Ergonomic Office Chair — and the user edits it. There is no blank canvas and no product grid to reconstruct in their head.
- **Price is a thing you steer by, not discover.** The Setup rate is on screen the whole time and updates as the Workspace changes. On the real Monis site, per-item weekly rates only resolve into a number at checkout.

Freedom is deliberately bounded: chairs on the floor, monitors on the desk, the desk swapped rather than dragged. The product should feel flexible without becoming floor-planning software. A user cannot produce a nonsensical room, so they can experiment without care.

## Operating Context

The user is on unfamiliar ground, often on hotel or villa wifi, frequently on a phone, and comparing this against the alternative of buying furniture they will abandon when they leave.

Real Monis operating facts this product simulates:

- Rentals are priced per recurring cycle — weekly or monthly — with longer periods positioned as better value.
- Delivery includes professional setup and pickup, framed as "100% Stress-Free Delivery" with no extra fees.
- Delivery is next-day including weekends and holidays; same-day delivery is available in Bali for selected products, fulfilled via Gojek.
- Monis groups the catalog into curated bundles (The Essentials, The Founder's Setup, The Studio Setup, The Trading Setup), which makes contextual workspace completion consistent with its existing product model.

## Capabilities and Constraints

**Required stack.** Next.js, Tailwind CSS, deployed on Vercel, source on GitHub with `desent-bot` given read collaborator access. Currently Next.js 16.3.1, React 19.2.8, Tailwind 4. `src/workspace/` and `src/pricing/` import nothing from React, so product rules stay exercisable without running the app.

**Time budget is binding.** ~8 hours with limited overtime. The cut order in PRD §28 applies — scope is cut before quality. Day/night mode goes first, then keyboard nudging, localStorage, drag animation, and contextual recommendation. Never cut: the visual preview, desk/chair choice, accessories, reposition behavior, live pricing, rental configuration, the review screen, or basic responsive usability. The project should become simpler but complete, never ambitious but broken.

**Vocabulary is binding.** `CONTEXT.md` is the single glossary for the whole project — Product, Placement, Workspace, Placed Product, Position, Zone, Rental, Cycle, Duration, Area, Quote, Setup rate, Recommendation. Its `_Avoid_` lists bind UI copy too: no "cart", no "order", no "booking", no "subtotal".

**Scene architecture is fixed.** ADR-0001 — one inline SVG, one viewBox, normalized 0..1 Positions projected into Zones through an affine transform. Consequences that constrain design: objects translate but never shear; the desktop Zone is constant across both desks, which is what makes desk swap preserve everything for free; scene objects need explicit `role`/`tabindex` because they are `<g>`, not buttons; and transform-based motion must live on `<div>` wrappers outside the SVG, so motion inside the scene is limited to opacity and attribute changes.

**Hard product rules.** Exactly one desk and one chair are always selected and cannot be removed. Maximum 2 monitors, with a stated reason when a third is refused. Accessories default to 0 and generally max at 1. Reset returns to the starter Workspace, never to an empty room. Desk swap preserves accessories, chair, monitor quantities, and normalized positions.

**Explicitly out of scope.** Auth, accounts, backend, database, real booking, payments, real Monis API, real inventory, live availability, address autocomplete, maps, arbitrary room layouts, collision physics, product dimension simulation, desk size variants, 3D/WebGL, CMS, admin UI, analytics, promo codes, deposits, tax, insurance, returns.

**Undecided.** Nothing material is open at the product level. The remaining open questions are visual-world decisions, which belong to design work rather than here.

## Brand Commitments

The real Monis brand is binding, as far as it is known. Captured from monis.rent on 2026-08-17:

- **Name.** `monis.rent` — lowercase, written with the dot, the domain used as the wordmark. No separate logo mark was found on the site; the footer uses the wordmark in white on dark.
- **Typeface.** Inter.
- **Palette.** Essentially neutral — white and near-white surfaces, black hairline borders, black text. Accents are sparse: a warm cream `#F9F2EA` on outlined pill buttons and a light blue `#63aefd` on badges. Full-round pills with `border-black` are the most recognizable recurring form. **`#00AA13` is Gojek's green on the instant-delivery badge, not a Monis color** — it dominates the page source and must not be mistaken for brand identity.
- **Imagery.** Product photography, objects on clean white, served from a Strapi CMS.
- **Voice.** Plain, confident, benefit-first, lightly warm. Verbatim: "Rent everything and be at home anywhere" · "Remote work made efficiently" · "100% Stress-Free Delivery" · "Order today, receive today" · "Flexible rentals for every setup" · "Browse our brand-new bundles at a discounted rate."
- **Pricing framing.** Always "From $X/week".

The PRD asks for a **conceptual reimagination** of Monis rather than a pixel-for-pixel extension of the existing site. These commitments are the fixed points that keep it recognizably Monis; they are not an instruction to reproduce the current website's layout.

## Evidence on Hand

**Real, captured.** The Monis catalog copy above, taken verbatim from monis.rent/products. Real product names and descriptors that should replace invented ones where they apply:

| In this app | Real Monis name | Real descriptor |
| --- | --- | --- |
| Electrical Adjustable Desk | Electrical Adjustable Desk | "Electric height adjustment (70-118cm), smooth and quiet" |
| Mechanical Adjustable Desk | Mechanical Adjustable Desk | "Effortlessly adjust the height from 70-120cm" |
| Ergonomic Office Chair | Ergonomic Office Chair | "Breathable mesh back, high-density molded foam seat" |
| 24" monitor | 24" Full HD Office Monitor A24i | "Xiaomi Mi 23.8 Desktop Monitor A24i at 100 Hz" |
| 27" monitor | 27" 4K Multimedia Monitor | "Redmi 27\" monitor with USB-C or HDMI connection" |
| 34" monitor | 34" 4K Gaming Monitor | "Xiaomi Mi Curved 34\" Gaming Monitor at 180Hz" |
| Lamp | Smart LED Desk Lamp 1S | "520 lm luminous flux, Ra 90 high color rendering" |
| Keyboard | Logitech MX Keyboard | "Up to 10 meters wireless range, Easy-Switch™ keys" |
| Mouse | Logitech MX Master Mouse S3 | "Compatible with Windows and macOS, wireless connection" |
| Laptop stand | Ergonomic Laptop Stand | "With all laptops from 10''-17\", raises and angles" |

**Confirmed absences — do not fabricate.**

- Monis's real furniture catalog lists **exactly one chair**. The Compact Task Chair is a concept product and must be labelled as not currently rentable.
- Monis lists **no plants**. The Plant is a concept/decorative item and carries the same labelling duty.
- **No logo file, no brand guideline, and no product photography are in this repo.** Every Product is drawn as hand-authored SVG in `src/catalog/assets/`. Nothing here may claim to be an official Monis asset.
- The descriptions currently in `src/catalog/products.ts` are written for this project, not Monis copy.

**Deliberate divergences from the real business, which must stay visible as such.**

- All prices are **Demo pricing** — invented for the concept, representing no real Monis quote. Real Monis resolves price through availability and shows "From $X/week". A subtle demo-pricing label is required wherever money appears.
- This app charges a fixed mock delivery fee per Area. Real Monis includes delivery, setup, and pickup at no extra fee. The fee exists to make the Quote breakdown legible, and must never read as a Monis policy claim.
- No booking is ever placed. The success state carries an explicit disclaimer.

## Product Principles

1. **The room is the interface.** The scene gets the most visual emphasis on every screen it appears on; the catalog supports it rather than competing with it.
2. **Start useful, never empty.** The first frame is a workspace someone could actually work at. Reset returns there too.
3. **Constrained freedom beats unrestricted freedom.** Objects behave the way real objects do. The user cannot build a nonsensical room, which is what makes experimenting safe.
4. **Preserve user effort.** Changing one thing never silently wipes another. Swapping the desk keeps the chair, the monitors, and where everything sits.
5. **Cost is visible while deciding, not after.** The Setup rate updates as the Workspace changes, so price is a steering input rather than a checkout surprise.
6. **Assist, never upsell.** At most one contextual Recommendation at a time, chosen by deterministic rules, framed as completing a workspace.

## Accessibility & Inclusion

Required (P0): product selection fully usable without dragging; meaningful buttons; keyboard-focusable controls; appropriate labels; sufficient contrast; selected states never communicated through color alone. Dragging must never be the only way to build a valid Workspace.

Target (P1): keyboard or button-based position nudging, and arrow controls for the selected scene object.

Structural cost from ADR-0001: scene objects are SVG `<g>` elements, so they need explicit `role` and `tabindex` rather than inheriting button semantics.

Mobile must remain usable at typical widths and must not require precise touch dragging — tap-to-add is the primary mobile interaction. Desktop receives the majority of visual optimization.
