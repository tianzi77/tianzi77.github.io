        $(function () {
     
            $(window).scroll(function () {
                if ($(window).scrollTop() >= 100) {
                    $('.actGotop').fadeIn(300);
                } else {
                    $('.actGotop').fadeOut(300);
                }
                var p_top = 750;
                if ($(window).scrollTop() > p_top) {
                    $(".visible-md").addClass("person-fix");
                } else {
                    $(".visible-md").removeClass("person-fix");
                }
            });
            $('.actGotop').click(function () {
                $('html,body').animate({
                    scrollTop: '0px'
                }, 800);
            });
            //足球展开交互
//            
//            $(".t-img").on("click",function(){
//                $(this).parents(".show-tips").removeClass("ani-delay").addClass("soccer-hide");
//                $(this).siblings(".tools").addClass("tools-show");
//            });
//            $(".t-close").on("click",function(){
//                $(this).parents(".tools").removeClass("tools-show");
//                $(this).parents(".show-tips").addClass("ani-delay").removeClass("soccer-hide");
//            })
            //防止jq冲突
            $(".t-img").live("click",function(){
                $(this).parents(".show-tips").removeClass("ani-delay").addClass("soccer-hide");
                $(this).siblings(".tools").addClass("tools-show");
            });
            $(".t-close").live("click",function(){
                $(this).parents(".tools").removeClass("tools-show");
                $(this).parents(".show-tips").addClass("ani-delay").removeClass("soccer-hide");
            });
        })