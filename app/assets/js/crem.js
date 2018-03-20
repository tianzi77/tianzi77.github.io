        (function (window, document) {

            'use strict';

            //给css开辟个命名空间。
            var c = {};

            (function () {
                //根据devicePixelRatio自定计算scale
                //可以有效解决移动端1px这个世纪难题。
                var viewportEl = document.querySelector('meta[name="viewport"]'),
                    el = document.querySelector('meta[name="awei"]'),
                    dpr = window.devicePixelRatio || 1,
                    maxWidth = 540,
                    designWidth = 0;

                dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

                //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
                if (el) {
                    var cCon = el.getAttribute('content');
                    if (cCon) {
                        var initialDprMatch = cCon.match(/initial\-dpr=([\d\.]+)/);
                        if (initialDprMatch) {
                            dpr = parseFloat(initialDprMatch[1]);
                        }
                        var maxWidthMatch = cCon.match(/max\-width=([\d\.]+)/);
                        if (maxWidthMatch) {
                            maxWidth = parseFloat(maxWidthMatch[1]);
                        }
                        var designWidthMatch = cCon.match(/design\-width=([\d\.]+)/);
                        if (designWidthMatch) {
                            designWidth = parseFloat(designWidthMatch[1]);
                        }
                    }
                }

                document.documentElement.setAttribute('data-dpr', dpr);
                c.dpr = dpr;

                document.documentElement.setAttribute('max-width', maxWidth);
                c.maxWidth = maxWidth;

                if (designWidth) {
                    document.documentElement.setAttribute('design-width', designWidth);
                }
                c.designWidth = designWidth; // 保证px2rem 和 rem2px 不传第二个参数时, 获取c.designWidth是undefined导致的NaN

                var scale = 1 / dpr,
                    content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

                if (viewportEl) {
                    viewportEl.setAttribute('content', content);
                } else {
                    viewportEl = document.createElement('meta');
                    viewportEl.setAttribute('name', 'viewport');
                    viewportEl.setAttribute('content', content);
                    document.head.appendChild(viewportEl);
                }

            })();

            c.px2rem = function (px, designWidth) {
                //预判你将会在JS中用到尺寸，特提供一个方法助你在JS中将px转为rem。就是这么贴心。
                if (!designWidth) {
                    //如果你在JS中大量用到此方法，建议直接定义 c.designWidth 来定义设计图尺寸;
                    //否则可以在第二个参数告诉我你的设计图是多大。
                    designWidth = parseInt(c.designWidth, 10);
                }

                return parseInt(px, 10) * 320 / designWidth / 20;
            }

            c.rem2px = function (rem, designWidth) {
                //新增一个rem2px的方法。用法和px2rem一致。
                if (!designWidth) {
                    designWidth = parseInt(c.designWidth, 10);
                }
                //rem可能为小数，这里不再做处理了
                return rem * 20 * designWidth / 320;
            }

            c.mresize = function () {
                //对，这个就是核心方法了，给HTML设置font-size。
                var innerWidth = document.documentElement.getBoundingClientRect().width || window.innerWidth;

                if (c.maxWidth && (innerWidth / c.dpr > c.maxWidth)) {
                    innerWidth = c.maxWidth * c.dpr;
                }

                if (!innerWidth) {
                    return false;
                }

                document.documentElement.style.fontSize = (innerWidth * 20 / 320) + 'px';

                c.callback && c.callback();

            };

            c.mresize();
            //直接调用一次

            window.addEventListener('resize', function () {
                clearTimeout(c.tid);
                c.tid = setTimeout(c.mresize, 33);
            }, false);
            //绑定resize的时候调用

            window.addEventListener('load', c.mresize, false);
            //防止不明原因的bug。load之后再调用一次。


            setTimeout(function () {
                c.mresize();
                //防止某些机型怪异现象，异步再调用一次
            }, 333)

            window.c = c;
            //命名空间暴露给你，控制权交给你，想怎么调怎么调。


        })(window, document);