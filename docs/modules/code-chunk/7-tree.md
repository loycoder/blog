
```js

  /**
   * 递归查找指定节点的所有父级id
   * @param {*} data  树形数据  
   *    树形数据 格式：
   *        interface TreeItem {
   *            title:string;
   *            groupId:number;
   *            children:TreeItem[]
   *        }
   *      data:  {title, groupId, children:[]}
   * @param {*} id  当前子集id
   * @param {*} keyMap  键值映射
   * @param {*} [indexArray=[]]  // 返回的父级ID集合
   * @returns
   */
  function findParentIdOfTree (data, id, keyMap = { id: 'groupId', children: 'childrenList', text: 'groupName' }, indexArray = []) {
  const arr = Array.from(indexArray)
  for (let i = 0, len = data.length; i < len; i++) {

    const childrenList = data[i][keyMap.children]
    const groupId = data[i][keyMap.id]
    const groupName = data[i][keyMap.text]

    arr.push({ groupId, groupName })

    if (groupId === id) {
      return arr
    }
    if (childrenList && childrenList.length) {
      const result = findParentIdOfTree(childrenList, id, keyMap, arr)
      if (result) {
        return result
      }
    }
  }
  return false
}
```