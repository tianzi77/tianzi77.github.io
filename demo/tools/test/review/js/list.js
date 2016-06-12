$(function () {
    var $content = $('.right-main .right-area');
    $(".year-num ol").on('mouseover', function () {
        var $index = $(this).index();
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
        $content.hide();
        $content.eq($index).show();
    })
    alert(999);
})
