/**
 * number数组求和
 * @param arr 
 * @example
 * sum([1, 2, 3]) // 6
 */
export function sum(arr: Array<number>): number
/**
 * 求和(累加)
 * @param arr 
 * @param valueSelector 
 * @returns 
 * @example
 * sum([{age:10},{age:20},{age:30}], x=>x.age) // 60
 */
export function sum<T>(arr: Array<T>, valueSelector: (v: T) => number): number
export function sum<T>(arr: Array<T>, valueSelector?: (v: T) => number): number {
    return arr.reduce((p, c) => p + (valueSelector ? valueSelector(c) : <number>c), 0);
}

/**
 * number数组平均数
 * @param arr
 * @example
 * average([1,2,3])  // 4
 */
export function average(arr: Array<number>): number
/**
 * 自定义数据求平均数
 * @param arr 
 * @param valueSelector
 * @returns 
 * 
 * @example
 * average(["1","2","3"], x =>  Number.parseInt(x)) // 4
 */
export function average<T>(arr: Array<T>, valueSelector: (v: T) => number): number
export function average<T>(arr: Array<T>, valueSelector?: (v: T) => number): number {
    if (arr.length < 1) return 0;

    return arr.reduce((p, c) => p + (valueSelector ? valueSelector(c) : <number>c) / arr.length, 0);
}

/**
 * 数量(计数)
 * @param arr 
 * @param predicate
 * @returns 
 * 
 * @example
 * count([1,2,3], x=>x>1) // 2
 * 
 * 当predicate为空时统计数组长度
 * count([1,2,3]) // 3
 */
export function count<T>(arr: Array<T>, predicate?: (v: T) => boolean) {
    return predicate ?
        arr.reduce((p, c) => predicate(c) ? ++p : p, 0) :
        arr.length
}

export function take<T>(arr: Array<T>, amount: number) {
    if (amount < 1) return [];
    return arr.slice(0, amount);
}

export function takeLast<T>(arr: Array<T>, amount: number) {
    if (amount < 1) return [];
    return arr.slice(-amount);
}

export function takeWhile<T>(arr: Array<T>, predicate: (v: T) => boolean) {
    const result = new Array<T>();
    let flag = false;

    for (let i = 0; i < arr.length; i++) {
        if (predicate(arr[i])) flag = true;

        if (flag) result.push(arr[i]);
    }

    return result;
}

export function skip<T>(arr: Array<T>, amount: number) {
    if (amount < 1) return [];
    return arr.slice(amount);
}

export function skipLast<T>(arr: Array<T>, amount: number) {
    if (amount < 1) return [];
    return arr.slice(0, -amount)
}

export function skipWhile<T>(arr: Array<T>, predicate: (v: T) => boolean) {
    const result = new Array<T>();

    for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        if (predicate(arr[i])) break;

        result.push(item);
    }

    return result;
}

/**
 * 分组
 * @param arr 
 * @param keySelector
 * @example
 * const datas = [{num:1,foo:"f"},{num:1,foo:"f"},{num:2,foo:"1"}];
 * array.groupBy(datas, x=>x.num);
 * 
 * 结果类型 : Map<number,Array<{num:number,foo:string}>>
 * 结果数据 : 
 *           1 -> [{num:1,foo:"f"},{num:2,foo:"1"}]
 *           2 -> [{num:1,foo:"f"}]
 */
export function groupBy<T, K>(arr: Array<T>, keySelector: (v: T) => K): Map<K, Array<T>>

/**
 * 分组
 * @param arr 
 * @param keySelector 
 * @param valueSelector 
 * @example
 * const datas = [{num:1,foo:"f"},{num:1,foo:"f"},{num:2,foo:"1"}];
 * array.groupBy(datas, x=>x.num, x=>x.foo);
 * 
 * 结果类型 : Map<number,Array<string>>
 * 结果数据 : 
 *           1 -> ['f','1']
 *           2 -> ['f']
 */
export function groupBy<T, K, V>(arr: Array<T>, keySelector: (v: T) => K, valueSelector: (v: T) => V): Map<K, Array<V>>
export function groupBy<T, K, V>(arr: Array<T>, keySelector: (v: T) => K, valueSelector?: (v: T) => V) {

    const result = new Map<K, Array<V | T>>();

    arr.forEach((v) => {
        const key = keySelector(v);
        const value = valueSelector ? valueSelector(v) : v;
        if (result.has(key))
            result.get(key)?.push(value);
        else
            result.set(key, [value]);
    });

    return result;
}

/**
 * 聚合
 * @param lArr 聚合数组
 * @param rArr 被聚合数组
 * @param lKeySelector 
 * @param rKeySelector 
 * @param resultSelector 
 * @param compare 比较器
 * @returns 
 * @example
 * const lArr = [1,2,3,4,5];
 * const rArr = [{id:1,foo:'f'},{id:1,foo:'ff'},{id:3,foo:'fff'}];
 * 
 * array.join(lArr, rArr, x=>x, x=>x.id,
 *      (v1,v2s)=>{ return {id:v1, foos:v2s.map(v=>v.foo)}},
 *      (k1,k2) => k1===k2);
 * 结果：
 *      [
 *        { id:1, foos: ['f','ff']},
 *        { id:2, foos: []},
 *        { id:3, foos: ['fff']},
 *        { id:4, foos: []},
 *        { id:5, foos: []},
 *      ]
 * 
 */
export function join<TLeft, TRight, TKey, TResult>(
    lArr: Array<TLeft>,
    rArr: Array<TRight>,
    lKeySelector: (v: TLeft) => TKey,
    rKeySelector: (v: TRight) => TKey,
    resultSelector: (vL: TLeft, vRArray: Array<TRight>) => TResult,
    compare: (k1: TKey, k2: TKey) => boolean = (k1, k2) => k1 === k2) {

    const result = new Array<TResult>();

    for (let i = 0; i < lArr.length; i++) {
        const vL = lArr[i];
        const kL = lKeySelector(vL);

        const vRArr = new Array<TRight>();

        for (let j = 0; j < rArr.length; j++) {
            const vR = rArr[j];
            const kR = rKeySelector(vR);

            if (compare(kL, kR))
                vRArr.push(vR);
        }

        result.push(resultSelector(vL, vRArr));
    }

    return result;
}