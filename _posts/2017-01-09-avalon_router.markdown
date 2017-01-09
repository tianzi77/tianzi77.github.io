---
layout:     post
title:      "avalon路由"
subtitle:   " \"avalon很好的mvvm框架\""
date:       2017-01-09 15:55:00
author:     "ZWW"
header-img: "img/post-bg-os-metro.jpg"
tags:
    - avalon
---

> ** 和ng一样。avalon的路由功能很强大也很方便，昨天晚上看了一下文档，今天抽空玩了一下 **

想到了两种方法实现，原理都是差不多的。

    <body ms-controller="test">
   
        <p><a href='#!/aaa' ms-class="@className == 'aaa' ? 'ddd' : '' ">点我</a></p>
        <p><a href='#!/bbb' ms-class="@className == 'bbb' ? 'ddd' : '' ">点我</a></p>
        <p><a href='#!/ccc' ms-class="@className == 'ccc' ? 'ddd' : '' ">点我</a></p>
        <p><a href='#!/ddd/111/222' ms-class="@className == 'dj' ? 'ddd' : '' ">点我</a></p>
        <p>{{@currPath}}</p>
        
    </body>
        
vm应该这样写，就是在路由回调里面修改判断变量的值：

         var vm = avalon.define({
            $id: 'test',
            className: 'ddd',

        })
        avalon.router.add("/aaa", function (a) {
            vm.currPath = this.path;
            vm.className = "aaa";
            console.log(vm.className)
        })
        avalon.router.add("/bbb", function (a) {
            vm.currPath = this.path;
            vm.className = "bbb";
            console.log(vm.className)
        })
        avalon.router.add("/ccc", function (a) {
            vm.currPath = this.path;
            vm.className = "ccc";
            console.log(vm.className)
        })
        avalon.router.add("/ddd/:ddd/:eee", function (a) { //:ddd为参数
            vm.currPath = this.path;
            vm.className = "dj";
        })

        avalon.history.start({
            root: "/mmRouter"

        })
        avalon.scan(document.body)

        /***/
    },
                
第二种，用ms-for遍历模板：

    <p>
        <a href="" ms-for="el in @wei" ms-attr="{href: el.path}" ms-class="@curIndex===el.id&&@active">{{el.name}}</a>
    </p>


vm这样写：

            var vm = avalon.define({
            $id: 'test',
            currPath: '',
            curIndex: 'index',
            wei: [{
                name: 'home',
                path: '#!/aaa',
                id: 'index'
            }, {
                name: 'about',
                path: '#!/bbb',
                id: 'index1'
            }, {
                name: 'contact',
                path: '#!/ccc',
                id: 'index2'
            }],
            active: 'ddd'

        })
        avalon.router.add("/aaa", function (a) {
            vm.currPath = this.path;
            vm.curIndex = "index";
        })
        avalon.router.add("/bbb", function (a) {
            vm.currPath = this.path;
            vm.curIndex = "index1";
        })
        avalon.router.add("/ccc", function (a) {
            vm.currPath = this.path;
            vm.curIndex = "index2";
        })
        avalon.router.add("/ddd/:ddd/:eee", function (a) { //:ddd为参数
            vm.currPath = this.path;
            vm.curIndex = "index3";
        })

        avalon.history.start({
            root: "/mmRouter"

        })
        avalon.scan(document.body)

        /***/
    }
    
<a href="http://www.zhangweiwei.cn/tools/avalon/router/example1.html" target="_blank">router地址</a>




        
