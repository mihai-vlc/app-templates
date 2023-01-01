import { expect, test } from "vitest";
import { add } from "./main";

test("add", function () {
    expect(add(2, 5)).toBe(7);
});
