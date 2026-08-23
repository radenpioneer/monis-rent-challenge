import { ContactShadow } from "./plane";

const BODY = "#3B444D";
const HIGHLIGHT = "#5E6B78";
const WHEEL = "#99A2AA";

/** Seen from the front and slightly above: high at the palm, tapering forward. */
const SHELL = "M-17,-1 C-19,-15 -11,-25 0,-25 C12,-25 20,-15 17,-1 C9,3 -9,3 -17,-1 Z";

export const MX_MASTER_MOUSE_VIEW_BOX = "-26 -32 52 42";

/**
 * The Logitech MX Master Mouse S3, anchored where it rests on the desk. Small
 * enough that it is a silhouette with two details rather than a drawing.
 */
export function MxMasterMouse() {
  return (
    <g>
      <ContactShadow width={44} depth={30} />
      <path d={SHELL} fill={BODY} />
      <path
        d="M-15,-4 C-16,-16 -9,-23 0,-23 C4,-23 7,-22 9,-20 C-2,-18 -9,-11 -11,-2 Z"
        fill={HIGHLIGHT}
        opacity={0.55}
      />
      <rect x={-1.6} y={-23} width={3.2} height={9} rx={1.6} fill={WHEEL} />
    </g>
  );
}
