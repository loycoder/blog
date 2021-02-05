record 可以简单理解为： 组合拳。 它会将一个类型的所有属性，都映射到另一个类型上，并创造一个新的类型。源码如下：

```js
type Record<K extends keyof any, T> = {
  [P in K]: T;
}
```
使用格式:

```js
type newType = Record<K,T>;
```

示例：

```js
type petsGroup = 'dog' | 'cat' | 'fish';
interface IPetInfo {
    name:string,
    age:number,
}

type IPets = Record<petsGroup, IPetInfo>;

const animalsInfo:IPets = {
    dog:{
        name:'dogName',
        age:2
    },
    cat:{
        name:'catName',
        age:3
    },
    fish:{
        name:'fishName',
        age:5
    }
}
```
