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