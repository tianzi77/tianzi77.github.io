---
layout:     post
title:      "dialog一应俱全"
subtitle:   " \"dialog一应俱全\""
date:       2017-01-20 17:00:00
author:     "ZWW"
header-img: "img/post-bg-e2e-ux.jpg"
tags:
    - dialog
---

> **“dialog”**

在2.0的基础上增加了弹框出来的东校和关闭的动销


如果是ie低版本浏览器，就让弹框直接收起来，如果是高级浏览器，则加上动画的类在让它消失

    if(isIE){
            elements.dialogBox.style.display = 'none';
        }else {
            elements.dialogBox.className = 'guest-box' + ' ' + options.effect;
            //增加淡入淡出效果 2017.1.20
            setTimeout(function(){
                elements.dialogBox.style.display = 'none';
        },150)

注意动画的类切换的时候有2个状态，用一个show类别做辅助就好。打开的时候绑定动画类和show在一起，关闭的时候用css改变去掉show的时候的状态，达到切换的效果。setTimeout真是个宝。

文章越来越短，新年越来越近，哎。
 
<a href="http://www.zhangweiwei.cn/tools/dialog/index.html" target="_blank">dialog 3.0</a>	

 