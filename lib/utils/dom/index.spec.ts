import { describe, expect, test } from "vitest";
import { createHtmlElement } from '.';
import jsdom from 'jsdom';

const dom = new jsdom.JSDOM(`<!doctype html><html lang="en"></html>`);
global.document = dom.window.document;

describe("dom", () => {
    test("create html element", () => {
        const input = createHtmlElement('input', [], [], {
            attributes: { value: "asdf" }
        });

        expect(input.value).toBe("asdf");
    });

    test("onclick", () => {
        let num = 0;
        const buttom = createHtmlElement('button', [], [], {
            onClick: () => { num++; }
        });

        buttom.click();

        expect(num).toBe(1);
    })
});