一系列常量的集合。使用枚举可以清晰的表达意图，或创建一组有区别于其他常量的用例。
   
  数字枚举：
  数字枚举，如果不给值， 会依次赋值， 默认从0开始。 如果某一个枚举字段没有值，那么默认会获取上一个枚举字段的值自增1.

 #### 数字枚举： 
  ```js

   // 不给值
    enum Direction{
      Up,
      Down,
      Left,
      Right
    }
    Direction.Up  // 0
    Direction.Down  // 1

    // 通过下标访问：（仅限于数字枚举）
    Direction[0]  //0
    Direction[1]  //1

  ```

  ```js
   //给其中某一个赋值
    enum Direction{
      Up,
      Down =3,
      Left,
      Right
    }
    Direction.Up  // 0
    Direction.Down  // 3
    Direction.Left  // 4
  ```


  编译后的枚举：
  ```js
  var Direction;
  (function (Direction) {
      Direction[Direction["Up"] = 0] = "Up";
      Direction[Direction["Down"] = 1] = "Down";
      Direction[Direction["Left"] = 2] = "Left";
      Direction[Direction["Right"] = 3] = "Right";
  })(Direction || (Direction = {}));
```

 #### 字符串枚举：

 ```js 
 enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT",
}
```