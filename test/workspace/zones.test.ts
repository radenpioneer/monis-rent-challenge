import assert from "node:assert/strict";
import test from "node:test";
import { workspaceReducer } from "../../src/workspace/reducer";
import type { Workspace } from "../../src/workspace/types";
import { nudgePosition } from "../../src/workspace/zones";

test("nudges a Position by one normalized step in each arrow direction", () => {
  assert.deepEqual(nudgePosition({ x: 0.5, y: 0.5 }, "ArrowLeft"), { x: 0.45, y: 0.5 });
  assert.deepEqual(nudgePosition({ x: 0.5, y: 0.5 }, "ArrowRight"), { x: 0.55, y: 0.5 });
  assert.deepEqual(nudgePosition({ x: 0.5, y: 0.5 }, "ArrowUp"), { x: 0.5, y: 0.45 });
  assert.deepEqual(nudgePosition({ x: 0.5, y: 0.5 }, "ArrowDown"), { x: 0.5, y: 0.55 });
});

test("does not nudge a Position outside its Zone bounds", () => {
  assert.deepEqual(nudgePosition({ x: 0, y: 0 }, "ArrowLeft"), { x: 0, y: 0 });
  assert.deepEqual(nudgePosition({ x: 1, y: 1 }, "ArrowRight"), { x: 1, y: 1 });
  assert.deepEqual(nudgePosition({ x: 0, y: 0 }, "ArrowUp"), { x: 0, y: 0 });
  assert.deepEqual(nudgePosition({ x: 1, y: 1 }, "ArrowDown"), { x: 1, y: 1 });
});

test("a nudge and drag to the same Position produce the same Workspace", () => {
  const workspace: Workspace = {
    deskId: "electrical-adjustable-desk",
    chairId: "ergonomic-office-chair",
    chairPosition: { x: 0.5, y: 0.5 },
    placed: [],
  };
  const dragTarget = { x: 0.55, y: 0.5 };
  const nudgeTarget = nudgePosition(workspace.chairPosition, "ArrowRight");

  assert.deepEqual(nudgeTarget, dragTarget);
  assert.deepEqual(
    workspaceReducer(workspace, { type: "moveChair", position: nudgeTarget }),
    workspaceReducer(workspace, { type: "moveChair", position: dragTarget }),
  );
});
