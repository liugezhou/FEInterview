## Background

> CSS 核心开发，其实就是对布局的运用，flex 布局我已了然于胸，但是 grid 这个强大的二维布局，还是在实战中缺少演练，之所以缺少是因为对其属性不够自信。
> so,本篇小结在稍稍复习 flex 布局的情况下，对 grid 布局进行一个透彻、透彻、和透彻的学习。

## Flex

> 主容器:第一个属性为默认值
>
> - display:flex (设置为 flex 布局，子元素的 float、clear 和 vertical-align 都会失效)
> - flex-direction：row | row-reverse | column | column-reverse
> - flex-wrap：nowrap | wrap | wrap-reverse
> - flex-flow：简写形式(row wrap)
> - justify-content：flex-start | center | flex-end | space-between | space-around
> - align-items：stretch | flex-start | center | flex-end | baseline
> - align-content：flex-start | center | flex-end | space-between | space-around
>   主容器下项目属性：
> - order：数值越小排列越靠前，默认为 0.
> - flex-grow：该项目的放大比例，默认为 0。
> - flex-shrink：定义项目缩小比例，默认为 1.若某项目设置了 0，则其它缩小，该项目不缩小。
> - flex-basis：像 width 和 heighr 一样设置值，默认为 auto，项目本身大小。
> - flex：flex-grow flex-shrink flex-basis 缩写，默认为 0 1 auto。[后两个可选]
> - align-self:允许单个项目不同，可覆盖 align-items 属性，默认值为 auto-继承父元素 align-items。

## [Grid 布局](https://juejin.cn/post/6854573220306255880)

> 目前唯一一种二维布局。  
> 先看下代码示例：

```
<div class="wrapper">
  <div class="one item">One</div>
  <div class="two item">Two</div>
  <div class="three item">Three</div>
  <div class="four item">Four</div>
  <div class="five item">Five</div>
  <div class="six item">Six</div>
</div>
```

```
.wrapper {
  margin: 60px;
  /* 声明一个容器 */
  display: grid;
  /*  声明列的宽度  */
  grid-template-columns: repeat(3, 200px);
  /*  声明行间距和列间距  */
  grid-gap: 20px;
  /*  声明行的高度  */
  grid-template-rows: 100px 200px;
}
.one {
  background: #19CAAD;
}
.two {
  background: #8CC7B5;
}
.three {
  background: #D1BA74;
}
.four {
  background: #BEE7E9;
}
.five {
  background: #E6CEAC;
}
.six {
  background: #ECAD9E;
}
.item {
  text-align: center;
  font-size: 200%;
  color: #fff;
}

```
### 容器属性
> - grid-template-columns:设置列宽  | grid-template-rows:设置行宽
```
// 项目宽度分别为200px 100px 200px
grid-template-columns:200px 100px 200px
// 三个项目宽度都是为200px
grid-template-columns:repeat(3,200px)
// 自动填充宽度诶200px，只要有剩余就继续添加
grid-template-columns:repeat(auto-fill,200px)
// 引入的长度单位创建灵活网格轨道 fr，表示后两个元素分布是剩余宽度的1/3、2/3
grid-template-columns:200px 1fr 2fr;
// minmax函数:第三列宽度最少300px，最大不能为2fr
grid-template-columns:1fr 1fr minmax(300px,2fr)
// auto关键字
grid-template-columns:200px auto 200px;
```
> - grid-gap | grid-column-gap | grid-row-gap
```
grid-row-gap:10px;
grid-column-gap:20px;
grid-gap:20px 20px;
```
> - grid-template-areas | grid-area
```

```
> - grid-auto-flow
```
// 先填满第一行，再填满第二行
grid-auto-flow:row;
// 排列中可能会有空白，为了更加紧凑的填满这个空白
grid-auto-flow:row dense;
// 先填满第一列，再填满第二列
grid-auto-flow:column
```
> - justify-items | align-items
```
// 项目内内容的水平位置
justify-items:start | end | center | stretch(默认)
// 项目内内容的垂直位置，属性同上
align-items:start | end | center | stretch(默认)
```
> - justify-content | align-content
```
// 容器内全部内容的水平位置
justify-content:start | end | center | stretch |space-between | space-around | space-evenly
// 容器内全部内容的垂直位置
align-content:start | end | center | stretch |space-between | space-around | space-evenly

```
> - grid-auto-columns | grid-auto-row