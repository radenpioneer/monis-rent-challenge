---
name: Monis Workspace Designer
description: A quiet paper frame around a warm room you can rent.
colors:
  ink: "#2b2721"
  ink-muted: "#6b6259"
  ink-faint: "#a79c8e"
  ground: "#f5f1ea"
  surface: "#ffffff"
  cream: "#f9f2ea"
  line: "#e8e1d6"
  signal: "#63aefd"
  room-wall: "#f6f4ee"
  room-floor: "#e7dfd3"
  room-skirting: "#f4eee5"
  room-horizon: "#dcd2c2"
  daylight: "#fff7e4"
  sky: "#d6edef"
  foliage: "#7fb89f"
  rug-terracotta: "#e7c3ac"
  rattan: "#e4c393"
  oak: "#e7c79e"
  walnut: "#c08a5a"
  steel: "#99a2aa"
  graphite: "#3b444d"
  mesh-slate: "#5e6b78"
  shell-terracotta: "#c4693f"
typography:
  headline:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  caption:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.65rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.2em"
rounded:
  control: "4px"
  well: "12px"
  card: "16px"
  panel: "24px"
  pill: "9999px"
spacing:
  tight: "8px"
  snug: "12px"
  base: "16px"
  section: "24px"
  page-end: "64px"
components:
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.panel}"
    padding: "16px"
  card-product:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  card-product-hover:
    backgroundColor: "{colors.cream}"
  card-product-selected:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "12px"
  chip-category:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  chip-category-hover:
    backgroundColor: "{colors.cream}"
  chip-category-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  badge-concept:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  thumbnail-well:
    backgroundColor: "{colors.ground}"
    rounded: "{rounded.well}"
    padding: "6px"
    size: "80px"
  link-text:
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
---

# Design System: Monis Workspace Designer

## Overview

**Creative North Star: "The Villa Showroom"**

A rented villa in Bali, cleared out and turned into a showroom for a single afternoon. Warm light through a window, a terracotta rug, a rattan pendant overhead, and one desk set up in the middle of it so you can see what living with it would feel like. The furniture is real and the room is real; the paperwork on the side table is quiet, printed, and out of the way.

That split is the whole system. **The room carries every colour in the product. The interface carries none.** The scene is a 2.5D SVG full of oak, walnut, terracotta, rattan, and daylight — 40-odd hand-authored hues — and it sits inside chrome that is nothing but warm paper, ink, and a single hairline. Panels do not compete with the room; they hold it. Hierarchy in the chrome comes from space and font weight, never from a coloured accent, because the moment the interface reaches for a colour it starts arguing with the furniture.

The identity is Monis's own, taken from monis.rent rather than invented: Inter, near-black on near-white, full-round pills, hairline borders, and one soft cream fill. Two things are deliberately refused. It is not a corporate SaaS dashboard — the room is the hero and it is drawn, not charted. It is not interior-design realism either — the furniture reads as a clear, flat, confident illustration a rental company would ship, not as a render.

**Key Characteristics:**
- Colour lives in the scene; the chrome is paper and ink
- Warm neutrals throughout — no cool grey anywhere in the system
- Depth from light, never from lines stacked on shadows
- One oblique skew governs every horizontal plane in the room
- Hairline borders and full-round pills, borrowed directly from Monis
- Selected state always carries a mark and a word, never colour alone

## Colors

Two palettes that never mix: a warm paper-and-ink chrome, and the room's full material range behind it.

### Primary

- **Ink** (`#2b2721`): the warm near-black everything is written, bordered, and shadowed in. Body copy, headings, prices, active chip fills, selected card borders, focus rings, and the source colour of both elevation shadows. It stands in for the pure black Monis uses on its own site — warmed to sit inside a cream world without going cold.

### Secondary

- **Monis Signal Blue** (`#63aefd`): Monis's own badge blue, borrowed for exactly one job — the Concept badge, marking products Monis does not actually rent. Also themes the text selection. It appears nowhere else.

### Neutral

- **Ground** (`#f5f1ea`): the warm paper the whole app is printed on. Page background, and the well behind a product thumbnail.
- **Surface** (`#ffffff`): panels, cards, and the plate the scene is mounted on. The only true white in the system.
- **Cream** (`#f9f2ea`): Monis's own soft fill. The hover state of any interactive surface and the resting fill of a selected card. Warmer and lighter than Ground, so a selected card reads as lifted toward the light rather than pressed down.
- **Line** (`#e8e1d6`): the hairline. Card and chip borders at rest.
- **Ink Muted** (`#6b6259`): secondary copy — descriptions, captions, the demo-pricing disclaimer, inactive chip labels. 6.1:1 on Surface, 5.4:1 on Ground.
- **Ink Faint** (`#a79c8e`): non-text only — link underline strokes, hover borders. Fails text contrast by design; never set copy in it.

### The Room

The scene owns its own palette and does not draw from the chrome tokens above. Its structure: **Room Wall** and **Room Floor** as vertical gradients (`#fcfaf6`→`#f0eae0` and `#efe8de`→`#e0d6c8`), a **Skirting** band (`#f4eee5`) and a **Horizon** line (`#dcd2c2`) where they meet. **Daylight** (`#fff7e4`, 55%) falls as a hard-edged polygon from the window. **Sky** (`#d6edef`→`#f6fcfb`) and **Foliage** (`#7fb89f` on a `#6fa894` stem) fill the glass. **Rug Terracotta** (`#e7c3ac`, inner stroke `#d6ae95`) covers the whole furniture footprint so nothing floats, and **Rattan** (`#e4c393`, stroke `#d2ac77`) hangs the pendant.

Materials come in three families, so two products of the same category read apart at a glance: warm woods (**Oak** `#e7c79e` and **Walnut** `#c08a5a`, each with a darker front and side face), cool metals (**Steel** `#99a2aa`, **Graphite** `#3b444d`, **Mesh Slate** `#5e6b78`), and **Shell Terracotta** (`#c4693f`) which marks the concept chair as visibly the odd one out.

### Named Rules

**The Quiet Frame Rule.** Every saturated colour in this product belongs to the room. A hue appearing in the chrome is either the Concept signal or a mistake. The interface has ink, three papers, and a hairline — that is the entire budget.

**The Borrowed Signal Rule.** `#63aefd` marks exactly one thing: a product Monis does not rent. It is Monis's badge blue used against its usual meaning, and that inversion is load-bearing. It never becomes a general accent, a link colour, or a focus ring.

**The Warm-Only Rule.** No cool grey enters the chrome. Secondary text is `#6b6259`, not a neutral grey of the same lightness. On a cream ground a true grey reads as dirt.

## Typography

**Body Font:** Inter (with `ui-sans-serif, system-ui, sans-serif`)

There is no second face. Monis sets its own site in Inter and the configurator matches it, so the whole system runs on one workhorse grotesque and gets its hierarchy from weight, size, and space instead of from contrast between families. On an Operate surface where the drawn room is already doing the expressive work, a display face would be a second voice competing with the furniture.

### Hierarchy

- **Headline** (600, 1.5rem/24px, 1.2, -0.025em): page titles — "Review setup", "Your workspace is reserved" — and the live Setup rate, which is the builder's page title in all but grammar. One per screen.
- **Title** (600, 0.875rem/14px, 1.4): product names on catalog cards, and any label that names a thing the user is choosing between.
- **Body** (400, 0.875rem/14px, 1.5): running copy and instructions.
- **Caption** (400, 0.75rem/12px, 1.375): product descriptions, disclaimers, secondary help. Always in Ink Muted.
- **Label** (600, 0.65rem/10.4px, 0.2em tracking, uppercase): the wordmark lockup's second line and the Concept badge. Nothing else.

Prices and any figure that changes while the user is editing carry `tabular-nums`, so a rate does not jitter horizontally as the Workspace changes.

### Named Rules

**The Lockup-Only Rule.** Tracked uppercase at 0.2em is reserved for the wordmark lockup and the Concept badge. It never appears as an eyebrow or kicker above a heading — a heading carries its own weight.

**The Steady Figure Rule.** Every number that can change under the user's hands is `tabular-nums`. A live price that shifts sideways while you edit reads as instability in the price, not in the type.

## Layout

A centred single column that becomes a two-part split at `lg` (1024px): the scene and its caption on the left, the catalog rail on the right at a fixed `24rem` (384px) cap. Below `lg` the rail drops beneath the scene, which is what keeps the room prominent on a phone.

Containers: `72rem` (1152px) for the header, `80rem` (1280px) for the builder, `42rem` (672px) for the review and success screens. Horizontal padding steps `16px` → `24px` at `sm` (640px). Every screen ends on `64px` of bottom space so the last element never sits against the viewport edge.

Rhythm runs on a 4px base, in practice `8 / 12 / 16 / 24`: `12px` inside a card between an image and its text, `16px` between cards and inside panels, `24px` between the scene and the rail. Groups are tight and the separations between them are generous — the catalog rail reads as three blocks (filters, products, disclaimer) rather than eleven evenly spaced elements.

The scene itself is a single SVG on a `1200 × 800` viewBox (3:2), scaling fluidly with its container.

### Named Rules

**The Whole-Room Rule.** The scene's width is capped by the viewport height left over after the header and caption: `max-width: calc((100dvh - 13rem) * 1.5)`. The room is the product, so it is never cropped and never scrolled past — it is sized to fit whole, and the chrome takes whatever is left.

## Elevation & Depth

Surfaces are flat and matte. Depth comes from light: two large, very soft, heavily inset shadows that make a white surface float a few centimetres above the cream ground without ever drawing an edge. Nothing in the chrome is glossy, and there is no glass, blur, or gradient anywhere in the interface.

### Shadow Vocabulary

- **Scene lift** (`box-shadow: 0 24px 60px -28px rgba(43,39,33,0.45)`): the scene plate only. The largest lift in the system, because the room is the one object with real physical presence.
- **Panel lift** (`box-shadow: 0 18px 46px -30px rgba(43,39,33,0.5)`): the catalog rail. Slightly tighter and slightly denser, so it reads as sitting a little lower than the scene.
- **Contact shadow** (in-scene): flattened ellipses in Ink at 7–8% opacity, under every desk and chair. These are what stop furniture floating on the rug.

Both chrome shadows are cast in Ink (`rgba(43,39,33,…)`), never in black. A neutral-black shadow on a cream ground goes grey and dirty.

### Named Rules

**The Light-Not-Lines Rule.** A surface declares depth exactly once. Lifted surfaces carry a shadow and no border; bordered surfaces carry a hairline and no shadow. A 1px ring under a wide soft shadow is the ghost-card tell and is banned outright.

## Shapes

A soft, generous radius ladder that gets rounder as surfaces get larger: `4px` on focus targets, `12px` on thumbnail wells and the logo tile, `16px` on product cards, `24px` on panels and the scene plate, and full-round on every small control. Pills and hairlines are lifted straight from Monis's own site, where a bordered full-round pill is the most recognisable single form.

Inside the scene the form language is stricter. Every horizontal plane — both desk surfaces, both seat pads — is the same parallelogram, derived from the desktop Zone's `u` and `v` vectors rather than drawn by hand. Objects are translated to their projected point and drawn upright; the skew is never applied to an object's own group, so monitors and lamps stay square while the surfaces they sit on stay oblique. Chair bases are five spokes on an ellipse, which is what makes them read as 2.5D without any perspective maths.

### Named Rules

**The One Oblique Rule.** There is exactly one skew in this product, and it comes from `DESKTOP_ZONE`'s vectors. Any new horizontal plane derives its parallelogram from those vectors. A second, hand-guessed skew is how the scene starts looking broken.

## Components

Calm and precise. Hairline edges, flat fills, and hierarchy carried by weight and space. The chrome is built to recede — a control should be unmistakable when you look for it and invisible when you are looking at the room.

### Chips (category filter)

- **Style:** full-round pill, `6px 14px`, Title weight at Body size. Always bordered, in both states, so the geometry never shifts by a pixel when selection moves.
- **Rest:** Surface fill, Line border, Ink Muted label.
- **Hover:** Cream fill, Ink Faint border.
- **Active:** Ink fill, Ink border, Surface label. Carries `aria-pressed`.

### Cards / Containers

- **Corner Style:** `16px` on product cards, `24px` on panels and the scene plate.
- **Background:** Surface at rest, Cream on hover and when selected.
- **Border:** Line hairline at rest; Ink Faint on hover; Ink plus a 1px Ink ring when selected — a 2px ink edge with no layout shift.
- **Shadow Strategy:** cards carry none (see The Light-Not-Lines Rule). Panels carry Panel lift and no border.
- **Internal Padding:** `12px` on cards, `16px` on panels.

### Product Card (signature component)

The one component the product is really made of: an 80px thumbnail well in Ground, then name, description, an optional Concept badge, and a baseline row pairing the action label against a `tabular-nums` rate.

Its selected state is deliberately over-specified — Cream fill, Ink border and ring, a drawn tick, and the words "In your workspace" replacing the action label. Four signals for one state, because the PRD forbids communicating selection through colour alone and because a user swapping desks needs to see what they are comparing against without hunting.

The thumbnail is the same SVG component the scene draws, framed by the asset's own viewBox — a product cannot look like two different things in two places. It is `aria-hidden`: the card already names the product in text.

### Badge (concept)

- **Style:** full-round pill, Signal fill, Ink label, Label typography. `6.3:1` contrast.
- **Always paired** with the sentence "Not rented by Monis today" in Ink Muted beside it. The badge alone does not carry the meaning and must never ship without its sentence.

### Links

- **Style:** Ink text with an Ink Faint underline at `4px` offset.
- **Hover:** underline darkens to Ink. The text colour never changes.
- **Focus:** 2px Ink outline at `4px` offset.

### Navigation

The header is a wordmark lockup, not a nav bar: an Ink tile carrying a cream desk glyph, "Monis" in Headline weight at `1.125rem`, and "WORKSPACE DESIGNER" beneath it in Label. A one-line positioning statement sits opposite it, hidden below `sm`.

### Focus

One treatment everywhere: `outline: 2px solid Ink` at a `2px` offset on controls and `4px` on links and the wordmark. Ink was chosen over Signal deliberately — Signal Blue is `2.4:1` against Surface and would fail the 3:1 that a focus indicator owes.

## Do's and Don'ts

### Do:

- **Do** keep every saturated colour inside the scene's SVG. The chrome gets Ink, Ground, Surface, Cream, and Line.
- **Do** cast shadows in Ink (`rgba(43,39,33,…)`), never in neutral black.
- **Do** give a new horizontal plane its skew from `DESKTOP_ZONE`'s `u` and `v` vectors.
- **Do** pair every state that matters with a mark and a word, not just a fill — the PRD requires it and the system is built around it.
- **Do** set changing figures in `tabular-nums`.
- **Do** border a pill in both states so selection never shifts the layout.
- **Do** size the scene from leftover viewport height so the room always fits whole.

### Don't:

- **Don't** put a border and a shadow on the same surface.
- **Don't** use `#63aefd` for anything except the Concept badge and text selection. It means "Monis does not rent this", and a second use dissolves that meaning. **Known risk, accepted deliberately:** blue is also Monis's badge colour for real products, so this badge can read as an endorsement at a glance. Its sentence is what disambiguates it — never ship the badge bare.
- **Don't** set body copy in Ink Faint (`#a79c8e`). It is `2.7:1` on Surface and is for strokes and borders only.
- **Don't** introduce a second typeface, or use tracked uppercase as an eyebrow above a heading.
- **Don't** reach for a cool grey. Every neutral here is warm.
- **Don't** apply a Zone's transform to an object's own group — translate to the projected point and draw upright.
- **Don't** animate transforms inside the SVG. Per ADR-0001 they are not hardware-accelerated; transform motion belongs on `div` wrappers outside the scene, and motion inside it stays limited to opacity and attribute changes.
