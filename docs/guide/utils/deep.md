# deep

```ts
import { deep } from 'wheater';
```

## clone
深度拷贝

```ts
const copyValue = deep.clone({ name: 'tracy', age: 12 });
```

## equal
深度相等对比

```ts
deep.equal({ name:'tracy' }, { name:'tracy'}); // true
```

## setProps
深度赋值

```ts
const orgData = { name : ''};
deep.setProps({ name:'tracy'}, orgData);

orgData; // { name:'tracy'}
```