联合类型用 `|` 分割每一个类型。表示只能取其中的一种类型，比如： number | string | boolean 的类型只能是这三个的一种，不能共存。

如果一个值的类型是联合类型，那么我们`只能访问它们中共有的属性或者方法`，本质上是一种交的关系，比如：

```js
interface Cat {
  eat(food) : void
  miao() : string
}
interface Dog {
  eat(food) : void
  wang() : string
}

function getPet() : Cat | Dog {
  return {
    eat: (food) => { 
      console.log('a: ', food);
    },
    wang: () => ''
  }
}

const pet = getPet();
pet.eat('🦴'); //正确
pet.miao() //报错, 如想处理，可以通过 as 断言强转： (pet as Cat).miao(); 

```

