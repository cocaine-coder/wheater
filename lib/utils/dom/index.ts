import { DeepPartial } from "../../types";
import { setProps } from "../deep";

/**
 * 创建dom
 * @param target 
 * @param classNames 
 * @param children 
 * @param options 
 * @returns 
 */
export function createHtmlElement<K extends keyof HTMLElementTagNameMap>(target: K, classNames?: string[], children?: (Node | string)[], options?: {
    attributes?: Record<string, string>,
    onClick?: (e: MouseEvent, element: HTMLElementTagNameMap[K]) => void,
    onChange?: (e: Event, element: HTMLElementTagNameMap[K]) => void,
    onInit?: (element: HTMLElementTagNameMap[K]) => void
}) {
    const element = document.createElement(target);
    if (children)
        element.append(...children);
    if (classNames)
        element.classList.add(...classNames);

    if (options) {
        const { attributes, onClick, onChange, onInit } = options;

        if (attributes)
            for (let key in attributes)
                element.setAttribute(key, attributes[key]);

        if (onClick)
            element.onclick = e => onClick(e, element);

        if (onChange)
            element.onchange = e => onChange(e, element);

        onInit?.(element);
    }

    return element;
}

/**
 * 复制到剪切板
 * @param textToCopy 
 * @returns 
 */
export function copyToClipboard(textToCopy: string) {
    // navigator clipboard 需要https等安全上下文
    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard 向剪贴板写文本
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // 创建text area
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // 使text area不在viewport，同时设置不可见
        textArea.style.position = "absolute";
        textArea.style.opacity = "0";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise<void>((res, rej) => {
            // 执行复制命令并移除文本框
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}