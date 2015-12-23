---
layout:     post
title:      "inline元素的空白解决方案"
subtitle:   " \"常见img textarea等行内元素标签中\""
date:       2015-12-23 11:20:00
author:     "ZWW"
header-img: "img/post-bg-universe.jpg"
tags:
    - 处理空白
---




现代浏览器中，img元素默认情况下底部会有空白，那么这个空白到底是从哪里来的？
有什么比较好的方法可以去掉这个空白？
其实不光是img元素，所有的行内元素都会造成这样的影响。

下面demo是项目中经常遇见的问题
<a href="http://output.jsbin.com/habuzanipe" target="_blank">demo</a>


要理解这个问题，首先要弄明白CSS对于 `display: inline 元素的 vertical-align 各个值的含义。`

vertical-align 的默认值是 baseline，这是一个西文排版才有的概念：

<img src="https://pic2.zhimg.com/f0f1e7625a10b204bc32c7203835740d_b.jpg" data-rawwidth="570" data-rawheight="175" class="origin_image zh-lightbox-thumb" width="570" data-original="https://pic2.zhimg.com/f0f1e7625a10b204bc32c7203835740d_r.jpg">

可以看到，出现在baseline下面的是 p 啊，q 啊, g 啊这些字母下面的那个尾巴。可以看到，出现在baseline下面的是 p 啊，q 啊,  g 啊这些字母下面的那个尾巴。
对比一下 vertical-align 的另外两个常见值，top 和 bottom:

<img src="https://pic1.zhimg.com/fa1bef7a27a3c235a2e9bd8de5ba5448_b.jpg" data-rawwidth="571" data-rawheight="175" class="origin_image zh-lightbox-thumb" width="571" data-original="https://pic1.zhimg.com/fa1bef7a27a3c235a2e9bd8de5ba5448_r.jpg">

可以看到，baseline 和 bottom 之间有一定的距离。实际上，inline 的图片下面那一道空白正是 baseline 和 bottom 之间的这段距离。

即使只有图片没有文字，只要是 inline 的图片这段空白都会存在。到这里就比较明显了，要去掉这段空白，最直接的办法是将图片的 vertical-align 设置为其他值。

如果在同一行里有文字混排的话，那应该是用 bottom 或是 middle 比较好。另外，top 和 bottom 之间的值即为 line-height。

假如把 line-height 设置为0，那么 baseline 与 bottom 之间的距离也变为0，那道空白也就不见了。如果没有设置 line-height，line-height 的默认值是基于 font-size 的，视渲染引擎有所不同，但一般是乘以一个系数（比如1.2）。

因此，在没有设置 line-height 的情况下把 font-size 设为0也可以达到同样的效果。当然，这样做的后果就是不能图文混排了。



`解决方法总结`

明白的原理，然后去解决问题，大概总结一下吧：
1，把行内元素display:block 转化为块级元素空白就没有了。
2，vertical-align:top/bottom/middle;
3，font-size:0;
4,line-height:0;



具体用哪一种就看具体的需求咯。

更多参见：

https://css-tricks.com/what-is-vertical-align/
