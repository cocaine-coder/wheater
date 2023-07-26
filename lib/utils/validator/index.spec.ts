// @vitest-environment jsdom

import * as validator from '.';
import { describe, expect, test } from "vitest";

describe("validator", () => {
    test("os isMobile", () => {
        expect(validator.os.isMobile()).toBeFalsy();
    });

    test("email", () => {
        expect(validator.email("21345678@qq.com")).toBeTruthy();
        expect(validator.email("Qwer1234@qq.com")).toBeTruthy();
        expect(validator.email("123123123qq.com")).toBeFalsy();
        expect(validator.email("123.1231@qq.com")).toBeFalsy();
        expect(validator.email("123@123q@qq.com")).toBeFalsy();
        expect(validator.email("1234,214@qq.com")).toBeFalsy();
        expect(validator.email("123213123112@qq")).toBeFalsy();
        expect(validator.email("1232131311@.com")).toBeFalsy();
    });

    test("phone", () => {
        expect(validator.phone("18361226754")).toBeTruthy();
        expect(validator.phone("13456")).toBeFalsy();
        expect(validator.phone("13456M")).toBeFalsy();
        expect(validator.phone("13456.")).toBeFalsy();
        expect(validator.phone("183612267541")).toBeFalsy();
    });

    test("card", () => {
        expect(validator.card("440923197209250033")).toBeTruthy();
        expect(validator.card("440923197209250031", { parity: false })).toBeTruthy();
        expect(validator.card("510112780502302")).toBeTruthy();

        // 长度问题
        expect(validator.card("440923197")).toBeFalsy();

        // 省份错误
        expect(validator.card("490923197209250033")).toBeFalsy();

        // 字母问题
        expect(validator.card("44a923197209250033")).toBeFalsy();

        // 日期问题
        expect(validator.card("440923197202330033")).toBeFalsy();

        // 校验码问题
        expect(validator.card("440923197209250031")).toBeFalsy();
    });

    test("password", () => {
        // 密码默认 长度大于6小于30 包含数字 不区分大小写
        expect(validator.password("1234qwer")).toBeTruthy();
        expect(validator.password("1234Qwer")).toBeTruthy();
        expect(validator.password("测试123qwer")).toBeTruthy();
        expect(validator.password("123123123")).toBeFalsy();
        expect(validator.password("qwerasdf")).toBeFalsy();
        expect(validator.password("1q")).toBeFalsy();
        expect(validator.password("123456789012345678901234567890qwer")).toBeFalsy();

        // 不校验数字
        expect(validator.password("qwerqwer", { includeNummber: false })).toBeTruthy();

        // 校验大小写
        expect(validator.password("1234qwer", { caseSensitive: true })).toBeFalsy();
        expect(validator.password("A1234qwer", { caseSensitive: true })).toBeTruthy();

        // 校验特殊字符
        expect(validator.password("1234qwer", { includeSpecialChars: true })).toBeFalsy();
        expect(validator.password("1234_qwer", { includeSpecialChars: true })).toBeTruthy();

        // 最小长度小于1 throw异常
        expect(() => validator.password("1234qwer", { minLength: 0 })).toThrow();

        // 设置最小长度小于6
        expect(validator.password("123qw", { minLength: 4 })).toBeTruthy();

        // 最小长度大于最大长度 throw异常
        expect(() => validator.password("123qwer", { minLength: 60 })).toThrow();
    });
});