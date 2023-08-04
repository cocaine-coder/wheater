# Tree
简陋的树形节点描述

## TTreeNode\<T\>  

```ts
type SomeTreeNode = TTreeNode<{id:string, label:string}>;
```
等效于
```ts
type SomeTreeNode = {
    id : string,
    label : string,
    children : SomeTreeNode[]
}

```

