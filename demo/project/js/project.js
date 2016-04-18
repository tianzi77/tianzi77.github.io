/**
 * @Desc  : 携程商旅移动端解决方案 based on jq
 * @Build : 2016/04/10 
 * @Author: zww 
 * @Update: 2016/04/10 by zww 
 */
jQuery(document).ready(function () {

    //固定高度
    function fixPagesHeight() {
        $('.swiper-slide').css({
            height: $(window).height(),
        })
    };
    $(window).on('resize',
        function () {
            fixPagesHeight();
        });
    fixPagesHeight();
    //遮罩层
    var docHeight = $(document).height();
    $('.corp').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .8, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': '#2f2f2f',
            'width': '100%',
            'display': 'none',
            'z-index': 5000 //保证这个悬浮层位于其它内容之上  
        });
    //swiper
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        effect: 'coverflow',
        loop: false,
        mousewheelControl: false,
        onInit: function (swiper) {
            swiper.myactive = 0;
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper);
        },
        autoplay: false,
        hashnav: true,

    });
    //swiper2
    var mySwiper1 = new Swiper('.swiper-container1', {
        pagination: '.swiper-pagination',
        direction: 'horizontal',
        mousewheelControl: false,
        //        autoplay: 5000,
        hashnav: true,
    });

    /*根据hash值进行不同页面的来回跳转*/

    //我是管理员
    $(".btn").click(function () {
        mySwiper.slideTo(1, 1000, false); //切换到第2个slide，速度为1秒
    });
    $(".outer").click(function () {
        mySwiper.slideTo(2, 1000, false);
    });
    $(".wx-click").click(function () {
        mySwiper.slideTo(3, 1000, false);
    });
    $(".pc-click").click(function () {
        mySwiper.slideTo(4, 1000, false);
    });
    $(".back").click(function () {
        mySwiper.slideTo(2, 1000, false);
    })
    $(".continue a").click(function () {
        mySwiper.slideTo(5, 1000, false);
    });
    $(".items .items1").click(function () {
        mySwiper.slideTo(6, 1000, false);
    });
    $(".items .items5").click(function () {
        mySwiper.slideTo(7, 1000, false);
    });
    $(".items .items6").click(function () {
        mySwiper.slideTo(8, 1000, false);
    });
    $(".next1 a").click(function () {
        mySwiper.slideTo(5, 1000, false);
    });
    $(".next2 a,.next3 a").click(function () {
        mySwiper.slideTo(6, 1000, false);
    });
    $(".items .items2").click(function () {
        mySwiper.slideTo(9, 1000, false);
    });
    $(".next4 a").click(function () {
        mySwiper.slideTo(5, 1000, false);
    });
    $(".items .items7").click(function () {
        mySwiper.slideTo(10, 1000, false);
    });
    $(".items .items8").click(function () {
        mySwiper.slideTo(11, 1000, false);
    });
    $(".next5 a").click(function () {
        mySwiper.slideTo(9, 1000, false);
    });
    $(".next6 a").click(function () {
        mySwiper.slideTo(5, 1000, false);
    });
    $(".items .items3").click(function () {
        mySwiper.slideTo(12, 1000, false);
    });
    $(".items .items4").click(function () {
        mySwiper.slideTo(13, 1000, false);
    });
    $(".back1 a,back2 a").click(function () {
        mySwiper.slideTo(5, 1000, false);
    });
    $(".next a").click(function () {
        mySwiper.slideTo(14, 1000, false);
        $('#overlay').show();
    });
    $(".corp-index").click(function () {
        mySwiper.slideTo(15, 1000, false);
    });
    //我是员工
    $(".outer1").click(function () {
        mySwiper.slideTo(14, 1000, false);
        $('#overlay').show();
    });
});