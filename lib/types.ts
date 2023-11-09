export interface IPageResponse<T> {
    data: T[],
    total: number,
    page: number,
    count: number
}

export type TPageRequest<T> = {
    page: number,
    count: number
} & T;


export type TTreeNode<T> = {
    [P in keyof T]: T[P]
} & {
    children?: Array<TTreeNode<T>>
}

export type TUrlQuery = Record<string,string | number | boolean | undefined>;

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };