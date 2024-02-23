import { describe, expect, test } from "vitest";
import { clone, equal, setProps } from '.';

describe("deep clone", () => {
    test("null", () => {
        expect(clone(null)).toBeNull();
    });

    test("boolean", () => {
        expect(clone(true)).toBe(true);
        expect(clone(false)).toBe(false);
    });

    test("string", () => {
        expect(clone("")).toBe("");
        expect(clone("asdf")).toBe("asdf");
    });

    test("number", () => {
        expect(clone(1)).toBe(1);
    });

    test("Date", () => {
        const date = new Date("2022-12-12");
        const copy = clone(date);

        expect(copy === date).toBe(false);
        expect(copy).toStrictEqual(date);
    });

    test("RegExp", () => {
        const reg = new RegExp(/f/);
        const copy = clone(reg);

        expect(copy === reg).toBe(false);
        expect(copy).toStrictEqual(reg);
    })

    test("object", () => {
        const value = { a: 1, b: { c: "123" } };
        const copy = clone(value);

        expect(value === copy).toBe(false);
        expect(copy).toStrictEqual(value);
    });
});

describe("deep equal", () => {
    test("boolean", () => {
        expect(equal(true, true)).toBe(true);
        expect(equal(false, false)).toBe(true);
        expect(equal(true, false)).toBe(false);
        expect(equal(false, true)).toBe(false);
    });

    test("string", () => {
        expect(equal("1234", "1234")).toBe(true);
        expect(equal("", "")).toBe(true);
        expect(equal("1234", "")).toBe(false);
        expect(equal("", "1234")).toBe(false);
    });

    test("number", () => {
        expect(equal(1234, 1234)).toBe(true);
        expect(equal(0, 0)).toBe(true);
        expect(equal(1234, 0)).toBe(false);
        expect(equal(0, 1234)).toBe(false);
    });

    test("Date", () => {
        expect(equal(new Date("2022-02-02"), new Date("2022-02-02"))).toBe(true);
        expect(equal(new Date("2022-02-02 12:00:00"), new Date("2022-02-02 12:00:00"))).toBe(true);
        expect(equal(new Date("2022-02-02"), new Date("2022-02-01"))).toBe(false);
        expect(equal(new Date("2022-02-02 12:00:00"), new Date("2022-02-02 12:00:01"))).toBe(false);
    });

    test("Map", () => {
        const value1 = new Map<number, string>([
            [1, "1"],
            [2, "2"]
        ]);

        const value2 = new Map<number, string>([
            [1, "1"],
            [2, "2"]
        ]);

        const value3 = new Map<number, string>([
            [3, "1"],
            [1, "2"],
        ]);

        expect(equal(value1, value2)).toBeTruthy();
        expect(equal(value1, value3)).toBeFalsy();
    });

    test("array", () => {
        expect(equal([1, 2, 3], [1, 2, 3])).toBeTruthy();
        expect(equal([1, 2, 3], [1, 3, 2])).toBeFalsy();
        expect(equal([1, 2, 3], [1, 2, 3, 4])).toBeFalsy();
    });

    test("RegExp", () => {
        expect(equal(new RegExp(/t/g), new RegExp(/t/g))).toBeTruthy();
        expect(equal(new RegExp(/t/), new RegExp(/t/g))).toBeFalsy();
    });

    test("other object", () => {
        const value1 = {
            a: 1,
            b: { c: new Date('2022-02-02') }
        };

        const value2 = {
            a: 1,
            b: { c: new Date('2022-02-02') }
        };

        const value3 = {
            a: 1,
            b: { c: new Date('2022-02-01') }
        };

        expect(equal(value1, value2)).toBe(true);
        expect(equal(value1, value3)).toBe(false);
    });

    test("geojson", () => {
        expect(equal({
            "coordinates": [
                120.84871754050255,
                31.270265910875892
            ],
            "type": "Point"
        }, {
            "type": "Point",
            "coordinates": [
                120.84871754050255,
                31.270265910875892
            ]
        })).toBe(true);
    });
});

describe("deep setProps", () => {
    test("object", () => {
        const value1 = { a: 1, b: "123", c: { d: 123, e: new Date("2022-02-02") } };
        const value2 = { a: 2, b: "456", c: { d: 789, e: new Date() } };

        setProps(value1, value2);
        expect(value1 === value2).toBe(false);
        expect(value1.c.e === value2.c.e).toBe(false);
        expect(value2).toStrictEqual(value1);
    });

    test("skip empty", () => {
        const srcValue = { a: 1, b: 2, c: undefined as { d: number } | undefined };
        const destValue = { a: 2, b: 1, c: { d: 3 } };

        setProps(srcValue, destValue, { skipEmpty: true });
        expect(srcValue === destValue).toBe(false);
        expect(destValue.a).toBe(1);
        expect(destValue.b).toBe(2);
        expect(destValue.c.d).toBe(3);
    });
});
