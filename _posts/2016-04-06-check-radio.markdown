---
layout:     post
title:      "radio之间的切换"
subtitle:   " \"radio标签\""
date:       2016-04-06 19:20:00
author:     "ZWW"
header-img: "img/t19.jpg"
tags:
    - Radio切换
---


打开博客看一看，文章更新实在是太少了。哈哈，不过很多时候还是用来写写demo挺方便的。github真是个不错的平台。

对了，昨晚欧冠。托雷斯进球了，然后又被罚下。人生赢家真是大起大落。其实我一直相信马竞是可以击败巴萨的，每次都少打一人。让我看的
很不过瘾啊，马竞加油哦。

咦，我怎么扯这些了，呵呵 不说了，今天做项目用到一个radio选择登陆方式，比如携程登陆还是微信登陆。然后出现相应的注册登录板块。

radio这个标签还是挺好玩的。
就说自己的说一说吧 

* 1，name 如果要在两个radio标签之间进行切换，那么你需要注册他们设置相同的name值，name="zww";
* 2，label可以用来包含这个radio标签。我们常说input label。其实他们的玩法真的很多种。
* 3，js或jq显示隐藏 ``` $browsers.attr("checked",false); ```


样式啊jq啊我就不写了，也就那么回事，码农都知道，
直接上个简单的demo吧：

<a href="http://www.zhangweiwei.cn/demo/radio.html" target="_blank">radio－demo</a>


###我发现现在时间越来越快啊，他们都讨论买房买车，然后我一天沉迷于玩球乐此不疲。小伙子，要有责任啊。
最近看英雄本色。热血沸腾。用里面的一句话来结尾：有人千方百计要离开自己的家，有的人想回去，有的人……连落脚的地方都没有。
这里毕竟不是自己的地盘。



 ##关于作者

```javascript
  var ihubo = {
    nickName  : "TZ",
    site : "http://www.zhangweiwei.cn"
  }
```

    

