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
    });

    test("getCities not include tw", () => {
        const cities = common.getCities({ tw: false });
        expect(cities).not.toHaveProperty("91");
        expect(cities).not.toHaveProperty("71");
    })
});