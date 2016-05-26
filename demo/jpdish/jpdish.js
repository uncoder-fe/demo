"use strict";
window.addEventListener("DOMContentLoaded", function() {
	//全局设定
	var shake_Timer = null;
	var SHAKE_THRESHOLD = 3500; //定义一个摇动的阈值速度
	var last_update = new Date().getTime(); //定义一个变量记录上一次摇动的时间
	//定义x、y、z记录三个轴的数据以及上一次触发的时间
	var x = 0,
		y = 0,
		z = 0,
		last_x = 0,
		last_y = 0,
		last_z = 0;

	//图片资源		
	var host = "jpdish/";
	var images = ["bg.png","food.png","man_right.png","roles.png","btn_default.png","food1.png","man_walk.png","shake_wobble.png","btn_end.png","food2.png","mask_bg.png","sunshine.png","btn_two.png","food3.png","result_fail.png","title.png","cliff.png","food4.png","result_food.png","water.png","fishLeft_fly.png","food_down.png","result_red.jpg","fishRight_fly.png","horn.png","role_bg.png","fish_fly.png","man_left.png","role_colse.png"];
	//声音资源
	var shake_sound = document.querySelector("#shake_sound");
	var ding_sound = document.querySelector("#ding_sound");

	//进度条
	var count = 0;
	var process = "0%";
	downLoadImg(0);

	//规则展示触发
	$(".role").on("click", function() {
		$(".wrap_up").addClass("move");
	});
	//隐藏规则
	$(".role_close img").on("click", function(e) {
		$("#wrap_up").removeClass("move");
		e.stopPropagation();
	});
	//摇晃监听
	if($('#noList').length == 0){
		window.addEventListener("devicemotion", deviceMotionHandler, false);
	}
	// 首次动画结束
	$(".shake_wobble").on("animationend webkitAnimationEnd", function() {
		setOpacity(1);
		$(".bg").removeClass("active");
		$(".man_walk").css("opacity", 1);
		$(".man_walk").removeClass("man_walk_move");
	});
	// 抽奖过渡动画
	$(".man_right").on("animationend webkitAnimationEnd", function() {
		$(".mask_bg").removeClass("active").hide();
		$(".food_bg").show().addClass("active");
	});

	$(".food_show").on("animationend webkitAnimationEnd",function(e){
		setTimeout(function() {
			//结果data
			var data = Math.floor(Math.random()*5);	
			// 播放中奖声音
			ding_sound.play();
			//隐藏所有结果
			var elps = $('.result_ctn').children();
			for(var i=0;i<elps.length;i++){
				$(elps[i]).hide();
			}
			//更改为默认按钮样式
			$('.result_btn a').removeClass().addClass("btn_default");
			if (data == 0) {
				//没中
				$('.fail').show();
				$('.fail p').html("没中");
			}else if (data == 1){
				//券
				$('#quan').html("中券咯");
				//文案
				$('#money').html('仅限消费满25元使用，');
				$('.success_red').show();
			}else if(data == 2){
				//料
				$('.success_food').show();
			}else if(data == 3){
				//3次
				$('.fail').show();
				$('.fail p').html("抽了3次咯");
				$('.result_btn a').removeClass().addClass("btn_two");
			}else if(data == 4){
				//5次
				$('.fail').show();
				$('.fail p').html("奖没了");
				$('.result_btn a').removeClass().addClass("btn_end");
			}
			$(".food_bg").removeClass("active").hide();
			$(".result").show();
		}, 1500);
	});
	// 返回首页
	$(".result_btn a").on("click", function() {
		resetState();
	});
	// 设置元素透明度
	function setOpacity(op) {
		var els = [".fish_fly", ".food_down", ".fishLeft_fly", ".fishRight_fly", ".shake_wobble"];
		for (var i = 0; i < els.length; i++) {
			$(els[i]).css("opacity", op);
		}
	}
	// 复原抽奖状态
	function resetState() {
		shake_Timer = null;
		$(".mask").hide();
		$(".mask_bg").removeClass("active").hide();
		$(".food_bg").removeClass("active").hide();
		$(".result").removeClass("active").hide();
		setOpacity(1);
		$(".man_walk").removeClass("man_walk_piu");
	}
	// 随机文字数据
	$(".text").html("师小强中大奖了.....");
	// 摇晃回调
	function deviceMotionHandler(eventData) {
		var acceleration = eventData.accelerationIncludingGravity;
		var curTime = new Date().getTime(); //获取当前时间戳
		var diffTime = curTime - last_update;
		if (diffTime > 100) {
			last_update = curTime; //记录上一次摇动的时间
			x = acceleration.x; //获取加速度X方向
			y = acceleration.y; //获取加速度Y方向
			z = acceleration.z; //获取加速度垂直方向
			var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000; //计算阈值
			if (speed > SHAKE_THRESHOLD) {
				//播放声音
				shake_sound.play();
				resetState();
				setOpacity(0);
				$(".man_walk").addClass("man_walk_piu");
				shake_Timer = setTimeout(function() {
					$(".mask").show();
					$(".mask_bg").show().addClass("active");
				}, 1200);
			}
		}
		//记录上一次加速度
		last_x = x;
		last_y = y;
		last_z = z;
	}
	// 图片加载进度函数
	function downLoadImg(index) {
		$(".load_bg span").html(process);
		var img = new Image();
		img.src = host + images[index];
		img.onload = function() {
			if (index == images.length - 1) {
				process = "100%";
				$(".loadding").remove();
				$(".bg").addClass("active");
				return;
			}
			process = ((index / images.length) * 100).toFixed(0) + "%";
			$(".load_bg span").html(process);
			count = index + 1;
			downLoadImg(count);
		};
		img.onerror = function(e) {
			// count = index + 1;
			// downLoadImg(count);
			console.log(e);
		};
	}
});