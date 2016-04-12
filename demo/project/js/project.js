/**
* @Desc  : 携程商旅移动端解决方案 based on jq
* @Build : 2016/04/10 
* @Author: zww 
* @Update: 2016/04/10 by zww 
*/
jQuery(document).ready(function() {

    //固定高度
    function fixPagesHeight() {
        $('.swiper-slide').css({
            height: $(window).height(),
        })
    };
    $(window).on('resize',
        function() {
            fixPagesHeight();
        });
    fixPagesHeight();
    //swiper
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',
//        effect : 'fade',
        loop: false,
        mousewheelControl:true,
        onInit: function(swiper) {
            swiper.myactive = 0;
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper) {
            swiperAnimate(swiper);
        },
        autoplay: false,
        hashnav:true,
    });     
});