---
layout:     post
title:      "小工具之迷你幻灯片"
subtitle:   " \"迷你幻灯片\""
date:       2017-01-14 20:00:00
author:     "ZWW"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - 迷你幻灯片
---

> **“封装一个幻灯片函数”**

准备封装成jq插件的形式，想想还是算了，包装成一个函数就足够，最关键的问题是真没玩过jq插件。哈哈

<p style="font-size:24px;color:blue;">优点：</p>
兼容到ie7，代码较小 <br>
避免css和js冲突，类名的全部为公共样式，调用幻灯id识别<br>
参数较为完成，基本满足幻灯的各种需求<br>

    function miniSlide(imgW, slideBox, len, interval, slideTime, btnEv, autoTurn){
        变量说明：
            imgW:单个幻灯长度
            slidebox： 幻灯片容器
            len： 幻灯图片个数
            interval: 自动播放时间
            slideTime: 手动切换时间
            btnEv: 按钮时间类型 click， mouseenter等
            autoTurn: 自动播放开关 
            */
    }

<p style="font-size:24px;color:red;">缺点：</p>

不支持移动的滑屏操作<br>
本来对ie低版本准备采用animate效果，高级浏览器用css3实现的，但是这样有一个bug，就是要判断动画的执行完成与否，代码量增加很多，最关键的是我他妈不会判断。以上<br>


 mini-slide：
 
<a href="http://www.zhangweiwei.cn/tools/slide/mini.html" target="_blank">slide演示</a>	

 