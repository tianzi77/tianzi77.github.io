$(function(){
    (function(){
        var startFlag = false;  //开始按钮点击标志
        var ajaxFlag = false; //请求标记
        $(".cj_btn").on("click",function(){
            if(startFlag || ajaxFlag){
                return false;
            }
            ajaxFlag = true;
            $.ajax({
                type:"get",
                url:"mock_ajax/mst_get_cj_info.php",
                dataType:"json",
                async:true,
                data:{
                },

                success: function(data){
                    ajaxFlag = false;
                    if(data.message == "fail"){
                        alert("抽奖失败，请重试！");
                        return false;
                    }
                    games(3);
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    ajaxFlag = false;
                    alert("抽奖失败，请重试！");
                    return false;
                }
            });
        });



        function games(param_num){
            var index=1,                //当前亮区位置
                prevIndex=8,          //前一位置
                Speed=300,           //初始速度
                Time,               //定义对象
                arr_length = 8,     //初始化奖品列表长度
                EndIndex=1,         //决定在哪一格变慢
                cycle=0,           //已转动圈数
                EndCycle=4,           //总圈数
                w_flag=false,           //结束转动标志
                random_num=1,      //中奖数
                quick=0;           //加速
                startFlag = true;
            var goback = function(index){  //转完后
                var aText=["恭喜您获得特等奖！热敏打印机一台<br/><span>联系客服可获取奖品 </span>",
                    "恭喜您获得优秀奖！店长币510个",
                    "恭喜您获得终极大奖！短信发送返量51%",
                    "恭喜您获得优秀奖！51条短信免费赠送",
                    "恭喜您获得优秀奖！51元红包",
                    "恭喜您获得优秀奖！510条短信免费赠送",
                    "恭喜您获得特等奖！5100条短信免费赠送",
                    "恭喜您获得特等奖！51000条短信免费赠送"];
                $('.mask').css('display','block');
                $('.mask .zj_dialog').css('display','block');
                $('.mask .zj_dialog .zj_introduce').html(aText[index-1]);

            };

            var StartGame = function(ss){
                $("#random_box li").removeClass("active"); //取消选中
                random_num = ss; //中奖号码
                index=1; //下次抽奖,从1开始
                cycle=0;
                w_flag=false;
                var _end = parseInt(Math.random()*2) + 7;
                if(random_num>_end) {
                    EndIndex = random_num - _end; //开始变慢索引
                } else {
                    EndIndex = random_num + arr_length - _end; //开始变慢索引
                }
                Time = setInterval(Star,Speed);

            };
            var Star = function (num){
                //跑马灯变速
                if(w_flag==false){
                    //走3格开始加速
                    if(quick==5){
                        clearInterval(Time);
                        Speed=60;
                        Time=setInterval(Star,Speed);
                    }
                    //跑N圈减速
                    if(cycle==EndCycle+1 && index-1==EndIndex){
                        clearInterval(Time);
                        Speed=300;
                        w_flag=true;         //触发结束
                        Time=setInterval(Star,Speed);
                    }
                }

                if(index>arr_length){
                    index=1;
                    cycle++;
                }

                //结束转动并选中号码
                if(w_flag==true && index==parseInt(random_num)){
                    quick=0;
                    clearInterval(Time);
                    startFlag = false;

                    goback(index);
                }
                $("#random_"+index).addClass('active'); //设置当前选中样式
                if(index>1)
                    prevIndex=index-1;
                else{
                    prevIndex=arr_length;
                }
                $("#random_"+prevIndex).removeClass('active'); //取消上次选择样式
                index++;
                quick++;
            };


            StartGame(param_num);
        };
    }());
})