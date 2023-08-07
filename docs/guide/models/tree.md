# tree
实现了一个节点带有id属性的树，提供获取节点、删除节点、遍历节点等操作。

## 创建
```ts
import { models } from 'wheater'
const tree = new models.Tree<ITestTreeNodeProps>({
    id: 0,
    name: "0",
    children: [
        {
            id: 1,
            name: "1",
        }, {
            id: 2,
            name: "2",
            children: [
                {
                    id: 3,
                    name: "3"
                }
            ]
        }
    ]
});
```

## getNodesByLevel
获取指定level的节点
```ts
tree.getNodesByLevel(1);

/**
 * [{ id:1, name:"1"}, { id:2, name:"2",children:[{ id:3, name:"3"}]}]
 */

tree.getNodesByLevel(3);
/**
 * [{ id:3, name:"3"}]
 */
```

## getNodeById
通过id获取节点
```ts
tree.getNodeById(1);  // { id:1, name:"1"}
tree.getNodeById(2);  // { id:2, name:"2",children:[{ id:3, name:"3"}]}
tree.getNodeById(-1); // undefined
```

## delNodeById
通过id删除节点
```ts
tree.delNodeById(1);
```

## traverse
遍历所有节点
```ts
tree.traverse((n,l,p)=>{
    n; // 节点
    l; // 等级
    p; // 父级节点
});
```