---
layout:     post
title:      "javascript数组去重"
subtitle:   " \"3种方法玩玩去掉数组重复的元素\""
date:       2015-10-13 18:00:00
author:     "ZWW"
header-img: "img/post-bg-rwd.jpg"
tags:
    - 数组
---

> **“简单逻辑练练js ”**
> 

写js我一直很头痛，看来`出来混，迟早要还`,大学时虽学计算机，什么算法逻辑毛线都不会，c语言还挂了好几次科呢，保持学习的心态，慢慢前行吧，不闲扯了。

这是看月夜带刀的博客而引发的数组去重，发现他js好厉害。最先想到的办法很可能就是用2个for循环来做比较然后去除掉重复的元素，代码如下所示：

``` 
        Array.prototype.distinct = function() {
            var arr = [],
                len = this.length;
            for (var i = 0; i < len; i++) {
                for (var j = i + 1; j < len; j++) {
                    if (this[i] === this[j]) {
                        j = ++i;
                    }
                }
                arr.push(this[i]);
            }
            return arr;
        }; //数组去重方法1

        document.write([1, 1, 2, 2, 3, 4, 4, 4, 4, 4, 4].distinct()) /*测试*/
```

方法2：

        Array.prototype.distinct1 = function() {
            var self = this,
                arr = self.concat().sort(); //创建一个新数组并排序
            console.log(this);
            arr.sort(function(a, b) {
                if (a === b) {
                    var n = self.indexOf(a);
                    self.splice(n, 1);
                }
            });
            return self;
        }; //数组去重方法2@



        document.write([3, 3, 3, 3, 4, 5, 6, 6, 5, 0].distinct1());
        
        
方法3：

        Array.prototype.distinct2 = function() {
            var arr = [],
                obj = {},
                len = this.length,
                result;
            for (var i = 0; i < len; i++) {
                result = this[i];
                console.log(obj.result)
                if (obj[result] !== result) {
                    arr.push(result);
                    obj[result] = result;
                }
            }
            return arr;
        }; //数组去重方法3

        document.write([9, 9, 9, 0, 1, 2].distinct2())
        
        
新增方法4：       

   
    Array.prototype.equene = function(){
            this.sort();
            var re = [this[0]];
            for(var i = 1;i<this.length;i++){
                if(this[i]!==re[re.length-1]){
                    re.push(this[i]);
                }
            }
            return re;
        }
       console.log( [1,2,2,1].equene())



方法1性能不是很高，方法2，3有小小的bug，碰到一些2逼数组比如

     [ 'javascript', 1, '1', 1 ];
 不能区分出来。
 


参考：

[雨夜带刀's Blog](http://stylechen.com/array-distinct.html)

 


