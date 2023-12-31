import { TUrlQuery } from "../types";

export const cities = {
    11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古",
    21: "辽宁", 22: "吉林", 23: "黑龙江",
    31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东",
    41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆",
    51: "四川", 52: "贵州", 53: "云南", 54: "西藏",
    61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆",
    71: "台湾",
    81: "香港", 82: "澳门",
    91: "国外"
}

interface GetCitiesOptions {
    /**
     * 特别行政区 
     * 默认 : true
     */
    sar?: boolean,

    /**
     * 台湾
     * 默认 : true
     */
    tw?: boolean
}

/**
 * 获取中国所有的城市以及编码
 * @param options 
 * @returns 
 */
export function getCities(options: GetCitiesOptions = {}) {
    options.sar ??= true;
    options.tw ??= true;

    let results = new Array<string>();

    for (let prop in cities) {
        const num = Number.parseInt(prop);
        if (!options.sar && (num === 81 || num === 82))
            continue;

        if (!options.tw && num === 71)
            continue;

        if (num < 91) {
            results.push((cities as any)[prop])
        }
    }

    return results;
}

/**
 * 拼凑url query参数，如果query为空或者query每一项都为空返回 ''
 * @param query 参数
 * @returns 
 */
export function composeUrlQuery(query?: TUrlQuery) {
    let ret = "";

    if (query) {
        for (const key in query) {
            const value = query[key];

            if (value !== undefined)
                ret += `${key}=${value}&`;
        }

        if (ret)
            ret = ret.slice(0, ret.length - 1);
    }

    return ret;
}

export namespace chars {
    export const num = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    export const letterLower = 'abcdefghijklmnopqrstuvwxyz'.split('');
    export const letterUpper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
}