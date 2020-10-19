#### Required将类型的属性变成必选

源码如下：
```js
  type Required<T> = { 
    [P in keyof T]-?: T[P] 
 }; 

```

用法：
```js
interface User { 
  id: number;
  age: number;
  name: string;
  job?: string;  
}

// 以上User.job 是可选的，通过 Required 包装后，则可选失效。必须实现 User对象所有属性。
export const user: Required<User> = {
  id: 1,
  age: 2,
  name: 'loy',
  job:'js'
}

