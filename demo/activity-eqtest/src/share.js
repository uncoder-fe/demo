window.addEventListener('load', function() {
	// 预渲染自定义字体
	$('.preloadfont').innerHTML = $('#preloadfont').innerHTML;
	// 开始制作图片
	window.imgTextArry = imgText('水瓶', 1);
	setTimeout(function() {
		var src = canvasImg();
		var img = new Image();
		img.src = src;
		img.className = 'canvas-img';
		$('.my-canvas').appendChild(img);
	}, 500);
});

/**
 * 做图
 */
function canvasImg() {
	var canvasWidth = 600;
	var canvasHeight = 700;
	var canvas = document.createElement('canvas');
	canvas.setAttribute('height', canvasHeight);
	canvas.setAttribute('width', canvasWidth);
	var ctx = canvas.getContext('2d');
	// 白色背景
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = 'white';
	ctx.fillRect(0, 0, canvasWidth, canvasHeight);
	ctx.closePath();
	ctx.restore();
	// 黑色背景
	ctx.save();
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 150, 600, 415);
	ctx.drawImage(canvasBg, 0, 150, 600, 415);
	ctx.drawImage(lineBg, 0, 140, canvasWidth, 10);
	ctx.restore();
	// 姓名背景
	ctx.drawImage(nameBg, 160, 5, 255, 70);
	// 姓名
	ctx.save();
	ctx.beginPath();
	ctx.font = '30px inhert';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText('小傻师哥', 310, 53);
	ctx.restore();
	// 分数
	ctx.font = '30px inhert';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText('情商得分:', 245, 120);
	ctx.restore();
	ctx.font = '45px inhert';
	ctx.fillStyle = '#ffa800';
	ctx.fillText(90, 340, 122);
	ctx.restore();
	ctx.font = '30px inhert';
	ctx.fillStyle = 'black';
	ctx.fillText('分', 395, 120);
	ctx.closePath();
	// 标签list
	var colors = sortRandom(Colors).slice(0, 10);
	for (var i = 0; i < imgTextArry.length; i++) {
		drawList(imgTextArry, ctx, i, colors[i]);
	}
	ctx.drawImage(lineBg, 0, 550, canvasWidth, 10);
	// 二维码
	ctx.drawImage(ermImg, 30, 570, 120, 120);
	// 二维码文案
	ctx.save();
	ctx.beginPath();
	ctx.font = '25px inhert';
	ctx.textAlign = 'center';
	ctx.fillStyle = 'black';
	ctx.fillText('长按识别二维码，测测你的情商', 350, 620);
	ctx.fillText('学习娱乐两不误', 350, 660);
	ctx.restore();
	// canvas导出图片
	var fullQuality = canvas.toDataURL('image/png', 1.0);
	return fullQuality;
}
/**
 * 生成标签列表
 */
function drawList(data, ctx, i, color) {
	// column决定列 row决定行数
	var row, column, float, x, y, font, rotate;
	// 默认值
	row = Math.round((i + 1) / 2);
	column = Math.round(i % 2) + 1;
	float = Math.floor(Math.random() * 50) > 20 ? -1 : 1;
	font = 30;
	x = 160;
	y = 70;
	// 随机值
	if (column != 1) {
		x = 2.8 * x;
	}
	if (data[i].length > 4) {
		x = x + Math.floor(Math.random() * 20) + 5;
		if (i == 1 || i == 5 || i == 9) {
			rotate = float * Math.floor(Math.random() * 3) * Math.PI / 180;
		}
	} else {
		x = x - Math.floor(Math.random() * 20) - 10;
		if (i == 0 || i == 4 || i == 8) {
			rotate = float * Math.floor(Math.random() * 6) * Math.PI / 180;
		}
	}
	y = 155 + y * row;
	if (data[i].length >= 5) {
		font = Math.floor(Math.random() * 10 + 28);
	} else {
		font = Math.floor(Math.random() * 15 + 40);
	}
	ctx.save();
	// 旋转
	ctx.rotate(rotate);
	ctx.beginPath();
	ctx.font = font + 'px myfont';
	ctx.textAlign = 'center';
	ctx.fillStyle = color;
	ctx.fillText(data[i], x, y);
	ctx.closePath();
	ctx.restore();
}

/**
 * 根据星座和分数获取图片内容
 */
function imgText(name, number) {
	var arry1 = [],
		arry2 = [];
	for (var i = 0; i < Constellations.length; i++) {
		if (name == Constellations[i]['name']) {
			arry1 = sortRandom(Constellations[i]['words']).slice(0, 8);
		}
	}
	if (number < 90) {
		arry2 = Numbers[0];
	} else if (number >= 90 && number < 129) {
		arry2 = Numbers[1];
	} else if (number >= 129 && number < 150) {
		arry2 = Numbers[2];
	} else if (number >= 150) {
		arry2 = Numbers[3];
	}
	arry2 = sortRandom(arry2).slice(0, 2);
	var data = arry1.concat(arry2);
	return data;
}
// 洗牌
function sortRandom(arry) {
	var input = arry;
	for (var i = input.length - 1; i >= 0; i--) {
		var randomIndex = Math.floor(Math.random() * (i + 1));
		var itemAtIndex = input[randomIndex];
		input[randomIndex] = input[i];
		input[i] = itemAtIndex;
	}
	return input;
}