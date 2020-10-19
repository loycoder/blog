  keyof 可以用来取得一个对象接口的所有 key 值.例如：
  ```js
  interface Foo {
    name: string;
    age: number
   }

  type T = keyof Foo // result:  "name" | "age"
 ```
  而 in 则可以遍历枚举类型, 例如:

   ```js
    type Keys = "a" | "b"

    type Obj =  {
      [p in Keys]: any 
    } 
    // result: { a: any, b: any }
   ```

假设有一个 object 如下所示，我们需要使用 typescript 实现一个 get 函数来获取它的属性值
```js
const data = {
  a: 3,
  hello: 'world'
}

function get(o: object, name: string) {
  return o[name]
}
```

刚开始可能会这么写，不过它有很多缺点

无法确认返回类型：这将损失 ts 最大的类型校验功能
无法对 key 做约束：可能会犯拼写错误的问题

这时可以使用 `keyof` 来加强 get 函数的类型功能，有兴趣的同学可以看看 `_.get` 的 `type` 标记以及实现

```js
function get<T extends object, K extends keyof T>(o: T, name: K): T[K] {
  return o[name]
}
``
