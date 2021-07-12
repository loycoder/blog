```js

/**
 * promise延迟统一处理操作
 * @param promise  异步请求 promise
 * @param callback 状态更改的回调函数，如 () => this.setState({loading: false})
 * @param interval loading 最短时长
 */ 
export const extendExecutedTime = (promise, callback, interval = 600) => {
  const startTime = new Date().getTime();
  promise.finally(() => {
    const endTime = new Date().getTime();
    const executedTime = endTime - startTime;
    if (executedTime < interval) {
      setTimeout(() => {
        callback();
      }, interval - executedTime);
    } else {
      callback();
    }
  });

  return promise;
}

// 调用示例：
  const callback = () => { this.setLoading(false) };
  extendExecutedTime(promise, callback).catch(err => {
    console.log('err: ', err);
  });
```