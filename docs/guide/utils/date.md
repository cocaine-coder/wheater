# date
时间相关的函数

```ts
import { date } from 'wheater'
```

## toDateOnly  
将Date转换成number类型的年月日拼接，如：20220203  
```ts
date.toDateOnly(new Date("2022-02-03"));  // 20220203
```

## addDays 
将Date增加 `days` 天

```ts
date.toDateOnly(new Date('2022-02-02 02:22:22'), 1); // Date : 2022-02-03 02:22:22
date.toDateOnly(new Date('2022-02-02 02:22:22'), -1); // Date: 2022-02-01 02:22:22
```

## addMonths 
将Date增加 `days` 月。

::: warning
二月份的相关加减可能与您期望值不同，慎重使用
:::

```ts
date.addMonths(new Date('2022-02-02 02:22:22'), 1);  // Date: 2022-03-02 02:22:22
date.addMonths(new Date('2022-02-02 02:22:22'), -1); // Date: 2022-01-02 02:22:22
```

## addYears 
将Date增加 `years` 年。

```ts
date.addYears(new Date('2022-02-02 02:22:22'), 1);  // Date: 2023-02-02 02:22:22
date.addYears(new Date('2022-02-02 02:22:22'), -1); // Date: 2021-02-02 02:22:22
```

## formatDate 
格式化日期

```ts
const date = new Date('2022-02-02 02:22:22');

formatDate(date,'yyyy-MM-dd');              // '2022-02-02'
formatDate(date,'HH:mm:ss');                // '02:22:22'
formatDate(date,'yyyy年MM月dd日 HH:mm:ss');  // '2022年02月02日 02:22:22'
```

## getNearDays
获取附近天数并格式化(`可选`)

```ts
const date = new Date('2022-02-02');

date.getNearDays(date, 2);  // [Date:2022-02-03 , Date:2022-02-04]
date.getNearDays(date, -2); // [Date:2022-02-01 , Date:2022-01-31]

date.getNearDays(date, 2, "yyyy-MM-dd"); // ['2022-02-03' , '2022-02-04']

```

## getNearinDays  
获取附近天数，包括基点日期并格式化

```ts
const date = new Date('2022-02-02');

date.getNearinDays(date, 2); // [Date:2022-02-02 , Date:2022-02-03 , Date:2022-02-04]
date.getNearinDays(date, -2); // [Date:2022-01-31 , Date:2022-02-01 , Date:2022-02-02]
date.getNearinDays(date, 2, "yyyy-MM-dd"); // ['2022-02-02', '2022-02-03', '2022-02-04']
```