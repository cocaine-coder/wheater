# wheater
[![npm](https://img.shields.io/npm/v/wheater)](https://www.npmjs.com/package/wheater)
![NPM](https://img.shields.io/npm/l/wheater)
![npm](https://img.shields.io/npm/dw/wheater)

一些 `js/ts` 比较繁琐经常用的功能

## 使用

### install

```bash
npm install wheater
```
or

```bash
yarn add wheater
```

### code

``` ts
import { date, deep } form 'wheater';
```

## 功能

### date

#### #dateOnly

```ts
date.toDateOnly(new Date('2022-02-02 02:22:22'));  // 20220202
```

#### #addDays

```ts
date.addDays(new Date('2022-02-02 02:22:22'), 1)    // 2022-02-03 02:22:22
date.addDays(new Date('2022-02-02 02:22:22'), -1)   // 2022-02-01 02:22:22
```

#### #addMonths

```ts
date.addMonths(new Date('2022-02-02 02:22:22'), 1)  // 2022-03-02 02:22:22
date.addMonths(new Date('2022-02-02 02:22:22'), -1) // 2022-01-02 02:22:22
```

#### #addYears

```ts
date.addYears(new Date('2022-02-02 02:22:22'), 1)   // 2023-02-02 02:22:22
date.addYears(new Date('2022-02-02 02:22:22'), -1)  // 2021-02-02 02:22:22
```

#### #formatDate

```ts
const date = new Date('2022-02-02 02:22:22');
date.formatDate(date,'yyyy-MM-dd');          // '2022-02-02'
date.formatDate(date,'HH:mm:ss');            // '02:22:22'
date.formatDate(date,'yyyy-MM-dd HH:mm:ss')  // '2022-02-02 02:22:22'
```

#### #getNearDays

```ts
date.getNearDays(new Date('2022-02-02'),2);   // [Date:2022-02-03 , Date:2022-02-04]
date.getNearDays(new Date('2022-02-02'),-2);  // [Date:2022-02-01 , Date:2022-01-31]

```

#### #getNearinDays

```ts
date.getNearinDays(new Date('2022-02-02'),2);   // [Date:2022-02-02 , Date:2022-02-03 , Date:2022-02-04]
date.getNearinDays(new Date('2022-02-02'),-2);  // [Date:2022-01-31 , Date:2022-02-01 , Date:2022-02-02]
```


### deep

#### #clone

```ts
const person = { name:'tracy', age:12 };
const copyPerosn = deep.clone(person); // { name:'tracy', age:12 }
```

#### #equal
```ts
const person1 = { name:'tracy', age:12 };
const person2 = { name:'tracy', age:12 };

deep.equal(person1,person2); // true
```

#### #setProps
```ts
const person1 = { name:'tracy', age:12 };
const person2 = { name:'tracy', age:13 };

deep.setProps(person1,person2);
person2  // { name:'tracy', age:12 }
```