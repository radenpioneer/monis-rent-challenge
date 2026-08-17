import { SCENE } from "@/workspace/zones";

const LEAF = "M0,0 C22,-30 60,-32 76,-6 C60,20 22,22 0,0 Z";

/**
 * The room the Workspace sits in. Static scenery — nothing here comes from
 * Workspace state, and nothing here is positioned through a Zone.
 */
export function Room() {
  return (
    <g>
      <defs>
        <linearGradient id="room-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCFAF6" />
          <stop offset="100%" stopColor="#F0EAE0" />
        </linearGradient>
        <linearGradient id="room-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EFE8DE" />
          <stop offset="100%" stopColor="#E0D6C8" />
        </linearGradient>
        <linearGradient id="room-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D6EDEF" />
          <stop offset="100%" stopColor="#F6FCFB" />
        </linearGradient>
        <clipPath id="room-glass">
          <rect x={124} y={104} width={252} height={202} rx={6} />
        </clipPath>
      </defs>

      <rect x={0} y={0} width={SCENE.width} height={SCENE.horizon} fill="url(#room-wall)" />
      <rect
        x={0}
        y={SCENE.horizon}
        width={SCENE.width}
        height={SCENE.height - SCENE.horizon}
        fill="url(#room-floor)"
      />
      <rect x={0} y={SCENE.horizon - 24} width={SCENE.width} height={24} fill="#F4EEE5" />
      <line
        x1={0}
        y1={SCENE.horizon}
        x2={SCENE.width}
        y2={SCENE.horizon}
        stroke="#DCD2C2"
        strokeWidth={2}
      />

      {/* Daylight falling through the window. */}
      <polygon points="170,440 400,440 300,700 30,700" fill="#FFF7E4" opacity={0.55} />

      {/* The rug covers the whole furniture footprint, so nothing floats. */}
      <polygon points="300,505 900,505 760,735 160,735" fill="#E7C3AC" />
      <polygon
        points="321.6,518.8 861.6,518.8 738.4,721.2 198.4,721.2"
        fill="none"
        stroke="#D6AE95"
        strokeWidth={3}
      />

      <rect
        x={110}
        y={90}
        width={280}
        height={230}
        rx={14}
        fill="#FFFFFF"
        stroke="#E8E1D6"
        strokeWidth={3}
      />
      <rect x={124} y={104} width={252} height={202} rx={6} fill="url(#room-sky)" />
      <g clipPath="url(#room-glass)">
        <path
          d="M362,306 C356,250 340,220 316,196"
          fill="none"
          stroke="#6FA894"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <g fill="#7FB89F" opacity={0.75}>
          <path d={LEAF} transform="translate(316 196) rotate(-160)" />
          <path d={LEAF} transform="translate(322 214) rotate(-105)" />
          <path d={LEAF} transform="translate(332 240) rotate(-45)" />
          <path d={LEAF} transform="translate(350 272) rotate(200)" />
        </g>
      </g>
      <line x1={250} y1={104} x2={250} y2={306} stroke="#FFFFFF" strokeWidth={9} />
      <line x1={124} y1={205} x2={376} y2={205} stroke="#FFFFFF" strokeWidth={9} />

      {/* Rattan pendant — a light Bali cue without turning the room into a diorama. */}
      <line x1={1010} y1={0} x2={1010} y2={132} stroke="#CFC4B2" strokeWidth={3} />
      <path
        d="M954,196 Q1010,104 1066,196 Z"
        fill="#E4C393"
        stroke="#D2AC77"
        strokeWidth={3}
        strokeLinejoin="round"
      />
      <path d="M968,180 Q1010,124 1052,180" fill="none" stroke="#D2AC77" strokeWidth={2} />
      <path d="M978,166 Q1010,134 1042,166" fill="none" stroke="#D2AC77" strokeWidth={2} />
      <circle cx={1010} cy={202} r={8} fill="#FFF3D6" />
    </g>
  );
}
