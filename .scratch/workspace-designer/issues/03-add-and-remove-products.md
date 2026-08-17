# 03 — Add and remove monitors and accessories

**What to build:** The room stops being two objects and becomes a workspace. A user adds monitors, a lamp, a keyboard, a mouse, a laptop stand, or a plant, and each one appears in the scene somewhere sensible — the first monitor centred on the desk, the second beside it, the lamp in a back corner, the keyboard front-centre, the mouse beside the keyboard. Nothing lands stacked in one corner.

Adding is done by tapping a card. No dragging is involved anywhere in this ticket, which is what guarantees the product is usable before drag exists at all.

At most two monitors, counted across the whole monitor Category, with different models allowed together. A refused third monitor leaves everything untouched and says why, in words the user can act on.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Every remaining Product in the catalog can be added and removed by tapping its card
- [ ] Added Products appear immediately in the scene at a sensible default position
- [ ] Two monitors do not overlap by default
- [ ] Different monitor models can be combined
- [ ] A third monitor is refused, state is unchanged, and the reason is shown
- [ ] Removing a Product removes both the object and its stored position
- [ ] Swapping the desk afterwards leaves every added Product and its position untouched
- [ ] The plant is labelled as a concept Product
