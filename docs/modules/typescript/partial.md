  #### Partial作用是`将传入的属性变为可选项`.  注意这是`浅Partial`（后面会介绍深度Partial）

 结合上面所说的 `keyof`和 `in`, `keyof`产生枚举类型, `in` 使用枚举类型遍历, 所以他们经常一起使用, 看下 Partial 源码:

 ```js
  type Partial<T> = { [P in keyof T]?: T[P] };
 ```


上面语句的意思是 `keyof T`拿到 T 所有属性名, 然后 通过 in 进行遍历, 将值赋给 P, 最后 `T[P]` 取得相应属性的值.
结合中间的 ? 我们就明白了 Partial 的含义了.

用法
```js
export interface Info { 
  name: string;
  age: number;
}

type InfoData = Partial<Info>;

const data: InfoData = { age: 2 }
```


   使用场景：
   ```js

  //使用场景
    function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>){
        return {...todo, ...fieldsToUpdate};
    }

    const todo1 = {
        title: 'test',
        description: 'test xxxx',
    };

    const todo2 = updateTodo(todo1, {
        description: 'test yyy',
    });

   ```
 
但是Partial<T> 有个局限性，就是只支持处理第一层的属性。如果我的接口定义是这样的：
```js
interface UserInfo {
    id: string;
    name: string;
    fruits: {
        appleNumber: number;
        orangeNumber: number;
    }
}

type NewUserInfo = Partial<UserInfo>;

// Property 'appleNumber' is missing in type '{ orangeNumber: number; }' but required in type '{ appleNumber: number; orangeNumber: number; }'.
const xiaoming: NewUserInfo = {
    name: 'xiaoming',
    fruits: {
        orangeNumber: 1,
    }
}
```

可以看到，第二层以后就不会处理了，如果要处理多层，就只能自定义DeepPartial. 依靠递归来解决。 `深度Partial`如下：
```js

export type DeepPartial<T> = {
  [key in keyof T]? : T[key] extends Object ? DeepPartial<T[key]> : T[key]
}

 interface Info { 
  test: {
    one: {
      two: {
        three: {
          four:true
        }
      }
  }
  
// 测试：
export const b: DeepInfoData = {
  test: {
    one: {
      two: {}  // 后面的不做匹配了，校验依然通过
    }
  }
}

```