```js
  const orderId = response.result.data.orderId;
```
上面这种写法，很容易出现这种问题 orderId is undefined，稍有些经验的立马就能想到，
肯定是代码中 response.result.data 为 null 或者 undefined ，这样，你肯定获取不到 orderId。
所以经验丰富的我们在遇到获取层级比较多的对象的时候，一般都是像下面这样写：

```js
// 正确的写法
const orderId = (response
  && response.result
  && response.result.data
  && response.result.data.orderId) || '';
```

我们可以使用 ?. 来简化上面的代码。
```js
const orderId = response?.result?.data?.orderId || '';
```

上面代码使用了?.运算符，直接在链式调用的时候判断，左侧的对象是否为null或undefined。如果是的，就不再往下运算，而是返回undefined。
?. 支持如下语法

```js
obj?.prop // 对象属性
obj?.[expr] // 对象属性
arr?.[index] // 获取数据中 index 下标对应的值
func?.(...args) // 函数或对象方法的调用
```
