> #### call函数 其原理是利用了 JavaScript的上下文。（不同作用域this 指向不同）
> 
 
```js

   Function.prototype.myCall = function(context) {
      let temp=Symbol('call');  //创建一个匿名函数，是为了防止context属性覆盖
      context= context || window;  // this 上下文，无上下文默认指向 window
      context[temp]=this;    //将
      let args=[]
      for(let i=1; i<arguments.length; i++){
         args.push(arguments[i])
     }
     let result= context[temp](...args)
     delete context[temp]
     return result;
  }
```