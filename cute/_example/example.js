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
            $laylot = $("#laylot"),
            $word = $("#word"),
            $button = $("#button"),
            $form = $("#form"),
            $table = $("#table"),
            $icon = $("#icon"),
            $message = $("#message"),
            $model = $("#model"),
            $tag = $("#tag"),
            lastTag = 'laylot';
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
                    var tag = 'laylot';
                    if (scrollTop >= $word.offset().top) {
                        tag = 'word';
                    }
                    if (scrollTop >= $button.offset().top) {
                        tag = 'button';
                    }
                    if (scrollTop >= $form.offset().top) {
                        tag = 'form';

                    }
                    if (scrollTop >= $table.offset().top) {
                        tag = 'table';

                    }
                    if (scrollTop >= $icon.offset().top) {
                        tag = 'icon';

                    }
                    if (scrollTop >= $message.offset().top) {
                        tag = 'message';

                    }
                    if (scrollTop >= $model.offset().top) {
                        tag = 'model';

                    }
                    if (scrollTop >= $tag.offset().top) {
                        tag = 'tag';

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