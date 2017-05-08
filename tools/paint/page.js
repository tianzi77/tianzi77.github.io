(function (w) {
    var AppSpread = function () {
        this.Init();
    }
    AppSpread.prototype = {
        Init: function () {
            this.PagePaint();
            this.PagePaintDetail();
            this.EvtSet();
        },
        PagePaint: function () {
            var html = ["<div class='g-header'><div class='head-in ios' id='head'>"];
            html.push("<div class='left'><div class='logo'></div><div class='td'></div><div class='download' id='downLoad'>");
            html.push("<div class='btn'><a class='btn-iphone' title='免费下载'' id='iosBtn'></a>");
            html.push("<div class='tip' id='tip'>如果您下载的文件是zip格式，请将后缀名改成ipa再安装。<em></em></div></div>");
            html.push("<div class='btn'><a class='btn-android' title='免费下载' id='adrBtn'></a></div>")
            html.push("<div class='code'><img id='codeImg' src='http://webresource.c-ctrip.com/ResCorpMobile/R2/img/AppSpread/code.png?20150907' title='手机扫一扫，即刻下载携程商旅！'/></div></div></div><div class='right'></div></div></div>");
            html.push("<div class='g-nav'><div class='nav-in' id='nav'><span class='iphone cur' id='navIos'></span><span class='android' id='navAdr'></span><span class='wap' id='navWap'></span></div></div>");
            html.push("<div class='g-img'><ul class='img-in'><li><div class='img-control'></div><div class='describ'><h2>如果您是企业差旅的成本控制者</h2><p>携程企业商旅，独有超低价商旅预付酒店，整合企业协议航空与协议酒店，依托携程丰富的机酒资源，持续降低贵司差旅采购成本。</p></div></li>");
            html.push("<li><div class='img-fly'></div><div class='describ'><h2>如果您是经常出差的“飞人”</h2><p>携程企业商旅，彻底颠覆商旅预定习惯，无需守着电脑，无需致电客服，无论何时何地，点开携程企业商旅，差旅预定尽在掌握，尽可实时跟踪差旅申请审批状态。</p></div></li>");
            html.push("<li><div class='img-appr'></div><div class='describ'><h2>如果您是员工差旅的审批者</h2><p>携程企业商旅，授权申请自动推送，待授权的清单一目了然，轻松快捷完成审批。</p></div></li>");
            html.push("<li><div class='img-order'></div><div class='describ'><h2>如果您是老板出行的预订者</h2><p>携程企业商旅，最精准的航班动态查询，供您提前掌握航班动态，随时了解航变情况，节省老板的宝贵时间。</p></div></li></ul></div>");
            html.push("<div class='g-footer'><div class='foot-in'><div class='freeDown' id='freeDown'></div></div></div>");
            $("#pg_wirless").addClass("m-wirless").html(html.join(""));
        },
        EvtSet: function () {
            $("#nav span").bind('click', function () {
                $("#nav span").removeClass("cur");
                $(this).addClass("cur");
                var id = $(this).attr("id");
                var name;
                if (id == "navIos") {
                    $("#head").removeClass("android").addClass("ios");
                    name = "code";
                } else if (id == "navAdr") {
                    $("#head").removeClass("ios").addClass("android");
                    name = "code";
                } else {
                    $("#head").removeClass("android").removeClass("ios");
                    name = "code_wap";
                }
                $("#codeImg").attr('src', 'http://webresource.c-ctrip.com/ResCorpMobile/R2/img/AppSpread/' + name + '.png?20150907');
            });
            var iosBtn = document.getElementById("iosBtn");
            iosBtn.onmouseover = function () {
                $("#tip").css('display', 'block');
            }
            iosBtn.onmouseout = function () {
                $("#tip").css('display', 'none');
            }
            $("#freeDown").bind('click', function () {
                if (cQuery.browser.isAllIE || cQuery.browser.isFirefox) document.documentElement.scrollTop = 0;
                else document.body.scrollTop = 0;
            });
        },
        PagePaintDetail: function () {
            var url = 'http://' + window.location.host + '/' + window.location.pathname.split('/')[1];
            $("#iosBtn").attr('href', url + '/d?s=iosipa');
            $("#adrBtn").attr('href', url + '/d?s=Android');
        }
    }
    new AppSpread();
})(window);