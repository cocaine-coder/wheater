import { describe, expect, test } from "vitest";
import { deepClone, deepSetProps } from '.';

describe("deep", () => {
    test("deepClone boolean", () => {
        expect(deepClone(true)).toBe(true);
        expect(deepClone(false)).toBe(false);
    });

    test("deepClone string", () => {
        expect(deepClone("")).toBe("");
        expect(deepClone("asdf")).toBe("asdf");
    });

    test("deepClone number", () => {
        expect(deepClone(1)).toBe(1);
    });

    test("deepClone Date", () => {
        const date = new Date("2022-12-12");
        const copy = deepClone(date);

        expect(copy === date).toBe(false);
        expect(copy).toStrictEqual(date);
    });

    test("deepClone object", () => {
        const value = { a: 1, b: { c: "123" } };
        const copy = deepClone(value);

        expect(value === copy).toBe(false);
        expect(copy).toStrictEqual(value);
    });

    test("deepSetProps", () => {
        const value1 = { a: 1, b: "123", c: { d: 123 } };
        const value2 = { a: 2, b: "456", c: { d: 789 } };

        deepSetProps(value1, value2);
        expect(value2).toStrictEqual(value1);
    });
});
