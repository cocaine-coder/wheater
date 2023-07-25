import { cities } from '../common';
import { CardOptions, PasswordOptions } from './type';

/**
 * 邮箱检验
 * @param value 邮箱
 * @returns 
 */
export function email(value: string) {
    return /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(value);
}

/**
 * 手机号检验
 * @param value 手机号 
 * @returns 
 */
export function phone(value: string) {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
}

/**
 * 身份证检验
 * @param value 身份证号
 * @param options 检验选项
 * @returns 
 */
export function card(value: string, options: CardOptions = {}) {
    options.parity ??= true;

    if (!value) return false;

    // 检查号码规范 长度和类型
    if (! /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) return false;

    // 检查省份
    if (!(cities as any)[value.substring(0, 1)]) return false;

    // 检查出生日期
    const reg = value.length === 15 ?
        /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/ :
        /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    const dates = value.match(reg)!;
    const date = new Date(value.length === 15 ? '19' : '' +
        `${dates[2]}-${dates[3]}-${dates[4]}`);

    if (!(date instanceof Date) || isNaN(date.getTime()))
        return false;

    if (value.length === 18 && options.parity) {
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');

        let temp = 0;
        for (let i = 0; i < 17; i++) {
            temp += Number.parseInt(value[i]) * arrInt[i];
        }

        if (arrCh[temp % 11] !== value[17].toLocaleUpperCase()) return false;
    }

    return true;
}

/**
 * 判断当前设备是否为移动端
 * @returns 
 */
export function isMobile() {
    return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) !== null;
}

/**
 * 密码验证
 * @param value 密码
 * @param options 验证选项
 * @returns 
 */
export function password(value: string, options: PasswordOptions = {}) {
    options.minLength ??= 6;
    options.maxLength ??= 30;
    options.includeNummber ??= true;

    if (options.minLength < 1)
        throw Error(`minLength must greater than 1`);
    if (options.minLength < 6)
        console.warn(`password length < 6 maybe not safe`);
    if (options.maxLength < options.minLength)
        throw Error(`maxLength must >= minLength`);

    let regStr = options.includeNummber ? '(?=.*[0-9])' : '';
    regStr += options.caseSensitive ? '(?=.*[a-zA-Z])' : '(?=.*[A-Z])(?=.*[a-z])';
    regStr += options.includeSpecialChars ? '(?=.*[^a-zA-Z0-9])' : '';

    const reg = new RegExp(regStr + `.{${options.minLength},${options.maxLength}}`);
    return reg.test(value);
}