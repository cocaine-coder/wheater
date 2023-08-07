# validator
一些常见的验证
```ts
import { validator } from 'wheater'
```

## os
非业务偏系统方面的验证
### isMobile
是否为移动端
```ts
validator.os.isMobile();   // true or false
```

## url
检验url是否有效
```ts
validator.url("https://www.baidu.com")  // true
```

## email
邮箱验证
```ts
validator.email("tracywang1997@outlook.com") // true
```

## phone
手机号码验证
```ts
validator.phone("18361228970") // true
```

## card
身份证号码验证

```ts
validator.card("xxxxxxxxxxxxxxxxxx",{
    parity : false , // 是否判断校验码正确性 默认：false
});
```

## password
密码复杂度验证

```ts
validator.password(password,{
    minLength : 8,              // 最小长度
    maxLength : 16,             // 最大长度
    caseSensitive : true,       // 区分大小写
    includeNummber : true,      // 是否包含数字
    includeSpecialChars : true  // 是否包含特殊字符
})
```

## numberic
是否为数字验证

```ts
validator.numberic("123"); // true
validator.numberic("");    // false
```