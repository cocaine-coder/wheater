export function average<T>(arr: Array<T>, valueSelector: (v: T) => number) {
    if (arr.length < 1) return 0;

    return sum(arr, valueSelector) / arr.length;
}

export function count<T>(arr: Array<T>, predicate?: (v: T) => boolean) {
    return predicate ?
        arr.reduce((p, c) => predicate(c) ? ++p : p, 0) :
        arr.length
}

export function sum<T>(arr: Array<T>, valueSelector: (v: T) => number) {
    return arr.reduce((p, c) => p + valueSelector(c), 0);
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

export function groupBy<T, K>(arr: Array<T>, keySelector: (v: T) => K): Map<K, Array<T>>
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

export function join<TLeft, TRight, TKey, TResult>(
    lArr: Array<TLeft>,
    rArr: Array<TRight>,
    lKeySelector: (v: TLeft) => TKey,
    rKeySelector: (v: TRight) => TKey,
    resultSelector: (vL: TLeft, vRArray: Array<TRight>) => TResult,
    compare: (v1: TKey, v2: TKey) => boolean = (v1, v2) => v1 === v2) {

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