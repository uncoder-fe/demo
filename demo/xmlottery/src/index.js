
var TT = null;
var rollstatus = false;
var btnEl = document.querySelector(".btn-status");
var shareEl = document.querySelector(".share-btn");

// 抽奖按钮事件监听
btnEl.addEventListener("click",function(){
	resetResult();
	if(!rollstatus){
		TT = window.setInterval(function(){
			rollstatus = true;
			rollUp('.rollup1');rollUp('.rollup2');rollUp('.rollup3');
			rollUp('.rollup4');rollUp('.rollup5');rollUp('.rollup6');
		},200);	
	}	
	// 发起抽奖请求
	setTimeout(function(){
		// 显示数字列表
		// showNumberList(data['code'],data['count']+1);
		// 设置抽奖结果
		setReusult([1,3,5,6,0,9]);
	},3000);
},false);

/**
 * 设置抽奖结果
 */
function setReusult (arry){
	// 关闭定时器，并修改滚动状态status
	window.clearInterval(TT);
	rollstatus = false;
	var arry = arry;
	var changeEl = document.querySelector(".question");
		if(changeEl == null){ return;}
		changeEl.className = 'number gain';
		changeEl.innerHTML = '';
	for(var i=0;i<6;i++){
		var el = document.querySelector(".rollup"+(i+1)+" .real-mask");
			el.style.display = "block";
			el.innerHTML = arry[i];
		// 创建新的span
		var spanEl = document.createElement('span');
			spanEl.innerHTML = arry[i];
		changeEl.appendChild(spanEl);
	}	
}
/**
 * 隐藏抽奖结果
 */
function resetResult(){
	for(var i=1;i<=6;i++){
		var el = document.querySelector(".rollup"+(i)+" .real-mask");
			el.style.display = "none";
	}
}
/**
 * 滚动效果，dom结构遵守上面的写法
 */
function rollUp(el){
	var Timmer = null;
	var scrollEl = document.querySelector(el+" ul");
	var els = document.querySelectorAll(el+" li");
	for(var i=0;i<els.length;i++){
		els[i].style.top = '-50px';
		els[i].style.transition = "top ease-in-out 50ms";
	}
	// 有序滚动
	// var index = parseFloat(scrollEl.dataset['value']);
	// scrollEl.dataset['value'] = index+1;
	// 乱序滚动
	var index = Math.floor(Math.random()*9);
	if(index >= 9){ index = 1};
	window.clearTimeout(Timmer);
	Timmer = window.setTimeout(function(){
		els[1].style.transition = "";
		els[1].style.top = "0px";
		scrollEl.removeChild(els[0]);
		var el = document.createElement('li');
			el.innerHTML = index+1;
		scrollEl.appendChild(el);
	},50);
}