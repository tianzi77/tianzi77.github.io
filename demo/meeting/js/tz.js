/**
 * @Desc  : 携程峰会 
 * @Build : 2016/01/05 
 * @Author: TZ 
 * @Update: 2016/02/03 by TZ 
 **/

$(function () {
    //nav
    var $body = $('html,body');
    $('.nav li a').click(function (e) {
        $(this).addClass("selected").parents().siblings().find("a").removeClass("selected");
        var target = $(this).data('to');
        target && $('body').scrollTo(target, {
            duration: 800
        });
    });
    // screen scroll
    $(window).scroll(function (event) {
        var top = $(window).scrollTop();
        if (top > 500) {
            $(".nav").addClass('nav-fixed');
        } else {
            $(".nav").removeClass('nav-fixed');
        }

        var f1, f2, f3, f4, f5, f6, f7, bck;
        var fixTop = $('.nav a');
        fl = $('#info').offset().top;

        f2 = $('#schedule').offset().top;

        f3 = $('#guest').offset().top;

        f4 = $('#cooperation').offset().top;

        f5 = $('#map').offset().top;

        f6 = $('#review').offset().top;

        f7 = $('#gift').offset().top;

        if (top >= fl) {

            fixTop.eq(0).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }

        if (top >= f2 - 100) {

            fixTop.eq(1).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }

        if (top >= f3 - 100) {

            fixTop.eq(2).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }

        if (top >= f4 - 100) {

            fixTop.eq(3).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }

        if (top >= f5 - 100) {

            fixTop.eq(4).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }

        if (top >= f6 - 100) {

            fixTop.eq(5).addClass("selected").parents().siblings().find("a").removeClass("selected");

        }
    });

    $(".footer-nav").on("click", function () {
        $(".nav a").removeClass('selected');
        $(".nav li:nth-child(1)>a").addClass('selected');
    });
    $(".footer-nav1").on("click", function () {
        $(".nav a").removeClass('selected');
        $(".nav li:nth-child(3)>a").addClass('selected');
    });
    $(".footer-nav2").on("click", function () {
            $(".nav a").removeClass('selected');
            $(".nav li:nth-child(4)>a").addClass('selected');
        })
        // guest box

    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': '#2f2f2f',
            'width': '100%',
            'display': 'none',
            'z-index': 5000 //保证这个悬浮层位于其它内容之上  
        });
    $('.guestImgBox').eq(0).on("click", function () {
        $('#overlay').show();
        $('.hw').show();
        //            $('body').addClass("fix-scroll");
        //            document.documentElement.style.overflow = 'hidden';
        //            document.body.style.overflow = 'hidden'; //手机版
    });
    $('.guestImgBox').eq(1).on("click", function () {
        $('#overlay').show();
        $('.fjq').show();

    });
    $('.guestImgBox').eq(2).on("click", function () {
        $('#overlay').show();
        $('.zk').show();

    });
    $('.guestImgBox').eq(3).on("click", function () {
        $('#overlay').show();
        $('.paul').show();

    });
    $('.guestImgBox').eq(4).on("click", function () {
        $('#overlay').show();
        $('.lars').show();

    });
    $('.guestImgBox').eq(5).on("click", function () {
        $('#overlay').show();
        $('.czs').show();

    });
    $('.guestImgBox').eq(6).on("click", function () {
        $('#overlay').show();
        $('.bzw').show();

    });
    $('.guestImgBox').eq(7).on("click", function () {
        $('#overlay').show();
        $('.Olav').show();

    });
    $('.guestImgBox').eq(8).on("click", function () {
        $('#overlay').show();
        $('.lj').show();

    });
    $('.guestImgBox').eq(9).on("click", function () {
        $('#overlay').show();
        $('.dx').show();

    });
    $('.guestImgBox').eq(10).on("click", function () {
        $('#overlay').show();
        $('.hwt').show();

    });
    $('.guestImgBox').eq(11).on("click", function () {
        $('#overlay').show();
        $('.yxn').show();

    });
    $('.guestImgBox').eq(12).on("click", function () {
        $('#overlay').show();
        $('.ycx').show();

    });
    $('.guestImgBox').eq(13).on("click", function () {
        $('#overlay').show();
        $('.trj').show();

    });
    $('.guestImgBox').eq(14).on("click", function () {
        $('#overlay').show();
        $('.cj').show();

    });
    $('.guestImgBox').eq(15).on("click", function () {
        $('#overlay').show();
        $('.jack').show();

    });
    //close 
    $('.close').on('click', function () {
            $('.guest-box').hide();
            $('#overlay').hide();
            //        document.documentElement.style.overflow = 'scroll';
            //        document.body.style.overflow = 'scroll'; //手机版
        })
        // 添加百度地图
        //创建和初始化地图函数：
    function initMap() {
        createMap(); //创建地图
        setMapEvent(); //设置地图事件
        addMapControl(); //向地图添加控件
        addMarker(); //向地图中添加marker
    }

    //创建地图函数：
    function createMap() {
        var map = new BMap.Map("dituContent"); //在百度地图容器中创建一个地图
        var point = new BMap.Point(121.510727, 31.248395); //定义一个中心点坐标
        map.centerAndZoom(point, 17); //设定地图的中心点和坐标并将地图显示在地图容器中
        window.map = map; //将map变量存储在全局
    }

    //地图事件设置函数：
    function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件，默认启用(可不写)
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大，默认启用(可不写)
        map.enableKeyboard(); //启用键盘上下左右键移动地图
    }

    //地图控件添加函数：
    function addMapControl() {
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_LEFT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            isOpen: 1
        });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({
            anchor: BMAP_ANCHOR_BOTTOM_LEFT
        });
        map.addControl(ctrl_sca);
    }

    //标注点数组
    var markerArr = [{
            title: "2016亚太商旅峰会会址",
            content: "我的备注",
            point: "121.510718|31.24851",
            isOpen: 0,
            icon: {
                w: 21,
                h: 21,
                l: 0,
                t: 0,
                x: 6,
                lb: 5
            }
        }
		 ];
    //创建marker
    function addMarker() {
        for (var i = 0; i < markerArr.length; i++) {
            var json = markerArr[i];
            var p0 = json.point.split("|")[0];
            var p1 = json.point.split("|")[1];
            var point = new BMap.Point(p0, p1);
            var iconImg = createIcon(json.icon);
            var marker = new BMap.Marker(point);
            var iw = createInfoWindow(i);
            var label = new BMap.Label(json.title, {
                "offset": new BMap.Size(json.icon.lb - json.icon.x + 10, -20)
            });
            marker.setLabel(label);
            map.addOverlay(marker);
            label.setStyle({
                borderColor: "#808080",
                color: "#333",
                cursor: "pointer"
            });

            (function () {
                var index = i;
                var _iw = createInfoWindow(i);
                var _marker = marker;
                _marker.addEventListener("click", function () {
                    this.openInfoWindow(_iw);
                });
                _iw.addEventListener("open", function () {
                    _marker.getLabel().hide();
                })
                _iw.addEventListener("close", function () {
                    _marker.getLabel().show();
                })
                label.addEventListener("click", function () {
                    _marker.openInfoWindow(_iw);
                })
                if (!!json.isOpen) {
                    label.hide();
                    _marker.openInfoWindow(_iw);
                }
            })()
        }
    }
    //创建InfoWindow
    function createInfoWindow(i) {
        var json = markerArr[i];
        var iw = new BMap.InfoWindow("<b class='iw_poi_title' title='" + json.title + "'>" + json.title + "</b><div class='iw_poi_content'>" + json.content + "</div>");
        return iw;
    }
    //创建一个Icon
    function createIcon(json) {
        var icon = new BMap.Icon("http://app.baidu.com/map/images/us_mk_icon.png", new BMap.Size(json.w, json.h), {
            imageOffset: new BMap.Size(-json.l, -json.t),
            infoWindowOffset: new BMap.Size(json.lb + 5, 1),
            offset: new BMap.Size(json.x, json.h)
        })
        return icon;
    }

    initMap(); //创建和初始化地图
})