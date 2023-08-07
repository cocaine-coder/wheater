# page

为分页请求设计

## TPageRequest\<T\>
构造分页请求参数
```ts
type SomePageRequest = TPageRequest<{search?:string}>

```
等效于

```ts
type SomePageRequest = {
    page : number,
    count : number,
    search? : string
}

```

## IPageResponse\<T\>
分页请求结果
```ts
type SomePageResponse = IPageResponse<{name:string,age:number}>

```
等效于
```ts
type SomePageResponse = {
    data: {name:string,age:number}[],
    total: number,
    page: number,
    count: number
}

```