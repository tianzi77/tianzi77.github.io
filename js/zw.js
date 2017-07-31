            //返回顶部

            var bigfa_scroll = {

                drawCircle: function (id, percentage, color) {

                    var width = $(id).width();

                    var height = $(id).height();

                    var radius = parseInt(width / 2.20);

                    var position = width;

                    var positionBy2 = position / 2;

                    var bg = $(id)[0];

                    id = id.split("#");

                    var ctx = bg.getContext("2d");

                    var imd = null;

                    var circ = Math.PI * 2;

                    var quart = Math.PI / 2;

                    ctx.clearRect(0, 0, width, height);

                    ctx.beginPath();

                    ctx.strokeStyle = color;

                    ctx.lineCap = "square";

                    ctx.closePath();

                    ctx.fill();

                    ctx.lineWidth = 3;

                    imd = ctx.getImageData(0, 0, position, position);

                    var draw = function (current, ctxPass) {

                        ctxPass.putImageData(imd, 0, 0);

                        ctxPass.beginPath();

                        ctxPass.arc(positionBy2, positionBy2, radius, -(quart), ((circ) * current) - quart, false);

                        ctxPass.stroke();

                    }

                    draw(percentage / 100, ctx);

                },

                backToTop: function ($this) {

                    $this.click(function () {

                        $("body,html").animate({

                                scrollTop: 0

                            },

                            800);

                        return false;

                    });

                },

                scrollHook: function ($this, color) {

                    color = color ? color : "#000000";

                    $this.scroll(function () {

                        var docHeight = ($(document).height() - $(window).height()),

                            $windowObj = $this,

                            $per = $(".per"),

                            percentage = 0;

                        defaultScroll = $windowObj.scrollTop();

                        percentage = parseInt((defaultScroll / docHeight) * 100);

                        var backToTop = $("#backtoTop");

                        if (backToTop.length > 0) {

                            if ($windowObj.scrollTop() > 100) {

                                backToTop.addClass("button--show");

                            } else {

                                backToTop.removeClass("button--show");

                            }

                            $per.attr("data-percent", percentage);

                            bigfa_scroll.drawCircle("#backtoTopCanvas", percentage, color);

                        }



                    });

                }

            }
            $(function () {

                //           $(window).scroll(function () {
                //                if ($(window).scrollTop() >= 100) {
                //                    $('.actGotop').fadeIn(300);
                //                } else {
                //                    $('.actGotop').fadeOut(300);
                //                }
                //                var p_top = 750;
                //                if ($(window).scrollTop() > p_top) {
                //                    $(".visible-md").addClass("person-fix");
                //                } else {
                //                    $(".visible-md").removeClass("person-fix");
                //                }
                //            });
                //            $('.actGotop').click(function () {
                //                $('html,body').animate({
                //                    scrollTop: '0px'
                //                }, 800);
                //            });
                //足球展开交互

                $(".t-img").on("click", function () {
                    $(this).parents(".show-tips").removeClass("ani-delay").addClass("soccer-hide");
                    $(this).siblings(".tools").addClass("tools-show");
                });
                $(".t-close").on("click", function () {
                    $(this).parents(".tools").removeClass("tools-show");
                    $(this).parents(".show-tips").addClass("ani-delay").removeClass("soccer-hide");
                });

                //导航交互
                var MQL = 1170;

                //primary navigation slide-in effect

                if ($(window).width() > MQL) {
                    var headerHeight = $('.navbar-custom').height();
                    $(window).on('scroll', {
                            previousTop: 0
                        },
                        function () {
                            var currentTop = $(window).scrollTop();
                            //check if user is scrolling up
                            if (currentTop < this.previousTop) {
                                //if scrolling up...
                                if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                                    $('.navbar-custom').addClass('is-visible');
                                } else {
                                    $('.navbar-custom').removeClass('is-visible is-fixed');
                                }
                            } else {
                                //if scrolling down...
                                $('.navbar-custom').removeClass('is-visible');
                                if (currentTop > headerHeight && !$('.navbar-custom').hasClass('is-fixed')) $('.navbar-custom').addClass('is-fixed');
                            }
                            this.previousTop = currentTop;
                        });
                }

                //css动画抖动
                var windowH = $(window).height(),
                    bodyH = $("body").height();
                if (bodyH <= windowH) {
                    $("body").addClass("overflow");
                } else {
                    $("body").removeClass("overflow");
                }
                // 首页背景
                //fixBg();
                $(window).resize(function () {
                    //fixBg();
                })

                function fixBg() {
                    var win = $(window).width(),
                        winH = $(window).height();
                    if (win > 1024) {
                        $('#home-bg').css('height', winH);
                    }
                }
                if ($(window).width() > 980) {
                    $("body").append('<div id="backtoTop" data-action="gototop"><canvas id="backtoTopCanvas" width="48" height="48"></canvas><div class="per"></div></div>');

                    var T = bigfa_scroll;

                    T.backToTop($("#backtoTop"));

                    T.scrollHook($(window), "#FF5E52");
                }
            })