$(function () {
    var PrizeData = null;
    var CurrentEl = null;
    var GlobalPhone = null;
    var FollowState = null;
    //图片资源		
    var imgPath = "springmoney/";
    var images = ["top.png","mk03@2x.png","mk04@2x.png","mk05@2x.png","mk06@2x.png","mk07@2x.png","mk01@2x.png","mk08@2x.png","mk02@2x.png","mk09@2x.png","roles.png","ticket_2b@2x.png","ticket_1y@2x.png","ticket_8y@2x.png","ticket_10y@2x.png","ticket_200y@2x.png"];
    //进度条
    var count = 0;
    downLoadImg(0);

    var WD = $(window).width()/3;
    $(".mix").css({'height': WD,'width': WD});
    //翻牌子
    $(".front,.back").on("click", function() {
        //初始动画
        var self = $(this);
        var parentNode = self.parent();
        parentNode.addClass("rrr");
        //奖品
        setTimeout(function(){
            parentNode.removeClass("rrr");
            //没有中奖
            if(false){
                self.addClass("used");
                self.children("img").attr("src", "springmoney/sorry@2x.png");
                return;
            }
            //缓存这个请求的结果
            PrizeData = {
                Type:"money",
                Text:"我是傻",
                errMsg:"我是2"
            };
            CurrentEl = self;
            
            var paizeImg = null;
            if(PrizeData["Type"] == "money"){
                //1元红包
                paizeImg = 'ticket_1y@2x.png';
            }else if(PrizeData["Type"] == "dis"){
                //饭票
                paizeImg = 'm1s1@2x.png';
            }
            self.children("img").attr("src", "springmoney/" +paizeImg);
            //中奖弹出层
            setTimeout(function(){
                var html;
                if(PrizeData["Type"] == "money"){
                    //1元红包
                    html = $("#tpl_red").html();
                }else if(PrizeData["Type"] == "dis"){
                    //饭票
                    html = tplSetData({
                        msg:PrizeData['errMsg'],
                        dis:PrizeData['Text'],
                        time:PrizeData['Date']
                    },"tpl_ticket");
                }
                $(".mask").show().html(html);
            },200);
        },2000);
    });
    //去兑换
    $("body").on("click",'.exchange',function(){
        var html;
        if(GlobalPhone == ""){
            html = $("#tpl_bindphone").html();
            //渲染
            $(".mask").html(html);
        }else{
            //已绑定
            var html = "";
            var img = "result_ticket";
            if(FollowState == 1){
                html = tplSetData({
                    img:img,
                    text:data.errMsg
                },"tpl_success");
            }else{
                html = tplSetData({
                    img:img,
                    text:data.errMsg
                },"tpl_success_new");
            }
            $(".mask").html(html);   
        }
    });
    //发送短信
    var time = 30;
    var Timmer = null;
    $("body").on("click",".timer",function(){
        //验证手机号
        var phone = $(".checkPhone input").val();
        var reg = /^1((3|5|7|8){1}\d{1})\d{8}$/;
        if(reg.test(phone) == false){
            $("#bindphone .error_info").html("输入正确的手机号撒！");
            return;
        }
        $(".timer").addClass("timer_active");
        Timmer = setInterval(function(){
            if(time == 0){
                window.clearInterval(Timmer);
                //复原倒计时
                $(".timer").text("重新发送");
                time = 30;
                $(".timer").removeClass("timer_active");
                return;
            }
            $(".timer").text(time+"s");
            time--;
        },1000);
    });
    //检测长度
    $("body").on("input propertychange",".checkPhone input,.checkNumber input",function(){
        var checkPhone = $(".checkPhone input").val()||0;
        var checkNumber = $(".checkNumber input").val()||0;
        if(checkPhone.length == 11 && checkNumber.length == 4){
            $(".phone_finish").removeClass("btn_gray");
            $(".next").removeClass("btn_gray");
        }else{
            $(".phone_finish").addClass("btn_gray");
            $(".next").addClass("btn_gray");
        }
        $("#bindphone .error_info").html("");
    });
    //绑定手机号
    $("body").on("click",".phone_finish",function(){
        var checkPhone = $(".checkPhone input").val()||0;
        var checkNumber = $(".checkNumber input").val()||0;
        if(checkPhone < 11&&checkNumber < 4){ return;}
        //发起绑定请求
        console.log("绑定成功");
    });
    //放弃领取
    $("body").on("click",".btn_black",function(){
        //已绑定 
        CurrentEl.children("img").attr("src", "springmoney/giveup.png");
        $(".mask").hide();
    });
    //btn_default
    $("body").on("click",".btn_default,.my_x",function(){
        $(".mask").hide().html("");
    });
    
    // 图片加载进度函数
    function downLoadImg(index) {
        var img = new Image();
        img.src = imgPath + images[index];
        img.onload = function () {
            if (index == images.length - 1) {
                $(".loading").hide();
                animateMove();
                return;
            }
            count = index + 1;
            downLoadImg(count);
        };
        img.onerror = function (e) {
            console.log(e);
        };
    }
    // 波浪动画
    function animateMove(){
        var items = $(".front");
        for (var i = 0; i < items.length; i++) {
            var timer = "timer" + i;
            (function (j) {
                timer = setTimeout(function () {
                    $(items[j]).toggleClass("flip");
                    $(items[j]).siblings().toggleClass("flip");
                }, j * 50);
            })(i);
        }
    }
    //填充模版
    function tplSetData(model,id){
        var reg = new RegExp("{(\\w+)}", "ig");
        var html = $("#"+id).html();
        html = html.replace(reg, function (text, key) { return model[key] });
        return html;
    }
})