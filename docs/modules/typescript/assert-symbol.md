! 的作用是断言某个变量不会是 null/undefined，告诉编辑器停止报错。

```js

const obj = {
    name: 'loy'
}
const a = obj!.name; // 假设 obj是你从后端获取的获取

```

确定 obj.name 一定是存在的且不是`null/undefined`，使用! 只是消除编辑器报错，不会对运行有任何影响。

属性或者参数中使用 !，表示强制解析（告诉 typescript 编译器，这里一定有值）; 变量后使用 !: 表示类型推荐排除 null/undefined。