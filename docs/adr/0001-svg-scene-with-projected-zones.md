# Scene is one inline SVG, positions are normalized and projected into Zones

The Workspace scene is drawn as a single inline SVG with one `viewBox`, not as absolutely-positioned DOM elements and not on a canvas. Every Placed Product stores its Position as normalized `{ x, y }` in 0..1, and a Zone converts that into scene coordinates through an affine transform derived from the Zone's four corner points.

## Considered Options

**DOM elements absolutely positioned over a background image.** Easier drag handling and native focus/ARIA on real `<button>` elements, but the desk surface in a 2.5D scene is a parallelogram, so every position would need bespoke perspective correction anyway — and the scene would be split across two coordinate systems that must stay in sync during responsive resizing.

**Canvas.** Rejected outright: no DOM means no focusable objects, and the PRD requires keyboard-focusable controls and selection states that do not rely on colour alone.

## Consequences

- Objects are **translated**, never sheared. The Zone transform maps the normalized point to a scene coordinate; the object itself is drawn upright at that coordinate. Applying the Zone's transform to the object's own group would visibly skew monitors and lamps.
- Because the PRD puts desk size variants out of scope, the desktop Zone is **constant across both desks**. This is what makes "swapping the desk preserves the rest of the Workspace" free rather than a clamping exercise — the clamp exists only as a defensive fallback.
- Accessibility costs extra work: scene objects need `role`/`tabindex` on `<g>` elements rather than inheriting button semantics.
- CSS transform animation on SVG elements is not hardware-accelerated in many browsers. Transform-based motion (panel slides, day/night crossfade) must live on `<div>` wrappers outside the SVG; motion inside the scene stays limited to opacity and attribute changes.
