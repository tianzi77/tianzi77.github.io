$(function() {

	function getMobileOperatingSystem() {
	  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) ) {
	    return 'ios';
	  }
	  else if( userAgent.match( /Android/i ) ){
	    return 'android';
	  }
	  else{
	    return 'unknown';
	  }
	}


	$('body').addClass(getMobileOperatingSystem());


	// 响应式缩放
	var autoScale = function() {
		var ratio = 320/504,
			winW = document.documentElement.clientWidth,
			winH = document.documentElement.clientHeight,
	    	ratio2 = winW/winH,
	    	scale;

			if (ratio < ratio2) {
				scale = (winH/504).toString().substring(0, 6);
			} else {
				scale = (winW/320).toString().substring(0, 6);
			}

		var cssText = '-webkit-transform: scale('+ scale/1.17 +'); -webkit-transform-origin:top;';
		$('.cluo').attr('style', 'zoom: '+scale/1.17);
		$('.container').attr('style', cssText);
	};
	setTimeout(function() {
	    autoScale();
	}, 300);



	// 初始化滑动组件
	var $arrow = $('.icon-arrow'),
		slider = new mo.PageSlide({
		target: $('.page-wrapper .content > li'),
		link: true,
		disable: 0
	});

	slider.on('beforechange', function() {
		if (slider.curPage === 1) {
			slider.disable(1, 'prev');
			slider.enable(1, 'next');
			$arrow.show().addClass('animate');
		}
		else if (slider.curPage === 2) {
			slider.disable(2, 'prev');
			$('.page-2 span').remove();
			$arrow.show().addClass('animate');
		}
		else if (slider.curPage === 15) {
			$arrow.hide().removeClass('animate');
		}
		else {
			$arrow.show().addClass('animate');
		}
	});




	


	// 初始化资源加载器
	var progress = $('.page-1 .progress'),
		resList = [
			'../img/h5_start.png',
			'../img/bg.jpg',
			'../img/cluo.png',
			'../img/cluo_bg.jpg',
			'../img/cluo_bg2.jpg',
			'../img/cluo_bg3.jpg',
			'../img/curie_bg.jpg',
			'../img/curie_bg2.jpg',
			'../img/curie_bg3.jpg',
			'../img/end_bg.jpg',
			'../img/jay_bg.jpg',
			'../img/jay_bg2.jpg',
			'../img/jay_bg3.jpg',
			'../img/music_on.gif',
			'../img/sprites_cluo.png',
			'../img/sprites_common.png',
			'../img/sprites_curie.png',
			'../img/sprites_jay.png',
			'../img/sprites_wording1.png',
			'../img/sprites_wording2.png'
		];

	var loader = new mo.Loader(resList, {
		loadType : 1,
		minTime : 100,
		onLoading : function(count,total){
			$('.page-1').addClass('start');
			progress.text('loading... '+Math.floor(count/total*100)+'%');
		},
		onComplete : function(time){
			setTimeout(function() {
				slider.next();
			}, 500);
		}
	});





	// 音乐控制
	var audio = $('audio')[0],
		flag = false;

	$(document).on('touchstart', function() {
	    if (!flag) {
	      audio.play();
	      flag = true;
	    }
	});
	$('.icon-music').on('tap', function() {
		if ($(this).hasClass('on')) {
			audio.pause();
		} else {
			audio.play();
		}
		$(this).toggleClass('on');
	});





	// 翻转屏幕提示
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
		detectOrientation();
	}, false);

	detectOrientation();

	function detectOrientation() {
		if (window.orientation === 180 || window.orientation === 0) { 
			$('.dialog-guide').hide();
		}  
		if (window.orientation === 90 || window.orientation === -90 ){  
			$('.dialog-guide').show();
		}
	}




    // Android 2.3.x 动画退化处理

	function decideAndroid23(ua) {
		ua = (ua || navigator.userAgent).toLowerCase();
		return ua.match(/android.2\.3/) ? true : false;
	}

	if( decideAndroid23() ){
		$(".page-wrapper").addClass("android23");
	}




	// 点击箭头往下翻页

	$(".icon-arrow").on('tap', function() {
		slider.next();
	});

	
});	