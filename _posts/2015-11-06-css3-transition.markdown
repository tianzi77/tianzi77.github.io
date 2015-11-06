---
layout:     post
title:      "css3 3d动画学习心得"
subtitle:   " \"本文来自繁星ued\""
date:       2015-11-06 15:20:00
author:     "ZWW"
header-img: "img/post-bg-android.jpg"
tags:
    - css动画
---



<h1>引言</h1>
本文阐述了自己学习css3做3d动画的心得：并非用了rotateX、rotateY做旋转效果就一定是3d，实现一个3d效果需要理清一些概念，然后多个属性共同配合。

<a href="http://codepen.io/tianzi77/full/MaqLrg" target="_blank">动画demo</a>

效果： 

![demo](/img/post-img/css3.gif)

 5张图片围成个三角形，鼠标移上去，5个图片就会旋转。 
 
代码：



         <style>
        * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
        }
        body{
            background-color: #000;
        }
        .commonP {
            position: absolute;
        }
        
        .stage {
            -webkit-perspective: 800px;
            perspective: 800px;
            width: 200px;
            height: 100px;
            margin: 200px auto;
        }
        
        .wrap {
            width: 200px;
            height: inherit;
            margin: 100px;
            position: relative;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transition: -webkit-transform 4s;
            transition: transform 4s;
        }
        
        .wrap:hover {
            -webkit-transform: rotateY(360deg);
            transform: rotateY(360deg);
        }
        
        .pic1 {
            -webkit-transform: rotateY(72deg) translateZ(200px);
            transform: rotateY(72deg) translateZ(200px);
        }
        
        .pic2 {
            -webkit-transform: rotateY(144deg) translateZ(200px);
            transform: rotateY(144deg) translateZ(200px);
        }
        
        .pic3 {
            -webkit-transform: rotateY(216deg) translateZ(200px);
            transform: rotateY(216deg) translateZ(200px);
        }
        
        .pic4 {
            -webkit-transform: rotateY(288deg) translateZ(200px);
            transform: rotateY(288deg) translateZ(200px);
        }
        
        .pic5 {
            -webkit-transform: rotateY(360deg) translateZ(200px);
            transform: rotateY(360deg) translateZ(200px);
        }
        
        .wrap img {
            width: 200px;
            height: 100px;
        }
    </style>
	</head>

	<body>
    <div class="stage">
        <div class="wrap">
            <img src="http://pic1.nipic.com/2008-10-08/2008108164130920_2.jpg" class="pic1 commonP" alt="" />
            <img src="http://5.26923.com/download/pic/000/324/1411ae6735555e5ac32d8750058139ca.jpg" class="pic2 commonP" alt="" />
            <img src="http://img.taopic.com/uploads/allimg/110817/2505-110QG1041317.jpg" class="pic3 commonP" alt="" />
            <img src="http://b.hiphotos.baidu.com/zhidao/pic/item/3c6d55fbb2fb43167cdd6aa821a4462308f7d325.jpg" class="pic4 commonP" alt="" />
            <img src="http://pic42.nipic.com/20140609/2531170_185159095000_2.jpg" class="pic5 commonP" alt="" />
        </div>
		</div>
    
    
  注：如果用更多图片来围圈效果会更炫些，不过为了突出原理，只用了3张且代码没有做兼容，只能在chrome等webkit浏览器下看效果。代码中没有js,纯css。无需js参与的纯样式动画，这应该也是css3动画的魅力之一了。

demo原理

1、`构建一个3d的静态和动态环境：perspective、transform-style:preserve-3d `

2、`5张图片绝对定位，保证原点相同：position:absolute `

3、`分别绕y轴旋转120,240,360度，摆好方向：rotateY `

4、`分别各自向自己的前方位移80px，拉开距离：translateZ `

5、`旋转3张图片共同的容器wrap，3张图片旋转：rotateY 
css3的2d动画，从原理上讲，还是比较简单的，但是3d就要捋一捋了。`

下面应该是需要注意的地方
1、perspective

此属性定义了透视的距离，让其子元素具有透视效果，也就是让子元素看起来“近大远小” 


perspective的值是怎么定的？

perspective是有值的，它代表了你的视野距离角色的距离。demo中颜色最深的矩形，从原点向正前方位移了80px（ -webkit-transform: rotateY(360deg) translateZ(80px);）

这里设想有一个摄像头，摄像头距离物体的距离（perspective）和角度(perspective-origin)，决定了你所看到的。因为摄像头伸到正前面深色矩形的后面，伸到3个图片围成的圈子里面了，自然看不到深色矩形，只能看到里面。就好像你在门外可以看到整所房子，可是你已进入房子，进门的那面墙就到你身后，就看不到那面墙。原则上这里perspective值只要超过80px我们就可以看到整体了，但是实际我们可以根据需求，继续调整为自己想要的感觉。

2、transform-style

transform-style:preserve-3d让正在动画状态的元素保留其3d效果 
有了perspective和transform-style:preserve-3d才是3d效果，否则都是2d的，perspective是3d总负责，transform-style:preserve-3d负责动画状态下的3d。如果要更精细的控制3d效果，

还可配合使用perspective-origin、backface-visibility等属性，不过只要掌握了原理应该都不再是难题。

我只是转载了这遍文章，很多图片原理也没写

更多参见：

http://ued.fanxing.com/css3-3ddong-hua-xue-xi-xin-de/