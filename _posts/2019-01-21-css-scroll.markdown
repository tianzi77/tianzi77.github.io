---
layout:     post
title:      "不可思议的纯CSS滚动进度条效果"
subtitle:   " \"不可思议的纯CSS滚动进度条效果\""
date:       2019-01-21 17:55:00
author:     "ZWW"
header-img: "img/post-bg-os-metro.jpg"
tags:
    - css
---

> ** 不可思议的纯CSS滚动进度条效果 **

css这样玩。

    body {
    position: relative;
    padding: 50px;
    font-size: 24px;
    line-height: 30px;
    background-image: linear-gradient(to right top, #ffcc00 50%, #eee 50%);
    background-size: 100% calc(100% - 100vh + 5px);
    background-repeat: no-repeat;
    z-index: 1;
    }

    body::after {
        content: "";
        position: fixed;
        top: 5px;
        left: 0;
        bottom: 0;
        right: 0;
        background: #fff;
        z-index: -1;
        }
        
最好想的当然是js。

    body {
            height: 3000px;
        }
        
        .scroll-bar {
            height: 3px;
            position: fixed;
            left: 0;
            top: 0;
        }

    var bigfa_scroll = {
            scrollHook: function($this, color) {

                color = color ? color : "#000000";

                $this.scroll(function() {

                    var docHeight = ($(document).height() - $(window).height()),

                        $windowObj = $this,

                        $per = $(".scroll-bar"),

                        percentage = 0;

                    defaultScroll = $windowObj.scrollTop();

                    percentage = parseInt((defaultScroll / docHeight) * 100) + '%';


                    if ($windowObj.scrollTop() > 100) {


                    } else {



                    }

                    $per.css({
                        'width': percentage,
                        'background': color
                    });

                });

            }
        }
        bigfa_scroll.scrollHook($(window), 'blue')
                

这种效果纯css也能实现，好玩！




        
