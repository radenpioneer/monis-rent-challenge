# 03 — Add and remove monitors and accessories

**What to build:** The room stops being two objects and becomes a workspace. A user adds monitors, a lamp, a keyboard, a mouse, a laptop stand, or a plant, and each one appears in the scene somewhere sensible — the first monitor centred on the desk, the second beside it, the lamp in a back corner, the keyboard front-centre, the mouse beside the keyboard. Nothing lands stacked in one corner.

Adding is done by tapping a card. No dragging is involved anywhere in this ticket, which is what guarantees the product is usable before drag exists at all.

At most two monitors, counted across the whole monitor Category, with different models allowed together. A refused third monitor leaves everything untouched and says why, in words the user can act on.

Every Product authored here carries its real Monis name and descriptor, taken verbatim from the *Evidence on Hand* table in [PRODUCT.md](../../../PRODUCT.md) — this supersedes the shorter names in PRD §7. Some run long ("24\" Full HD Office Monitor A24i"), so the Product Card has to hold a two-line name without breaking its baseline row.

**Blocked by:** 02

**Status:** done

- [x] Every remaining Product in the catalog can be added and removed by tapping its card
- [x] Added Products appear immediately in the scene at a sensible default position
- [x] Two monitors do not overlap by default
- [x] Different monitor models can be combined
- [x] A third monitor is refused, state is unchanged, and the reason is shown
- [x] Removing a Product removes both the object and its stored position
- [x] Swapping the desk afterwards leaves every added Product and its position untouched
- [x] The plant is labelled as a concept Product
- [x] Every Product uses its real Monis name and descriptor from PRODUCT.md, verbatim
- [x] Descriptions written for this project read as this project's copy, never as Monis copy
- [x] The longest Product name still lays out cleanly on a card at mobile width
