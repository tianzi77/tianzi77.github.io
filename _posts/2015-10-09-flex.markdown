---
layout:     post
title:      "再次回味background"
subtitle:   " \"每个css属性都是一段故事，需要我们认真体会发现\""
date:       2015-10-11 11:00:00
author:     "ZWW"
header-img: "img/post-bg-universe.jpg"
tags:
    - background
---

> **“周末闲下来玩玩background. ”**

首先**background**是一个符合属性，从原来的css2属性有：

`background-color`

`background-image`

`background-position`

`background-attachment`

`background-repeat`

然后随着CSS3这个强大的东西到来之后，又新增了几个属性：

`background-size`

`background-origin`

`background-clip`


#background-color
这个属性可以把背景色设置为比如十六进制的方式`#F32600`、或者用RGB的方式`rgb(200,200,125)`，当然还有hsl之类的方式，最常用的就是直接`red yellow`之类的颜色值。

回味一点：这个属性和`background-clip`擦出火花


        div{
            width: 10em;
            height: 10em;
            padding: 10px;
            margin: 10px;
            background: red;
            border: 10px dotted pink;
            background-clip: border-box;
            这个可设置为:border-box content-box padding-box 以及inherit
        }

#background-image
这个属性把背景色设置为图片，绝对相对地址都可以。

回味一点他会覆盖`background-color`的背景，然后就是他可以设置多图背景显示：

`background-image: url(name1.jpg), url(name2.png), url(name3.gif);`。结合`background-position`可以设置多张背景图片的显示位置其他没什么好玩的

#background-position

这个属性值都是`top、left、center、bottom`等组合，或者要么就是百分值和px值这几种，对于这几种大家都已经很属性了，也没什么好说的，都是相对于容器的左上角来计算的。
回味一点`background-position`的位置是跟`background-origin`相关的，并且如果设置了`background-clip`的话，那么效果又不一样了，
还有好玩的一点，`background-position`设置为百分比的时候是大盒子的百分比减去自身的百分比，这点需要注意～


#background-origin

`background-origin的作用是用于处理背景定位的原点坐标位置`，共有三个属性值：

`border-box`

`padding-box`

`content-box`

这三个属性值，如果了解盒模型的同学肯定就明白了，分别就是针对`边框、内边距、内容区域`三个部分的左上角为坐标。所以他会改变`background-position`的位置，当设置原点坐标位置不同时。

#background-clip

这个属性的作用是`限制背景修剪的位置`，这个也是根据`background-origin`属性值来改变效果的，这里要提一下的是，`background-clip`的属性值跟`background-origin`是一样的，都是：

`border-box 即表示从边框区域剪切背景`

`padding-box 即表示从内边距区域剪切背景`

`content-box 即表示从内容区域剪切背景`

回味一点：注意和`background-origin`的区别以及配合使用会出现很多好玩的背景图案。



#background-attachment

这个属性基本上来说，现在大家似乎都不会去关注，个人感觉好像是这样的。不过不管是不是这样，反正我知道我个人真的没去关注过，而且经常会搞不灵清`background-attachment`的属性值区别。基本上的作用就是定义一张不重复的图片随着内容区域的滚动而滚动，好吧，我感觉自己又把概念混乱了。

先看这个属性有三个属性值：

`fixed`

`local`

`scroll`

其他两个属性比较好理解，说一下`local` 这个是css3新增的属性，属性含义是随内容的滚动而滚动，即内容太少没出现滚动条是固定背景显示，出现滚动条时跟随内容滚动。

回味一点：

`background-attachment：scroll当设置了overflow:scroll是无效的`
`background-attachment：local只有在设置了overflow:scroll时才有效`  而且亲测safari下有效 chrome下无限，兼容性很存在很大问题。

#background-repeat

`background-repeat`这个也是大家最常用的一个背景属性了，对于这个属性，我们一般也就是用到`repeat、no-repeat、repeat-x和repeat-y`四种，对于这四种，其实大家也都是很好理解的，无非就是各个方向都重复、都不重复、X轴重复和Y轴重复，然后结合盒模型的原理，就可以猜想到是从容器的原点位置，以X轴或者Y轴进行重复平铺背景图片，如果一张图片在容器中没有完全显示的话。


css3新增了2个属性`space，round玩起来有点意思`

`background-repeat: space;`

根据背景图片的大小，然后通过计算容器的大小来平铺背景，多余的部分用空白来填充，这样的平铺方式是不会出现图片被截成一半的情况。

`background-repeat: round;`

根据背景图片的大小，然后通过计算容器的大小，压缩图片来填充容器，这样的平铺方式也是不会出现图片截成一半的情况，不过跟`background-repeat: space;`不同的是这种填充方式不会出现空白的区域，而是会去压缩图片的大小来适应容器。


这个写了个demo：

http://codepen.io/tianzi77/full/QjMWRg
   
   结构和简单的样式
   
    <div class="clear">
        <div class="space">space demo</div>
        <div class="round">round demo</div>
    </div>

        div {
            color: blue;
            text-align: center;
        }
        
        div.space {
            width: 500px;
            height: 500px;
            border: 1px solid green;
            background-image: url(http://v1.qzone.cc/avatar/201404/13/11/12/534a00b62633e072.jpg!200x200.jpg);
            background-repeat: space;
            background-color: pink;
            float: left;
        }
        
        div.round {
            width: 500px;
            height: 500px;
            border: 1px solid green;
            background-image: url(http://v1.qzone.cc/avatar/201404/13/11/12/534a00b62633e072.jpg!200x200.jpg);
            background-repeat: round;
            background-color: black;
            float: right;
        }
        
        div.clear {
            overflow: hidden;
            /*清除float*/
        }

回味一点：

`影响background-repeat的属性无非也就是background-origin这个属性了，这个属性直接改变了背景在一个容器中的计算显示方式，就跟box-sizing一样，直接影响到了盒模型的表现方式，具体的也就不做demo了`


#background-size

这玩意和`linear-gradient`能玩出很多效果，

demo：

http://www.zhangweiwei.cn//demo/sanjiao/image.html

一般的当没有`background-size`的时候，一张背景图片是很老实得呆在左上角，并且是保持着原来的大小，当然，有了这个属性，它还是呆在左上角，不同的是，这张背景图片的尺寸改变了：

`100%： 一个值的时候，其实就是把宽高都拉伸到相对于容器的宽度，简单来说，撑满了；`

`50%： 这个当然就是宽高都只有容器的一半（50%）的时候；`

`100% 50%： 这个呢就是宽度相对容器是100%的，而高度是50%；`

从上面三个情况来看，大家应该已经很清楚的明白了`background-size`的值是针对容器的，并且是先宽度再高度。

那么我们现在用的是%这个百分比的相对单位，其实我们也是可以用`px来表示啊，或者是em，`当然也可以是现在很多人喜欢用的rem作为单位值来使用。

这个属性下面还有几个好玩的：


`auto`

`contain`

`cover`

`auto`没啥玩的。


`background-size: contain;`

等比缩放，以最大的尺寸填充到容器中，但不一定会撑满容器，而出现背景图片显示不全的情况。

`background-size: cover;`

等比缩放，以最小的尺寸填充到容器中，一定会撑满容器，且可能会出现背景图片显示不全的情况。

见demo：http://output.jsbin.com/toxaxozotu

`会发现当设置contain是改变容器的大小背景图片不会填满容器。而设置cover背景色不管怎么改变都会充满容器。`


#最后background 简写模式

以前没有那么多新增属性的时候，简写就是：

`background: url(a.png) top left no-repeat fixed #000;`

现在有了之后，就稍微改变了一下，不过也相差不多：

`background: url(a.png) top left / cover no-repeat fixed content-box content-box #000`

格式就是：

 `<bg-image> || <position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box> || <'background-color'>	`



*妈蛋，一个简单的background属性，也是好玩。现在折腾出来的效果也真的是多啊，如果把各种属性结合在一起，估计出现什么效果有时候自己都想象不到，尤其是新增的几个属性，特别是background-origin和background-size，改变了曾经对background的一些看法。*


参考博文：

林小志github：http://linxz.github.io/blog/css%E5%B1%9E%E6%80%A7%E5%9F%BA%E7%A1%80/2015/06/think-about-background.html


### *"不玩了，骑车出去玩一转，周末快乐。"*  




 


