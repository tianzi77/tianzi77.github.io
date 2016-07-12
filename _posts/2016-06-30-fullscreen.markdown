---
layout:     post
title:      "导航，我觉得可以玩玩"
subtitle:   " \"几种网站常见导航\""
date:       2016-07-10 17:55:00
author:     "ZWW"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - 导航
---

> **国内的导航经过好几年的沉淀。好像就那么几种常见的样子。国外的一个网站专门写一些灵感创作的新玩意或者炫酷东西，感觉挺有才的**




`我总结一下无非就是商城购物网站导航，然后里面分很多二级导航，一般的企业和博客导航`



<br>
<p style="color:deeppink;font-size:16px;">  1，滑动导航？没有css3怎么玩？那就用脚本呗，曾经很多公司都玩这种导航，应该在当时很风靡。</p>

    ```html
    <div class="nav" id="nav">
        <ul>
            <li><a href="javascript:void(0);">我是菜单</a></li>
            <li><a href="javascript:void(0);">我是菜单</a></li>
            <li><a href="javascript:void(0);">我是菜单</a></li>
            <li class="current"><a href="javascript:void(0);">我是菜单</a></li>
            <li><a href="javascript:void(0);">我是菜单</a></li>
        </ul>
        <div class="nav-line"></div>
    </div>
    ```
样子啦？随便装扮一下呗。别写太多了，费劲，哈哈

```css

    .nav {
            position: relative;
            background: yellow;
            overflow: hidden;
            margin: 111px auto;
        }
        
        .nav ul {
            font-size: 0;
            *word-spacing: -1px;
            border-bottom: 2px solid #ddd;
            padding-bottom: 5px;
        }
        
        .nav ul li {
            display: inline-block;
            *display: inline;
            *zoom: 1;
            vertical-align: top;
            word-spacing: normal;
            letter-spacing: normal;
            font-size: 14px;
            width: 100px;
            text-align: center;
            position: relative;
            z-index: 1;
        }
        
        .nav .current a,
        .nav ul li a:hover {
            color: red;
        }
        
        .nav ul li a {
            color: #333;
            text-decoration: none;
        }
```

其实这种滑动导航，滑动滑动，肯定要运动，重点在于脚本，大体就是添加一个滑块元素，然后计算他的位置并运动啦

```js

    var container = $('#nav'),
                elements = $('li', container),
                className = 'current',
                slider = $('.nav-line', container),
                now_index = $(elements).filter('.current').index(),
                array_w = $(elements).map(function() {
                    return $(this).outerWidth(true);
                }),
                initial_width = $('.current').width(),
                initial_position = $('.current').position();
            $('.nav-line').css({
                left: initial_position.left,
                width: initial_width
            });

            $(container).on('click', 'li', function() {
                // 获取当前点击的元素索引
                now_index = $(this).index();
                // 添加class
                $(this).addClass(className).siblings().removeClass(className);
                // 滑块移动至当前位置
                setSlider(now_index);
                alert(999)
            });
            $(container).on('mouseenter', 'li', function() {
                // 获取当前索引
                var i = $(this).index();
                // 滑块移动至当前位置
                setSlider(i);
            });
            $(container).on('mouseleave', function() {
                // 鼠标离开导航区域后, 滑块还原至最后点击的元素处
                setSlider(now_index);
            });

            function setSlider(i) {
                $(slider).width(array_w[i]);
                $(slider).stop(true, true).animate({
                    'left': getSliderDistance(i)
                }, 'fast');
            }

            function getSliderDistance(i) {
                var arr = array_w.slice(0, i),
                    len = arr.length,
                    sum = 0;
                for (var j = 0; j < len; j++) {
                    sum += arr[j];
                }
                return sum;
            }
            $(".change").on('click', function() {
                $('.nav-line').css({
                    'height': '100%',
                    'z-index': '0'
                })
            })
```



<p style="color:deeppink;font-size:16px;">2，有了css3，这样的导航真的so easy</p>


    ```html
    <div class="slide-nav">
    <a href="">导航1</a>
    <a href="">导航2</a>
    <a href="">导航3</a>
    <a href="">导航4</a>
    <span class="nav-arrow"></span>
    </div>
    ```
只需简单的定义点样式就好了

```css

    .slide-nav {
            position: relative;
            z-index: 3;
            margin: 111px auto;
            overflow: hidden;
            width: 400px;
        }
        
        .slide-nav a {
            display: block;
            float: left;
            width: 100px;
            font-size: 16px;
            color: #abcdef;
            text-align: center;
            height: 44px;
            line-height: 44px;
        }
        
        .nav-arrow {
            position: absolute;
            display: block;
            width: 100px;
            height: 4px;
            background-color: #abcdef;
            left: 0;
            bottom: 0;
            transition: left linear .3s;
        }
        
        .slide-nav a:nth-child(1):hover .nav-arrow {
            left: 0;
        }
        
        .slide-nav a:nth-child(2):hover~.nav-arrow {
            left: 100px;
        }
        
        .slide-nav a:nth-child(3):hover~.nav-arrow {
            left: 200px;
        }
        
        .slide-nav a:nth-child(4):hover~.nav-arrow {
            left: 300px;
        }
```

思路跟脚本一样吧，只不过现在用短短的几行css就能搞定，其实很多时候脚本都能被剪短的css替换的。

<p style="color:deeppink;font-size:16px;">3，购物网站的导航，也玩玩吧，反正没事干，这种导航结构稍微多一点，随便模拟一下</p>

    ```html
    <div class="nav">
        <ul class="nav-content">
            <li class="nav-items item-first">
                <a href="###">
                    <span class="text">导航一</span>
                    <span class="arrow">&gt;</span>
                </a>
                <div class="sm-nav">
                    <a href="">栏目1</a>
                    <a href="">栏目2</a>
                    <a href="">栏目3</a>
                </div>
            </li>
            <li class="nav-items">
                <a href="###">
                    <span class="text">导航二</span>
                    <span class="arrow">&gt;</span>
                </a>
                <div class="sm-nav">
                    <a href="">栏目1</a>
                    <a href="">栏目2</a>
                    <a href="">栏目3</a>
                </div>
            </li>
            <li class="nav-items">
                <a href="###">
                    <span class="text">导航三</span>
                    <span class="arrow">&gt;</span>
                </a>
                <div class="sm-nav">
                    <a href="">栏目1</a>
                    <a href="">栏目2</a>
                    <a href="">栏目3</a>
                </div>
            </li>
        </ul>
        <div class="show-nav" style="display:none;">
            <div class="nav-content" style="display:none;">导航一详情</div>
            <div class="nav-content" style="display:none;">导航二详情</div>
            <div class="nav-content" style="display:none;">导航三详情</div>
        </div>
    </div>
```

样式也随便写写，不对，好像不能随便写写，这个1px之间相差很多大，要经过精确的计算，不然会出现抖动等等bug
总之，1px也是很重要的，虽然很多时候我很烦视觉设计纠结1像素的问题。

```css

    .nav {
            position: relative;
            z-index: 1;
            width: 230px;
            margin: 111px auto;
            background-color: #abcdef;
            box-sizing: border-box;
        }
        
        .nav .nav-content {}
        
        .nav .nav-content .nav-items {
            border-bottom: 1px dashed #ddd;
            padding: 10px 0;
            margin: 0 10px;
        }
        
        .nav .nav-content .item-first {
            border-top: 0 none !important;
            margin-top: 0 !important;
        }
        
        .nav .nav-content .nav-items.current {
            border: 1px solid #fff;
            border-left: 0 none;
            margin: 0;
            padding: 10px;
            border-right: 1px solid #abcdef;
            position: relative;
            z-index: 3;
            margin: -1px 0 0;
        }
        
        .nav-items a {
            display: block;
            overflow: hidden;
        }
        
        .nav .nav-content .nav-items.current a {
            transform: translateX(10px);
            transition: all linear .3s;
        }
        
        .nav-items .text {
            float: left;
            font-size: 16px;
            color: #525252;
        }
        
        .nav-items .arrow {
            font-size: 16px;
            float: right;
            color: deeppink;
        }
        
        .sm-nav {
            *zoom: 1;
            overflow: hidden;
        }
        
        .sm-nav:after {
            display: table;
            content: "";
        }
        
        .sm-nav a {
            float: left;
            font-size: 14px;
            color: #fff;
            margin-right: 20px;
        }
        
        .show-nav {
            position: absolute;
            left: 229px;
            top: 0;
            width: 400px;
            z-index: 2;
            background-color: #abcdef;
            height: 100%;
            border-left: 1px solid #fff;
        }
```

剩下的就是简单的交互了，封装一个简单的类似tab的函数，然后let's do it

```js

    var cateMouseOver = function(elm) {
                var _i = -1;
                $(elm).find('.nav-content .nav-items').mouseover(function() {
                    _i = $(this).index();
                    $(this).addClass('current').siblings().removeClass('current');
                    $(elm).find('.show-nav').show()
                        .find('.nav-content').eq(_i).show().siblings().hide();
                });
            }
            $(".nav").hover(function() {
                var _that = this;
                cateMouseOver(_that);
            }, function() {
                $(this).find('.show-nav').hide().end()
                    .find('.nav-items').removeClass('current');
            });
```

<br> 
其实写文章只是方便自己记录一下文字，别无用处，老规矩，上demo。

<a href="http://www.zhangweiwei.cn/tools/nav.html " target="_blank">购物导航</a>
<br>
<a href="http://www.zhangweiwei.cn/tools/cool-nav.html " target="_blank">滑动导航</a>






 


