        $(function () {
            (function () {
                function __tip(type, text, time) {
                    if (time == undefined || time == null) {
                        time = 2000;
                    }
                    time = time / 1000;
                    if (type == "loading") {
                        RayCloud.showLoading(text, time);
                    } else if (type == "ok") {
                        RayCloud.showSuccess(text, time);
                    } else if (type == "warn") {
                        RayCloud.showWarn(text, time);
                    } else if (type == "error") {
                        RayCloud.showFail(text, time);
                    }
                }

                var sendMessage = function () {
                    $.ajax({
                        type: "get",
                        url: "/api/1.0/getLuckyDrawGoods.rjson",
                        dataType: "json",
                        async: true,
                        data: {
                            activityId: 11
                        },

                        success: function (data) {
                            ajaxFlag = false;
                            if (data.message == "false") {
                                alert("抽奖失败，请重试！");
                                return false;
                            }
                            render(data);
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            __tip("error", "操作失败，请刷新后重试", 1000);
                        }
                    });
                }
                sendMessage(); //第一次发送ajax初始化商品列表



                var mapping = {};

                function render(arr) {
                    var arr = arr.data;
                    var html = [],
                        it;
                    var degree = 0,
                        _degree = 0;
                    $(Array(8)).each(function (idx, val) {

                        if (arr[idx]) {
                            it = arr[idx];
                            it.degree = _degree;
                            mapping[it.id] = it;
                            html.push('<div data-id="' + arr[idx].id + '"><p class="">' + it.title + '</p><img src="' + it.picUrl + '" /></div>');
                        } else {
                            html.push('<div data-id="' + idx + '" class="sorry"><p class="">再接再厉</p></div>');
                            mapping[idx] = {
                                title: '再接再厉',
                                degree: _degree,
                                type: '没中'
                            };
                        }
                        _degree += 45;
                    });
                    $('.ra').html(html.join('')).find('>div').each(function () {
                        $(this).rotate(degree);
                        degree += 45;
                    });
                }; //初始化div布局


                $('.pointer').click(function () {


                    $.ajax({
                        type: "get",
                        url: "/api/1.0/luckyDraw.rjson",
                        dataType: "json",
                        async: true,
                        data: {
                            activityId: 11
                        },

                        success: function (data) {
                            ajaxFlag = false;
                            if (data.result == "100") {

                                $.dialog({
                                    title: "抽奖提示",
                                    content: '<p style="text-align:center;padding-top:40px;font-size:14px;">每次抽奖将消耗10个积分</p>',
                                    width: 345,
                                    okVal: "确定",
                                    ok: function () {
                                        cjGame(data);
                                    }
                                }); //新增每次抽奖弹出消耗10个积分，没有抽奖机会则不弹出



                            } else {
                                $('.rotate').stopRotate();
                                var $error = '<p style="text-align:center;padding-top:40px;font-size:14px;">' + data.message + '</p>';
                                $.dialog({
                                    title: "中奖提示",
                                    width: "345",
                                    content: $error,
                                    okVal: "确定",
                                    cancelVal: "关闭",

                                });
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            __tip("error", "操作失败，请刷新后重试", 1000);
                        }
                    });






                });

                function cjGame(data) {

                    var bRotate = false;
                    $('.rotate').rotate({
                        angle: 0,
                        animateTo: 360 * 20,
                        duration: 20000,

                    }); //点击旋转同时发送ajax请求，



                    dealResult(data);


                }



                function dealResult(data) { //模拟获得数据开始旋转
                    var num = $('.sorry').index(),
                        duihua,
                        curA = $('.rotate').getRotateAngle()[0],
                        _curA = curA % 360;
                    if (data.data.lucky == true) {
                        num = data.data.goods.id
                    }; //如果中奖了，再判断商品的id
                    $('.rotate').rotate({
                        animateTo: curA + 360 * 3 + (360 - _curA) - mapping[num].degree + 90,
                        duration: 5000,
                        callback: function () {
                            var $duihua = '<p style="text-align:center;padding-top:40px;font-size:14px;">恭喜你获得' + mapping[num].title + '</p>';
                            if (data.data.lucky == false) {
                                $.dialog({
                                    title: "中奖提示",
                                    width: "345",
                                    content: $('.once_again').html(),
                                    okVal: "确定",
                                    cancelVal: "关闭",

                                });
                            } //lucky为false表示没中奖，弹出没中奖对话框
                            switch (mapping[num].type) {
                                //根据返回的type进行判断
                            case 'entity':
                                $.dialog({
                                    title: "中奖提示",
                                    width: "345",
                                    content: $duihua,
                                    okVal: "联系客服",
                                    cancelVal: "关闭",
                                    ok: function () {
                                        window.open("http://www.taobao.com/webww/ww.php?ver=3&touid=guanghua2cc&siteid=cntaobao&status=1&charset=utf-8", '_blank ');
                                    }

                                }); //弹出实物对话框
                                break;
                            case 'virtual':
                                $.dialog({
                                    title: "中奖提示",
                                    width: "345",
                                    content: $duihua,
                                    okVal: "观看",
                                    cancelVal: "关闭",
                                    ok: function () {
                                        window.open("http://cloud.video.taobao.com/play/u/305442977/e/1/t/1/p/2/26214273.swf", '_blank ');

                                    }

                                });
                                break; //弹出虚拟对话框
                            case 'score':
                                $.dialog({
                                    title: "中奖提示",
                                    width: "345",
                                    content: $duihua,
                                    okVal: "观看",
                                    cancelVal: "关闭",

                                });
                                break; //弹出积分对话框

                            };
                            bRotate = !bRotate;
                        }
                    });

                };


                $('.close').click(function () {
                    $('.turntable-bg').hide();
                    $('.mask-cj').hide();
                }); //关闭抽奖

                var $weixin_text = $('.weixin');
                $('.chance').click(function () {
                    $.dialog({
                        title: "中奖提示",
                        width: "345",
                        content: $weixin_text.show()
                    })
                }); //微信扫描抽奖

                $('button').click(function () {
                    $('.turntable-bg').show();
                    $('.mask-cj').show();
                    $(this).hide();

                })
            }())
        })