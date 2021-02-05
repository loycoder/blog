在 TypeScript 3.7 版本中除了引入了前面介绍的可选链 ?. 之外，也引入了一个新的逻辑运算符 —— `空值合并运算符 ??。当左侧操作数为 null 或 undefined 时，其返回右侧的操作数，否则返回左侧的操作数。`

与逻辑或 || 运算符不同，逻辑或会在左操作数为 falsy 值时返回右侧操作数。也就是说，如果你使用 || 来为某些变量设置默认的值时，你可能会遇到意料之外的行为。比如为 falsy 值（''、NaN 或 0）时。

这里来看一个具体的例子：

```js

// 以前的处理方式， 给默认值

 const params = params || 'defalut value'; 
console.log('params: ', params);

// 我们希望如果参数是 null 或者 undefined 才赋值 默认参数。, 用空值合并运算符 来解决

const foo = null ?? 'default string';
console.log(foo); // 输出："default string"

const baz = 0 ?? 42;
console.log(baz); // 输出：0

  ```

  以上 TS 代码经过编译后，会生成以下 ES5 代码：

  ```js
  "use strict";
var _a, _b;
var foo = (_a = null) !== null && _a !== void 0 ? _a : 'default string';
console.log(foo); // 输出："default string"

var baz = (_b = 0) !== null && _b !== void 0 ? _b : 42;
console.log(baz); // 输出：0
```

通过观察以上代码，我们更加直观的了解到，空值合并运算符是如何`解决前面 || 运算符存在的潜在问题`。下面我们来介绍空值合并运算符的特性和使用时的一些注意事项。

当空值合并运算符的左表达式不为 null 或 undefined 时，`不会对右表达式进行求值`。

```js 

function A() { console.log('A was called'); return undefined;}
function B() { console.log('B was called'); return false;}
function C() { console.log('C was called'); return "foo";}

console.log(A() ?? C());
console.log(B() ?? C());

// 上述代码运行后，控制台会输出以下结果：
/* 
  A was called 
  C was called 
  foo 
  B was called 
  false 
*/

```


