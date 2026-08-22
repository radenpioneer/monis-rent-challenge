"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ProductAsset } from "@/catalog/assets";
import { getProduct, type PlaceableId, type ProductId } from "@/catalog/products";
import { isMonitor, isOnDesktop, isOnFloor } from "@/workspace/constraints";
import type { Position, Workspace } from "@/workspace/types";
import {
  DESKTOP_ZONE,
  FLOOR_ZONE,
  SCENE,
  clampPosition,
  nudgePosition,
  project,
  roundCoord,
  unproject,
  type ArrowKey,
  type Point,
  type Zone,
} from "@/workspace/zones";
import { Room } from "./room";

/** One copy of one Placed Product, resolved to the point it is drawn at. */
type PlacedCopy = {
  key: string;
  productId: PlaceableId;
  copy: number;
  position: Position;
  point: Point;
};

type Dragging = { stop: () => void };
type FloorCopy = { key: string; productId: ProductId; point: Point; copy?: number };

/** Evening light is painted over the existing room, then punctuated by the
 * screens and lamp that are actually in this Workspace. Keeping it decorative
 * means it cannot affect the room's placement or drag model. */
function NightAtmosphere({
  monitors,
  lamp,
  filterId,
}: {
  monitors: PlacedCopy[];
  lamp: PlacedCopy | undefined;
  filterId: string;
}) {
  return (
    <g aria-hidden="true">
      <defs>
        <filter id={filterId} x="-40%" y="-80%" width="180%" height="260%">
          <feGaussianBlur stdDeviation="22" />
        </filter>
      </defs>

      {/* The room darkens as a whole; its materials stay visible instead of
          being mechanically recoloured into a second application theme. */}
      <rect x={0} y={0} width={SCENE.width} height={SCENE.height} fill="#101722" opacity={0.62} />

      {monitors.map((monitor) => (
        <g key={monitor.key} transform={at(monitor.point)}>
          <ellipse cx={0} cy={-96} rx={86} ry={72} fill="#78BCE6" opacity={0.24} filter={`url(#${filterId})`} />
          <rect x={-58} y={-136} width={116} height={68} rx={8} fill="#B8DCF2" opacity={0.58} />
          <path d="M-54,-130 H-3 L-54,-82 Z" fill="#E9F6FF" opacity={0.26} />
        </g>
      ))}

      {lamp ? (
        <g transform={at(lamp.point)}>
          <ellipse cx={26} cy={-44} rx={122} ry={58} fill="#FFCC7A" opacity={0.24} filter={`url(#${filterId})`} />
          <path d="M-74,-5 L116,-5 L72,58 L-114,58 Z" fill="#FFD58B" opacity={0.28} />
          <rect x={16} y={-157} width={42} height={10} rx={5} fill="#FFF0C9" opacity={0.95} />
        </g>
      ) : null}
    </g>
  );
}

/**
 * Every copy of every Placed Product belonging to one Zone, back to front.
 *
 * Sorting by the Position's depth is what lets a keyboard overlap the foot of
 * the monitor behind it instead of disappearing under it. Layering between
 * Zones is fixed rather than sorted: the desk is drawn first, then the floor,
 * then the desktop.
 */
function copiesIn(
  workspace: Workspace,
  zone: Zone,
  belongsHere: (productId: PlaceableId) => boolean,
): PlacedCopy[] {
  return workspace.placed
    .filter((entry) => belongsHere(entry.productId))
    .flatMap((entry) =>
      entry.positions.map((position, copy) => ({
        key: `${entry.productId}-${copy}`,
        productId: entry.productId,
        copy,
        position,
      })),
    )
    .sort((a, b) => a.position.y - b.position.y)
    .map(({ key, productId, copy, position }) => ({
      key,
      productId,
      copy,
      position,
      point: project(zone, position),
    }));
}

function at(point: Point) {
  return `translate(${roundCoord(point.x)} ${roundCoord(point.y)})`;
}

function pointAt(svg: SVGSVGElement, clientX: number, clientY: number): Point {
  const rect = svg.getBoundingClientRect();
  return {
    x: ((clientX - rect.left) / rect.width) * SCENE.width,
    y: ((clientY - rect.top) / rect.height) * SCENE.height,
  };
}

function positionAt(
  svg: SVGSVGElement,
  zone: Zone,
  clientX: number,
  clientY: number,
  grabOffset: Point,
): Position {
  const pointer = pointAt(svg, clientX, clientY);
  return clampPosition(
    unproject(zone, { x: pointer.x - grabOffset.x, y: pointer.y - grabOffset.y }),
  );
}

/** What the room holds, for a screen reader that cannot see it. */
function describe(workspace: Workspace): string {
  const contents = [
    getProduct(workspace.deskId).name,
    getProduct(workspace.chairId).name,
    ...workspace.placed.map((entry) => {
      const { name } = getProduct(entry.productId);
      return entry.positions.length > 1 ? `${entry.positions.length} × ${name}` : name;
    }),
  ];

  return `A workspace containing ${contents.join(", ")}.`;
}

function DraggableAsset({
  transform,
  label,
  selected,
  onSelect,
  onNudge,
  onPointerDown,
  productId,
}: {
  transform: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onNudge: (key: ArrowKey) => void;
  onPointerDown: (event: ReactPointerEvent<SVGGElement>) => void;
  productId: ProductId;
}) {
  function selectWithKeyboard(event: ReactKeyboardEvent<SVGGElement>) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
      return;
    }

    if (
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight" ||
      event.key === "ArrowUp" ||
      event.key === "ArrowDown"
    ) {
      event.preventDefault();
      onSelect();
      onNudge(event.key);
    }
  }

  return (
    <g
      transform={transform}
      className="placed-product cursor-grab touch-none active:cursor-grabbing"
      role="button"
      tabIndex={0}
      aria-label={`Select ${label}. Use arrow keys to move it.`}
      aria-pressed={selected}
      data-selected={selected || undefined}
      onKeyDown={selectWithKeyboard}
      onPointerDown={(event) => {
        onSelect();
        onPointerDown(event);
      }}
    >
      <ProductAsset productId={productId} />
      {selected ? (
        <g aria-hidden="true" className="pointer-events-none">
          <rect x={-54} y={-392} width={108} height={30} rx={15} fill="#F9F2EA" stroke="#2B2721" />
          <text
            x={0}
            y={-371}
            fill="#2B2721"
            fontSize={18}
            fontWeight={600}
            textAnchor="middle"
          >
            Selected
          </text>
        </g>
      ) : null}
    </g>
  );
}

/**
 * The room, drawn from Workspace state. One inline SVG with a single viewBox,
 * per ADR-0001, so the whole scene scales with its container without any
 * Position moving relative to the furniture.
 *
 * Objects are translated to their projected point and drawn upright — the
 * Zone's skew is never applied to an object's own group.
 */
export function WorkspaceScene({
  workspace,
  onMoveChair,
  onMoveProduct,
  interactive = true,
  night = false,
}: {
  workspace: Workspace;
  onMoveChair: (position: Position) => void;
  onMoveProduct: (productId: PlaceableId, copy: number, position: Position) => void;
  /** A review screen needs the same room as a visual record, not a second drag surface. */
  interactive?: boolean;
  /** The builder can preview the same Workspace after dark without changing its chrome. */
  night?: boolean;
}) {
  const dragging = useRef<Dragging | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const nightGlowId = useId().replaceAll(":", "");

  useEffect(() => () => dragging.current?.stop(), []);

  function startDrag(
    event: ReactPointerEvent<SVGGElement>,
    zone: Zone,
    origin: Point,
    onDrop: (position: Position) => void,
  ) {
    if (dragging.current || !event.isPrimary) return;

    const target = event.currentTarget;
    const svg = target.ownerSVGElement;
    if (!svg) return;
    const pointer = pointAt(svg, event.clientX, event.clientY);
    const grabOffset = { x: pointer.x - origin.x, y: pointer.y - origin.y };

    const update = (pointer: PointerEvent) => {
      const position = positionAt(svg, zone, pointer.clientX, pointer.clientY, grabOffset);
      target.setAttribute("transform", at(project(zone, position)));
      return position;
    };
    const stop = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", finish);
      window.removeEventListener("pointercancel", finish);
      if (target.hasPointerCapture(event.pointerId)) target.releasePointerCapture(event.pointerId);
      dragging.current = null;
    };
    const finish = (pointer: PointerEvent) => {
      if (pointer.pointerId !== event.pointerId) return;
      const position = update(pointer);
      stop();
      onDrop(position);
    };
    const move = (pointer: PointerEvent) => {
      if (pointer.pointerId === event.pointerId) update(pointer);
    };

    event.preventDefault();
    target.setPointerCapture(event.pointerId);
    dragging.current = { stop };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", finish);
    window.addEventListener("pointercancel", finish);
  }
  const chairPoint = project(FLOOR_ZONE, workspace.chairPosition);
  const onFloor = copiesIn(workspace, FLOOR_ZONE, isOnFloor);
  const onDesktop = copiesIn(workspace, DESKTOP_ZONE, isOnDesktop);
  const lamp = onDesktop.find((copy) => copy.productId === "smart-desk-lamp");
  const floor: FloorCopy[] = [
    { key: "chair", productId: workspace.chairId, point: chairPoint },
    ...onFloor,
  ].sort((a, b) => a.point.y - b.point.y);

  return (
    <svg
      viewBox={`0 0 ${SCENE.width} ${SCENE.height}`}
      className="block h-auto w-full"
      role="group"
      aria-label={describe(workspace)}
    >
      <Room />

      {/* The desk has fixed Placement, so it is drawn at the desktop Zone's
          origin rather than projected. Floor objects follow it so they can
          never disappear behind the desk; desktop objects are always last. */}
      <g transform={`translate(${DESKTOP_ZONE.origin.x} ${DESKTOP_ZONE.origin.y})`}>
        <ProductAsset productId={workspace.deskId} />
      </g>

      {floor.map((copy) =>
        copy.copy === undefined && interactive ? (
          <DraggableAsset
            key={copy.key}
            transform={at(copy.point)}
            label={getProduct(copy.productId).name}
            productId={copy.productId}
            selected={selectedKey === copy.key}
            onSelect={() => setSelectedKey(copy.key)}
            onNudge={(key) => onMoveChair(nudgePosition(workspace.chairPosition, key))}
            onPointerDown={(event) => startDrag(event, FLOOR_ZONE, copy.point, onMoveChair)}
          />
        ) : (
          <g key={copy.key} transform={at(copy.point)}>
            <ProductAsset productId={copy.productId} />
          </g>
        ),
      )}

      {onDesktop.map((copy) =>
        isMonitor(copy.productId) && interactive ? (
          <DraggableAsset
            key={copy.key}
            transform={at(copy.point)}
            label={getProduct(copy.productId).name}
            productId={copy.productId}
            selected={selectedKey === copy.key}
            onSelect={() => setSelectedKey(copy.key)}
            onNudge={(key) =>
              onMoveProduct(copy.productId, copy.copy, nudgePosition(copy.position, key))
            }
            onPointerDown={(event) =>
              startDrag(event, DESKTOP_ZONE, copy.point, (position) =>
                onMoveProduct(copy.productId, copy.copy, position),
              )
            }
          />
        ) : (
          <g key={copy.key} transform={at(copy.point)}>
            <ProductAsset productId={copy.productId} />
          </g>
        ),
      )}

      {night ? (
        <NightAtmosphere
          monitors={onDesktop.filter((copy) => isMonitor(copy.productId))}
          lamp={lamp}
          filterId={nightGlowId}
        />
      ) : null}
    </svg>
  );
}
