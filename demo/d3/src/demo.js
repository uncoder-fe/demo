/**
 * 这是一个demo
 */
const timeData = (minutes, sec) => {
	return [
		{
			"unit": "seconds",
			"numeric": sec
		}, {
			"unit": "minutes",
			"numeric": minutes
		}
	];
};
let timer;
const startTimer = (e) => {
  	// Main program
	if (isNaN(e.target.valueAsNumber)) {
	  clearInterval(timer);
	  clockGroup.selectAll(".clockhand").remove();
	  return;
	};
	clearInterval(timer);
	let data;
	let timeAsSec = e.target.valueAsNumber * 60;
	let sec = 0;
	timer = setInterval(() => {
		data = timeData(timeAsSec / 60, sec);
		sec = sec + 1;
		timeAsSec = timeAsSec - 1;
		// render()
		render(data);
		if (timeAsSec === 0) {
			clearInterval(timer);
	  	}
	}, 1000);
};

let timeInput = document.querySelector('#time');
timeInput.addEventListener("change", startTimer);

// 定义图形数据
let width = 500;
let height = 500;
let offSetX = 150;
let offSetY = 200;
let pi = Math.PI;

// 定义比例尺
// domain输入范围，range输出范围
let scaleSecs = d3.scaleLinear().domain([0, 59 + 999 / 1000]).range([0, 2 * pi]);
let scaleMins = d3.scaleLinear().domain([0, 59 + 59 / 60]).range([0, 2 * pi]);
// 定义一个svg标签
let vis = d3.selectAll(".chart")
			.append("svg:svg")
			.attr("width", width)
			.attr("height", height);
// 定义一个g容器
let clockGroup = vis.append("svg:g").attr("transform", "translate(" + offSetX + "," + offSetY + ")");
// 在容器里插入两个圆
clockGroup.append("svg:circle")
			.attr("r", 80).attr("fill", "none")
			.attr("class", "clock outercircle")
			.attr("stroke", "black")
			.attr("stroke-width", 2);

clockGroup.append("svg:circle")
		.attr("r", 4)
		.attr("fill", "black")
		.attr("class", "clock innercircle");
// 定义一个指针
const render = (data) => {
	let minuteArc,secondArc;
	clockGroup.selectAll('.clockhand').remove();
	secondArc = d3.arc()
					.innerRadius(0)
					.outerRadius(70)
					.startAngle((d)=>{
						return scaleSecs(d.numeric);
					})
					.endAngle((d)=>{
						return scaleSecs(d.numeric);
					})
	minuteArc = d3.arc()
					.innerRadius(0)
					.outerRadius(80)
					.startAngle((d)=>{
						return 0;
					})
					.endAngle((d)=>{
						return scaleMins(d.numeric);
					})
	clockGroup.selectAll(".clockhand")
				.data(data)
				.enter()
				.append('svg:path')
				.attr('d',(d)=>{
					if(d.unit == 'seconds'){
						return secondArc(d);
					}else if(d.unit == 'minutes'){
						return minuteArc(d);
					}
				})
				.attr('class','clockhand')
				.attr('stroke',(d)=>{
					if (d.unit === "seconds") {
						return "black";
					} else if (d.unit === "minutes") {
						return "blue";
					}
				})
				.attr("stroke-width", (d) => {
					if (d.unit === "seconds") {
						return 2;
					} else if (d.unit === "minutes") {
						return 3;
					}
				})
				.attr("fill", "red")
				.attr("opacity", "0.8");
}