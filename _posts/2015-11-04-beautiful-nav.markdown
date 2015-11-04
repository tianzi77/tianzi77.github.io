---
layout:     post
title:      "好看的水纹导航"
subtitle:   " \"下划线的升级版导航\""
date:       2015-11-04 20:00:00
author:     "ZWW"
header-img: "img/post-bg-apple-event-2015.jpg"
tags:
    - nav导航
---

今天闲来没事浏览国外网站， 看见一种导航挺有意思的，出于好奇，自己也写着玩了一下，其实也就是玩一玩三角吧，用before和after伪类话2个三角，因为三角是实心的，所以要用一个三角覆盖另一个三角，留出1px的边框的斜线，思路大概就是这样。


<a href="http://codepen.io/tianzi77/full/VvGZzy" target="_blank" style="text-decoration:none;font-size:20px;color:blue">直接上成果demo</a>


> **“怎么画三角？”**

以前在csdn上写过一遍文章，就是专门玩转各种三角的：

http://blog.csdn.net/u011263845/article/details/48032091

就是用border画出尖角

	        div.sanjiao{
            width: 0;
            height: 0;
            border-bottom: 10px solid transparent;
            border-top: 10px solid transparent;
            border-left: 10px solid red;
        }
        //这样画出来是向右的一个三角，其他几个放下也是类似


然后其实这样写也是可以，

	        border: 14px solid transparent;
            border-top: 7px solid;
            border-top-color: inherit;
            //这样画出来尖叫朝下，用了border的简写，而且画的是一个等边三角形
            

> **“怎么让三角只留下1px边框？”**            
   
   就是让2个三角从何吧，用小三角颜色设置为白色去覆盖有颜色的三角，看起来就剩下折线了
   
       .nav a:before {
            bottom: -14px;
            left: 50%;
            margin-left: -7px;
            border: 7px solid transparent;
            border-top: 7px solid;
            border-top-color: inherit;
        }
        
        .nav a:after {
            border: 6px solid transparent;
            border-top: 6px solid #fff;
            bottom: -12px;
            left: 50%;
            margin-left: -6px;
        }         
 
 	//绝对定位让三角居中           
            


完整的代码是这样的：

	    <nav class="nav" role="row">
        <a href="">导航1</a>
        <a href="">导航2</a>
        <a href="">导航3</a>
        <a href="">导航4</a>
        <a href="">导航5</a>
    </nav>
    
            * {
            box-sizing: border-box;
            padding: 0;
            margin: 0;
        }
        
        .nav {
            color: hotpink;
            width: 100%;
            text-align: center;
        }
        
        .nav a {
            position: relative;
            padding-bottom: 8px;
            color: #000;
            font: 24px/1 MetricWeb-Regular, "Arial Bold", Gadget, sans-serif;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            outline: 0;
            -webkit-transition: color .2s ease, opacity .2s ease;
            transition: color .2s ease, opacity .2s ease;
            -webkit-transition: border-color .2s ease, opacity .2s ease;
            transition: border-color .2s ease, opacity .2s ease;
            margin-right: 30px;
        }
        
        .nav a:hover {
            color: inherit;
            border-color: inherit;
        }
        
        .nav a:hover:after,
        .nav a:hover:before {
            display: block;
        }
        
        .nav a:before {
            bottom: -14px;
            left: 50%;
            margin-left: -7px;
            border: 7px solid transparent;
            border-top: 7px solid;
            border-top-color: inherit;
        }
        
        .nav a:after {
            border: 6px solid transparent;
            border-top: 6px solid #fff;
            bottom: -12px;
            left: 50%;
            margin-left: -6px;
        }
        
        .nav a:after,
        .nav a:before {
            position: absolute;
            display: none;
            content: "";
            width: 0;
            height: 0;
        }


`从小老师就告诉我们外国人数学不好，不如中国人学什么高数，但是我发现外国人玩css真的玩的挺精确的，不管是画svg还是各种设计的效果，很多都不错，可能是严谨的态度吧，哈哈哈`

简单的例子，还是学到了一些东西。

水平居中的2种方式区别如下:

1.text-align:center 设置文本或img标签等一些内联对象（或与之类似的元素）的居中。

2.margin:0 auto 设置块元素（或与之类似的元素）的居中。

用margin居中的时候必须设置块元素的宽，百分比是比起作用的。我理解就是text-align:center 居中的是inline和inline-block元素，而margin居中的是块元素，各种块元素。