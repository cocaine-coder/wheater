# common
```ts
import { common } from 'wheater'
```
## composeUrlQuery
拼凑出 `url query` 参数

```ts
common.composeUrlQuery({search:"foo",desc:true}); // search=foo&desc=true
```