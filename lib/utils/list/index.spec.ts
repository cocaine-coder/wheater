import List from '.';
import { describe, test, expect } from 'vitest';

function getList123() {
    return new List([1, 2, 3]);
}

describe("linq for js/ts", () => {
    test("count", () => {
        expect(getList123().count).toBe(3);
    });

    test("toArray", () => {
        const arr = getList123().toArray();
        expect(arr).toStrictEqual([1, 2, 3]);
    });

    test("at", () => {
        const list = getList123();

        expect(list.at(0)).toBe(1);
        expect(list.at(-1)).toBe(3);
        expect(list.at(3)).toBeUndefined();
    });

    test("append", () => {
        expect(getList123().append(4, 5).toArray())
            .toStrictEqual([1, 2, 3, 4, 5]);
    });

    test("prepend", () => {
        expect(getList123().prepend(-1, 0).toArray())
            .toStrictEqual([-1, 0, 1, 2, 3]);
    });

    test("prepend", () => {
        expect(getList123().removeAt(0).toArray())
            .toStrictEqual([2, 3]);
    });

    test("where", () => {
        expect(getList123().where(x => x > 1).toArray())
            .toStrictEqual([2, 3]);
    });

    test("select", () => {
        expect(getList123().select(x => (x + 1).toString()).toArray())
            .toStrictEqual(["2", "3", "4"]);
    });

    test("groupBy", () => {
        const persons = new List([
            { name: "green", age: 23 },
            { name: 'james', age: 23 },
            { name: "tracy", age: 22 },
        ]);

        expect(persons.groupBy(x => x.age))
            .toStrictEqual(new Map<number, Array<{ name: string, age: number }>>([
                [23, [{ name: "green", age: 23 }, { name: 'james', age: 23 }]],
                [22, [{ name: "tracy", age: 22 }]]
            ]));
    });

    test("groupBy with valueSelector", () => {
        const persons = new List([
            { name: "green", age: 23 },
            { name: 'james', age: 23 },
            { name: "tracy", age: 22 },
        ]);

        expect(persons.groupBy(x => x.age, x => x.name))
            .toStrictEqual(new Map<number, Array<string>>([
                [23, ["green", "james"]],
                [22, ["tracy"]]
            ]));
    });

    test("sum", () => {
        expect(getList123().sum()).toBe(3);
    });

    test("sum with valueSelector", () => {
        expect(getList123().sum(x => x)).toBe(6);
    });

    test("take", () => {
        expect(getList123().take(2).toArray())
            .toStrictEqual([1, 2]);
    });

    test("takeLast", () => {
        expect(getList123().takeLast(2).toArray())
            .toStrictEqual([2, 3]);
    });

    test("takeWhile", () => {
        expect(new List([1, 4, 3, 2, 1]).takeWhile(x => x > 1).toArray())
            .toStrictEqual([4, 3, 2, 1]);
    });

    test("skip", () => {
        expect(getList123().skip(2).toArray())
            .toStrictEqual([3]);
    });

    test('skipLast', () => {
        expect(getList123().skipLast(1).toArray())
            .toStrictEqual([1, 2]);
    });

    test("skipWhile", () => {
        expect(new List([1, 4, 3, 2, 1]).skipWhile(x => x > 1).toArray())
            .toStrictEqual([1]);
    });

    test("any without predicate : length > 0", () => {
        expect(new List([]).any()).toBe(false);
        expect(getList123().any()).toBe(true);
    });

    test("any with predicate", () => {
        expect(getList123().any(x => x > 1)).toBe(true);
        expect(getList123().any(x => x < 0)).toBe(false);
    });

    test("all", () => {
        expect(getList123().all(x => x > 0)).toBe(true);
        expect(getList123().all(x => x > 1)).toBe(false);
    });

    test("first without predicate : get first item of array", () => {
        expect(getList123().first()).toBe(1);
        expect(new List([]).first()).toBeUndefined();
    });

    test("first with predicate", () => {
        expect(getList123().first(x => x > 1)).toBe(2);
        expect(getList123().first(x => x < 0)).toBeUndefined();
    });
});