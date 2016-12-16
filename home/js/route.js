 /**
 * @Desc  : spa router 
 * @Build : 2016/12/16 
 * @Author: zww 
 * @路由封装在sammy.js里面runRoute方法里面的addHigh
 * @根据dom结构进行切换的替换
 */

   ;
    (function ($) {
        var app = $.sammy(function () {

            this.get('#/', function () {
                $('.c-login').html($('#forget1').html());
            });

            this.get('#/forget2', function () {
                $('.c-login').html($('#forget2').html());
            });
            this.get('#/forget3', function () {
                $('.c-login').html($('#forget3').html());
            });
            this.get('#/live1', function () {
                $('.c-login').html($('#live1').html());
            });
            this.get('#/live2', function () {
                $('.c-login').html($('#live2').html());
            });
            this.get('#/change1', function () {
                $('.c-login').html($('#change1').html());
            });
            this.get('#/change2', function () {
                $('.c-login').html($('#change2').html());
            });

        });

        $(function () {
            app.run('#/');
        });
    })(jQuery);

    // function addHigh(){
    //     var url = window.location.href.split("#")
    //     var addr = "#" + url[ url.length - 1 ];
    //     $('.demo-nav a').each(function(){
    //         var _this = $(this);
    //         _this.attr('href') === addr ? _this.addClass('active').siblings('a').removeClass('active'):'';
    //     });
    // }
    
    //展开收起交互
    $(".demo-show").on("click", function () {
        $(this).removeClass("demo-delay").addClass("demo-tips-hide");
        $(this).siblings(".corp-demo").addClass("corp-demo-show");
    });
    $(".demo-close").on("click", function () {
        $(this).parents(".corp-demo").removeClass("corp-demo-show");
        $('.demo-show').addClass("demo-delay").removeClass("demo-tips-hide");
    });