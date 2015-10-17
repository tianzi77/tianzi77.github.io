---
layout:     post
title:      "左右上下移动幻灯片"
subtitle:   " \"原生js写的简单幻灯片效果\""
date:       2015-10-18 12:00:00
author:     "ZWW"
header-img: "img/post-bg-os-metro.jpg"
tags:
    - 幻灯片
---

> **“最近项目用到幻灯片，简单写了一个记录一下”**

实现了幻灯片的自动切换，和hover切换的效果，根据图片的数量自动生成下标。发现最重要的还是运动轨迹函数把。一个通用的方法：

获取元素的样式：
	
	        function getStyle(obj, name) {
            if (obj.currentStyle) {
                return obj.currentStyle[name]
            } else {
                return getComputedStyle(obj, false)[name]
            }
        }
        
        然后就是一个简单的运动框架：
        
                function startMove(obj, att, add) {
            clearInterval(obj.timer)
            obj.timer = setInterval(function () {
                var cutt = 0;
                if (att == 'opacity') {
                    cutt = Math.round(parseFloat(getStyle(obj, att)));
                } else {
                    cutt = Math.round(parseInt(getStyle(obj, att)));
                }
                var speed = (add - cutt) / 4;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cutt == add) {
                    clearInterval(obj.timer)
                } else {
                    if (att == 'opacity') {
                        obj.style.opacity = (cutt + speed) / 100;
                        obj.style.filter = 'alpha(opacity:' + (cutt + speed) + ')';
                    } else {
                        obj.style[att] = cutt + speed + 'px';
                    }
                }

            }, 30)
        }
        
 如果你指定left就是从左向右运动，top就是重上往下运动。
 当然也可以是opacity之类的css属性。
 	布局都是通用的：
 		   
 		    <div class="wrap" id='wrap'>
        <ul id="pic">
            <li><img src="http://img.mukewang.com/54111cd9000174cd04900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111dac000118af04900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d9c0001998204900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d8a0001f41704900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d7d00018ba604900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111cd9000174cd04900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111dac000118af04900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d9c0001998204900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d8a0001f41704900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d7d00018ba604900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d9c0001998204900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d8a0001f41704900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d7d00018ba604900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d9c0001998204900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d8a0001f41704900170.jpg" alt=""></li>
            <li><img src="http://img.mukewang.com/54111d7d00018ba604900170.jpg" alt=""></li>
        </ul>
    </div>
    
   
   左右移动样式：
   
           * {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .wrap {
            height: 170px;
            width: 490px;
            margin: 60px auto;
            overflow: hidden;
            position: relative;
            margin: 100px auto;
        }
        
        .wrap ul {
            position: absolute;
            width: 9999px;
            top: 0;
            left: 0;
        }
        
        .wrap ul li {
            height: 170px;
        }
        
        li {
            float: left;
        }
        
        .wrap ol {
            position: absolute;
            right: 5px;
            bottom: 10px;
        }
        
        .wrap ol li {
            height: 20px;
            width: 20px;
            background: #ccc;
            border: solid 1px #666;
            margin-left: 5px;
            color: #000;
            float: left;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        
        .wrap ol .on {
            background: #E97305;
            color: #fff;
        }
        
        上下移动样式：
                * {
            margin: 0;
            padding: 0;
            list-style: none;
        }
        
        .wrap {
            height: 170px;
            width: 490px;
            margin: 60px auto;
            overflow: hidden;
            position: relative;
            margin: 100px auto;
        }
        
        .wrap ul {
            position: absolute;
        }
        
        .wrap ul li {
            height: 170px;
        }
        
        .wrap ol {
            position: absolute;
            right: 5px;
            bottom: 10px;
        }
        
        .wrap ol li {
            height: 20px;
            width: 20px;
            background: #ccc;
            border: solid 1px #666;
            margin-left: 5px;
            color: #000;
            float: left;
            line-height: 20px;
            text-align: center;
            cursor: pointer;
        }
        
        .wrap ol .on {
            background: #E97305;
            color: #fff;
        }
        
        他们之间还是有点细微的差别，在样式上面。
        
        
创建索引button。

                /*动态创建按钮*/
        for (var l = 0; l < list.length; l++) {
            listArr.push("<li>" + (l + 1) + "</li>");
        }
        var ul = document.createElement("ol");
        ul.className = "count";
        ul.innerHTML = listArr.join("");
        wrap.appendChild(ul);
        var list = document.getElementsByTagName("ol")[0].getElementsByTagName("li");
    
    

最后就是水到渠成的类似tab选项卡的一些事件

	       /*第一次循环绑定鼠标事件和pic位置*/
        for (var i = 0; i < list.length; i++) {
            list[i].id = i;
            list[i].onmouseover = function () {
                clearInterval(count);
                id = this.id;
                changeIndex(id);

            };
        }
        /*改变list索引单独踢出来以便自动播放*/
        function changeIndex(currentIndex) {
            for (var j = 0; j < list.length; j++) {
                list[j].className = '';
            }
            list[currentIndex].className = "on";
            //            pic.style.left = currentIndex * -490 + "px";
            startMove(pic, 'left', -(currentIndex * aImg[0].offsetWidth))
            console.log(aImg[0].offsetWidth);
            index = currentIndex;
        }
        /*自动播放事件*/
        function autoPlay() {
            count = setInterval(function () {
                index++;
                if (index >= list.length) {
                    index = 0;
                }
                changeIndex(index);
            }, 2000);
            /*鼠标移入幻灯区域停止自动播放*/
            wrap.onmouseover = function () {
                clearInterval(count);
            }
            wrap.onmouseout = autoPlay;
        }
        autoPlay();

记录一下，方便下次使用。

[上下移动demo](http://www.zhangweiwei.cn/demo/slide/simple.html)

[左右移动demo](http://www.zhangweiwei.cn/demo/slide/simple-one.html)








 


