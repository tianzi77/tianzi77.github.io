---
layout:     post
title:      "全站响应-自适应手机电脑全家"
subtitle:   " \"断点布局技巧\""
date:       2016-06-30 16:55:00
author:     "ZWW"
header-img: "img/contact-bg.jpg"
tags:
    - 全站响应
---

> **最近做大型的营销活动，要设备全响应，坑真多，关键是他妈的活动页面图片太多了。蛋疼，真的蛋疼**




`静下来之后，还是静静的总结一下。因为要兼容全设备，所以全响应是必须的。怎么搞？`



<br>
####1，第一步需要告知浏览器将页面宽度设置为设备宽度，并禁用缩放行为。

```html
    <meta name="viewport" content="width=device-width, 
initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
```
...2，桥梁搭好之后，就应该断点了，断点也就是我们说的media queries。如何断？由于视觉要求太严格，手机的断点我就做了好几个。说多了都是泪。
下面是参考bootstrap 4的断点设置，还有amaze ui断点也差不多。

```css
    .demo{
  color: #000;
}
/* 等于或大于 34*16 = 544px（手机横屏）*/
@media screen and (min-width: 34em) { 
  .demo{
    color: #999;
  }
} 

 /* 等于或大于 48*16 = 768px(平板竖屏) */
@media screen and (min-width: 48em) { 
  .demo{
    color: red;
  }
}

/* // 等于或大于  62*16 = 992px（pc窄屏） */
@media screen and (min-width: 62em) { 
  .demo{
    color: blue;
  }
}

/* // 等于或大于 75*16 = 1200px（ pc宽屏） */
@media screen and (min-width: 75em) { 
  .demo{
    color: yellow;
  }
}

/* // 等于或大于 1380px（ pc超大屏） */
@media screen and (min-width: 1380px) { 
  .demo{
    color: orange;
  }
}
```

一般太大屏了1380这个断点大可不必，除非特殊视觉，哈哈哈

...3，技巧？其实都是坑踩出来的，好像真没什么技巧，唯一的技巧就是麻烦，真麻烦。

<p>1,定义min-in、function、公共样式，并修改原生标签样式,用sass定义好这些，复用的时候直接@extend或者插入函数，因为复用真的很多</p>
<p>2,能使用百分比设置尺寸的地方绝不使用像素，比如宽、高采用百分比或继承，padding和小范围内定位使用像素；但是我做的项目，图片太多了，没卵用，还是谢了一大推</p>
<p>3,弹性布局，这个对移动端还是方便不少，但是我做的项目要兼容到ie7，用处又不大</p>
<p>4,充分利用position属性，比如fixed全屏定位、relative和absolute搭配实现小范围内任意定位；就是定位不要范围太广，不然响应的时候错位很严重，说起虽然是这么回事，但是很多活动页面，没法玩，压根找不到定位的参考，只能是外层容器</p>


<br> 
下面是一个demo，之后我把断点和窄屏进行了修复。不在此更新了。

<a href="http://www.zhangweiwei.cn/tools/share/ " target="_blank">全响应</a>






 


