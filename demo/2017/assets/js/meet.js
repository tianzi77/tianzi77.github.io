/**
 * @author      : weiwzhang@Ctrip.com
 * @editor      : Sublime Text
 * @updated     : 2016.12.30
 * @description : 2017峰会
 *
 */
;
(function ($, global) {

    var meet = (function () {

        // 变量区域
        return {

            // fullpage
            fullpage: function () {
                $('#meet-app').fullpage({
                    sectionsColor: ['#000021', '#000021', '#000021', '#000021', '#000021', '#000021', '#000021'],
                    anchors: ['1page', '2page', '3page', '4page', '5page', '6page', '7page'],
                    menu: '#menu',
                    controlArrows: true,
                    navigation: true,
                    easing: 'linear',
                    lazyLoading: true,
                    //			slidesNavigation: true,
                    loopHorizontal: false,
                    afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {
                        console.log("slideLoad--" + "anchorLink: " + anchorLink + " index: " + index + " slideAnchor: " + slideAnchor + " slideIndex: " + slideIndex);

                    },
                    onSlideLeave: function (anchorLink, index, slideIndex, direction) {
                        console.log("----------------");
                        console.log("onSlideLeave--" + "anchorLink: " + anchorLink + " index: " + index + " slideIndex: " + slideIndex + " direction: " + direction);
                    },
                    afterLoad: function (index, anchorLink) {
                        var _arrow = $('.arrows'),
                            _index = anchorLink + 1,
                            _footer = $('.footer'),
                            _width = $(window).width() || $(document).width();

                        _width < 2000 ? (index === '7page' ? _arrow.hide() : _arrow.show()) : '';
                        _arrow.attr('href', '#' + _index + 'page');
                        _width > 1200 ? (index === '7page' ? _footer.slideDown() : _footer.slideUp()) : '';
                    }
                });
            },

            // baidu map
            map: function () {
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
                    var point = new BMap.Point(116.474466, 39.965894); //定义一个中心点坐标
                    map.centerAndZoom(point, 18); //设定地图的中心点和坐标并将地图显示在地图容器中
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
                        title: "峰会地址:北京海航大厦万豪酒店",
                        content: "楼层：B2",
                        point: "116.474107|39.965777",
                        isOpen: 1,
                        icon: {
                            w: 23,
                            h: 25,
                            l: 0,
                            t: 21,
                            x: 9,
                            lb: 12
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
                        var marker = new BMap.Marker(point, {
                            icon: iconImg
                        });
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
                    var icon = new BMap.Icon("http://api.map.baidu.com/lbsapi/creatmap/images/us_cursor.gif", new BMap.Size(json.w, json.h), {
                        imageOffset: new BMap.Size(-json.l, -json.t),
                        infoWindowOffset: new BMap.Size(json.lb + 5, 1),
                        offset: new BMap.Size(json.x, json.h)
                    })
                    return icon;
                }

                initMap(); //创建和初始化地图

            },

            // 弹窗
            dialog: function () {
                $('.fjq').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/guest.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">方继勤</span><span class="guest-pri">携程商旅   &nbsp;CEO</span></p>' +
                                '            <p class="guset-match">开幕致词：TM+</p>' +
                                '            <p class="guset-match">演讲主题：TM+全流程与一体化</p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">2000年加入携程，创建了线下B2C2O的渠道销售模式；2005年任全国销售高级总监。' +
                                '            </p>' +
                                '            <p class="guest-word">2011年晋升为携程副总裁；2011-2012年任华西分公司总经理。' +
                                '            </p>' +
                                '            <p class="guest-word">2013年至今任携程商旅CEO，在其带领下，携程商旅成为国内最大的差旅管理公司，被Travel weekly评为“中国最佳差旅管理公司”。' +
                                '            </p>' +
                                '            <p class="guest-word">2014年携程商旅市场份额，在中国商旅管理市场排名第一。' +
                                '            </p>' +
                                '            <p class="guest-word">2015年携程商旅交易额突破100亿人民币。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.cj').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/cj.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">陈竞</span><span class="guest-pri">北京电视台知名主持人</span></p>' +
                                '            <p class="guset-match">峰会主持人</p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">他是 BTV文艺《每日文娱播报》的时尚主播' +
                                '            </p>' +
                                '            <p class="guest-word">BTV文艺《星夜故事》里也有他的身影。' +
                                '            </p>' +
                                '            <p class="guest-word">他曾荣获2003“青春之星”全国电视节目主持人大赛亚军。' +
                                '            </p>' +
                                '            <p class="guest-word">他曾主持过BTV生活《超级出租车》、《生活无间报》、等名牌节目。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.jzr').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/jzr.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">贾子入</span><span class="guest-pri">商旅专家  &nbsp;创始人</span></p>' +
                                '            <p class="guset-match">主题：2016年中国差率市场白皮书' +
                                '            </p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">《商旅专家》杂志创始人、主编，曾任职众信旅游与行业媒体，深耕旅游业十年，商旅会议行业资深媒体人、行业专家、投资顾问。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.dqb').on('click', function () {
                        $.fn.fullpage.setAllowScrolling(false);
                        $.fn.fullpage.setKeyboardScrolling(false);
                        easyDialog.open({
                            container: {
                                header: '<div class="guest-pic fd-left">' +
                                    '            <img src="//pic.c-ctrip.com/corp_niv/meet/dqb.png" alt="">' +
                                    '        </div>' +
                                    '        <div class="guest-title fd-left">' +
                                    '            <p><span class="guest-name">丁秋波</span><span class="guest-pri">携程商旅产品负责人</span></p>' +
                                    '            <p class="guset-match">演讲主题：新产品发布</p>' +
                                    '        </div>' +
                                    '        <br class="fd-clear">',
                                content: '<div class="guest-intro">' +
                                    '            <p class="">拥有多年企业差旅服务行业产品经验，敏锐地把握企业用户需求，不断检验、分析和改进产品体验，促使携程企业差旅产品保持强劲的市场竞争力。' +
                                    '            </p>' +
                                    '        </div>'
                            },
                            drag: false,
                            callback: function () {
                                $.fn.fullpage.setAllowScrolling(true);
                                $.fn.fullpage.setKeyboardScrolling(true);
                            }
                        });

                    })
                    //分会场
                $('.zcz').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/zcz.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">张长征</span><span class="guest-pri">汉得信息副总裁</span></p>' +
                                '            <p class="guset-match">主题：革命化的一站式商旅解决方案' +
                                '            </p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">张长征先生拥有近20年的企业信息化咨询及实施经验，深谙企业客户的痛点与需求，曾为百度、华为、松下、艾默生、丰田、东风汽车等大型企业客户提供专业服务。' +
                                '            </p>' +
                                '            <p class="guest-word">张长征先生毕业于西安交通大学，拥有管理学学士学位。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.mcm').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/mcm.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">马春荃</span><span class="guest-pri">易快报创始人兼CEO</span></p>' +
                                '            <p class="guset-match">主题：费控报销管窥数字化管理爆发' +
                                '            </p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">是国内在企业管理变革和企业转型领域具有丰富实战经验的专家。曾任上市公司用友客户服务事业部总经理，率先提出云服务理念，推动了用友的互联网转型，是用友集团最年轻的专家，也是第一位服务专家。' +
                                '            </p>' +
                                '            <p class="guest-word">2014年，创立国内领先的企业消费和报销管理平台----易快报：其带来互联网时代全新的报销方式，以绝对优势，保持市场占有率第一，获奖数量创行业之最。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.hxx').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/hxx.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">何晓翔</span><span class="guest-pri">微信企业号 合作部总监</span></p>' +
                                '            <p class="guset-match">演讲主题：圆桌论坛' +
                                '            </p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">先后就职于中国移动通信公司、腾讯公司。拥有10+年的通信、互联网从业经验，参与了滴滴打车、微众银行、58同城等中国互联网知名企业的信息化项目实践，对移动通信技术、云计算解决方案及“互联网+”产品及商业模式发展方向，有较深的理解和实践。' +
                                '            </p>' +
                                '            <p class="guest-word">近期主要关注方向：如何利用互联网平台实现企业经营和管理的互联网化。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.cc').on('click', function () {
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<div class="guest-pic fd-left">' +
                                '            <img src="//pic.c-ctrip.com/corp_niv/meet/cc.png" alt="">' +
                                '        </div>' +
                                '        <div class="guest-title fd-left">' +
                                '            <p><span class="guest-name">楚建</span><span class="guest-pri">携程商旅CEO助理兼实施总监</span></p>' +
                                '            <p class="guset-match">演讲主题：圆桌论坛' +
                                '            </p>' +
                                '        </div>' +
                                '        <br class="fd-clear">',
                            content: '<div class="guest-intro">' +
                                '            <p class="">楚建，携程商旅事业部CEO助理兼实施总监，北京大学硕士，美国康奈尔大学MBA，目前负责携程商旅大客户的实施和系统对接工作，楚建在软件开发、项目管理方面有近十年的工作经验，对于在互联网时代如何通过新技术满足客户复杂的差旅需求以及如何通过系统对接的方式连接信息孤岛有着丰富的从业经验，在负责携程商旅大客户系统对接期间，和国内外主要的ERP、OA、人事及财务报销软件公司建立了深厚的合作关系。' +
                                '            </p>' +
                                '        </div>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });

                })
                $('.m-btn').click(function (e) {
                    e.preventDefault();
                    $.fn.fullpage.setAllowScrolling(false);
                    $.fn.fullpage.setKeyboardScrolling(false);
                    easyDialog.open({
                        container: {
                            header: '<i class="m-icon tm"></i>',
                            content: '<ul class="tm-in">' +
                                '                <li>' +
                                '                    <i class="m-icon all"></i>' +
                                '                    <p class="in-all">全面化</p>' +
                                '                    <div class="in-intro">纵向-从预订、支付拓展至前端申请、审批及后端的报销、分析等功能，实现全流程管控；' +
                                '横向-从机票、酒店、火车、用车扩展至MICE、保险、用餐、机场贵宾厅等，实现一体化服务。</div>' +
                                '                </li>' +
                                '                <li><i class="m-icon auto"></i>' +
                                '                    <p class="in-auto">自动化</p>' +
                                '                    <div class="in-intro">从预订、授权、支付的自动化，延伸至账户开通、维护，财务对账、结算，人事信息对接、变更，电子发票传递、验真等整个差旅管理过程，目标是实现全程无人工干预。</div>' +
                                '                </li>' +
                                '                <li><i class="m-icon mach"></i>' +
                                '                    <p class="in-mach">智能化</p>' +
                                '                    <div class="in-intro">个人端，基于用户画像的智能推荐降低客户使用成本；' +
                                '企业端，基于企业消费与行业大数据对比分析的智能报告与差旅流程及管控优化建议。</div>' +
                                '                </li>' +
                                '            </ul>'
                        },
                        drag: false,
                        callback: function () {
                            $.fn.fullpage.setAllowScrolling(true);
                            $.fn.fullpage.setKeyboardScrolling(true);
                        }
                    });
                });

            },

            // 初始化所有方法
            init: function () {
                this.fullpage();
                this.map();
                this.dialog();
            }
        };
    })();

    $(function () {
        meet.init();
    });

})(jQuery, this);