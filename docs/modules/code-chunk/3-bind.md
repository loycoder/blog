> 和call apply 的作用很相似，唯一的区别就是绑定this 指向后，不会立即执行。

 ```js
  Function.prototype.myBind = function () {
    let that=this, thatArgs=arguments[0];
    let  args = Array.prototype.slice.call(arguments, 1)
    if(typeof that !== 'function') {
      throw new TypeError('myBind callback is not a function');
    }
    return (function (){
      return that.apply(thatArgs, args);
    })
  }
  ```