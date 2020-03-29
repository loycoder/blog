> ## 手写 new的实现
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


> ## 手写-call的实现
> #### call函数 其原理是利用了 JavaScript的上下文。（不同作用域this 指向不同）
> 实现原理步骤如下：
> * 1. 获取到上下文 context, 即调用.mycall方法的对象.  
> * 2. 在该对象上增加一个匿名函数，指向调用者
> * 3.
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



## 手写 bind的实现
和call apply 的作用很相似，唯一的区别就是绑定this 指向后，不会立即执行。

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


## 斐波拉契求和
 ```js
/**
 * 斐波拉契,求和
 * 0 1 2 3 5 8 13
 * @param n
 * @returns {*}
 */
function Fibonacci(n) {
  let val = new Array(n).fill(0)  // 初始化数组长度为n,默认值为0
  val[1] = 1;
  val[2] = 2;
  for (let i = 3; i <= n; ++i) {
    val[i] = val[i - 1] + val[i - 2]
  }
  return val
}

let count = Fibonacci(2).reduce(function (pre, current) {
  return pre + current
})
console.error('val=====>', count);

 ```


## 插入排序

 >  从数组下标1 开始，每遍历一次，比较的元素在原基础上加1，越往后遍历次数越多。

插入排序图解

```js
function insertSort (arr) {
    for (var i = 1;i < arr.length;i++){

        for(var j = i;j > 0 && arr[j] < arr[j-1];j--){

            // 当前值和之前的每个值进行比较，发现有比当前值小的值就进行交换
            let temp = arr[j];  //先取出 next 值，即 小的那个

            arr[j] = arr[j-1]; 
            arr[j-1] = temp;  
        }
    }
    return arr
}

// 优化版 少一次赋值
 function insertSort(arr) {
    var len = arr.length;
    var temp;
    for (var i = 1; i < len; i++) {
      temp = arr[i]
      for (var j = i; j > 0 && temp < arr[j - 1]; j--) {
        // 当前值和之前的每个值进行比较，发现有比当前值小的值就进行重新赋值
        arr[j] = arr[j - 1]; 
      }
      arr[j] = temp;
    }
    return arr;
 }
```



## 快速排序

> 参见阮一峰老师的博客，很通俗易懂：
> 快速排序（Quicksort）的Javascript实现 - 阮一峰的网络日志（www.ruanyifeng.com）
> 思路如下：
> * 1. 在数据集之中，选择一个元素作为"基准"（pivot）
> * 2. 所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
> * 3. 对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

```js
    function quickSort(array) {
      if (array.length <= 1) { return array }
      let left=[], right =[];

      let middleIndex = Math.floor(array.length/2);

      let middleValue= arr.splice(middleIndex,1)[0]

      for (let index = 0; index < array.length; index++) {
        
        if(array[index] < middleValue) {
          left.push (array[index])
        }else{
          right.push (array[index])
        }
      }
      return quickSort(left).concat([middleValue],quickSort(right))
    }
```
