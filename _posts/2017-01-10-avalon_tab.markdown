---
layout:     post
title:      "avalon显示隐藏做个tab"
subtitle:   " \"avalon很好的mvvm框架\""
date:       2017-01-10 17:55:00
author:     "ZWW"
header-img: "img/post-bg-os-metro.jpg"
tags:
    - avalon
---

> ** avalon对dom的操作很强大，学习ms-visible，ms-if语句 **

visible顾名思义，就是把它隐藏了，display：none；但是dom是没有移除的。如果用if就行判断，条件不成立就直接移除了，单纯的api只是熟悉的过程，如果写一个tab控制一下，则需要引入一个变量，判断显示隐藏。

    <div ms-controller="tianzi">

        <div ms-visible="@curIndex == 1">tab1内容 {{hello}}</div>
        <div ms-visible="@curIndex == 2">tab2内容{{hello}}</div>
        <div ms-visible="@curIndex == 3">tab3内容{{hello}}</div>
        <p>
            <button type="button" ms-on-mouseenter='changeTab(1)' ms-class="@curIndex == 1 ? @active : ''">tab1</button>

            <button type="button" ms-on-mouseenter='changeTab(2)' ms-class="@curIndex == 2 ? @active : ''">tab2</button>

            <button type="button" ms-on-mouseenter='changeTab(3)' ms-class="@curIndex == 3 ? @active : ''">tab3</button>
        </p>
    </div>
        
vm里面写个一切换函数，每次触发事件的时候改变对应tab的显示与隐藏，最后引入一个active变量控制一下tab的高亮状态：
当然avalon对复杂的tab已经封装成组件，可以直接引用。

    avalon.ready(function () {
        var vm = avalon.define({
            $id: "tianzi",
            tian: true,
            hello: 'hello avalon',
            curIndex: 1,
            active: 'ddd',
            changeTab: function (index) {
                vm.curIndex = index;
            }
        })

        avalon.scan(document.body);
    })
                

    
<a href="http://www.zhangweiwei.cn/tools/avalon/router/tab.html" target="_blank">tab地址</a>




        
