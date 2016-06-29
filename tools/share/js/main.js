//二维码切换
var $navApp = $(".nav-app"),
    $appDropbox = $(".app-dropbox"),
    $close = $(".nav-app-close");
$navApp.hover(function () {
    $appDropbox.slideDown('400');
    $(this).addClass('nav-app-hover');
}, function () {
    $appDropbox.slideUp('400');
    $(this).removeClass('nav-app-hover');
});

$close.on("click", function () {
    if ($appDropbox.slideDown()) {
        $appDropbox.slideUp();
    } else {
        return;
    }
});

//返回顶部
$(window).scroll(function () {
    var p_top = 100;
    if ($(window).scrollTop() >= p_top) {
        $('.fixed-sidebar').fadeIn(300);
    } else {
        $('.fixed-sidebar').fadeOut(300);
    }
});
$('.fixed-sidebar').click(function () {
    $('html,body').animate({
        scrollTop: '0px'
    }, 800);
});

//pc未登录状态
$("#login-btn").on("click", function () {
    $(".login").show();
    //遮罩层
    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': 'rgba(9,9,9,0.63)',
            'width': '100%',
            'z-index': 999 //保证这个悬浮层位于其它内容之上  
        });
});


//关闭iframe
$(".login>.close").on("click", function () {
    $(".login").hide();
    $("#overlay").remove();
});

//pc已登录状态
$("#logined-btn").on("click", function () {
    $(".share-ways").show();
    //遮罩层
    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': 'rgba(9,9,9,0.63)',
            'width': '100%',
            'z-index': 999 //保证这个悬浮层位于其它内容之上  
        });
});

// pc关闭已登录
$(".x-close").on("click", function () {
    $(".share-ways").hide();
    $("#overlay").remove();
});

//手机已登录
$("#i-logined-btn").on("click",function(){
    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': 'rgba(9,9,9,0.9)',
            'width': '100%',
            'z-index': 999 //保证这个悬浮层位于其它内容之上  
        });
    $(".phone-share").css("z-index",1000);
    $("#overlay").on("click",function(){
        $(this).remove();
        $(".phone-share").css("z-index",-1);
    });
});

//手机未登陆
$("#x-login-btn").on("click",function(){
    var docHeight = $(document).height();
    $('body').append('<div id="overlay"></div>');
    $('#overlay')
        .height(docHeight)
        .css({
            'opacity': .9, //透明度  
            'position': 'absolute',
            'top': 0,
            'left': 0,
            'background-color': 'rgba(9,9,9,0.9)',
            'width': '100%',
            'z-index': 999 //保证这个悬浮层位于其它内容之上  
        });
    $(".no-phone-login").css("z-index",1000);
    $("#overlay").on("click",function(){
        $(this).remove();
        $(".no-phone-login").css("z-index",-1);
    });
});

// canvas 
(function () {
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 350;

    COLORS = [[85, 71, 106], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];

    PI_2 = 2 * Math.PI;

    canvas = document.getElementById("flower");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function () {
        window.w = canvas.width = window.innerWidth;
        return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function () {
        return setTimeout(resizeWindow, 0);
    };

    range = function (a, b) {
        return (b - a) * Math.random() + a;
    };

    drawCircle = function (x, y, r, style) {
        context.beginPath();
        context.arc(x, y, r, 0, PI_2, false);
        context.fillStyle = style;
        return context.fill();
    };

    xpos = 0.5;

    document.onmousemove = function (e) {
        return xpos = e.pageX / w;
    };

    window.requestAnimationFrame = (function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
            return window.setTimeout(callback, 1000 / 60);
        };
    })();

    Confetti = (function () {
        function Confetti() {
            this.style = COLORS[~~range(0, 5)];
            this.rgb = "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
            this.r = ~~range(2, 6);
            this.r2 = 2 * this.r;
            this.replace();
        }

        Confetti.prototype.replace = function () {
            this.opacity = 0;
            this.dop = 0.03 * range(1, 4);
            this.x = range(-this.r2, w - this.r2);
            this.y = range(-20, h - this.r2);
            this.xmax = w - this.r;
            this.ymax = h - this.r;
            this.vx = range(0, 2) + 8 * xpos - 5;
            return this.vy = 0.7 * this.r + range(-1, 1);
        };

        Confetti.prototype.draw = function () {
            var ref;
            this.x += this.vx;
            this.y += this.vy;
            this.opacity += this.dop;
            if (this.opacity > 1) {
                this.opacity = 1;
                this.dop *= -1;
            }
            if (this.opacity < 0 || this.y > this.ymax) {
                this.replace();
            }
            if (!((0 < (ref = this.x) && ref < this.xmax))) {
                this.x = (this.x + this.xmax) % this.xmax;
            }
            return drawCircle(~~this.x, ~~this.y, this.r, this.rgb + "," + this.opacity + ")");
        };

        return Confetti;

    })();

    confetti = (function () {
        var j, ref, results;
        results = [];
        for (i = j = 1, ref = NUM_CONFETTI; 1 <= ref ? j <= ref : j >= ref; i = 1 <= ref ? ++j : --j) {
            results.push(new Confetti);
        }
        return results;
    })();

    window.step = function () {
        var c, j, len, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, w, h);
        results = [];
        for (j = 0, len = confetti.length; j < len; j++) {
            c = confetti[j];
            results.push(c.draw());
        }
        return results;
    };

    step();

}).call(this);

//复制链接
var clip1 = new ZeroClipboard.Client();
clip1.setHandCursor(true);
var text1 = document.getElementById('link').innerHTML;
clip1.setText(text1);
clip1.glue("btn_submit");
clip1.addEventListener("complete", function () {
    console.log("复制成功！");
    clip.destroy();
});