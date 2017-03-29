define([
    'cPageView'
], function(
    pageView
){
    "use strict";
    var View = pageView.extend({

        pageid: (function(){
            var uas=navigator.userAgent,isInWechat=!!uas.match(/micromessenger/i);
            return isInWechat ? '10320660316' : '10320660314'; 
        })(),
        hpageid: '10320660315',
        events: {},
        cMbzCode: function(){

            var ua=navigator.userAgent,isInWechat=!!ua.match(/micromessenger/i),isInIOS=!!ua.match(/iphone|ipad|ipod/i),isInCtripApp=!!ua.match(/ctripwireless/i),isInCGSApp=!!ua.match(/gs_wireless/i),isInWebClient=!ua.match(/ctripwireless/i)&&!ua.match(/micromessenger/i)&&!ua.match(/weibo/i);
  
            var req=require||{};
            if (typeof req === 'function') {
                    if (isInCtripApp==true||isInCGSApp==true) {
                        req(['cHybridShell'], function(hybridShell) {
                            var json = {
                                "center": [{
                                    "tagname": "title", 
                                    "value": '看徐静蕾、黄立行表白，领免费红包！' 
                                }],
                                "right": [{
                                    "tagname": "share",
                                    "value": '分享'
                                }]
                            };
                            typeof hybridShell.Fn === 'function' && hybridShell.Fn('refresh_nav_bar').run(JSON.stringify(json));
                            typeof hybridShell.Fn === 'function' && hybridShell.Fn('share').on(function() {
                                cusShare()
                            });
                            function cusShare() {
                                var dataList = [{
                                    shareType: "Default",
                                    imageUrl: "https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/img/100.jpg",
                                    title: "看徐静蕾、黄立行表白，领免费红包！",
                                    text: "[分享]快来参加吧",
                                    linkUrl: "https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/index.html?openapp=3"
                                }];
                                typeof hybridShell.Fn === 'function' && hybridShell.Fn('call_custom_share').run(dataList);
                            }
                        });
                    }
                    if (isInWechat) {
                        req(['cShell'], function(shell) {
                            var options = {
                                title: "看徐静蕾、黄立行表白，领免费红包！",
                                desc: "[分享]快来参加吧",
                                href: "https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/index.html?openapp=3",
                                icon: "https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/img/100.jpg"
                            };
                            window.shareData = {
                                Title: options.title || "看徐静蕾、黄立行表白，领免费红包！",
                                Content: options.desc || "[分享]快来参加吧",
                                imgUrl: options.icon || 'https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/img/100.jpg',
                                timeLineLink: options.href || 'https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/index.html?openapp=3',
                                sendFriendLink: options.href || 'https://pages.c-ctrip.com/commerce/promote/201703/other/bjz/sp/index.html?openapp=3'
                            };
                            typeof shell.share === 'function' && shell.share(options).done(function(){}).fail(function(err){});
                        });
                    }
            }




        },

        onShow: function(){
            this.cMbzCode();
            
        },

        onHide: function(){
            
        }

    });

    return View;

});

http://
