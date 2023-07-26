import { UUIDOptions } from "./type";

/**
 * 创建uuid
 * @returns uuid
 */
export function uuid(options: UUIDOptions = {}): string {
    options.separator ??= true;

    let d: number = new Date().getTime();
    let result = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });

    if(options.uppercase) result = result.toLocaleUpperCase();
    if(!options.separator) result = result.replace(/-/g,'');
    
    return result;
}