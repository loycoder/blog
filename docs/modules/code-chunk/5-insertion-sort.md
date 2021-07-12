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
