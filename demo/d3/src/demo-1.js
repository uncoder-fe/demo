let data = [20,30,40,50,60,90];
/**
 * 图表解析
 */
// 首先我们需要一个比例尺，格式化数据
let scaleX = d3.scaleLinear().domain([0,10]).range([0,300]);
let scaleY = d3.scaleLinear().domain([100,0]).range([0,200]);
// 然后新建一个svg元素
const svg = d3.select('.chart')
			.append('svg:svg')
			.attr('height',500)
			.attr('width',500);
// 然后新建一个g元素
const gg = svg.append('svg:g').attr('transform','translate(50,50)');
// 创建一个x轴
gg.append("g").attr('transform','translate(0,200)').call(d3.axisBottom(scaleX));
// 创建一个y轴
gg.append("g").attr('transform','translate(0,0)').call(d3.axisLeft(scaleY));

data.forEach(function(item,index){
	console.log(scaleX(index),scaleY(item))
	gg.selectAll('.bar')
		.data(data)
		.enter()
		.append('rect')
		.attr('x',scaleX(index+1)-5)
		.attr('y',scaleY(item))
		.attr('height',200-scaleY(item))
		.attr("width", 10)
		.attr("fill", "aqua")
		.on("click", function() {
			console.log(this)
		});
})
