/**
 * @Desc  : 携程峰会 
 * @Build : 2016/01/05 
 * @Author: TZ 
 * @Update: 2016/01/05 by TZ 
 **/

$(function () {

    var $body = $('html,body');
    $('.nav a').on("click", function () {
        $(".nav a").removeClass('selected');
        $(this).addClass('selected');
        var target = $(this).data('to');
        target && $('body').scrollTo(target, {
            duration: 800
        });
    });
    $(window).scroll(function (event) {
        var top = $(window).scrollTop();
        if (top > 500) {
            $(".nav").addClass('nav-fixed');
        } else {
            $(".nav").removeClass('nav-fixed');
        }
    });

    $(".footer-nav").on("click", function () {
        $(".nav a").removeClass('selected');
        $(".nav li:nth-child(1)>a").addClass('selected');
    })
    $(".footer-nav1").on("click", function () {
        $(".nav a").removeClass('selected');
        $(".nav li:nth-child(3)>a").addClass('selected');
    })
    $(".footer-nav2").on("click", function () {
        $(".nav a").removeClass('selected');
        $(".nav li:nth-child(4)>a").addClass('selected');
    })
})