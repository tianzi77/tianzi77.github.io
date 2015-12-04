<?php
require_once "jssdk/jssdk.php";
$jssdk = new JSSDK("wx99bb002d505d59e9", "2464c14d1ceb5416567b5d7b5c51664c ");
$signPackage = $jssdk->GetSignPackage();
?>
    <!DOCTYPE html>
    <html lang="zh-cn">

    <head>
        <meta http-equiv="Content-Type">
        <meta content="text/html; charset=utf-8">
        <meta charset="utf-8">
        <title>携程商旅测一测你是哪种出差侠</title>
        <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
        <meta name="format-detection" content="telephone=no">
        <meta name="format-detection" content="email=no">
        <link rel="stylesheet" href="./css/swiper.min.css">
        <link rel="stylesheet" type="text/css" href="./css/animations.css" />
        <link rel="stylesheet" type="text/css" href="./css/tz.css" />
        <script src="./js/swiper.min.js" type="text/javascript"></script>
        <script src="./js/swiper.animate1.0.2.min.js" type="text/javascript"></script>
        <script src="./js/jquery-1.10.1.min.js" type="text/javascript"></script>
        <script src="./js/quiz.js" type="text/javascript"></script>
    </head>

    <body>
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide slide2">
                    <!--问题区域及介绍，全部合在一屏展示  S-->
                    <div id='quiz_area'></div>
                    <img src="./images/logo.png" alt="logo" class="logo">
                    <!--出差侠测试结果1-->
                    <div class="result1">
                        <img src="./images/dog.png" alt="图标" class="dog ani" swiper-animate-effect="slideInDown">
                        <img src="./images/word.png" alt="" class="word ani" swiper-animate-effect="rotateInDownRight">
                        <img src="./images/result11.png" alt="" class="bg1 ani" swiper-animate-effect="lightSpeedIn">
                        <p class="details ani" swiper-animate-effect="lightSpeedIn">出差于你，是享受，是体验，是乐在其中。可能是你出差的次数还不够多，又或者贵公司的出差政策太优厚，所以你是一只让人艳羡的“伪”出差侠！ <span>教你一秒钟伪装出差侠——</span>
                        </p>
                        <a class="bottom" href="###">
                            <i></i>
                            <span class="down ">下载 <span>携程企业商旅APP</span>出差侠必备 , 所以你懂的！</span>
                        </a>
                    </div>
                    <!--出差侠测试结果2-->
                    <div class="result2">
                        <img src="./images/dog1.png" alt="图标" class="dog ani" swiper-animate-effect="slideInDown">
                        <img src="./images/word22.png" alt="" class="word ani" swiper-animate-effect="rotateInDownRight">
                        <img src="./images/result11.png" alt="" class="bg1 ani" swiper-animate-effect="lightSpeedIn">
                        <p class="details ani" swiper-animate-effect="lightSpeedIn">恭喜你正式踏入出差狗的行列！你已经开始掌握自己的出差节奏了，打包效率应该也比以前高很多了吧，洗漱包里应有尽有再也不会丢三落四了， 有些地方去了很多次但依然会迷路…
                            <span>怎么破——</span>
                        </p>
                        <a class="bottom" href="###">
                            <i></i>
                            <span class="down ">下载 <span>携程企业商旅APP</span>差旅用车，一点即来，出差侠必备！</span>
                        </a>
                    </div>
                    <!--出差侠测试结果3-->
                    <div class="result3">
                        <img src="./images/dog33.png" alt="图标" class="dog ani" swiper-animate-effect="slideInDown">
                        <img src="./images/word33.png" alt="" class="word ani" swiper-animate-effect="rotateInDownRight">
                        <img src="./images/result11.png" alt="" class="bg1 ani" swiper-animate-effect="lightSpeedIn">
                        <p class="details ani" swiper-animate-effect="lightSpeedIn">大禹治水，三过家门而不入。说的就是你！当出差成为日常，当说走就走 成为一种习惯，当家的味道成为一种奢侈…… <span>心疼你！所以——</span>
                        </p>
                        <a class="bottom" href="###">
                            <i></i>
                            <span class="down ">下载 <span>携程企业商旅APP</span>让携程商旅成为你随身的差旅管家！</span>
                        </a>
                    </div>
                    <!--问题区域及介绍，全部合在一屏展示  E-->
                </div>
            </div>
        </div>
        <script type="text/javascript">
            var mySwiper = new Swiper('.swiper-container', {
                direction: 'vertical',
                hashnav: false,
                preventLinksPropagation: true,
                preventClicks: false,
                onInit: function(swiper) { //Swiper2.x的初始化是onFirstInit
                    swiperAnimateCache(swiper); //隐藏动画元素 
                    swiperAnimate(swiper); //初始化完成开始动画
                },
                onSlideChangeEnd: function(swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                }
            });

            var init = {
                'questions': [{
                    'question': '一年出差几次？',
                    'answers': ['A.5次及以下，终于轮到我出差了，好激动！', 'B.5次到10次，有点疲惫了……', 'C.10次及以上，每月总有那几天……'],
                }, {
                    'question': '出差通常都有伙伴吗？',
                    'answers': ['A.孑然一身，孤独上路……', 'B.会有小伙伴一起哦！', 'C.心如止水，有无同伴都无所谓了！'],
                }, {
                    'question': '你对你的出差标准满意吗？',
                    'answers': ['A.公司福利好，人人争着出差呢！', 'B.还行吧，有提升空间。', 'C.不谈了，一把心酸泪……'],
                }, {
                    'question': '出差期间，你会用美食犒劳自己吗？',
                    'answers': ['A.我是节省的好孩子，只在餐标里消费。', 'B.绝不亏待自己，宁愿贴钱也要吃得好', 'C.我们公司是土豪，餐标是什么？'],
                }, {
                    'question': '出差期间，你早餐怎么吃？',
                    'answers': ['A.住宿含餐，就在酒店吃了！', 'B.感受一下当地小吃！', 'C.哪有时间吃早餐呀……'],
                }, {
                    'question': '你会保持一贯的衣着仪容吗？',
                    'answers': ['A.不能降低水准，带足换洗衣物，天天换新衣！', 'B.自己洗，酒店洗，干净整洁很重要！', 'C.自动降低换衣频率，你懂的……'],
                }, {
                    'question': '会在出差地附近游玩吗？',
                    'answers': ['A.归心似箭，只想回家。', 'B.经常找机会感受当地风情。', 'C.哪有精力啊……'],
                }, {
                    'question': '给自己的差旅幸福指数打分',
                    'answers': ['A.满分，100！', 'B.还行吧，60分！', 'C.我不姓“福”，不及格……'],
                }]
            };

            $(function() {
                $('#quiz_area').quiz({
                    questions: init.questions
                });
            });
        </script>
    </body>
    <script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
    <script>
        wx.config({
            debug: true,
            appId: '<?php echo $signPackage["appId"];?>',
            timestamp: <?php echo $signPackage["timestamp"];?>,
            nonceStr: '<?php echo $signPackage["nonceStr"];?>',
            signature: '<?php echo $signPackage["signature"];?>',
            jsApiList: [
                'checkJsApi',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo'
            ]
        });
        wx.ready(function() {
            // 1 判断当前版本是否支持指定 JS 接口，支持批量判断
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'onMenuShareWeibo'
                ],
                success: function(res) {
                    alert(JSON.stringify(res));
                }
            });
            var shareData = {
                title: '标题',
                desc: '描述',
                link: '链接',
                imgUrl: '图片',
                trigger: function(res) {
                    alert('用户点击发送给朋友');
                },
                success: function(res) {
                    alert('已分享');
                },
                cancel: function(res) {
                    alert('已取消');
                },
                fail: function(res) {
                    alert(JSON.stringify(res));
                }
            };
            wx.onMenuShareAppMessage(shareData);
            wx.onMenuShareTimeline(shareData);
            wx.onMenuShareQQ(shareData);
            wx.onMenuShareWeibo(shareData);
        });
        wx.error(function(res) {
            alert(res.errMsg);
        });
    </script>

    </html>