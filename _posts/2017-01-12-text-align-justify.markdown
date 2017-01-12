---
layout:     post
title:      "列表两端对齐及兼容问题"
subtitle:   " \"应对多种浏览器的完美解决方案\""
date:       2017-01-12 16:00:00
author:     "ZWW"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - 两端对齐
---

> **“像编辑word一样实现两端对齐”**

左对齐和右对齐都是很常见的对齐方式，但是很多时候两端对齐也是必须解决的。文本对齐的text-align:justify，大家都不陌生，它只兼容ie浏览器，然而两端对齐对于很多响应式网页和移动端的自适应有很大的用处，比如几个按钮，不管你屏幕尺寸怎么变化都要他们之间的间隙保持不变，css3对这一块也有解决方案，虽然兼容性不是很好。不失为一种好的渐进增强方案。

1， `text-align: justify+inline-block以及模拟text-align`
	
	这里写出通用简单列子结构，下文不在累赘~ 
	 <ul>
        <li><img src="./header.png" alt=""></li>
        <li><img src="./header.png" alt=""></li>
        <li><img src="./header.png" alt=""></li>
        <li><img src="./header.png" alt=""></li>
    </ul>
    第一种实现样式：
    
            * {
            padding: 0;
            margin: 0;
        }
        
        ul li img {
            width: 100px;
            height: 100px;
        }
        /* 
    attention：
    1.IE中要实现块内单行两端对齐需要使用其私有属性text-align-last:justify配合，text-align-last 要生效，必须先定义text-align为justify
    2.line-height:0 解决标准浏览器容器底部多余的空白
    3.font-size:0清楚firefox下多余的空白
    */
        
        ul {
            width: 600px;
            height: 100px;
            margin: 0 auto;
            border: 1px solid #abcdef;
            overflow: hidden;
            text-align: justify;
            text-align-last: justify;
            line-height: 0;
            font-size: 0;
        }
        
        ul li {
            list-style: none;
            display: inline-block;
        }
        /* 
        模拟text-align：
        1.text-align-last:justify 目前只有IE支持，标准浏览器需要使用 .demo:after 伪类模拟类似效果 
        2.opera浏览器需要添加 vertical-align:top 才能完全解决底部多余的空白
         */
        
        ul::after {
            content: "";
            display: inline-block;
            height: 0;
            font-size: 0;
            width: 100%;
            vertical-align: top;
        }
        
        
 要说的，要注意的，都在代码里面注释了，实在没有必要过多的解释什么。
 
 2，`css3 flex+justify-content: space-between;或者flexbox+box-pack:justify`
 

<p>版本迭代问题,box-pack是css3的新属性，依赖于display:box(旧版弹性布局)，受box-orient影响，box-pack决定了子标签水平对齐的方式，可选值有start | end | center | justify。使用box-pack:justify来实现两端对齐非常简单，代码量也少。如果是display:flex(新版弹性布局)则用justify-content为水平对齐方式~</p>
 
 把它们2中方式都写出来
 
 核心代码应该是这样
 
         ul {
            width: 600px;
            height: 100px;
            margin: 0 auto;
            border: 1px solid red;
            overflow: hidden;
            display: -webkit-box;
            display: -webkit-flex;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -webkit-justify-content: space-between;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }
        
     
     
  3，`css3 column(多列布局)`
  
  这个也是很简单的，只需用column-count定义对象的列数,我这个demo有4个img，那么定义为4列
 column-gap定义了对象中列与列的间距，这个只能写死或者根据排版计算间距，间距不能设置为百分比，显得不够灵活
 
添加以下前缀就好：

	     
	   ul{
	   -webkit-column-count:4;
	   -moz-column-count:4;
	   column-count:4;
       -webkit-column-gap:20px;
       -moz-column-gap:20px;
       column-gap:20px; 
     }
  
  
 我只写了一下图片的居中，然后就是文字居中button等一些自适应的方案，其实就是设置百分比，然后文字居中的话好像有什么留空格打空白的一些hack，也不列举了！
 
 
 文字的也简单写了一下：
 
   [两端对齐demo](http://codepen.io/tianzi77/full/GJayoR)
   
   
   
   <p style="font-size:26px;color:red;">2017.1.12更新</p>
今天浏览网页看到阅文集团的列表布局，很简单。一句justify兼容到了ie7。也没有什么伪元素进行处理，觉得很好奇，就看了一下。
他的奥妙在于对dom的格式进行了处理，不是我们正常对齐dom的方式就行编码。

    <div id="brandNavX" class="yw-brand-nav-x"><a href="http://www.qidian.com" target="_blank" class="yw-brand-nav-a" data-index="0"><i class="brand brand-qidian"></i></a> <a href="http://yunqi.qq.com" target="_blank" class="yw-brand-nav-a active" data-index="2"><i class="brand brand-yunqi"></i></a></div>
    
    //像这种每个a标签结尾和开始之间有一个空格。这样会避免很多兼容性问题。
 
 这样看起来代码很不是美观，能不能像正常的代码缩进就行对齐呢。
 
 
 
 
        <div class="wrap" style="background:pink;margin-bottom:50px;">
            <span class="list">1</span>
            <span class="list">2</span>
            <span class="list">3</span>
            <span class="list">4</span>
            <span class="list">5</span>
            <span class="list">6</span>
            <span class="list">7</span>
            <span class="list">8</span>

        </div>
        <div class="wrap">
            <span class="list">1</span>
            <span class="list">2</span>
            <span class="list">3</span>
            <span class="list">4</span>
            <span class="list">5</span>
            <span class="list">6</span>
            <span class="list">7</span>
            <span class="list">8</span>
            <span class="list left-fix">&nbsp;</span>
            <span class="list left-fix">&nbsp;</span>
        </div>

答案还是有的


    .wrap {
            width: 600px;
            margin: 0 auto;
            text-align: justify;
            text-align-last: justify;
            line-height: 0;
            background: yellow;
        }
        
        .wrap::after {
            content: "";
            display: inline-block;
            height: 0;
            font-size: 0;
            width: 100%;
            vertical-align: top;
        }
        
        .list {
            width: 100px;
            height: 100px;
            border: 1px solid red;
            display: inline-block;
        }
        
        .left-fix {
            height: 0;
            padding: 0;
            overflow: hidden;
            border-color: transparent;
        }
    
    //left-fix主要是用来解决最后一行不两端对齐的问题，这样就会左对齐
    

font-size：0在ie下会导致无法对齐，其次需要注意的是为了兼容到ie7，需要使用inline水平的标签，例如span, a, strong, em等，像li, div这些标签就不可以，就如demo里面的span标签而不用div。这样的布局用浮动+外边距或者最后一个list添加一个类，右边距设置为0。但是每次要去计算一下麻烦，在小屏幕下适配的话又要去计算一遍，而且浮动本身破坏了正常的布局，和定位一样，我脑子里能少用就少用。
    
 了解更多参考：
 
 <a href="http://tianzi77.github.io/demo/article/new_align.html" target="_blank">新对齐</a>	
<a href="http://www.cnblogs.com/PeunZhang/p/3289493.html" target="_blank">白树博客</a>
 