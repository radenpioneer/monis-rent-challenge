"use client";

import {
  useEffect,
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
  project,
  roundCoord,
  unproject,
  type Point,
  type Zone,
} from "@/workspace/zones";
import { Room } from "./room";

/** One copy of one Placed Product, resolved to the point it is drawn at. */
type PlacedCopy = {
  key: string;
  productId: PlaceableId;
  copy: number;
  point: Point;
};

type Dragging = { stop: () => void };
type FloorCopy = { key: string; productId: ProductId; point: Point; copy?: number };

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
  onPointerDown,
  productId,
}: {
  transform: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  onPointerDown: (event: ReactPointerEvent<SVGGElement>) => void;
  productId: ProductId;
}) {
  function selectWithKeyboard(event: ReactKeyboardEvent<SVGGElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    onSelect();
  }

  return (
    <g
      transform={transform}
      className="placed-product cursor-grab touch-none active:cursor-grabbing"
      role="button"
      tabIndex={0}
      aria-label={`Select ${label}`}
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
}: {
  workspace: Workspace;
  onMoveChair: (position: Position) => void;
  onMoveProduct: (productId: PlaceableId, copy: number, position: Position) => void;
  /** A review screen needs the same room as a visual record, not a second drag surface. */
  interactive?: boolean;
}) {
  const dragging = useRef<Dragging | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

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
    </svg>
  );
}
