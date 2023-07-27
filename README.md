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
import { array, creator, date, deep, validator } form 'wheater';
```
## 功能 
### array 
#### #average 
```ts
array.average([1,2,3],v=>v); // 2
```
#### #count
```ts
array.count([1,2,3],v => v>1); //2
array.count([1,2,3]);          //3
```
#### #sum
```ts
array.sum([1,2,3],v=>v); //6
```
#### #groupBy
```ts
array.groupBy([{num:1,foo:"f"},{num:1,foo:"f"},{num:2,foo:"123"}],x=>x.num);
/**
 * new Map([
 *  [1,[{num:1,foo:"f"},{num:2,foo:"123"}]],
 *  [2,[{num:1,foo:"f"}]]
 * ]);
 * */ 

array.groupBy([{num:1,foo:"f"},{num:1,foo:"f"},{num:2,foo:"123"}],x=>x.num,x=>x.foo);
/**
 * new Map([
 *  [1,["f","123"]],
 *  [2,["f"]]
 * ]);
 * */ 
```
#### #join
```ts
array.join([1,2,3,4,5],[{id:1,foo:'f'},{id:1,foo:'ff'},{id:3,foo:'fff'}],x=>x,x=>x.id,(v1,v2s)=>{
    return {id:v1, foos:v2s.map(v=>v.foo)}
},(k1,k2) => k1===k2);
/**
 * [
 *   { id:1, foos: ['f','ff']},
 *   { id:2, foos: []},
 *   { id:3, foos: ['fff']},
 *   { id:4, foos: []},
 *   { id:5, foos: []},
 * ]
 */
```


### creator 
#### uuid 
```ts
creator.uuid();
creator.uuid({uppercase:true,separator:false});
```


### date 
#### #dateOnly 
```ts
date.toDateOnly(new Date('2022-02-02 02:22:22'));   // 20220202
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

### validator
#### #os
```ts
if(validator.os.isMobile()){
    // xxx;
}
```
#### #email
```ts
if(validator.email("24709876543@qq.com")){
    // xxx;
}
```
#### #phone
```ts
if(validator.phone("18361231219")){
    // xxx;
}
```
#### #card
```ts
if(validator.card("210811199701070233",{
    parity : false
})){
    // xxx;
}
```
#### #password
```ts
if(validator.password("1234qwerQ!",{
    minLength : 7,
    maxLength : 15,
    caseSensitive : true,
    includeNummber : true,
    includeSpecialChars : true
})){
    // xxx;
}
```
