export function clone<T>(value: T): T {
    if (value === null) return value;
    if (value instanceof Date) return new Date(value) as any;
    if (value instanceof RegExp) return new RegExp(value) as any;
    if (typeof value !== "object") return value;

    let cloneValue = new (value as any).constructor();
    for (let key in value) {
        if (value.hasOwnProperty(key)) {
            cloneValue[key] = clone(value[key]);
        }
    }
    return cloneValue;
}

export function equal<T>(a: T, b: T) {
    if (a === b) return true;

    if (a && b && typeof a === 'object' && typeof b === 'object') {
        // 数组
        if (a instanceof Array && b instanceof Array) {
            if (a.length !== b.length) return false;

            for (let i = 0; i < a.length; i++) {
                if (!equal(a[i], b[i])) return false;
            }

            return true;
        }

        // Date
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();

        // RegExp
        if (a instanceof RegExp && b instanceof RegExp)
            return a.source === b.source && a.flags === b.flags;

        if (a instanceof Map && b instanceof Map) {
            const keys = a.keys();
            let k = keys.next();

            while(!k.done){
                if(!b.has(k.value)) return false;
                if(!equal(a.get(k.value),b.get(k.value))) return false;
                k = keys.next();
            }

            return true;
        }

        // other object
        const aKeys = Object.keys(a);
        const bKeys = Object.keys(b);
        if (!equal(aKeys, bKeys)) return false;

        for (let i = 0; i < aKeys.length; i++) {
            const key = aKeys[i];
            if (!equal((a as any)[key], (b as any)[key])) return false;
        }

        return true;
    }

    return a !== a && b !== b;
}

export function setProps<T extends object>(src: T, dest: T) {
    for (const prop in src) {
        const value = src[prop];

        if (value instanceof Date) dest[prop] = new Date(value) as any;
        else if (value instanceof RegExp) dest[prop] = new RegExp(value) as any;
        else if (value !== null && typeof value === 'object') {
            if (!dest[prop])
                dest[prop] = new (value as any).constructor();

            setProps(value as any, dest[prop]);
        } else {
            dest[prop] = value;
        }
    }
}