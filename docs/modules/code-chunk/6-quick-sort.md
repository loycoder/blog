
> 参见阮一峰的博客，很通俗易懂：
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