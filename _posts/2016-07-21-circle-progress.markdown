---
layout:     post
title:      "木好意思，正在拼命加载中。。。"
subtitle:   " \"环形进度条\""
date:       2016-07-20 16:55:00
author:     "ZWW"
header-img: "img/home-bg-o.jpg"
tags:
    - 环形进度
---

> **在一个群里一哥们说他去面试的时候就被这个环形进度条淘汰了，因为他没有找到合适的解决方案。好奇现在网站有很多loading效果啊，为什么还要面试写一个环形条呢？**




下面是收集的一些loading：

[svg loading](http://projects.lukehaas.me/svg-sparkle/) 

[loading.io](http://loading.io/) 

[常见效果](http://tobiasahlin.com/spinkit/) 

其实大多数在调用数据，返回ajax请求过程中，都是做一个动态的gif图片loading，这个过程就是在取值，根本没有用到这些时尚的玩意，一是兼容性问题，二是这玩意写起来还是要点功夫的。

用这个来当面试题。更多的是考擦css和js的熟练程度吧，我觉得，现在的花式花样的ui库轮子都给你造好了。


理理结构:


```

    <div class="progress">
        <div class="pro-left">
            <div class="left-inner">

            </div>
        </div>
        <div class="pro-right">
            <div class="right-inner">

            </div>
        </div>
        <div class="text">
            loading<span class="num">0</span>%
        </div>
    </div>
```
首先需要一个外层容器，然后2个左右的容器，里面的小容器对这个容器进行对半的截取。思想就是这样

其他就写一下scss咯。
注意boxsizng还有clip的用法就差不多咯。


```

    .progress{
    width: 100px;
    height: 100px;
    border: 4px solid #cecece;
    border-radius: 50%;
    position: relative;
    z-index: 2;
    box-sizing: border-box;
    .pro-left,.pro-right{
        height: 100px;
        width: 50px;
        position: absolute;
        top: -4px;
        overflow: hidden;
        box-sizing: border-box;
    }
    .pro-right{
        right: -4px;
    }
    .pro-left{
        left: -4px;
    }
    .left-inner,.right-inner{
        width: 100px;
        height: 100px;
        position: absolute;
        top: 0;
        border-radius: 50%;
        border:4px solid red;
        box-sizing:border-box;
        transition: transform .1s linear forwards;
    }
    .left-inner{
        clip: rect(0,100px,100px,50px);
        left: 0;
    }
    .right-inner{
        right: 0;
        clip: rect(0,50px,100px,0);
    }
    .text{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate3d(-50%,-50%,0);
    }
    }
```

结构样式都写好了，给他加点行为，让他动起来呗

偷懒就不写原生，用jq写了，


```

    $(function() {
            var percent = 0;
            var loading = function() {
                var time = setInterval(function() {
                    if (percent > 100) {
                        percent = 0;
                        clearInterval(time);
                        $('.right-inner').css("-webkit-transform", "rotate(0deg)");
                        $('.left-inner').css("-webkit-transform", "rotate(0deg)");

                    } else if (percent > 50) {
                        $('.right-inner').css("-webkit-transform", "rotate(180deg)");
                        $('.left-inner').css("-webkit-transform", "rotate(" + (360 / 100) * (percent - 50) + "deg)");
                    } else {
                        $('.right-inner').css("-webkit-transform", "rotate(" + (360 / 100) * percent + "deg)");
                    }

                    $(".num").text(percent);
                    percent++;
                }, 100);
            }
            loading();
        })
```

效果嘛，就是demo那样。

这个就是这样咯。不得不说现在很多svg的loading真的很牛逼，之所有牛逼是因为效果牛逼，代码看不懂，哈哈哈，是时候学习很多新东西啦。这个结合countUp.js可以玩出很炫的效果。

[环形进度](http://codepen.io/tianzi77/full/qNORvB)


最近看人家一个ui库的源码，觉得一个小小的样式挺不错，也用scss玩了一下。最终就是demo右下角的效果。前几天用css写了pen

[效果demo](http://codepen.io/tianzi77/full/bZokGP)

今天觉得以前写的还要每次去判断角度，计算，其实scss不是可以像js一样帮我们循环计算吗，于是乎玩了一下

dom还是老样子


```

    <ul class="list-container">
        <li class="list-item"><span class="text">1</span></li>
        <li class="list-item"><span class="text">1</span></li>
        <li class="list-item"><span class="text">1</span></li>
        <li class="list-item"><span class="text">1</span></li>
    </ul>
```

用scss写个for循环，感觉代码轻了很多，当然编译出来也是一样，至少写起来爽。


``` 


    @import "http://www.zhangweiwei.cn/demo/reset.css";
    
    body {
    color: red;
    }
    $quickToolSize:30px;
    $quickToolSize:30px;
    $quickToolBg:#abcdef;
    $timingFunction:ease;
    $list-num:4;
    @mixin center-flex($test) {
        display: flex;
        align-items: $test;
        justify-content: $test;
        }
        .list-container{
        position: fixed;
        right: 40px;
        bottom: 40px;
        }
        .list-item {
    width: $quickToolSize;
    height: $quickToolSize;
    position: absolute;
    background: $quickToolBg;
    border-radius: 50%;
    opacity: 1;
    transition: opacity .3s linear, transform .3s $timingFunction;
    @include center-flex(center);
    @for $i from 1 through $list-num {
        &:nth-of-type(#{$i}) {
            transform: rotate(($i - 1)*90deg/($list-num - 1)) translateX(-80px);
            transition-delay: ($i - 1)*0.03s;
            .text {
                transform: rotate(-($i - 1)*90deg/($list-num - 1));
            }
        }
    }
    }

```
最后，这次的demo
[demo地址](tianzi77.github.io/demo/article/progress.html)






 


