export interface CardOptions{
    /**
     * 是否判断校验码正确性
     */
    parity?:boolean
}

export interface PasswordOptions{
    /**
     * 最小长度
     * 默认 : 6 
     * throw : <1
     */
    minLength?: number,

    /**
     * 最大长度
     * 默认 : 30
     * throw : <minLength
     */
    maxLength?: number,

    /**
     * 区分大小写
     * 默认 : false
     */
    caseSensitive?: boolean,

    /**
     * 包含数字
     * 默认 : true
     */
    includeNummber?: boolean,

    /**
     * 包含特殊字符
     * 默认 : false
     */
    includeSpecialChars?: boolean,
}