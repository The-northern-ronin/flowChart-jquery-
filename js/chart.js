/*专业潮流图页面*/
var json1 = [
	{"id":"DD","x":"10","y":"30","name":"调度计划"},
	{"id":"ZH","x":"170","y":"30","name":"综合技术"},
	{"id":"XT","x":"330","y":"30","name":"系统运行"},
	{"id":"JD","x":"10","y":"200","name":"继电保护"},
	{"id":"DK","x":"170","y":"200","name":"调控运行"},
	{"id":"SD","x":"330","y":"200","name":"水电新能源"},
	{"id":"ZD","x":"50","y":"350","name":"自动化"},
	{"id":"SB","x":"200","y":"350","name":"设备监控"}
]
var json2 = [
	{"start":"DD","end":"XT","id":"DDXT","color":"#b5e900","width":"2","state":"0"},
	{"start":"DD","end":"DK","id":"DDDK","color":"#b5e900","width":"2","state":"0"},
	{"start":"ZH","end":"DK","id":"ZHDK","color":"#b5e900","width":"2","state":"0"},
	{"start":"ZH","end":"DK","id":"ZHDK","color":"#ff3875","width":"2","state":"1"},
	{"start":"XT","end":"JD","id":"XTJD","color":"#00e9d6","width":"2","state":"0"},
	{"start":"XT","end":"JD","id":"XTJD","color":"#b5e900","width":"2","state":"1"},
	{"start":"JD","end":"DK","id":"XTJD","color":"#b5e900","width":"2","state":"1"},
	{"start":"DK","end":"ZD","id":"DKZD","color":"#00e063","width":"2","state":"1"},
	{"start":"ZD","end":"DK","id":"ZDDK","color":"#b5e900","width":"2","state":"1"},
	{"start":"SD","end":"JD","id":"SDJD","color":"#b5e900","width":"4","state":"1"},
	{"start":"SD","end":"ZD","id":"SDZD","color":"#b5e900","width":"4","state":"1"},
	{"start":"ZD","end":"SB","id":"ZDSB","color":"#b5e900","width":"4","state":"1"}
]
var lineDate = [];
var d_outG = d3.select('#d_svg').append('g').attr('class', 'd_outG');
var d_g = d_outG.selectAll('d_g')
				.data(json1)
				.enter()
				.append('g')
				.attr('class', 'd_g');
var d_rect = d_g.append('rect')
				.attr('class','d_rect')
				.attr('id',function(d){
					return d.id;
				})
				.attr('x',function(d){
					return d.x;
				})
				.attr('y',function(d){
					return d.y;
				})
				.attr('fill','rgba(0,255,255,.3)')
				.attr('stroke','#00e1e1')
				.attr('stroke-width','2')
				.attr('rx','6')
				.attr('ry','6');
var d_txt = d_g.append('text')
				.attr('class','d_txt')
				.attr('x',function(d){		
					return parseInt(d.x) + 68;
				})
				.attr('y',function(d){
					return parseInt(d.y) + 38;
				})
				.attr('font-size','22px')
				.attr('fill', '#e4ffff')
				.attr('text-anchor', 'middle')
				.attr('dominant-baseline', 'middle')
				.text(function(d){
					return d.name;
				});
for(var i in json2){
	var pathID = json2[i].id;
	var start = pathID.slice(0,2);
	var end = pathID.slice(2,4);
	var startbox = document.getElementById(start);
	var endbox = document.getElementById(end);
	var startx = parseInt($(startbox).attr('x'));
	var starty = parseInt($(startbox).attr('y'));
	var endx = parseInt($(endbox).attr('x'));
	var endy = parseInt($(endbox).attr('y'));
	document.getElementById(start).t=1;
	document.getElementById(start).b=1;
	document.getElementById(end).l=1;
	document.getElementById(end).r=1;
	if(startx < endx && starty < endy){
		var beginx = startx;
		var beginy = starty + 75;
		var centerx = startx;
		var centery = endy;
		var lastx = endx;
		var lasty = endy;
	}
	if(startx > endx && starty < endy){
		var beginx = startx;
		var beginy = starty;
		var centerx = startx;
		var centery = endy;
		var lastx = endx;
		var lasty = endy;
	}
	if(startx < endx && starty > endy){
		var beginx = startx;
		var beginy = starty;
		var centerx = startx;
		var centery = endy;
		var lastx = endx;
		var lasty = endy;
	}
	if(startx > endx && starty > endy){
		var beginx = startx;
		var beginy = starty;
		var centerx = startx;
		var centery = endy;
		var lastx = endx;
		var lasty = endy;
	}
	var d_line_color = json2[i].color;
	var d_line_width = json2[i].width;
	var d_line_state = json2[i].state;
	var d_line = {"path" : "M" + beginx + " " + beginy + "L" + centerx + " " + centery + "L" + lastx + " " + lasty,"color":d_line_color,"width":d_line_width,"state":d_line_state};
	lineDate.push(d_line);
}
var d_pathG = d_outG.append('g')
					.attr('class', 'd_pathG');
var d_path = d_pathG.selectAll('path')
					.data(lineDate)
					.enter()
					.append('path')
					.attr('d',function(d){
						return d.path;
					})
					.attr('fill','none')
					.attr('stroke',function(d){
						return d.width;
					})
					.attr('stroke',function(d){
						return d.color;
					});