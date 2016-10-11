;
Zepto(function ($) {
    var intro = {
        //初始化所有方法
        init: function () {
            var webWidth = 300;
            if (window.screen.availWidth > webWidth) {
                this.slide();
                this.fClick();
            }
        },
        //幻灯片
        slide: function () {
            $(".demo").on("click", function (e) {
                $(".click-tips").hide();
                $(".container").addClass("body-bg");
                $(".content-box h2").hide();
                $(".slide-box ul li img").hide();
//                $(".tip-text").hide();
                $(".meng").hide();
                clearInterval(timer);
                $(".slide-text").removeClass("slide-nav");
                e.preventDefault();
            });
            var timer;

            function changeIndex(clickBox) {
                //不需要点击
                if (clickBox == "div-banner") {
                    return;

                } else {
                    $('.' + clickBox + ' div .slide-text li').on("click", function () {
                        $(".container").removeClass("body-bg");
                        $(".content-box h2").show();
                        $(".slide-box ul li img").show();
                        $(".meng").show();
                        $(".title").text($(this).text());
                        clearInterval(timer);
                        var a = $(this).index();
                        $(this).addClass('curv').siblings('li').removeClass('curv');
                        $('.' + clickBox + ' div div ul').eq(a).show().siblings('ul').hide();
                        $('.' + clickBox + ' div div ul').eq(a).children('li').eq(0).addClass('cur1').show().siblings().removeClass("cur1").hide();
                        slidePhone(clickBox);
                        $(".slide-text").addClass("slide-nav");
                    });
                }
            }

            function slidePhone(clickBoxs1) {

                var indexs = $('.' + clickBoxs1).children("div").children("ul").children(".curv").index();

                $('.' + clickBoxs1).children("div").children("ul").eq(indexs).show().siblings('ul').hide();
                //容器传参
                var as = $('.' + clickBoxs1).attr('class');

                function fun(div, indexs) {
                    var index2 = $('.' + div + ' div div ul').eq(indexs).children('.cur1').index();
                    var index1 = $('.' + div + ' div div ul').eq(indexs).children('li').length;
                    var changeSlide = function change() {
                        clearInterval(timer)
                        if (index2 < index1) {
                            index2 = index2 + 1;
                            if ($('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('img').length > 1) {

                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.img1').addClass("fadeIn animated");
                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.img1').on("click", function () {
                                    $(this).removeClass("show-tips").hide();
                                    $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).show().siblings().hide();
                                    changeSlide();
                                })

                                $('.' + div + ' div div ul').eq(indexs).children('li').children('.click-tips').hide();
                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.click-tips').show('fast');
                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).addClass('cur1').siblings().removeClass("cur1");
                            } else {
                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).show(1000).siblings().hide(1000);
                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).addClass('cur1').siblings().removeClass("cur1");
                            }
                        } else {

                            return;

                        }
                    }

                    changeSlide();
                }

                fun(as, indexs);
            }

            //行程幻灯
            changeIndex('div-apply');
            //出差申请幻灯
        },
        fClick: function () {
            FastClick.attach(document.body);
        },
    }
    intro.init();
    window.pageInit = function () {
        intro.init()
    }
})