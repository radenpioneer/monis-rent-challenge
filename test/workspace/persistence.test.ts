import assert from "node:assert/strict";
import test from "node:test";
import { STARTER_RENTAL } from "../../src/workspace/rental";
import {
  clearPersistedRental,
  PERSISTED_RENTAL_KEY,
  PERSISTED_RENTAL_VERSION,
  readPersistedRental,
  savePersistedRental,
} from "../../src/workspace/persistence";
import type { Rental } from "../../src/workspace/types";

class MemoryStorage {
  private readonly values = new Map<string, string>();

  getItem(key: string) {
    return this.values.get(key) ?? null;
  }

  setItem(key: string, value: string) {
    this.values.set(key, value);
  }

  removeItem(key: string) {
    this.values.delete(key);
  }
}

const RETURNING_RENTAL: Rental = {
  workspace: {
    deskId: "mechanical-adjustable-desk",
    chairId: "compact-task-chair",
    chairPosition: { x: 0.25, y: 0.8 },
    placed: [
      { productId: "office-monitor-24", positions: [{ x: 0.2, y: 0.4 }] },
      { productId: "smart-desk-lamp", positions: [{ x: 0.7, y: 0.3 }] },
    ],
  },
  areaId: "ubud",
  deliveryDate: "2026-08-24",
  cycle: "monthly",
  duration: 3,
};

test("restores a returning visitor's workspace and rental", () => {
  const storage = new MemoryStorage();

  savePersistedRental(RETURNING_RENTAL, storage);

  assert.deepEqual(readPersistedRental(storage), RETURNING_RENTAL);
});

test("uses the starter Rental when saved data is corrupt or from another version", () => {
  const corruptStorage = new MemoryStorage();
  corruptStorage.setItem(PERSISTED_RENTAL_KEY, "not json");

  const oldStorage = new MemoryStorage();
  oldStorage.setItem(
    PERSISTED_RENTAL_KEY,
    JSON.stringify({ version: PERSISTED_RENTAL_VERSION + 1, rental: RETURNING_RENTAL }),
  );

  const invalidWorkspaceStorage = new MemoryStorage();
  invalidWorkspaceStorage.setItem(
    PERSISTED_RENTAL_KEY,
    JSON.stringify({
      version: PERSISTED_RENTAL_VERSION,
      rental: {
        ...RETURNING_RENTAL,
        workspace: {
          ...RETURNING_RENTAL.workspace,
          placed: [
            {
              productId: "office-monitor-24",
              positions: [
                { x: 0.2, y: 0.4 },
                { x: 0.4, y: 0.4 },
                { x: 0.6, y: 0.4 },
              ],
            },
          ],
        },
      },
    }),
  );

  const tooManyMonitorsStorage = new MemoryStorage();
  tooManyMonitorsStorage.setItem(
    PERSISTED_RENTAL_KEY,
    JSON.stringify({
      version: PERSISTED_RENTAL_VERSION,
      rental: {
        ...RETURNING_RENTAL,
        workspace: {
          ...RETURNING_RENTAL.workspace,
          placed: [
            {
              productId: "office-monitor-24",
              positions: [
                { x: 0.2, y: 0.4 },
                { x: 0.4, y: 0.4 },
              ],
            },
            {
              productId: "multimedia-monitor-27",
              positions: [
                { x: 0.6, y: 0.4 },
                { x: 0.8, y: 0.4 },
              ],
            },
          ],
        },
      },
    }),
  );

  assert.deepEqual(readPersistedRental(corruptStorage), STARTER_RENTAL);
  assert.deepEqual(readPersistedRental(oldStorage), STARTER_RENTAL);
  assert.deepEqual(readPersistedRental(invalidWorkspaceStorage), STARTER_RENTAL);
  assert.deepEqual(readPersistedRental(tooManyMonitorsStorage), STARTER_RENTAL);
});

test("treats unavailable storage as an empty first visit", () => {
  const unavailableStorage = {
    getItem() {
      throw new Error("Storage is unavailable");
    },
    setItem() {
      throw new Error("Storage is unavailable");
    },
    removeItem() {
      throw new Error("Storage is unavailable");
    },
  };

  assert.deepEqual(readPersistedRental(unavailableStorage), STARTER_RENTAL);
  assert.doesNotThrow(() => savePersistedRental(RETURNING_RENTAL, unavailableStorage));
  assert.doesNotThrow(() => clearPersistedRental(unavailableStorage));
});

test("clears the saved Rental on reset", () => {
  const storage = new MemoryStorage();
  savePersistedRental(RETURNING_RENTAL, storage);

  clearPersistedRental(storage);

  assert.equal(storage.getItem(PERSISTED_RENTAL_KEY), null);
});
