/**
 * ui-tooltip 0.0.4-bate
 *
 * require jQuery v1.9.0
 * use Jquery API:
 * $(ele), $.prototype, hover() , click(), fadeIn(), fadeOut(),
 * scrollTop(), scrollLeft(), width(), height(), outerWidth(), outerHeight(), offset(), css()
 *
 * ******************settings********************
 * $(ele).tooltip({
 *     className: ""                // 自定义样式 (与tooltip同级)
 *     minWidth: [int]
 *     maxWidth: [int]
 *     trigger: "hover"             // 触发方式 ( 默认:hover   hover|click )
 *     placement: "auto"            // 定位 ( 默认:auto  auto|up|down|left|right )
 *     template: ""                 // 模板 ( "<any>...</any>" | "#id" )  ---注：id方式不支持artTemplate引擎编译
 *     templateUrl: "url"           // 模板url ( 优先级高于template )
 *     data: {}                     // 模板数据
 *
 *     haveArrow: boolean           //是否有箭头 (默认:false    true|false)  TODO: ing....
 *     keepId: boolean              //是否使用模板id生成gid (默认:false    true|false) ---注：依赖template使用id方式
 *      http://10.18.6.136:8080/HIFI/release/src/book/single_book/book_insurance.html#
 * })
 *
 */

+function(root, factory){
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'template'], function($, template) {
            return factory($, root, template.compile);
        });
    } else {
        $.fn.tooltip = factory(root.jQuery, root, root.template.compile);
    }
}(this, function($, win, compile){

    if (!$ || !win || !compile) return;

    var Tooltip = function(element, options){
        this.type = "tooltip";
        this.options = null;
        this.$element = null;

        this.init(element, options)
    };

    Tooltip.VERSION = '0.0.2-bate';
    Tooltip.TRANSITION_DURATION = 100;
    Tooltip.TOGGLE_TIME = 100;
    Tooltip.currentTrigger = "";

    Tooltip.DEFAULTS = {
        className: '',
        minWidth: 100,
        maxWidth: 1000,
        haveArrow: false,
        keepId: false,
        placement: 'auto',
        template: '<div class="tooltip"></div>',
        templateUrl: '',
        trigger: 'hover',
        data: {}
    };

    Tooltip.prototype.init = function(element, options){
        var self = this;
        var $element = $(element);
        if (!$element.length) return;

        this.$element = $element;
        this.options = this.getOptions(options);

        this.inState = {tipTrigger: false, tipBody: false};

        if(this.options.trigger === 'hover'){
            this.$element.hover(function(){
                self.setCurrentTrigger(this);
                self.inState.tipTrigger = true;
                self.show();
            }, function(){
                self.inState.tipTrigger = false;
                self.hide();
            });
        }else{
            this.$element.click(function(e){
                e.stopPropagation();
                self.setCurrentTrigger(this);
                self.inState.tipBody = !self.inState.tipBody;
                self.inState.tipTrigger = !self.inState.tipTrigger;
                if(self.inState.tipBody && self.inState.tipTrigger){
                    self.show();
                }
                if(!self.inState.tipBody && !self.inState.tipTrigger){
                    self.hide();
                }
            });
        }

    };

    Tooltip.prototype.getCurrentTrigger = function(){
        return Tooltip.currentTrigger;
    };
    Tooltip.prototype.setCurrentTrigger = function(ct){
        Tooltip.currentTrigger = $(ct);
    }

    Tooltip.prototype.getDefaults = function(){
        return Tooltip.DEFAULTS;
    };

    Tooltip.prototype.getOptions = function(options){
        options = $.extend({}, this.getDefaults(), options);
        return options;
    };

    Tooltip.prototype.getTemplate = function(){
        var temp = "";
        var self = this;
        if(!this.options.templateUrl){
            var tempStartWith = this.options.template.substring(0,1);

            if(tempStartWith === '#'){
                temp = $(this.options.template);
            }else{
                temp = this.options.template;
            }

            this.$element.trigger('getTemplateComplete', temp);

        }else{
            $.ajax({type: 'get',
                url: this.options.templateUrl,
                success: function(data){
                    self.$element.trigger('getTemplateComplete', data);
                }
            });
        }
    };

    Tooltip.prototype.getRenderer = function(gId, temp){
        var tempType = typeof temp;
        var self = this;

        var returnFn;
        returnFn = tempType === 'object' ?
            function(){
                $(temp).css({position: 'absolute', top: 0, left: 0});
                $(temp).attr('id', gId);
                $(temp).attr('class', 'tooltip '+self.options.className);
                return temp;
            } : compile("<div style='position: absolute; top:0; left:0;' id='" + gId + "' class='tooltip " + self.options.className + "'>" + temp + "</div>");

        return returnFn;
    };

    Tooltip.prototype.render = function(gId){
        var self = this;

        this.$element.on('getTemplateComplete', function(e, temp){
            $('body').append(self.getRenderer(gId, temp)(self.options.data));
            self.setTipStyle($("#"+gId));
            self.setPlacement($("#"+gId));
            $("#"+gId).fadeIn(Tooltip.TOGGLE_TIME);

            if(self.options.trigger === 'hover'){
                $("#"+gId).hover(function(){
                    self.inState.tipBody = true;
                }, function(){
                    self.inState.tipBody = false;
                    self.hide();
                });
            }
        });
        // TODO: temp loading...
        this.getTemplate();
    };

    Tooltip.prototype.getUID = function (prefix) {
        do prefix += ~~(Math.random() * 100000000);
        while (document.getElementById(prefix));
        return prefix;
    };

    Tooltip.prototype.setTipStyle = function(obj){
        var styleObj = {zIndex: 999};
        $.extend(styleObj, this.options&&this.options.maxWidth ? {maxWidth: this.options.maxWidth} : {});
        $.extend(styleObj, this.options&&this.options.minWidth ? {position: this.options.position} : {});
        obj.css(styleObj);
    };

    Tooltip.prototype.setPlacement = function(tipBody){
        var tipTrigger = this.getCurrentTrigger();
        var scrollTop = $('body').scrollTop(),
            scrollLeft = $('body').scrollLeft(),
            winWidth = $(window).width(),

            triggerWidth = tipTrigger.outerWidth(),
            triggerHeight = tipTrigger.outerHeight(),
            triggerLeft = tipTrigger.offset().left - scrollLeft,
            triggerTop = tipTrigger.offset().top - scrollTop,
            triggerBottom = $(window).height() - triggerTop - triggerHeight,

            tipBodyWidth = tipBody.outerWidth(),
            tipBodyHeight = tipBody.outerHeight();

        var condition = {
            toLeft: (triggerLeft + tipBodyWidth) > winWidth && (triggerLeft > tipBodyWidth),
            toTop: triggerTop > tipBodyHeight && triggerBottom < tipBodyHeight
        };

        var marginWithArrow = this.options.haveArrow ? 7:0;
        var arrowClassName = "";

        var tipBodyTop = condition.toTop ? triggerTop - tipBodyHeight + triggerHeight : triggerTop + triggerHeight - triggerHeight,
            tipBodyLeft = condition.toLeft ? triggerLeft + triggerWidth - tipBodyWidth : triggerLeft,
            arrowTop = condition.toTop ? 'auto' : -6+'px',
            arrowBottom = condition.toTop ? -6+'px' : 'auto',
            arrowLeft = condition.toLeft ? 'auto' : (triggerWidth-11)/2+'px',
            arrowRight = condition.toLeft ? (triggerWidth-11)/2+'px' : 'auto';

        switch(this.options.placement){
            case 'auto':
                tipBodyTop = condition.toTop ? triggerTop - tipBodyHeight - marginWithArrow : triggerTop + triggerHeight + marginWithArrow;
                arrowClassName = condition.toTop ? 'tooltip-arrow-down' : 'tooltip-arrow-up';
                break;
            case 'up':
                tipBodyTop = triggerTop - tipBodyHeight - marginWithArrow;
                arrowClassName = 'tooltip-arrow-down';
                arrowBottom = -6+'px';arrowTop = 'auto';
                break;
            case 'down':
                tipBodyTop = triggerTop + triggerHeight + marginWithArrow;
                arrowClassName = 'tooltip-arrow-up';
                break;
            case 'left':
                tipBodyLeft = triggerLeft - tipBodyWidth - marginWithArrow;
                arrowClassName = 'tooltip-arrow-right';
                arrowRight = -6+'px';
                arrowLeft = 'auto';
                arrowTop = condition.toTop ? 'auto' : (triggerHeight-11)/2 + 'px';
                arrowBottom = condition.toTop ?  (triggerHeight-11)/2 + 'px' : 'auto';
                break;
            case 'right':
                tipBodyLeft = triggerLeft + triggerWidth + marginWithArrow;
                arrowClassName = 'tooltip-arrow-left';
                arrowLeft = -6+'px';
                arrowRight = 'auto';
                arrowTop = condition.toTop ? 'auto' : (triggerHeight-11)/2 + 'px';
                arrowBottom = condition.toTop ?  (triggerHeight-11)/2 + 'px' : 'auto';
                break;
            default:
                tipBodyTop = condition.toTop ? triggerTop - tipBodyHeight - marginWithArrow : triggerTop + triggerHeight + marginWithArrow;
                arrowClassName = condition.toTop ? 'tooltip-arrow-down' : 'tooltip-arrow-up';
                break;
        }
        tipBody.css({display: 'none', top: tipBodyTop + scrollTop, left: tipBodyLeft + scrollLeft});
        if(this.options.haveArrow){
            tipBody.children('i').remove();
            tipBody.append("<i class='"+arrowClassName+"' style='position: absolute; left: "+arrowLeft+"; right: "+arrowRight+"; top: "+arrowTop+"; bottom: "+arrowBottom+";'></i>");
        }
    };

    Tooltip.prototype.show = function(){
        var self = this;
        var gId = this.$element.attr('tooltip-gid');

        if(!gId){
            gId = this.options.keepId && this.options.template.indexOf('#') === 0 ? this.options.template.substr(1) : this.getUID(this.type);
            this.$element.attr('tooltip-gid', gId);
            this.render(gId);
        }else{
            this.setPlacement($("#"+gId));
            $("#"+gId).fadeIn(Tooltip.TOGGLE_TIME);

            if(this.options.trigger === 'hover'){
                $("#"+gId).hover(function(){
                    self.inState.tipBody = true;
                }, function(){
                    self.inState.tipBody = false;
                    self.hide();
                });
            }
        }
    };

    Tooltip.prototype.hide = function(){
        var self = this;
        var gId = this.$element.attr('tooltip-gid');
        setTimeout(function(){
            if(!self.inState.tipBody && !self.inState.tipTrigger){
                $("#"+gId).fadeOut(Tooltip.TOGGLE_TIME);
            }
        }, Tooltip.TRANSITION_DURATION);

    };

    function Plugin(options){
        return new Tooltip(this, options);
    }

    return Plugin;
});
