any  类型本质上是类型系统的一个逃逸舱。完全忽略typescript检查，简单粗暴。

unknow 是 ts3.0版本新增特性，和any相比，更加严格。 unknown 类型只能`被赋值`,或给 any 类型和 unknown 类型本身.

```js
let value: unknown;

value = true;             // OK
value = 42;               // OK
value = "Hello World";    // OK
value = [];               // OK
value = {};               // OK
value = Math.random;      // OK
value = null;             // OK
value = undefined;        // OK
value = new TypeError();  // OK
value = Symbol("type");   // OK
```

```js
let value: unknown;

value.foo.bar;  // Error
value.trim();   // Error
value();        // Error
new value();    // Error
value[0][1];    // Error
```

如果需要对unknow 类型，做如下操作：
```js
let value: unknown;
value ='1&2';  // ok
value.split('&')  // error 
```
虽然 value 赋值成功，但value.splice 却未通过编译。如果明确类型，可以通过 as(类型断言) 来处理.
```js
(value as string).split('&')  // ok 
```

