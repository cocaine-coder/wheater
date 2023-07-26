import { describe, expect, test } from "vitest";
import * as creator from '.';


describe("creator",()=>{
    test("uuid",()=>{
        expect(creator.uuid()).not.toBeNull();
        expect(creator.uuid({uppercase:true}).split('').every(x=>x === x.toLocaleUpperCase())).toBeTruthy();
        expect(creator.uuid({separator:false}).split('').some(x=>x === '-')).toBeFalsy();
    });
})