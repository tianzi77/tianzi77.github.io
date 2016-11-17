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

        })