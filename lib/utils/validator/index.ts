import { cities } from '../common';

export function email(email: string) {
    return /^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/.test(email);
}

export function phone(phone: string) {
    return /^[1][3,4,5,7,8][0-9]{9}$/.test(phone);
}

export function card(card: string, options: { parity?: boolean } = {}) {
    options.parity ??= true;

    if (!card) return false;

    // 检查号码规范 长度和类型
    if (! /(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(card)) return false;

    // 检查省份
    if (!(cities as any)[card.substring(0, 1)]) return false;

    // 检查出生日期
    const reg = card.length === 15 ?
        /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/ :
        /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
    const dates = card.match(reg)!;
    const date = new Date(card.length === 15 ? '19' : '' +
        `${dates[2]}-${dates[3]}-${dates[4]}`);

    if (!(date instanceof Date) || isNaN(date.getTime()))
        return false;

    if (card.length === 18 && options.parity) {
        const arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
        const arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');

        let temp = 0;
        for (let i = 0; i < 17; i++) {
            temp += Number.parseInt(card[i]) * arrInt[i];
        }

        if (arrCh[temp % 11] !== card[17].toLocaleUpperCase()) return false;
    }

    return true;
}

export function isMobile() {
    return window.navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}