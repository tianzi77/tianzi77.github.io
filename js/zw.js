        $(function () {
            $('#music-control').on('mouseover', function () {
                $('#music-control').addClass('on');
                $('#music-content').show();
            });
            $('#music-control').on('mouseleave', function () {
                $('#music-control').removeClass('on');
                $('#music-content').hide();
            });
            $('#music-content').on('mouseover', function () {
                $(this).show();
                $('#music-control').addClass('on');
            });
            $('#music-content').on('mouseleave', function () {
                $(this).hide();
                $('#music-control').removeClass('on');
            });
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
            $(".t-img").on("click",function(){
                $(this).addClass("soccer-hide");
                $(this).siblings("tools").addClass("tools-show");
            })
        })