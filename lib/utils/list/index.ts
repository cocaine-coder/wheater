type ArrayCallBack<T, R> = (value: T, index: number, list: T[]) => R;

type PredicateType<T> = ArrayCallBack<T, boolean>;

export default class List<T> {
    protected _items: T[];

    *[Symbol.iterator]() {
        for (let item of this._items) {
            yield item
        }
    }

    get count() {
        return this._items.length;
    }

    constructor(items: T[] = []) {
        this._items = [...items]
    }

    toArray() {
        return [...this._items];
    }

    at(index: number) {
        return this._items.at(index);
    }

    append(...items: T[]) {
        this._items.push(...items);

        return this;
    }

    prepend(...items: T[]) {
        this._items.unshift(...items);

        return this;
    }

    removeAt(index: number) {
        this._items.splice(index, 1);
        return this;
    }

    where(predicate: PredicateType<T>) {
        return new List(this._items.filter(predicate));
    }

    select<R>(callbackfn: ArrayCallBack<T, R>) {
        return new List(this._items.map(callbackfn));
    }

    groupBy<K>(keySelector: (v: T) => K): Map<K, Array<T>>
    groupBy<K, V>(keySelector: (v: T) => K, valueSelector: (v: T) => V): Map<K, Array<V>>
    groupBy<K, V>(keySelector: (v: T) => K, valueSelector?: (v: T) => V) {
        const result = new Map<K, Array<V | T>>();

        this._items.forEach((v) => {
            const key = keySelector(v);
            const value = valueSelector ? valueSelector(v) : v;
            if (result.has(key))
                result.get(key)?.push(value);
            else
                result.set(key, [value]);
        });

        return result;
    }

    sum(valueSelector?: ArrayCallBack<T, number>) {
        return valueSelector ?
            this._items.reduce((p, c, i, arr) => p + valueSelector(c, i, arr), 0) :
            this.count;
    }

    take(amount: number) {
        return new List(this._items.slice(0, Math.max(0, amount)));
    }

    takeLast(amount: number) {
        return new List(this._items.slice(-Math.max(0, amount)))
    }

    takeWhile(predicate: PredicateType<T>) {
        const result = new List<T>();
        let flag = false;

        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (predicate(item, i, this._items)) flag = true;

            if (flag) result.append(item);
        }

        return result;
    }

    skip(amount: number) {
        return new List(this._items.slice(Math.max(0, amount)))
    }

    skipLast(amount: number) {
        return new List(this._items.slice(0, -Math.max(0, amount)))
    }

    skipWhile(predicate: PredicateType<T>) {
        const result = new List<T>();

        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (predicate(item, i, this._items)) break;

            result.append(item);
        }

        return result;
    }

    any(predicate?: PredicateType<T>) {
        if (!predicate) return this._items.length > 0;

        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (predicate(item, i, this._items))
                return true;
        }

        return false;
    }

    all(predicate: PredicateType<T>) {
        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (!predicate(item, i, this._items))
                return false;
        }

        return true;
    }

    first(predicate?: PredicateType<T>) {
        if (!predicate) return this._items.at(0);

        for (let i = 0; i < this._items.length; i++) {
            const item = this._items[i];
            if (predicate(item, i, this._items))
                return item;
        }
    }
}