#### 总结ts 实战技巧：

### 1. 模拟实现lodash 的 `get` 方法：
   

```js

function get<T extends Object, Key extends keyof T>(obj: T, key: Key  ) { 
  return obj[key];
}
```

### 2. `set` 方法实现：

```js

function set<T extends Data, Key extends keyof T,>(obj: T, key: Key, value: T[Key]) { 
  obj[key] = value;
  return obj;
}

```

### 3. 对 `async` `await` 的TS 封装

 当我们发起异步请求，（例如接口请求），对于成功和失败的数据。 该函数统一返回一个数组，
   1.第一个元素表示错误，成功返回null, 失败返回 继承自Error的 对象, 
   2.第二个参数表示Promise.resolve() 的成功的数据， 失败返回null.

```js
export function awaitTo<T, U = Error> ( promise: Promise<T>, errorExt?: object): Promise<[U, undefined] | [null, T]> {

  return promise.then<[null, T]>((data: T) => [null, data]).catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err, undefined];
    });
}

// 使用方法：
  const [error, dataList] = await awaitTo<DataResponse>(promiseObj);
```


`Partial`作用是将传入的属性变为【可选项】，不过TS内置的只支持第一层，第二层以后就不会处理了，
 如果要处理多层，就只能自定义DeepPartial. 依靠递归来解决。 `深度Partial`如下：

```js

export type DeepPartial<T> = {
  [key in keyof T]? : T[key] extends Object ? DeepPartial<T[key]> : T[key]
}

```
