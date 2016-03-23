;
(function () {

    // 用户抽奖信息
    $.mockjax({
        url: new RegExp('/api/1.0/getLuckyDrawGoods.rjson'),
        response: function (arg) {

            // 返回信息
            this.responseText = {
                result: '100',
                message: 'success'

                ,
                data: [
                    {
                        id: 1111110,
                        title: '小米手环',
                        type: 'entity',
                        price: 100,
                        url: '',
                        picUrl: './images/xiaomi.png'
                },
                    {
                        id: 120,
                        title: '20元话费1',
                        type: 'entity',
                        price: 100,
                        url: '',
                        picUrl: './images/huafei.png'
                }, {
                        id: 30,
                        title: '10元话费1',
                        type: 'entity',
                        price: 100,
                        url: '',
                        picUrl: './images/huafei.png'
                }, {
                        id: 40,
                        title: '超级联盟3选一大礼包1',
                        type: 'entity',
                        price: 100,
                        url: '',
                        picUrl: './images/sanxuanyi.png'
                }, {
                        id: 500,
                        title: '双倍积分1',
                        type: 'score',
                        price: 100,
                        url: '',
                        picUrl: './images/jifen.png'
                }, 
                    {
                        id: 50000,
                        title: '淘宝名师教程秘籍',
                        type: 'virtual',
                        price: 100,
                        url: '',
                        picUrl: './images/jiaocheng.png'
                }, 
                    {
                        id: 99999999,
                        title: '热敏打印机',
                        type: 'entity',
                        price: 100,
                        url: '',
                        picUrl: './images/dayin.png'
                }, 
                    
                ]
            };
        }
    });


    // 用户抽奖信息
    $.mockjax({
        url: new RegExp('/api/1.0/luckyDraw.rjson'),
        response: function (arg) {

            // 返回信息
            this.responseText = {
                result: '100',
                message: 'success',
                data:{
                    lucky: true, //是否中奖了 false表示没中奖
                    sendSize: 1, //数量
                    goods: {
                        id: 30, //礼品的ID
                        type:'', //礼物的类型 //entity//实物  virtual//优惠订购  score//积分 sms//短信  lottery//抽奖次数
                        title:'', //中奖的描述信息-一般为礼物名称
                        price:'', //参考原价
                        url:'http://www.baidu.com', //链接信息（一般虚拟虚拟商品需要如订购链接）
                        picUrl:'' //展示图片 
                    }
                }

            };
        }
    });
    


}());