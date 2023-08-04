# Array 

## sum

#### number 数组求和

*参数*
```ts
function sum(
    arr: Array<number>, 
    valueSelector?: (v: number) => number, 
    predicate?: (v: number) => boolean): number
```

*示例*
```ts
import { array } from 'wheater';

const nums = [1, 2, 3];
array.sum(nums);                        // 6
array.sum(nums, x => x % 2);            // 2
array.sum(nums, undefined, x => x > 1); // 5
```

#### `overload` 其他数组求和

*参数*
```ts
function sum<T>(
    arr: Array<T>, 
    valueSelector: (v: T) => number, 
    predicate?: (v: T) => boolean): number
```

*示例*
```ts
import { array } from 'wheater';

const persons = [
    {name : "1", age : 10},
    {name : "2", age : 20},
    {name : "3", age : 30},
];

array.sum(persons, p => p.age);                  // 60   
array.sum(persons, p => p.age, p => p.age > 18); // 50
```

## average

求平均数，与 `sum` 方法使用一致

## count
统计数组数量

*参数*
```ts
function count<T>(
    arr: Array<T>, 
    predicate?: (v: T) => boolean): number
```

*示例*
```ts
import { array } from 'wheater';

const persons = [
    {name : "1", age : 10},
    {name : "2", age : 20},
    {name : "3", age : 30},
];

array.count(persons);                  // 3   
array.count(persons, p => p.age > 18); // 2
```

## first
返回第一个匹配到的元素，如果predicate为空则返回数组第一个元素。若全不匹配则返回   undefined

*参数*  
```ts
function first<T>(
    arr: Array<T>, 
    predicate?: (v: T) => boolean): T
```

*示例*
```ts
import { array } from 'wheater';

const persons = [
    {name : "1", age : 10},
    {name : "2", age : 20},
    {name : "3", age : 30},
];

array.first(persons, p => p.age > 18); // {name : "2", age : 20}
```

## take
从数组中获取 `amount` 数量元素，返回数组

*参数*
```ts
function take<T>(
    arr: Array<T>, 
    amount: number): Array<T>
```

*示例*
```ts
import { array } from 'wheater';

const nums = [1, 2, 3, 4];

array.take(nums, 3); // [1, 2, 3]
```

## takeLast
从数组尾部获取 `amount` 数量元素，返回数组

*参数*
```ts
function takeLast<T>(
    arr: Array<T>, 
    amount: number) : Array<T>
```

*示例*
```ts
import { array } from 'wheater';

const nums = [1, 2, 3, 4];

array.takeLast(nums, 3); // [2, 3, 4]
```

## takeWhile
当符合条件时，取剩下的元素返回数组

*参数*
```ts
function takeWhile<T>(
    arr: Array<T>, 
    predicate: (v: T) => boolean): Array<T>
```

*示例*
```ts
import { array } from 'wheater';

const nums = [1, 2, 3, 1];

array.takeWhile(nums, x => x > 2); // [3, 1]
```

## skip
跳过数组 `amount` 数量元素，取剩下元素返回数组。用法和 `take` 一致

## skipLast
跳过数组尾部 `amount` 数量元素，取剩下元素返回数组。用法和 `takeLast` 一致

## skipWhile
当符合条件时，跳过剩下的元素返回数组。用法和 `takeWhile` 一致

## groupBy
根据提供的 `key`，使用  `===` 对数组分组操作，返回Map

#### 分组返回 Map\<K, Array\<T\>\>

*参数*
```ts
function groupBy<T, K>(
    arr: Array<T>, 
    keySelector: (v: T) => K): Map<K, Array<T>>
```

*示例*
```ts
import { array } from 'wheater'

const persons = [
    {name : "1", age : 10},
    {name : "2", age : 20},
    {name : "3", age : 20},
];

array.groupBy(datas, x => x.age);
/**
 * 结果类型 : Map<number,Array<{name: string, age: number}>>
 * 结果数据 : 
 *           10 -> [{name : "1", age : 10}]
 *           20 => [{name : "2", age : 20}, {name : "3", age : 20}]
 */
```

#### `overload` 分组返回 Map\<K, Array\<V\>\>

*参数*
```ts
function groupBy<T, K, V>(
    arr: Array<T>, 
    keySelector: (v: T) => K, 
    valueSelector: (v: T) => V): Map<K, Array<V>>
```

*示例*
```ts
import { array } from 'wheater'

const persons = [
    {name : "1", age : 10},
    {name : "2", age : 20},
    {name : "3", age : 20},
];

array.groupBy(datas, x => x.age, x => x.name);
/**
 * 结果类型 : Map<number,Array<string>>
 * 结果数据 : 
 *           10 -> ["1"]
 *           20 => ["2", "3"]
 */
```

## join
将两个数组join操作，右侧数组聚合到左侧。  
需要从两个数组取出相同类型的key，默认使用 `===` 进行比较，可以自定义比较器。

*参数*
```ts
function join<TLeft, TRight, TKey, TResult>(
    lArr: Array<TLeft>,
    rArr: Array<TRight>,
    lKeySelector: (v: TLeft) => TKey,
    rKeySelector: (v: TRight) => TKey,
    resultSelector: (vL: TLeft, vRs: Array<TRight>) => TResult,
    compare: (k1: TKey, k2: TKey) => boolean = (k1, k2) => k1 === k2): Array<TResult> 
```

*示例*
```ts
import { array } from 'wheater'

const lArr = [1,2,3,4,5];
const rArr = [{id:1,foo:'f'},{id:1,foo:'ff'},{id:3,foo:'fff'}];

array.join(
    lArr, 
    rArr, 
    x=>x, 
    x=>x.id,
    (v1, v2s)=>{ return {id: v1, foos: v2s.map(v => v.foo)}},
    (k1, k2) => k1===k2);

/**
 * 结果：
 *      [
 *        { id:1, foos: ['f','ff']},
 *        { id:2, foos: []},
 *        { id:3, foos: ['fff']},
 *        { id:4, foos: []},
 *        { id:5, foos: []},
 *      ]
 */
```