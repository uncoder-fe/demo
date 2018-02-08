;(function(window){
	let canvas = document.querySelector('#init-canvas');
	let ctx = canvas.getContext('2d');
	let historyLineArry = [];
	let tempArry = [];
	let lastX,lastY;
	// 背景图
	let tipImage = new Image();
	tipImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAABfCAMAAAD/CIooAAABWVBMVEUAAACWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6qWq6r////5+/77/P3////////t9f/////////////4+v33+//////////////w9v3////9/v/////+///+///3+//////////////t9f/+///////2+f35+/3////7/f/9/v/////v9v/w9//9/v/////////+///////////+///t9f/////8/v/t9f/3+//////////h5+/z+P/+///t9f/+///////+///////////////8/v/////////////6/f/9/v/9/v/////y9fvq8Pf5/P/g5u/9/v/8/v/8/v/n7ff////k6vLg5u/5/P/t9P/t9f/g5u/t9P/g5u/g5u/l7PXm6/Pt9f/t9P/g5u+Wq6rt9f/5/P/////g5u/7/f/4/P/x9//o7/lNTH66AAAAanRSTlMAQH+/EO/PIDBgn3DfUK+P/QgEz/v48961Av5KLBkS6MxNLgv58NfHpn9EOjIkFQ758uvFpqOfl4t1cm1mQT02Hvzy5tevkodiXVMi9eypkllWKPn17tnUvbqEaPHr5OPZ087FsKaYiV8hZh3SlgAACPRJREFUeNrMl2mO2zAMhUXtu+757n+AQgusJKbiDtAWfT8GAycx+VHcJBhREP+tHIm/LaAIaorEv5UTv6GMKA5qUvxAmpKMWjCyyABQeCdVFH9cvkhlkLX4pqBC9+3ET4Cf3teHg6PQlEFX+IQbfnRVOloRU74l/YAlyxM4kYwKU1Z8VQW00BZIJ8eGywpAuwc4y3HkslpM5dzj9S6DqeaORANfh2gA+Ac2gA2Ql11RKYNLNoaHYKbBpyvgv+GLwEUoATJmDBnVAvU6UvfSykoOQq+P+Cnmbwmi/ZtHd2mDV2XVEoln0UrWiHrEnwq53Gp22aqS3I7mbAL6FqmWGRutqn1gNZ0SRME94GPKqigL/aQlS0FSi0QH/F678vBCCytfQb1BXDWF+IJCyQLg82dJfa1pu3/K44sCNP/5qD3iG2QDnKJegAzg9AWF9hkOvfABE3YMuyzT1Wh8gEc/JdoDPgHyFjN1z7Y+fMp0xKdqRuQ9N8NI1omeo0Hg8btJue3GuAh1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';
	tipImage.onload = function(){
		ctx.drawImage(tipImage,120,210,250,100);
	};
	let clearStatus = true;
	canvas.addEventListener('touchstart',function(event){
		if(clearStatus){ 
			ctx.clearRect(0,0,500,500);
			clearStatus = false;
		}
		let point = getCanvasPoint.call(this,event);
		lastX = point.x;
		lastY = point.y;
		pen(point.x,point.y);
		event.preventDefault();
	});
	canvas.addEventListener('touchmove',function(event){
		let point = getCanvasPoint.call(this,event);
		pen(point.x,point.y);
		lastX = point.x;
		lastY = point.y;
		event.preventDefault();
	});
	canvas.addEventListener('touchend',function(){
		historyLineArry.push(tempArry);
	});
	// 生成
	$('#generate').on('click',function(){
		if(historyLineArry.length <= 0){ 
			Toast('童鞋，你还未书写哦');
			return;
		}
		setTimeout(function(){
			$('.init-page').hide();
			$('.result-page').show().css({"display":'inline-block'});
			window.scrollTo(0,0);
			// 设置结果
			$('.number p:last-child').html(100);
			redraw(historyLineArry);
		},2000)
	});
	// 清空
	$('.garbage').on('click',function(){
		clearRect();
	});
	// 再来一次
	$('#repeat').on('click',function(){
		clearRect();
		$('.init-page').show().css({"display":'inline-block'});
		$('.result-page').hide();
		window.scrollTo(0,0);
	});
	/**
	 * 粉笔
	 */
	function pen(x,y){
		ctx.beginPath();
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 5;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		ctx.moveTo(lastX,lastY);
		ctx.lineTo(x,y);
		//console.log('起始点',lastX,lastY);
		//console.log('结束点',x,y);
		if(x>0&&x<500&&y>0&&y<500){
			tempArry.push(lastX.toFixed(3)+'-'+lastY.toFixed(3)+'-'+x.toFixed(3)+'-'+y.toFixed(3));
			ctx.stroke();
		}
	}
	/**
	 * 重画
	 */
	async function redraw(data){
		let canvas = document.querySelector('#result-canvas');
		let ctx = canvas.getContext('2d');
		ctx.clearRect(0,0,500,500);
		ctx.strokeStyle = 'white';
		ctx.lineWidth = 10;
		ctx.lineJoin = 'round';
		ctx.lineCap = 'round';
		for(let i=0;i<data.length;i++){
			await new Promise((resolve, reject) => {
				_animateType(ctx, data[i], resolve);
			});
		}
	}
	/**
	 * 动画
	 */
	function _animateType(ctx,data){
		// 拷贝一份数据
		let arry = [];
		for(let i=0;i<data.length;i++){
			arry.push(data[i]);
		}
		let oldTime = Date.now();
		let rafid = window.requestAnimationFrame(step);
		function step(){
			let newTime = Date.now();
			if(arry.length == 0){
				window.cancelAnimationFrame(rafid);
				resolve('next');
			}else if(newTime - oldTime > 15 && arry.length > 0){
				oldTime = newTime;
				let points = arry.shift().split('-');
				ctx.beginPath();
				ctx.moveTo(parseFloat(points[2]),parseFloat(points[3]));
				ctx.lineTo(parseFloat(points[0]),parseFloat(points[1]));
				ctx.closePath();
				ctx.stroke();
				rafid = window.requestAnimationFrame(step);
			}else{
				rafid = window.requestAnimationFrame(step);
			}
		}
	}
	/**
	 * 清空画布
	 */
	function clearRect(){
		tempArry = [];
		historyLineArry = [];
		ctx.clearRect(0,0,500,500);
	}
	/**
	 * 获取canvas坐标系中的点击位置
	 */
	function getCanvasPoint(event){
		// 获取父级
		let parentNode = this.parentNode.parentNode;
		// 视窗偏移量
		let offsetLeft = this.offsetLeft+parentNode.offsetLeft;
		let offsetTop = this.offsetTop+parentNode.offsetTop;
		// canvas缩放后的尺寸
		let offsetHeight = this.offsetHeight;
		let offsetWidth = this.offsetWidth;
		// 触摸位置
		let eventX = event.changedTouches[0].pageX;
		let eventY = event.changedTouches[0].pageY;
		// 相对位置
		let canvasPointX = ((eventX-offsetLeft)/offsetWidth)*500;
		let canvasPointY = ((eventY-offsetTop)/offsetHeight)*500;
		return {x:canvasPointX,y:canvasPointY}
	}
})(window);
