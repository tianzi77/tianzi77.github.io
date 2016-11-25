/**
 * @author      : weiwzhang@Ctrip.com
 * @editor      : Sublime Text
 * @updated     : 2016.11.30
 * @description : Cute ui
 *
 */
;
(function ($, global) {

    var docs = (function () {

        var $side = $(".side-area"),
            $mask = $("#mask"),
            $tips = $("#tips"),
            $tab = $("#tab"),
            lastTag = 'mask';
        return {

            // sidebar
            sidebar: function () {
                var scrollTop = $(window).scrollTop(),
                    scrollLeft = $(window).scrollLeft(),
                    sideLeft = $side.parent().offset().left - scrollLeft + 10 + "px";
                if (scrollTop >= 281) {
                    $side.css({
                        "position": "fixed",
                        "top": 20 + "px",
                        "left": sideLeft,
                        "z-index": 10
                    });
                } else {
                    $side.css({
                        "position": "absolute",
                        "top": "auto",
                        "left": "auto",
                        "z-index": "auto"
                    });
                }

            },

            // scrool
            windowScroll: function () {
                var _this = this;
                $(window).scroll(function () {
                    _this.sidebar();
                    var scrollTop = $(window).scrollTop() + 0;
                    var tag = 'mask';
                    if (scrollTop >= $tips.offset().top) {
                        tag = 'tips';
                    }
                    if (scrollTop >= $tab.offset().top) {
                        tag = 'tab';
                    }

                    if (lastTag !== tag) {
                        lastTag = tag;
                        $side.find('a.avtive').removeClass('avtive');
                        $side.find('[href="#' + tag + '"]').addClass('avtive');
                    }

                });

            },

            // resize
            windowResize: function () {
                var _this = this;
                $(window).resize(function () {
                    _this.sidebar();
                });

            },



            // 统一执行
            init: function () {


                this.sidebar();
                this.windowScroll();
                this.windowResize();
            }
        };
    })();

    $(function () {
        docs.init();
    });

})(jQuery, this);