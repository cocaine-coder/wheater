import { toDateOnly, addDays, addMonths, addYears, formatDate, getNearDays, getNearinDays } from '.';
import { describe, expect, test } from "vitest";

describe("time", () => {
    test("formatDate", () => {
        const dateString = "1997-04-14 12:00:06";
        const date = new Date(dateString);

        expect(formatDate(date, "yyyy-MM-dd")).toBe("1997-04-14");
        expect(formatDate(date, 'HH:mm:ss')).toBe("12:00:06");
        expect(formatDate(date, 'yyyy-MM-dd HH:mm:ss')).toBe("1997-04-14 12:00:06");
        expect(formatDate(date, 'yyyy年MM月dd日')).toBe("1997年04月14日");
        expect(formatDate(date, 'yyyy年MM月dd日 HH:mm:ss')).toBe("1997年04月14日 12:00:06");

        expect(formatDate(dateString, 'yyyy-MM-dd')).toBe("1997-04-14");
        expect(() => formatDate("2022-14-02", 'yyyy-MM-dd')).toThrowError("Date Invalid");
    });

    test("toDateOnly", () => {
        const date = new Date("1997-04-14 12:00:06");
        expect(toDateOnly(date)).toBe(19970414);
    });

    test("addDays", () => {
        const date = new Date("1997-04-30 12:00:06");
        expect(addDays(date, 1)).toStrictEqual(new Date("1997-05-01 12:00:06"));
        expect(addDays(date, 0)).toStrictEqual(date);
        expect(addDays(date, -1)).toStrictEqual(new Date("1997-04-29 12:00:06"))
    });

    test("addMonths", () => {
        const date = new Date("1997-12-30 12:00:06");
        expect(addMonths(date, 1)).toStrictEqual(new Date("1998-01-30 12:00:06"));
        expect(addMonths(date, 0)).toStrictEqual(new Date("1997-12-30 12:00:06"));
        expect(addMonths(date, -1)).toStrictEqual(new Date("1997-11-30 12:00:06"));
    });

    test("addYears", () => {
        const date = new Date("1997-12-30 12:00:06");
        expect(addYears(date, 1)).toStrictEqual(new Date("1998-12-30 12:00:06"));
        expect(addYears(date, 0)).toStrictEqual(new Date("1997-12-30 12:00:06"));
        expect(addYears(date, -1)).toStrictEqual(new Date("1996-12-30 12:00:06"));
    });

    test("getNearDays", () => {
        const date = new Date("1997-04-30");
        expect(getNearDays(date, 0)).toStrictEqual([]);
        expect(getNearDays(date, 2)).toStrictEqual([new Date("1997-05-01"), new Date("1997-05-02")]);
        expect(getNearDays(date, -2)).toStrictEqual([new Date("1997-04-28"), new Date("1997-04-29")]);
        expect(getNearDays(date, 2, "yyyy-MM-dd")).toStrictEqual(["1997-05-01", "1997-05-02"]);
        expect(getNearDays(date, -2, "yyyy-MM-dd")).toStrictEqual(["1997-04-28", "1997-04-29"]);

        expect(()=>getNearDays(date, 1.2)).toThrowError();
    })

    test("getNearinDays", () => {
        const date = new Date("1997-04-30");
        expect(getNearinDays(date, 0)).toStrictEqual([date]);
        expect(getNearinDays(date, 2)).toStrictEqual([date, new Date("1997-05-01"), new Date("1997-05-02")]);
        expect(getNearinDays(date, -2)).toStrictEqual([new Date("1997-04-28"), new Date("1997-04-29"), date]);
        expect(getNearinDays(date, 2, "yyyy-MM-dd")).toStrictEqual(["1997-04-30", "1997-05-01", "1997-05-02"]);
        expect(getNearinDays(date, -2, "yyyy-MM-dd")).toStrictEqual(["1997-04-28", "1997-04-29", "1997-04-30"]);

        expect(()=>getNearinDays(date, 1.2)).toThrow();
    });
});