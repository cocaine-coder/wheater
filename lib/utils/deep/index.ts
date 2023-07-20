export function deepClone<T>(value: T): T {
    if (value === null) return value;
    if (value instanceof Date) return new Date(value) as any;
    if (value instanceof RegExp) return new RegExp(value) as any;
    if (typeof value !== "object") return value;

    let cloneValue = new (value as any).constructor();
    for (let key in value) {
        if (value.hasOwnProperty(key)) {
            cloneValue[key] = deepClone(value[key]);
        }
    }
    return cloneValue;
}

export function deepSetProps<T extends object>(src: T, dest: T) {
    if (src === undefined || src === null) {
        dest = src;
    }

    for (const prop in src) {
        const value = src[prop];

        if (value !== null && typeof value === 'object') {
            if (!dest[prop])
                dest[prop] = new (value as any).constructor();

            deepSetProps(value as any, dest[prop]);
        } else
            dest[prop] = value;
    }
}