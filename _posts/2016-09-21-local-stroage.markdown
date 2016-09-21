---
layout:     post
title:      "HTML5 LocalStorage 本地存储"
subtitle:   " \"localStorage一练\""
date:       2016-09-21 21:55:00
author:     "ZWW"
header-img: "img/t19.jpeg"
tags:
    - localStorage
---

> **Cookies自然是大家都知道，问题主要就是太小，大概也就4KB的样子，而且IE6只支持每个域名20个cookies，太少了。优势就是大家都支持，而且支持得还蛮好。很早以前那些禁用cookies的用户也都慢慢的不存在了，就好像以前禁用javascript的用户不存在了一样。**

在HTML5中，本地存储是一个window的属性，包括localStorage和sessionStorage，从名字应该可以很清楚的辨认二者的区别，前者是一直存在本地的，后者只是伴随着session，窗口一旦关闭就没了。二者用法完全相同，这里练一下localStorage为例。

首先判断浏览器是否支持

    if(window.localStorage){
        alert('This browser supports localStorage');
    }else{
        alert('This browser does NOT support localStorage');
    }

存储数据的方法就是直接给window.localStorage添加一个属性，例如：window.localStorage.a 或者 window.localStorage["a"]。它的读取、写、删除操作方法很简单，是以键值对的方式存在的，如下：

    localStorage.a = 3;//设置a为"3"
    
看看官方api推荐使用的自然是getItem()和setItem()，清除键值对使用removeItem()。如果希望一次性清除所有的键值对，可以使用clear()。


简单的需求，一个按钮初次点击出现A提示，然后点击都出现B提示

    //我们自然想到定义一个flag变量进行判断
    var isFirstClick = true;
            $(".test").on("click", function() {
                if (isFirstClick) {
                    alert("你是第一次点击");
                    isFirstClick = false;
                } else {
                    alert("你是第二次点击");
                }
            })
    
    
这样做刷新浏览器的时候就重置了，如果我想刷新浏览器也不改变点击的状态，localStorage就派上用场了。


```js
    
    //用一个变了isClicked把第一次点击的状态存进去，如果我不手工清除你刷新也没卵用，哈哈哈
    var storage = window.localStorage;
        $(".test").on("click", function() {
                if (!storage.getItem("isClicked")) {
                    alert("这是你第一次点击");
                    storage.setItem("isClicked", true);
                } else {
                    alert("你已经点击过了，刷新也没什么卵用");
                }
            })
    
```

先酱紫，更多复杂的应用后面在玩。又到马竞大战巴萨了，时光就在一个个赛季中流逝。感叹，如水时光！

        
参考：

csdn：http://www.cnblogs.com/xiaowei0705/archive/2011/04/19/2021372.html

HTML5 localStorage本地存储实际应用举例：http://www.zhangxinxu.com/wordpress/2011/09/html5-localstorage%E6%9C%AC%E5%9C%B0%E5%AD%98%E5%82%A8%E5%AE%9E%E9%99%85%E5%BA%94%E7%94%A8%E4%B8%BE%E4%BE%8B/
    