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