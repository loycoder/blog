> #### JavaScript在实例化一个对象，主要有几个步骤：
> * 1. 创建一个新的空对象{} 
> * 2. 将空对象的 __proto__ 属性指向构造函数的prototype对象. 
> * 3. 使用新对象调用函数(通过call、apply等)，函数中的this指向新实例对象
> * 4. 返回新对象 

代码实现：

```js
  function _news() {
    let result = {}
    const obj = [].shift.call(arguments)
    result.__proto__ = obj.prototype
    const n = obj.apply(result, arguments)
    return n instanceof Object ? n : result
  }

  // 调用
  function Person(name) {
    this.name = name
    this.say = function () {
      console.log('this.name: ', this.name);
    }
  }
  _news(Person,'jeck',10).say()
```