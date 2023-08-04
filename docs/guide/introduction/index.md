# wheater ？

## 其实没有这个单词

起初，它叫 `wheat`  
但是，`npm`已有相同的包名  
所以，加了个`er`  
后来，发现可以被解释为`wheat` + `er` 或者 `w` + `heater`  
那么，您可以理解为`成熟的麦子`或者`麦子走向成熟`  
最后，它的发音 `惠特儿`

## 做了什么事儿 ？

将开发中经常用到的函数、类型、逻辑，总结汇总。  
如 : 数组求和 `wheater.array.sum()`    
很多人会想使用 `reduce` 不就完了嘛，是的，这个封装方法确实使用 `reduce` 实现的
```ts
const nums = [1, 2, 3];
const sum = nums.reduce((p, c) => p+c, 0);
```
但是我想要的更多

```ts
import { array } from 'wheater';

const persons = [
    { age: 10 },
    { age: 20 },
    { age: 30 },
    { age: 40 }
]

const sum = array.sum(persons, p => p.age, p => p.age>18); // 90
```
当然，这个函数实现了其他的重载
```ts
array.sum([1, 2, 3]); // 6
array.sum([1, 2, 3], x => x%2); //2
```