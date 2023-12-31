import { average, count, sum, take, takeLast, takeWhile, skip, skipLast, skipWhile, groupBy, join, first } from '.'
import { describe, expect, test } from "vitest";

describe("array extensions", () => {

    test("average", () => {
        expect(average([1, 2, 3])).toBe(2);
        expect(average([{ age: 12 }, { age: 13 }, { age: 14 }], x => x.age)).toBe(13);
        expect(average([], x => 1)).toBe(0);
    });

    test("count", () => {
        expect(count([1, 2, 3])).toBe(3);
        expect(count([1, 2, 3], x => x > 1)).toBe(2);
    });

    test("sum", () => {
        expect(sum([1, 2, 3])).toBe(6);
        expect(sum([1, 2, 3], undefined, x => x > 1)).toBe(5);
        expect(sum([1, 2, 3], x => x * 2)).toBe(12);
        expect(sum([1, 2, 3], x => x % 2)).toBe(2);

        expect(sum([{ age: 12 }, { age: 13 }, { age: 14 }], x => x.age)).toBe(39);
        expect(sum([{ age: 12 }, { age: 17 }, { age: 18 }], x => x.age, x => x.age >= 18)).toBe(18);
    });

    test("first", () => {
        expect(first([1, 2, 3])).toBe(1);
        expect(first([1, 2, 3], x => x > 1)).toBe(2);
        expect(first([1, 2, 3], x => x < 0)).toBeUndefined();
    })

    test("take", () => {
        const arr = [1, 2, 3];
        expect(take(arr, 2)).toStrictEqual([1, 2]);
        expect(take(arr, 0)).toStrictEqual([]);
        expect(take(arr, -1)).toStrictEqual([]);
    });

    test("takeLast", () => {
        const arr = [1, 2, 3];
        expect(takeLast(arr, 2)).toStrictEqual([2, 3]);
        expect(takeLast(arr, 0)).toStrictEqual([]);
        expect(takeLast(arr, -1)).toStrictEqual([]);
    });

    test("takeWhile", () => {
        expect(takeWhile([1, 2, 3], x => x > 1)).toStrictEqual([2, 3]);
    });

    test("skip", () => {
        const arr = [1, 2, 3];
        expect(skip(arr, 2)).toStrictEqual([3]);
        expect(skip(arr, 0)).toStrictEqual([]);
        expect(skip(arr, -1)).toStrictEqual([]);
    });

    test("skipLast", () => {
        const arr = [1, 2, 3];
        expect(skipLast(arr, 2)).toStrictEqual([1]);
        expect(skipLast(arr, 0)).toStrictEqual([]);
        expect(skipLast(arr, -1)).toStrictEqual([]);
    });

    test("skipWhile", () => {
        expect(skipWhile([1, 2, 3], x => x > 1)).toStrictEqual([1]);
    });

    test("groupBy", () => {
        const persons = [
            { name: 'james', num: 23 },
            { name: 'jordan', num: 23 },
            { name: 'tracy', num: 1 }
        ]

        expect(groupBy(persons, x => x.num)).toStrictEqual(new Map([
            [23, [{ name: 'james', num: 23 }, { name: 'jordan', num: 23 }]],
            [1, [{ name: 'tracy', num: 1 }]]
        ]));

        expect(groupBy(persons, x => x.num, x => x.name)).toStrictEqual(new Map([
            [23, ["james", "jordan"]],
            [1, ['tracy']]
        ]));
    });

    test("join", () => {
        const dates = ['2023-01-01', '2023-01-02', '2023-01-03'];
        const logs = [
            { date: '2023-01-01', msg: '1' },
            { date: '2023-01-01', msg: '2' },
            { date: '2023-01-01', msg: '3' },
            { date: '2023-01-01', msg: '4' },
            { date: '2023-01-02', msg: '5' },
            { date: '2023-01-02', msg: '6' },
        ]

        expect(join(dates, logs, x => x, x => x.date, (vl, vrArr) => {
            return { date: vl, msgs: vrArr.map(x => x.msg) };
        })).toStrictEqual([
            {
                date: '2023-01-01',
                msgs: ['1', '2', '3', '4']
            }, {
                date: '2023-01-02',
                msgs: ['5', '6']
            }, {
                date: '2023-01-03',
                msgs: []
            }
        ])
    });
});