import { describe, expect, test } from "vitest";
import * as common from './common';


describe("common", () => {
    test("getCities", () => {
        const cities = common.getCities();
        expect(cities).toHaveLength(34);
        expect(cities).not.toHaveProperty("91");
    });

    test("getCities not include sar", () => {
        const cities = common.getCities({ sar: false });
        expect(cities).not.toHaveProperty("91");
        expect(cities).not.toHaveProperty("81");
        expect(cities).not.toHaveProperty("82");
        expect(cities.length).toBe(32);
    });

    test("getCities not include tw", () => {
        const cities = common.getCities({ tw: false });
        expect(cities).not.toHaveProperty("91");
        expect(cities).not.toHaveProperty("71");
        expect(cities.length).toBe(33);
    });

    test("composeUrlQuery", () => {
        expect(common.composeUrlQuery(undefined)).toBe("");
        expect(common.composeUrlQuery({})).toBe("");
        expect(common.composeUrlQuery({ test: "" })).toBe("test=");
        expect(common.composeUrlQuery({ test: 123 })).toBe("test=123");
        expect(common.composeUrlQuery({ test: undefined })).toBe("");
        expect(common.composeUrlQuery({ test: undefined, t: true })).toBe("t=true");
        expect(common.composeUrlQuery({search:"foo",desc:true})).toBe("search=foo&desc=true");
    });
});