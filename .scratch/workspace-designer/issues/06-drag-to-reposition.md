# 06 — Move things around the room

**What to build:** The user drags a monitor across the desk surface and the chair around the floor, and the room starts to feel like theirs rather than a default.

Freedom is bounded by what the objects are. Desktop objects stay on the desk, the chair stays on the floor, the desk itself never moves — it is swapped. A user cannot produce an absurd room, so they can experiment freely.

Dragging must feel like the object is attached to the pointer. This means the scene is updated directly during the drag and the Workspace state is written once, when the pointer is released — a state update per frame would make the whole scene re-render at pointer speed. The React Compiler does not help here; it removes memoization boilerplate, not renders.

There is no collision system. Overlap is tolerated; sensible defaults, light snapping, and fixed layering are what keep it from looking broken.

**Blocked by:** 03

**Status:** ready-for-agent

- [ ] A monitor can be dragged across the desk and stays where it is dropped
- [ ] The chair can be dragged around the floor
- [ ] No object can be dragged outside the Zone it belongs to
- [ ] Dragging tracks the pointer without visible lag
- [ ] The Workspace is updated once per drag, not once per frame
- [ ] Releasing the pointer outside the window does not strand an object mid-drag
- [ ] Objects never render behind the desk
