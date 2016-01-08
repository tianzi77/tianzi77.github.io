/**
 * @Desc  : 携程峰会 
 * @Build : 2016/01/05 
 * @Author: TZ 
 * @Update: 2016/01/05 by TZ 
 **/

$(function () {
    //nav
    var $body = $('html,body');
    $('.nav a').on("click", function () {
        $(".nav a").removeClass('selected');
        $(this).addClass('selected');
        var target = $(this).data('to');
        target && $('body').scrollTo(target, {
            duration: 800
        });
    });
    // screen scroll
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
        // guest box

    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': '#2f2f2f',
            'width': '100%',
            'display':'none',
            'z-index': 5000 //保证这个悬浮层位于其它内容之上  
        });
    $('.tan-box').on("click", function () {
        $('#overlay').show();
        $('.yilongCeo').show();
        $('body').addClass("fix-scroll");
        document.documentElement.style.overflow='hidden';
        document.body.style.overflow='hidden';//手机版
    })
    //close 
    $('.close').on('click',function(){
        $('.guest-box').hide();
        $('#overlay').hide();
        document.documentElement.style.overflow='scroll';
        document.body.style.overflow='scroll';//手机版
    })
})