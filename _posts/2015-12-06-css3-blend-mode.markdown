---
layout:     post
title:      "初识mix-blend-mode"
subtitle:   " \"just for fun\""
date:       2015-12-06 15:20:00
author:     "ZWW"
header-img: "img/home-bg-art.jpg"
tags:
    - mix-blend-mode
---



<h1>12月你好</h1>
2015已经接近尾声了，时间就是走的这么快，毕业出来这半年居然跑了大半个中国，想想也是累了。昨天晚上玩球又输了300个大洋，每次总是告诉自己胜败乃兵家常事，很正常，越是每次这样安慰自己，越是收不了手，赌博这玩意就像赌王说的那样：不怕你技术高，不怕你没钱，就怕你不赌。不赌是赢！


钱是王八，输了咱再挣。哈哈哈

玩玩mix-blend-mode，在cssconf上听人介绍这玩意，当时觉得挺有意思的，因为是看的老外的youtube视频，听得不是完全理解，然后自己也尝试玩一下，这是只能做为一种优雅升级的效果，很多浏览器是并不支持这个属性的，不过未来一定会大量使用，因为这东西真的很好玩。很炫酷

<a href="http://codepen.io/tianzi77/full/dGywmE" target="_blank">mix－demo</a>

<a href="http://codepen.io/tianzi77/full/KVKbxX" target="_blank">hover－demo</a>

效果： 

![demo](/img/post-img/fun.gif)
![demo](/img/post-img/mix.gif)

 有了这个东西，以前很多ps才能失效的效果，直接用它就可以实现。
 
放点代码：

```html

  <div class="forfun">
 
   	     </div>
   	
   	        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        
        .forfun {
            width: 297px;
            height: 300px;
            margin: 100px auto;
            background: url('http://www.zhangweiwei.cn/img/logo.png'), cyan;
            background-size: cover;
            background-blend-mode: lighten;
            position: relative;
        }
        
        .forfun::after {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: url('http://www.zhangweiwei.cn/img/logo.png'), red;
            z-index: 3;
            outline: 3px solid black;
            animation: fun 5s linear infinite alternate;
            background-blend-mode: lighten;
            background-size: cover;
            mix-blend-mode: darken;
        }
        
        @-webkit-keyframes fun {
            0% {
                margin-left: 100px;
            }
            50% {
                margin-left: -100px;
            }
            80% {
                margin-left: 0px;
            }
        }
        
        @keyframes fun {
            0% {
                margin-left: 100px;
            }
            50% {
                margin-left: -100px;
            }
            80% {
                margin-left: 0px;
            }
        }

```


  	            
就是这么好玩，说说background-blend-mode的工作原理

`background-blend-mode属性指定了源元素应该怎样把自己的颜色同自己的背景图片和背景颜色混和起来。如果该元素下还有任何其它的层（例如一个使用蓝色背景颜色的section元素），它将不会把自己的颜色与该元素相混合。它只会把自身的颜色与CSS中为其指定的背景图像和颜色混和在一起。`

怎样用它？

CSS3的候选推荐标准中也有一些混合模式的选项，但目前最有用的是背景混合模式 ：background-blend-mode。 该属性允许我们混合两个图像，或一个图像和一个背景颜色。

混合模式：

`正片叠底模式（Multiply）`

Multiply, 正如它的名字所暗示的，它以混合色的像素为基础，所以会出现较暗的颜色。 黑色叠加结果为黑色，白色叠加图像不变。

`屏幕模式/滤色(Screen)`

与正片叠底模式相反，合成图层的效果是显现两图层中较高的灰阶，而较低的灰阶则不显现（即浅色出现，深色不出现），产生一幅更加明亮的图像。

`叠加模式(Overlay)`

Overlay 是一个复杂的混合模式。 实际效果取决于基色：浅色变得更浅，暗色变的更暗。

overlay混和模式既有screen中的像素颜色变浅效果，也有multiply中的像素颜色加深效果。究竟使用何种模式，取决于底层的色彩，合成后有些区域图变暗有些区域变亮

`变暗模式(Darken)`

此模式的效果取决于源和背景颜色之间更深的（色彩），即混合两图层像素的颜色时，对这二者的RGB值（即RGB通道中的颜色亮度值）分别进行比较，取二者中低的值再组合成为混合后的颜色。

`变亮模式(Lighten)`

这个模式与darken相反，它的效果取决于源和背景颜色之间更浅的（色彩）。即将两像素的RGB值进行比较后，取高值成为混合后的颜色，因而总的颜色灰度级升高，造成变亮的效果。

`颜色减淡(Color-Dodge)`

Color-Dodge模式加亮了背景颜色，从而形成鲜明对比的图像。它减淡亮基色降低对比度，以反映混合色。

`颜色加深(Color-Burn)`

这种模式加深了背景色，并且增加了源和背景色彩的对比度。即让底层的颜色变暗，有点类似于正片叠底，但不同的是，它会根据叠加的像素颜色相应增加底层的对比度。

`强光模式(Hard-Light)`

Hard light无论是multiply，或者screen 的颜色取决于混合色。这种模式与overlay相反。它在较浅的像素上使用multiply模式，而在较深的像素上使用screen模式。作用效果如同是打上一层色调强烈的光，所以称之为强光。

`柔光模式(Soft-Light)`

这种模式在较深像素上使用multiply模式，而在较浅像素上使用screen模式。与overlay有些相似，但有轻微的不同。作用效果如同是打上一层色调柔和的光，因而被我们称之为柔光。作用时将上层图像以柔光的方式施加到下层。

柔和的光线类似于强光线 ，但不是叠加或过滤的颜色，柔和的光线使用减淡和加深起了一个微妙的影响。

`差值/差异模式(Difference)`

要混合图层双方的RGB值中每个值分别进行比较，用高值减去低值作为合成后的颜色，通常用白色图层合成一图像时，可以得到负片效果的反相图像。用黑色的话不发生任何变化（黑色亮度最低，下层颜色减去最小颜色值0，结果和原来一样），而用白色会得到反相效果（下层颜色被减去，得到补值），其它颜色则基于它们的亮度水平。

`排除模式(Exclusion)`

exclusion混和模式与difference模式类似，但产生的图像对比度更低一些。
色相/色调模式(Hue)
Hue取基色和混合色的颜色亮度和饱和度，并将它们合并。这种模式使用当前层的色相值去替换背景图像的色相值，而饱和度与亮度不变。

`饱和度模式(Saturation)`

Saturation， 就像hue一样，合并两个具有混合色属性的基本颜色值，然后进行饱和。

saturation用当前层的饱和度去替换背景图像的饱和度，而色相值与亮度不变。

`颜色模式(Color)`

color兼有色相和饱和度两种模式，用当前层的色相值与饱和度替换背景图像的色相值和饱和度，而亮度保持不变。

`亮度/明度模式(Luminosity)`

这种模式使用当前层的亮度值去替换背景图像的亮度值，而色相值与饱和度不变。该模式产生的效果与Color模式刚好相反，它根据上层颜色的明度分布来与下层颜色混合。



好了，收工了，赶紧去抢回家的会车票，啦啦啦

更多参见：

https://css-tricks.com/almanac/properties/m/mix-blend-mode/ 
