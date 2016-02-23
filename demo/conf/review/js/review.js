/**
 * @Desc  : 2015往届回顾 based on jq
 * @Build : 2016/01/21 
 * @Author: TZ 
 * @Update: 2016/01/21 by TZ 
 **/
$(function () {
    var $body = $('html,body');
    $('.nav li a').click(function (e) {
        // click event
        $(this).addClass("selected").parents().siblings().find("a").removeClass("selected");
        var target = $(this).data('to');
        target && $('body').scrollTo(target, {
            duration: 800
        });
    });
    // screen scroll
    $(window).scroll(function (event) {
        var top = $(window).scrollTop(),
            f1, f2, f3, f4, f5,
            fixTop = $('.nav a');
        if (top > 600) {
            $(".nav").addClass('nav-fixed');
        } else {
            $(".nav").removeClass('nav-fixed');
        }
        //导航切换
        fl = $('#include').offset().top;
        f2 = $('#guest').offset().top;
        f3 = $('#order').offset().top;
        f4 = $('#partner').offset().top;
        f5 = $('#pic').offset().top;
        if (top >= fl) {
            fixTop.eq(0).addClass("selected").parents().siblings().find("a").removeClass("selected");
        }
        if (top >= f2 - 100) {
            fixTop.eq(1).addClass("selected").parents().siblings().find("a").removeClass("selected");
        }
        if (top >= f3 - 100) {
            fixTop.eq(2).addClass("selected").parents().siblings().find("a").removeClass("selected");
        }
        if (top >= f4 - 100) {
            fixTop.eq(3).addClass("selected").parents().siblings().find("a").removeClass("selected");
        }
        if (top >= f5 - 100) {
            fixTop.eq(4).addClass("selected").parents().siblings().find("a").removeClass("selected");
        }
    })
});