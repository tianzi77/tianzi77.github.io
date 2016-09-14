---
layout:     post
title:      "[转]移动端适配之雪碧图(sprite)背景图片定位"
subtitle:   " \"移动适配\""
date:       2016-09-14 21:55:00
author:     "ZWW"
header-img: "img/404-bg.jpg"
tags:
    - 移动雪碧图
---

> **想到移动雪碧图的适配问题，网易一位同学的文章挺不错的。根据之前的移动端适配之rem找到了解决方案。我就记录一下吧。原理也就那么回事**

以640px视觉稿切出来的图，如果只是适配640px的屏幕，直接使用px定位完全没有问题，但是考虑到其他的屏幕，所以我们会使用rem来等比例缩放背景图。是的，把原尺寸转换为rem就可以了

html代码结构


    <div class="test-sprites">
        <ul class="f-cb">
            <li class="icon1"></li>
            <li class="icon2"></li>
            <li class="icon3"></li>
            <li class="icon4"></li>
            <li class="icon5"></li>
            <li class="icon6"></li>
        </ul>
    </div>
    
    
属性了原理。直接定义一个sass函数出来


```css

    //$spriteWidth 雪碧图的宽度px
    //$spriteHeight 雪碧图的高度px
    //$iconWidth 需要显示icon的宽度px
    //$iconHeight 需要显示icon的高度px
    //$iconX icon的原始x坐标
    //$iconY icon的原始y坐标
    //
    @mixin bgPosition($spriteWidth, $spriteHeight, $iconWidth, $iconHeight, $iconX, $iconY){

    background-position: (($iconX / ($spriteWidth - $iconWidth)) * 100% ($iconY / ($spriteHeight - $iconHeight)) * 100%); 
    }

    //使用的方式
    .test-sprites{
    margin-top: 30px;

    ul{
        padding: 0;
        margin: 0;
    }

    li{
        width: 0.48rem;
        height: 0.7rem;
        overflow: hidden; 
        box-sizing: border-box; 
        margin-left: 0.3rem;
        float: left;
        background:transparent url('http://nos.netease.com/edu-image/9BC0742AEB1A0B756EFC71B9DF77E452.png') 0 -0.02rem no-repeat;
        background-size: 10.72rem 4.42rem;
    }

    .icon2{
        width: 0.74rem; 
        height: 0.64rem;
        @include bgPosition(1072, 442, 74, 64, 188, 5); 
    }

    .icon3{
        width: 0.71rem;
        height: 0.74rem;
        @include bgPosition(1072, 442, 71, 74, 391, 2);
    }

    .icon4{
        width: 0.72rem;
        height: 0.73rem;
        @include bgPosition(1072, 442, 72, 73, 591, 3); 
    }
    .icon5{
        width: 0.73rem;
        height: 0.73rem;
        @include bgPosition(1072, 442, 73, 73, 792, 1); 
    }
    .icon6{
        width: 0.67rem;
        height: 0.57rem;
        @include bgPosition(1072, 442, 67, 57, 996, 8);
    }
    }
    
```

进一步简洁sass

    //同一张sprite图，横图
    @mixin bgPositionSameSprite($iconWidth, $iconHeight, $iconX, $iconY){

    $spriteWidth : 1072;
    $spriteHeight : 442;

    @include bgPosition($spriteWidth, $spriteHeight, $iconWidth, $iconHeight, $iconX, $iconY);
    }

    //同一张sprite图、竖图
    @mixin bgPositionSameSprite-tow($iconWidth, $iconHeight, $iconX, $iconY){

    $spriteWidth : 300;
    $spriteHeight : 1000;

    @include bgPosition($spriteWidth, $spriteHeight, $iconWidth, $iconHeight, $iconX, $iconY);
    }
    
如果每个雪碧图小icon的大小相同呢

    //同一张sprite图并且每个icon的大小相同
    @mixin bgPositionSameSpriteAndWidth($iconX, $iconY){

    $spriteWidth : 220;
    $spriteHeight : 220;
    $iconWidth : 61;
    $iconHeight : 61;

    @include bgPosition($spriteWidth, $spriteHeight, $iconWidth, $iconHeight, $iconX, $iconY);
    }
    //使用
    i{
    padding-top: 100%;
    width: 100%;
    display: block;
    background: url(http://nos.netease.com/edu-image/3A65D313376F13CE75CE01C2593BD1CE.png) 0 0 no-repeat;
    background-size: 2.2rem 2.2rem;
    }

    .i-sina{
    @include bgPositionSameSpriteAndWidth(10, 10);
    }

    .i-qzone{
    @include bgPositionSameSpriteAndWidth(80, 10);
    }

其实真的只是记录学习一下。哈哈哈，方法挺实用，中秋快乐
        
参考：

简书：http://www.jianshu.com/p/dfa33d3be23c

移动适配（推荐阅读无js）：http://www.jianshu.com/p/dfa33d3be23c
    