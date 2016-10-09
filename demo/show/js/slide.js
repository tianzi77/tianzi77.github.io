//        $(document).ready(function () {
Zepto(function($){ 
            var intro = {
                //初始化所有方法
                init: function () {
//                    alert(999)
                    var webWidth = 300;
                    if (window.screen.availWidth > webWidth) {
                        this.slide();

                        //                        this.fixNav();
                    } else {
                        console.log("手持设备不支持幻灯");
                    };
                    if ($(window).width() < 1030) {
//                        this.fClick();
                    } else {
                        return;
                    };
                },
                //幻灯片
                slide: function () {
                    $(".demo").on("tap", function (e) {
                        $(".click-tips").hide();
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
                            $('.' + clickBox + ' div .slide-text li').on("tap", function () {
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
                        //                                                console.log(as)

                        function fun(div, indexs) {
                            var index2 = $('.' + div + ' div div ul').eq(indexs).children('.cur1').index();
                            var index1 = $('.' + div + ' div div ul').eq(indexs).children('li').length;
                            var changeSlide = function change() {
                                clearInterval(timer)
                                if (index2 < index1) {
                                    index2 = index2 + 1;
                                    if ($('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('img').length > 1) {
//                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.img1').show();
                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.img1').css({
                                                'width': '40px',
                                                'height': '40px'
                                            }).addClass("show-tips").delay(1000).show("fast", function () {
                                                $(this).on("click", function () {
                                                    $(this).removeClass("show-tips").hide();
                                                    $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).fadeIn('0').siblings().fadeOut('0');
                                                    changeSlide();
                                                })
                                            });
                                        $('.' + div + ' div div ul').eq(indexs).children('li').children('.click-tips').hide();
                                         $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.click-tips').delay(500).show('fast');
                                        
                                            //animate({
                                            //                                            left: '-=20px',
                                            //                                            top: '-=20px',
                                            //                                            height: '40px',
                                            //                                            width: '40px'
                                            //                                        }, 700, function () {
                                            //                                            $(this).hide()
                                            //                                            clearInterval(timer);
                                            //                                            $(this).on("click",function(){
                                            //                                                $(this).hide();
                                            //                                                $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).fadeIn(1000).siblings().fadeOut(1000);
                                            //                                            })
                                            //                                            $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).fadeIn(1000).siblings().fadeOut(1000);
                                            //                                        });
                                            //                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2 - 1).children('.img1').animate({
                                            //                                            left: '+=20px',
                                            //                                            top: '+=20px',
                                            //                                            height: '0px',
                                            //                                            width: '0px'
                                            //                                        });
                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).addClass('cur1').siblings().removeClass("cur1");
                                    } else {
                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).fadeIn(1000).siblings().fadeOut(1000);
                                        $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).addClass('cur1').siblings().removeClass("cur1");
                                    }
                                } else {
                                    //                                    index2 = 0;
                                    //                                    $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).fadeIn(1000).siblings().fadeOut(1000);
                                    //                                    $('.' + div + ' div div ul').eq(indexs).children('li').eq(index2).addClass('cur1').siblings().removeClass("cur1");
                                    clearInterval(timer);

                                }
                            }
//                            timer = setInterval(changeSlide, 1000);
                            changeSlide();
                        }

                        fun(as, indexs);
                    }

                    //行程幻灯
                    changeIndex('div-apply');
                    //出差申请幻灯
                },
                //fastclick
//                fClick: function () {
//                    FastClick.attach(document.body);
//                },
            }
            intro.init();
    }) 
//        })