import { cities } from '../common';
import { CardOptions, PasswordOptions } from './type';

export namespace os {
    /**
     * 判断当前设备是否为移动端
     * @returns 
     */
    export function isMobile() {
        if(typeof window === "undefined") return false;
        return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) !== null;
    }
}

/**
 * url检验
 * @param value 
 * @returns 
 */
export function url(value:string){
    return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(value);
}

/**
 * 邮箱检验
 * @param value
 * @returns 
 */
export function email(value: string) {
    return /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(value);
}

/**
 * 手机号检验
 * @param value 
 * @returns 
 */
export function phone(value: string) {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(value);
}

/**
 * 身份证检验
 * @param value
 * @param options
 * @returns 
 */
export function card(value: string, options: CardOptions = {}) {
    options.parity ??= true;

    // 检查号码规范 长度和类型
    if (! /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(value)) return false;

    // 检查省份
    if (!(cities as any)[value.substring(0, 2)]) return false;

    // 检查出生日期
    const reg = value.length === 15 ?
        /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/ :
        /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    const dates = value.match(reg)!;
    const date = new Date((value.length === 15 ? '19' : '') +
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
 * 密码验证
 * @param value
 * @param options
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

    let regStr = '^';
    regStr += options.includeNummber ? '(?=.*[0-9])' : '';
    regStr += options.caseSensitive ? '(?=.*[A-Z])(?=.*[a-z])' : '(?=.*[a-zA-Z])';
    regStr += options.includeSpecialChars ? '(?=.*[^a-zA-Z0-9])' : '';

    const reg = new RegExp(regStr + `.{${options.minLength},${options.maxLength}}$`);
    return reg.test(value);
}

/**
 * 判断value是否为数字
 * @param value 
 * @returns 
 */
export function numberic(value:any) : boolean{
    return !(value instanceof Array) && (value - parseFloat(value) + 1) >= 0;
}