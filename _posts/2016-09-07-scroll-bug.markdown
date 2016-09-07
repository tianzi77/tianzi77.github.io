---
layout:     post
title:      "滚动条到底占宽度吗"
subtitle:   " \"神奇滚动条\""
date:       2016-09-07 21:55:00
author:     "ZWW"
header-img: "img/home-bg.jpg"
tags:
    - 滚动宽度
---

> **元素的滚动条会占据一定的内部空间的, 造成内容被挤压.原来有滚动条和没滚动条时, 元素内部的空间是有变化的**

<p style="color:black;text-indent:2em;font-size:16px">
	今天开组件讨论会提到一个细节，就是希望鼠标放上去的时候出现滚动的，很简单的需求。当时一个同事提出滚动条是会占据宽度的，所以鼠标放上去会出现抖动，会挤压周围的内容，细想总觉得怪怪的，查了一些资料写了个demo大跌眼镜。
	
</p>

<p><a href="http://tianzi77.github.io/demo/article/scroll.html" target="blank">demo地址</a></p>

<p style="color:black;text-indent:2em;font-size:16px">
    我刚开始写的时候搞了一个鼠标放上去的样式，内容并未出现抖动。我还以为滚动条是不占宽度的，那他又是个什么玩意呢，后面搜了很多资料，发现这个问题还真有点意思。但事实一张图告诉我这个是占有宽度的。那么我们就需要想一想如何解决这个困扰了.假设有一个父级元素(限制高度)和一个内层子元素(块级元素), 子元素的内容增多产生溢出而出现(属于父元素的)滚动条.
    
<p>* 子元素的宽度默认会撑满父元素的宽度</p>
 
<p>* 没有滚动条时</p>
 
  <p>子元素宽度 = 父元素宽度</p>
  
<p>* 有滚动条时</p>
 
 <p> 父元素的有效宽度会变小</p>
  
  <p>父元素宽度 = 原父元素宽度 - 滚动条宽度</p>
   
<img src="/img/post-img/scroll.jpg" alt="scroll">
</p> 
<p style="color:black;text-indent:2em;font-size:16px">

发现了问题。怎么解决？
 
<p>* 因此子元素重新调整宽度</p>
 <p>
  子元素宽度 = 原父元素宽度 - 滚动条宽度</p>
  
<p>* 此时子元素明显会因为宽度变小而重新调整布局, 所以发生了挤压.</p>

明白了前因后果, 就很好找解决方案了.

只要预留出滚动条的空间, 让子元素的宽度在有滚动条和没有滚动条时不发生变化就可以了.
</p>

方法1 

    .container.fit1 .content {
            max-width: 283px;
            max-width: calc(300px - 17px);
            /* 父元素宽度 - 滚动条宽度 */
        }
        
        
方法2

    .container.fit2 {
            overflow-x: hidden;
            /* 由于内层内容宽度 + 滚动条宽度超过外层宽度, 导致水平方向溢出出现水平滚动条 */
        }
        /* 让内层元素的最小宽度占满父元素, 通过 padding 预留出滚动条的宽度 */
        
        .container.fit2 .content {
            min-width: 300px;
            /* 父元素宽度 */
            padding-right: 17px;
            /* 滚动条宽度 */
            box-sizing: border-box;
            /* 让元素宽度包含 padding, 否则元素会被滚动条遮挡 */
        }
至于hover上去为什么不抖动，应该是实体节点没有插入的原因！
        
参考：

知乎：https://www.douban.com/note/548331665/

张鑫旭博客：http://www.zhangxinxu.com/wordpress/2015/01/css-page-scrollbar-toggle-center-no-jumping/
    