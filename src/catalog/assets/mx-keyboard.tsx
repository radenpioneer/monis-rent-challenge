import { ContactShadow, planeFrontEdge, planeOffset, planePoints } from "./plane";

const BODY = "#3B444D";
const EDGE = "#2F373F";
const KEYS = "#5E6B78";

const DECK = { width: 140, depth: 48 };
const THICKNESS = 7;

/** Four key rows and a spacebar, laid back into the deck. */
const ROWS = [
  { into: -15, width: 122 },
  { into: -7.5, width: 122 },
  { into: 0, width: 116 },
  { into: 7.5, width: 108 },
  { into: 16, width: 56 },
];

export const MX_KEYBOARD_VIEW_BOX = "-90 -30 180 60";

/**
 * The Logitech MX Keyboard: a flat graphite slab lying on the room's oblique.
 * Anchored at the centre of its footprint.
 */
export function MxKeyboard() {
  return (
    <g>
      <ContactShadow width={DECK.width + 12} depth={DECK.depth + 8} />

      <polygon points={planeFrontEdge(DECK.width, DECK.depth, THICKNESS)} fill={EDGE} />
      <polygon points={planePoints(DECK.width, DECK.depth, THICKNESS)} fill={BODY} />

      <g fill={KEYS} opacity={0.9}>
        {ROWS.map((row) => {
          const at = planeOffset(0, row.into, THICKNESS);
          return (
            <g key={row.into} transform={`translate(${at.x} ${at.y})`}>
              <polygon points={planePoints(row.width, 5.5)} />
            </g>
          );
        })}
      </g>
    </g>
  );
}
