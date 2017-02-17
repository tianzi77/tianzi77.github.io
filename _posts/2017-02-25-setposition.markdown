---
layout:     post
title:      "vue过滤器、vue-resource"
subtitle:   " \"vue分页器\""
date:       2017-02-24 18:00:00
author:     "ZWW"
header-img: "img/post-bg-rwd.jpg"
tags:
    - vue
---

> **“vue”**

过滤器和1.X有很大的变化，感觉就是越变，对原生的js要求越严格。

全局过滤：

    Vue.filter("fixMoney", function (value) {
        return "¥" + value + "元";
                });


局部过滤：自定义变量在value后面进行操作。

       filters: {
                    fixMoney: function (value) {
                        return "¥" + value + "元";
                    }
                }

 
 vue-resource相当于jq中的ajax，用法是模块化的语法。与后端交互数据的工具，官方现在推荐axios。

删除的时候有一个问题，我们需要知道删除的是哪一个数组，而不是像操作dom那样去绑定。所以我们需要一个变量去缓存需要删除的数组，demo中的currList
    
         delItem: function (item) {
                this.showModel = true;
                this.currList = item;
                }
        //具体删除这个数组的索引就可以
        delCurrentProduct: function () {
                this.showModel = false;
                var index = this.listArr.indexOf(this.currList);
                this.listArr.splice(index, 1);
                    }
 
        
 的确，有点意思
   
<a href="http://www.zhangweiwei.cn/demo/vue/vue2.html" target="_blank">vue</a>	

 