define([
    'cCoreInherit',
    'UILayer',
    'UIScroll',
    'text!MiceUIScrollLayerTpl'
], function (
    cCoreInherit,
    UILayer,
    UIScroll,
    MiceUIScrollLayerTpl
) {

    var MiceUIScrollLayer = _.inherit(UILayer, {

        propertys: function($super) {
            $super();
            this.template = MiceUIScrollLayerTpl;
            this.datamodel.title = "";
            this.datamodel.body = "";
            this.datamodel.footer = "";
            this.datamodel.btns = [];
            this.datamodel.ttype = "normal";
            this.addEvents({
                "click .cui-btns-ok": "okAction",
                "click .cui-btns-cancel": "cancelAction",
                "click .js_btn_close": "closeAction",
                "mousemove .js_swrapper>div": "_resetTitleBarStyle",
                "touchmove .js_swrapper>div": "_resetTitleBarStyle"
            });
            this.head = null;
            this.body = null;
            this.footer = null;
            this.maxHeight = 300;
            this.sheight = 0 ;
            this.scrollOpts = {};
        },
        okAction: function() {},
        cancelAction: function() {},
        closeAction: function() {
            this.hide();
        },
        initElement: function() {
            this.box_wrapper = this.$(".js_pop_box");
            this.swrapper = this.$(".js_swrapper");
        },
        initSize: function() {
            var datamodel = this.datamodel;
            if (datamodel.title) {
                this.title = datamodel.title;
                this.head = this.$(".js_hd");
                var headerHeight = datamodel.headerHeight;
                if (!!headerHeight)
                    switch (headerHeight) {
                        case "auto":
                            this.head.addClass("hotel-hd-title");
                            break;
                        case (typeof headerHeight) === 'Number':
                            this.head.css({
                                height: parseInt(headerHeight, 10)
                            });
                            break;
                    }
            }
            datamodel.body && typeof datamodel.body == "string" && (this.body = this.swrapper.children());
            datamodel.footer && typeof datamodel.footer == "string" && (this.footer = this.$(".js_footer"));
            if (!this.title && !this.body && !this.footer)
                return;
            this._initWrapperSize();
        },
        _initWrapperSize: function() {
            this.sheight = this.body && this.body.height();
            var headHeight = this.head && this.head.height() || 0;
            var footHeight = this.footer && this.footer.height() || 0;
            var n = headHeight + footHeight;
            this.maxHeight = $(window).height() * .8 - n;
            var minHeight = Math.min(this.sheight, this.maxHeight);
            // 调整下高度, 一直使用max height
            minHeight = this.maxHeight;
            this.swrapper.height(minHeight + 44);
            this.width && this.box_wrapper.width(this.width)
        },
        refreshHeight: function() {
            var scrollY = this.scroll && this.scroll.y || 0;
            this._initWrapperSize();
            this.scroll && this.scroll.refresh && this.scroll.refresh();
            this._initScroll();
            this.reposition();
            this.scroll && (scrollY < this.scroll.maxScrollY && (scrollY = this.scroll.maxScrollY),
                this.scroll.scrollTo(0, scrollY));
        },
        initialize: function($super, e) {
            $super(e)
        },
        _resetTitleBarStyle: function(e) {
            var self = this;
            this._removeTouchEvent();
            var bodyPositionTop = self.body.position().top;
            var r = 20;
            if (bodyPositionTop && this.scroll && this.datamodel.ttype == "mask") {
                var i = Math.abs((bodyPositionTop / r).toFixed(2))
                    , s = i > 1 ? 1 : i;
                bodyPositionTop < 0 && Math.abs(bodyPositionTop) > r ? (this.$(".js_hd").addClass("dt--grayui"),
                    this.$(".js_hd").css({
                        "background-color": "rgba(240, 240, 240,1)",
                        "background-image": "none"
                    })) : bodyPositionTop < 0 && Math.abs(bodyPositionTop) <= r ? (this.$(".js_hd").removeClass("dt--grayui"),
                    this.$(".js_hd").css({
                        "background-color": "rgba(240, 240, 240," + s + ")",
                        "background-image": "none",
                        "-webkit-transition": "opacity 350ms linear",
                        "-moz-transition": "opacity 350ms linear",
                        transition: "opacity 350ms linear"
                    })) : bodyPositionTop >= 0 && (this.$(".js_hd").removeClass("dt--grayui"),
                    this.$(".js_hd").css({
                        "background-color": "rgba(240, 240, 240,0)",
                        "background-image": "linear-gradient(rgba(0,0,0,.6) , rgba(0,0,0,0)),linear-gradient(rgba(0,0,0,.6) , rgba(0,0,0,0));",
                        "-webkit-transition": "opacity 350ms linear",
                        "-moz-transition": "opacity 350ms linear",
                        transition: "opacity 350ms linear"
                    }))
            }
        },
        _removeTouchEvent: function() {
            this.$(".js_swrapper>div").off("touchmove");
            this.$(".js_swrapper>div").off("mousemove");
        },
        _initScroll: function() {
            this.scroll && this.scroll.destory && this.scroll.destory();
            // this.sheight >= this.maxHeight && (this.scrollOpts = {
            //     wrapper: this.swrapper,
            //     scroller: this.body,
            //     scrollType: "y",
            //     step: 5,
            //     bounceTime: 200,
            //     momentum: true
            // }, this.scroll = new UIScroll(this.scrollOpts))

            // if(this.sheight >= this.maxHeight) {
            this.scrollOpts = {
                wrapper: this.swrapper,
                scroller: this.body,
                scrollType: "y",
                step: 5,
                bounceTime: 200,
                momentum: true
            };
            this.scroll = new UIScroll(this.scrollOpts);
            // }
        },
        addEvent: function($super) {
            var self = this;
            $super();
            this.on("onShow", function() {
                this.initSize();
                this._initScroll();
            }, 1);
            this.on("onHide", function() {
                this.scroll && (this.scroll.destroy(),
                    this.scroll = null ),
                    this.destroy()
            });
            $(window).on("resize", function() {
                self.refreshHeight();
            });
        },
        reposition: function() {
            this.$el.css({
                transform: 'translate(-50%, -50%)',
                width: '95%'
            })
        }
    });

    return MiceUIScrollLayer;
});