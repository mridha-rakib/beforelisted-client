import assert from "node:assert/strict";
import test from "node:test";
import { isValidRenterRegistrationName } from "../lib/registrationName";

test("renter signup requires at least two name words", () => {
  for (const name of ["", "   ", "Riley", "  Riley  "]) assert.equal(isValidRenterRegistrationName(name), false);
  for (const name of ["Riley Example", "  Riley   De Example  ", "Riley\tDe La Example"]) assert.equal(isValidRenterRegistrationName(name), true);
});
