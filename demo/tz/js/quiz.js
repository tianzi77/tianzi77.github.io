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

            exitFob = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="result-keeper"></div></div><div class="notice">请选择一个选项！</div><div class="progress-keeper" ><div class="progress"></div></div>',
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
            if (questionsIteratorIndex !== 0) {
                contentFob += '<div class="prev"><a class="nav-previous" href="#">&lt; 上一题</a></div>';
            }
            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#">下一题 &gt;</a></div>';
            } else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#">完成</a></div>';
            }
            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }
        superContainer.html(introFob + contentFob + exitFob);
        var progress = superContainer.find('.progress'),
            progressKeeper = superContainer.find('.progress-keeper'),
            notice = superContainer.find('.notice'),
            progressWidth = progressKeeper.width(),
            userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');

        function checkAnswers() {
            var resultArr = [],
                flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }

        function roundReloaded(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }

        function judgeSkills(score) {
            //分数计算，选A得1分，选B得3分，选C得5分，方法单独写在下面。
        }
        progressKeeper.hide();
        notice.hide();
        slidesList.hide().first().fadeIn(500);
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
                    progressKeeper.fadeIn(500);
                });
            return false;
        });


        superContainer.find('li').click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300).fadeOut(3000);
                return false;
            }
            notice.hide();

            $(this).parents('.slide-container').delay(300).fadeOut(0,
                function () {
                    $(this).next().fadeIn(0);//立即消失和出现 不延迟
                });

            progress.animate({
                    width: progress.width() + Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        superContainer.find('.prev').click(function () {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).prev().fadeIn(500);
                });
            progress.animate({
                    width: progress.width() - Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        $("ul:last() li").click(function () {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300).fadeOut(3000);
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
            progressKeeper.hide();
            var results = checkAnswers(),
                resultSet = '',
                trueCount = 0,
                shareButton = '',
                score,
                url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            };
            for (var i = 0,
                    toLoopTill = results.length; i < toLoopTill; i++) {
                if (results[i] === true) {
                    trueCount++;
                    isCorrect = true;
                }
                resultSet += '<div class="result-row">' + (results[i] === true ? "<div class='correct'>#" + (i + 1) + "<span></span></div>" : "<div class='wrong'>#" + (i + 1) + "<span></span></div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul></div></div>';
            }
            //            score = roundReloaded(trueCount / questionLength * 100, 2);
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
                    $('.slide2').addClass('swiper-no-swiping'); //禁止滑动
                } else if (score >= 15 && score <= 29) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result2').delay(300).fadeIn(0);
                    $('.logo').hide();
                    $('.slide2').addClass('swiper-no-swiping');
                } else if (score >= 30 && score <= 40) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result3').delay(300).fadeIn(0);
                    $('.logo').hide();
                    $('.slide2').addClass('swiper-no-swiping');
                } else if (score >= 8 && score <= 14) {
                    $('.slide2').css('background', '#2a4456');
                    $('.result1').delay(300).fadeIn(0);
                    $('.logo').hide();
                    $('.slide2').addClass('swiper-no-swiping');
                }
                console.log('用户得分:' + score);
                console.log("选A的题数" + secectTotal1);
                console.log("选B的题数" + secectTotal2);
                console.log("选C的题数" + secectTotal3);
                console.log("选A的分数" + total1);
                console.log("选B的分数" + total2);
                console.log("选C的分数" + total3);
                if (true) {

                    console.log("如果你看到这个页面，则说明分数计算成功");
                }
            }


            resultSet = '<h2 class="qTitle">' + judgeSkills(score) + '<br/> 您的分数： ' + score + '</h2>' + shareButton + '<div class="jquizzy-clear"></div>' + resultSet + '<div class="jquizzy-clear"></div>';
            superContainer.find('.result-keeper').html(resultSet).hide(); //可以展示，用于计算分数进行判断
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function () {
                    $(this).find('.resultsview-qhover').show();
                },
                function () {
                    $(this).find('.resultsview-qhover').hide();
                });
            $(this).parents('.slide-container').fadeOut(500,
                function () {
                    $(this).next().fadeIn(500);
                });
            return false;

        });
    };
})(jQuery);