export type UUIDOptions = {
    /**
     * 大写
     * 默认 : false
     */
    uppercase?: boolean,

    /**
     * 带分隔符 -
     * 默认 : true
     */
    separator?: boolean
}

export type ValidateCodeOptions = {
    /**
     * 长度 最小4
     */
    length?: number,

    /**
     * 是否包含字母
     */
    letter?: boolean,

    /**
     * 区分大小写
     */
    caseSensitive?: boolean
}