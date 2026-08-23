import assert from "node:assert/strict";
import test from "node:test";
import { rentalEndDate } from "../../src/workspace/rental";

test("clamps monthly rentals to the target month's final day", () => {
  assert.equal(rentalEndDate("2027-01-31", 1, "monthly"), "2027-02-28");
});
