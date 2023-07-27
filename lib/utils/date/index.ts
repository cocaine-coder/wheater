/**
 * Date类型转换为年月日number类型
 * @param date 
 * @returns 
 * @example 
 * const dateOnly = toDateOnly(new Date('2022-02-02 02:22:22'));
 * console.log(dateOnly);  // 20220202
 */
export function toDateOnly(date: Date) {
    return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

/**
 * 增加一天
 * @param date 
 * @param days 
 * @returns 
 * @example
 * const date1 = addDays(new Date('2022-02-02 02:22:22'), 1);  // Date: 2022-02-03 02:22:22
 * const date2 = addDays(new Date('2022-02-02 02:22:22'), -1); // Date: 2022-02-01 02:22:22
 */
export function addDays(date: Date, days: number) {
    return new Date(new Date(date).setDate(date.getDate() + days));
}

/**
 * 增加一个月
 * @param date 
 * @param months 
 * @returns 
 * const date1 = addMonths(new Date('2022-02-02 02:22:22'), 1);  // Date: 2022-03-02 02:22:22
 * const date2 = addMonths(new Date('2022-02-02 02:22:22'), -1); // Date: 2022-01-02 02:22:22
 */
export function addMonths(date: Date, months: number) {
    return new Date(new Date(date).setMonth(date.getMonth() + months));
}

/**
 * 增加一年
 * @param date 
 * @param years 
 * @returns 
 * const date1 = addYears(new Date('2022-02-02 02:22:22'), 1);  // Date: 2023-02-02 02:22:22
 * const date2 = addYears(new Date('2022-02-02 02:22:22'), -1); // Date: 2021-02-02 02:22:22
 */
export function addYears(date: Date, years: number) {
    return new Date(new Date(date).setFullYear(date.getFullYear() + years));
}

type DateFormat = "yyyy-MM-dd" | "HH:mm:ss" | "yyyy-MM-dd HH:mm:ss" | "yyyy年MM月dd日" | "yyyy年MM月dd日 HH:mm:ss";

/**
 * Date格式化
 * @param date 
 * @param format 
 * @example
 * const date = new Date('2022-02-02 02:22:22');
 * console.log(formatDate(date,'yyyy-MM-dd'));           // '2022-02-02'
 * console.log(formatDate(date,'HH:mm:ss'));             // '02:22:22'
 * console.log(formatDate(date,'yyyy-MM-dd HH:mm:ss'));  // '2022-02-02 02:22:22'
 * 
 * console.log(formatDate('2022-02-02 02:22:22','yyyy-MM-dd'));  // '2022-02-02'
 * formatDate('2022-02-30','yyyy-MM-dd') // throw error : Date Invalid
 * @returns 
 */
export function formatDate(date: string | Date, format: DateFormat) {
    if (typeof date === 'string')
        date = new Date(date);

    if (!(date instanceof Date) || isNaN(date.getTime()))
        throw new Error("Date Invalid");

    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();

    const preArr = Array.apply(null, Array(10)).map( (_: any, index: number) => {
        return '0' + index;
    });

    const newTime = format.replace(/yyyy/g, year.toString())
        .replace(/MM/g, preArr[month] || month.toString())
        .replace(/dd/g, preArr[day] || day.toString())
        .replace(/HH/g, preArr[hour] || hour.toString())
        .replace(/mm/g, preArr[min] || min.toString())
        .replace(/ss/g, preArr[sec] || sec.toString());

    return newTime;
}

/**
 * 获取附近天数
 * @param originDate 基点日期
 * @param days 天数
 * @example
 * date.getNearDays(new Date('2022-02-02'), 2);   
 * 结果 : [Date:2022-02-03 , Date:2022-02-04]
 * 
 * date.getNearDays(new Date('2022-02-02'), -2);  
 * 结果 : [Date:2022-02-01 , Date:2022-01-31]
 */
export function getNearDays(originDate: Date, days: number): Array<Date>;
/**
 * 获取附近天数并格式化
 * @param originDate 
 * @param days 
 * @param format 
 * @example
 * date.getNearDays(new Date('2022-02-02'), 2, "yyyy-MM-dd");   
 * 结果 : ['2022-02-03' , '2022-02-04']
 * 
 * date.getNearDays(new Date('2022-02-02'), -2,"yyyy-MM-dd");  
 * 结果 : ['2022-02-01' , '2022-01-31']
 */
export function getNearDays(originDate: Date, days: number, format: DateFormat): Array<string>
export function getNearDays(originDate: Date, days: number, format?: DateFormat) {
    if (!Number.isInteger(days))
        throw Error("days must be integer");

    if (days === 0) return [];

    const startIndex = Math.min(days, days > 0 ? 1 : 0);
    const endIndex = Math.max(days, days < 0 ? -1 : 0);

    const dates = new Array<Date>();
    for (let i = startIndex; i <= endIndex; i++) {
        dates.push(addDays(originDate, i));
    }

    return format ? dates.map(d => formatDate(d, format)) : dates;
}

/**
 * 获取附近天数，包括基点日期
 * @param originDate 
 * @param days 
 * @example
 * date.getNearinDays(new Date('2022-02-02'), 2); 
 * 结果 : [Date:2022-02-02 , Date:2022-02-03 , Date:2022-02-04]
 * 
 * date.getNearinDays(new Date('2022-02-02'), -2);
 * 结果 : [Date:2022-01-31 , Date:2022-02-01 , Date:2022-02-02]
 */
export function getNearinDays(originDate: Date, days: number): Array<Date>;
/**
 * 获取附近天数，包括基点日期并格式化
 * @param originDate 
 * @param days 
 * @example
 * date.getNearinDays(new Date('2022-02-02'), 2, "yyyy-MM-dd"); 
 * 结果 : ['2022-02-02', '2022-02-03', '2022-02-04']
 * 
 * date.getNearinDays(new Date('2022-02-02'), -2, "yyyy-MM-dd");
 * 结果 : ['2022-01-31', '2022-02-01', '2022-02-02']
 */
export function getNearinDays(originDate: Date, days: number, format: DateFormat): Array<string>
export function getNearinDays(originDate: Date, days: number, format?: DateFormat) {
    if (!Number.isInteger(days))
        throw Error("days must be integer");
   
    if (days === 0) return [originDate];

    const startIndex = Math.min(days, 0);
    const endIndex = Math.max(days, 0);

    const dates = new Array<Date>();
    for (let i = startIndex; i <= endIndex; i++) {
        dates.push(addDays(originDate, i));
    }

    return format ? dates.map(d => formatDate(d, format)) : dates;
}