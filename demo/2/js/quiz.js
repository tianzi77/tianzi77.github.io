/*
js计算用户答题分数
common for Ctrip ued h5 project
based on jquery
author by tz 2015.11.30
*/

(function ($) {
    $.fn.quiz = function (settings) {
        var defaults = {
            questions: null,
            startImg: 'images/start.gif',
            endText: '已结束!',
            shortURL: null,
            sendResultsURL: null,
            //定义一些要用到的默认变量
        };
        var config = $.extend(defaults, settings);
        if (config.questions === null) {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">问题加载失败，请刷新再试.</h2></div>');
            return;
        }
        var superContainer = $(this),
            answers = [],
            //插入介绍页面dom结构并定义动画
            introFob = '<div class="intro-container slide-container"><div class="nav-start"><div class="swiper-slide slide1"><img src="./images/man.png" alt="超人" class="img-1 ani fadeInUp animated"><img src="./images/left-yun.png" alt="云" class="img-2 ani bounceInDown animated "><img src="./images/center-yun.png" alt="云" class="img-3 ani bounceInDown animated"><img src="./images/right-yun.png" alt="云" class="img-4 ani bounceInDown animated"><img src="./images/middle.png" alt="形状" class="img-5 ani fadeInLeft animated"><img src="./images/middle2.png" alt="test" class="img-6 ani fadeInLeft animated"><div class="button ani rubberBand animated">开始测验</div></div></div></div>	',
            exitFob = '',
            contentFob = '',
            questionsIteratorIndex,
            answersIteratorIndex;
        superContainer.addClass('main-quiz-holder');
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question"><span class="ani lightSpeedIn animated">' + config.questions[questionsIteratorIndex].question + '</span></div><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                contentFob += '<li class="">' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }
            contentFob += '</ul><div class="nav-container">';
            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }
        superContainer.html(introFob + contentFob + exitFob);
        var userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');

        slidesList.hide().first().fadeIn("normal");
        superContainer.find('li').click(function () {
            var thisLi = $(this);
            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');
            }
        });

        superContainer.find('.button').click(function () {
            console.log($(this));
            console.log("测试开始");
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).next().fadeIn(500);
                });
            return false;
        });


        superContainer.find('li').click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                return false;
            }

            $(this).parents('.slide-container').delay(100).fadeOut(0,
                function () {
                    $(this).next().fadeIn(0); //题目切换立即消失和出现 不延迟
                });
            return false;
        });
        //提交结果
        $("ul:last() li").click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                return false;
            }
            superContainer.find('li.selected').each(function (index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            if (config.sendResultsURL !== null) {
                var collate = [];
                for (r = 0; r < userAnswers.length; r++) {
                    collate.push('{"questionNumber":"' + parseInt(r + 1, 10) + '", "userAnswer":"' + userAnswers[r] + '"}');
                }
            }
            var resultSet = '',
                score,
                url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            };
            var score1 = $('.answers li:nth-child(1)'),
                score2 = $('.answers li:nth-child(2)'),
                score3 = $('.answers li:nth-child(3)'),
                secectTotal1 = $('.answers li:nth-child(1).selected').length,
                secectTotal2 = $('.answers li:nth-child(2).selected').length,
                secectTotal3 = $('.answers li:nth-child(3).selected').length,
                total1 = secectTotal1 * 1,
                total2 = secectTotal2 * 3,
                total3 = secectTotal3 * 5;

            if (score1.hasClass('selected') || score2.hasClass('selected') || score3.hasClass('selected')) {
                score = total1 + total2 + total3;
                if ($('.answers li:nth-child(1)').last().hasClass('selected')) {
                    $('.slide2').css('background', '#2a4456');
                    $('.logo').hide();
                    $('.result1').delay(300).fadeIn(0);
                } else if (score >= 15 && score <= 29) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result2').delay(300).fadeIn(0);
                    $('.logo').hide();
                } else if (score >= 30 && score <= 40) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result3').delay(300).fadeIn(0);
                    $('.logo').hide();
                } else if (score >= 8 && score <= 14) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result1').delay(300).fadeIn(0);
                    $('.logo').hide();
                }
                console.log('用户得分:' + score);
                console.log("选A的题数" + secectTotal1);
                console.log("选B的题数" + secectTotal2);
                console.log("选C的题数" + secectTotal3);
                console.log("选A的分数" + total1);
                console.log("选B的分数" + total2);
                console.log("选C的分数" + total3);
            }
            return false;

        });
    };
})(jQuery);