import { chars } from "../common";
import { UUIDOptions, ValidateCodeOptions } from "./type";

/**
 * 创建uuid
 * @returns uuid
 */
export function uuid(options: UUIDOptions = {}): string {
    options.separator ??= true;

    let d: number = new Date().getTime();
    let result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    if (options.uppercase) result = result.toLocaleUpperCase();
    if (!options.separator) result = result.replace(/-/g, '');

    return result;
}

/**
 * 创建随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 
 */
export function randomInt(min: number, max: number) {
    return parseInt((Math.random() * (max - min + 1) + min).toString());
}


/**
 * 创建验证码
 * @param options 
 * @returns 
 */
export function validateCode(options: ValidateCodeOptions = {}): string {
    options.length ??= 4;
    if (options.length < 4)
        options.length = 4;

    const values = chars.num;
    if (options.letter) {
        values.push(...chars.letterLower);
        if (options.caseSensitive) {
            values.push(...chars.letterUpper);
        }
    }

    let ret = '';

    for (let i = 0; i < options.length; i++) {
        ret += values[randomInt(0, values.length - 1)];
    }

    return ret;
}