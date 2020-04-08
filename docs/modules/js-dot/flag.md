
# 防抖
 > 防抖是指频繁触发的情况下，只有足够的空闲时间，才执行代码一次。比如生活中的坐公交，就是一定时间内，如果有人陆续刷卡上车，司机就不会开车只有别人没刷卡了，司机才开车。

# 节流
> 节流是指一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次。这是函数节流最形象的解释。
回流一定会触发重绘，而重绘不一定会回流
触发重绘的条件：改变元素外观属性。如：color，background-color等。

触发回流的条件：任何页面布局和几何属性的改变都会触发重排
　1、页面渲染初始化；(无法避免)
　　2、添加或删除可见的DOM元素；
　　3、元素位置的改变，或者使用动画；
　　4、元素尺寸的改变——大小，外边距，边框；

BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

html 根元素
float 浮动
绝对定位
overflow 不为 visiable
display 为表格布局或者弹性布局

BFC 主要的作用是：清除浮动  防止同一 BFC 容器中的相邻元素间的外边距重叠问题

transform
过渡（transition）

transition-property	规定设置过渡效果的 CSS 属性的名称。
transition-duration	规定完成过渡效果需要多少秒或毫秒。
transition-timing-function	规定速度效果的速度曲线。
transition-delay	定义过渡效果何时开始。

translateZ

async defer
https://www.cnblogs.com/jiasm/p/7683930.html
区别：
  相同点： 都是为了解决JavaScript阻塞UI渲染问题，都是在后台加载脚本，都是当页面解析&页面渲染w完毕后执行。
  不同点：  defer 后台下载，不会阻止文档渲染，当页面解析&页面渲染w完毕后，会等到所有的defer脚本加载完毕并按照顺序执行，执行完毕后会触发DOMContentLoaded事件。
   async脚本的加载不计入DOMContentLoaded事件统计。

强缓存和协商缓存：
   http优化策略，减少不不必要的数据传输
   1.强缓存：
   2. 协商缓存： 304

   过程如下:
    1,客户端请求一个页面（A）。

    2,服务器返回页面A，并在给A加上一个Last-Modified/ETag。

    3,客户端展现该页面，并将页面连同Last-Modified/ETag一起缓存。

    4,客户再次请求页面A，并将上次请求时服务器返回的Last-Modified/ETag一起传递给服务器。

    5,服务器检查该Last-Modified或ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304和一个空的响应体。

    302 临时重定向
    301 永久重定向
    305 通过代理才能访问
    401 身份认证
    403 拒绝请求

加载渲染过程
父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
子组件更新过程
父beforeUpdate->子beforeUpdate->子updated->父updated
父组件更新过程
父beforeUpdate->父updated
销毁过程
父beforeDestroy->子beforeDestroy->子destroyed->父destroyed

  

 