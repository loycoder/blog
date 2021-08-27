
```js

// 查找所有父节点
getAllParentArr(list, id) {
  for (let i in list) {
    if (list[i].id === id) {
      //查询到返回该数组对象
      return [list[i]];
    }
    if (list[i].children) {
      let node = this.getAllParentArr(list[i].children, id);
      if (node !== undefined) {
        //查询到把父节点连起来
        return node.concat(list[i]);
      }
    }
  }
},
// 调用 
let temptArr = [];
temptArr = this.getAllParentArr(this.treeNodeList, id);// 参数1：树形数据，参数2：节点id
```