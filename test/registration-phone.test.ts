import assert from "node:assert/strict";
import { test } from "node:test";

import { isValidRegistrationPhone } from "../lib/registrationPhone";

test("registration phone requires at least ten digits and accepts existing formats", () => {
  for (const value of ["", "   ", "abc", "123", "123-456-789x", "555123\n4567"])
    assert.equal(isValidRegistrationPhone(value), false);
  for (const value of ["5551234567", "(555) 123-4567", "+1 555 123 4567"])
    assert.equal(isValidRegistrationPhone(value), true);
});
