var msgData = [
				{"name":"01世界你好","id":"node0","filtnumber":"39","haschild":"0","children":""},
				{"name":"02世界你好","id":"node1","filtnumber":"39","haschild":"0","children":""},
				{"name":"node1","id":"node2","filtnumber":"39","haschild":"1",
					"children":[
						{"childrenname":"世界你好","childrenid":"childnode1","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode2","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode3","childrenfiltnumber":"39","childrenhaschild":"0","children":""}
					]
				},
				{"name":"03调度预告","id":"node3","filtnumber":"39","haschild":"1",
					"children":[
						{"childrenname":"世界你好","childrenid":"childnode4","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode5","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode6","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode10","childrenfiltnumber":"39","childrenhaschild":"0","children":""}
					]
				},
				{"name":"04世界你好","id":"node4","filtnumber":"39","haschild":"0","children":""},
				{"name":"06世界你好","id":"node5","filtnumber":"39","haschild":"0","children":""},
				{"name":"世界你好","id":"node6","filtnumber":"39","haschild":"0","children":""},
				{"name":"07世界你好","id":"node7","filtnumber":"39","haschild":"0","children":""}
];
var msgverticalData = [
				{"name":"05世界你好","id":"node8","intervalNode":"node4","filtnumber":"39","haschild":"1",
				"children":
						[
						{"childrenname":"世界你好","childrenid":"childnode10","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode11","childrenfiltnumber":"39","childrenhaschild":"0","children":""},
						{"childrenname":"世界你好","childrenid":"childnode12","childrenfiltnumber":"39","childrenhaschild":"0","children":""}
					]
				}
]
var pathmsg = [
			{"sourceId":"node0","targetId":"node1","id":"path1","state":"0"},
			{"sourceId":"node1","targetId":"node2","id":"path2","state":"0"},
			{"sourceId":"node2","targetId":"node3","id":"path3","state":"0"},
			{"sourceId":"node3","targetId":"node4","id":"path4","state":"0"},
			{"sourceId":"node4","targetId":"node5","id":"path5","state":"0"},
			{"sourceId":"node5","targetId":"node6","id":"path6","state":"0"},
			{"sourceId":"node6","targetId":"node7","id":"path7","state":"0"},
			{"sourceId":"node4","targetId":"node8","id":"path8","state":"1"}
]
var rectDatamsg = [];
var verticalData = [];
var pathDatamsg = [];
var zoom = d3.behavior.zoom()
            .scaleExtent([0.3, 2])  
            .on("zoom", zoomed);
function zoomed() {
    d3.select(".outG").attr("transform",   
        "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
}
function drawRect(rectDatamsg,verticalData){
	var intervalLength = 100;
	var rectNumber = rectDatamsg.length;
	var verticalrectNumber = verticalData.length;
	var W = $(".d_top").width();
	var H = $(".d_top").height();
	$("#svgBox").css("width",W);
	$("#svgBox").css("height",H);
	var verticalLength = H/3 - 40;
	var rectData = [];
	var verticalrectData =[];
	//横向
	for(i in rectDatamsg){
		var x;
		var y;
		var rect;
		var rectHaschild = rectDatamsg[i].haschild;
		x = i*150 + (parseInt(i)+1)*intervalLength + 100;
		if(rectHaschild == "0"){
			var rectName = rectDatamsg[i].name;
			var rectId = rectDatamsg[i].id;
			var rectFiltnumber = rectDatamsg[i].filtnumber;
			var rectHaschild = rectDatamsg[i].haschild;
			var rectChildren = rectDatamsg[i].children;
			y = verticalLength;
			rect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
		}
		if(rectHaschild == "1"){
			y  = verticalLength;
			var rectName = rectDatamsg[i].name;
			var rectId = rectDatamsg[i].id;
			var rectFiltnumber = rectDatamsg[i].filtnumber;
			var rectHaschild = rectDatamsg[i].haschild;
			var rectChildren = rectDatamsg[i].children;
			rect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
			var rectChildmsg = rect.children;
			console.log(rectChildmsg);
			for (var j = 0; j < rectChildmsg.length; j++) {
				var rectchildName = rectChildmsg[j].childrenname;
				var rectchildId = rectChildmsg[j].childrenid;
				var rectchildFiltnumber = rectChildmsg[j].childrenfiltnumber;
				var rectHaschild = rectChildmsg[j].childrenhaschild;
				var rectChildren = rectChildmsg[j].children;
				var rectChildrenNumber = rectChildmsg.length;
				var firstY = y - (80*rectChildrenNumber + 20*(rectChildrenNumber - 1))/2 + 40;
				var Y = firstY + (j*100);
				var rectchild = {"name" : rectchildName,"id":rectchildId,"x":x,"y": Y,"filtnumber":rectchildFiltnumber,"haschild": rectHaschild,"children":rectChildren}
				console.log(rectchild);
				rectChildmsg[j] = rectchild;
			}
		}
		rectData.push(rect);
	}
	var svgBox = d3.select("#svgBox").call(zoom);
	var outG = svgBox.append("g").attr("class","outG");
	var rectG = outG.selectAll(".rectG")
				.data(rectData)
				.enter()
				.append("g")
				.attr("class","rectG")
				.attr("id",function(d){
								return d.id;
							})
				.attr("haschild",function(d){
					return d.haschild;
				})
				.each(function(d){
					if(d.haschild == "0"){
						d3.select(this)
							.append("rect")
							.attr("class","rect")
							.attr("fill","#008A85")
							.attr("stroke-width","3")
							.attr("stroke","#00C5C4")
							.attr("x",function(d){
								return d.x;
							})
							.attr("y",function(d){
								return d.y;      
							})
						d3.select(this)
								.append("text")
								.attr("class","text")
								.attr("x",function(d){
									return parseInt(d.x) + 75;
								})
								.attr("y",function(d){
									return parseInt(d.y) + 40;
								})
								.text(function(d){
									return d.name;
								})
					}
					if(d.haschild == "1"){
						var rectChildG = d3.select(this);
						rectChildG.selectAll(".childRect")
								  .data(d.children)
								  .enter()
								  .append("rect")
								  .attr("class","childRect")
								  .attr("stroke-width","3")
								  .attr("stroke","#00C5C4")
								  .attr("fill","#008A85")
								  .attr("x",function(d){
									return d.x;
									})
								  .attr("y",function(d){
									return d.y;
									})
								  .attr("id",function(d){
								  	return d.id;
								  })
						rectChildG.append("rect")
								  .attr("class","bgrect")
								  .attr("width","190px")
								  .attr("height",function(d){
								  		var childRectNumber = d.children.length;
								  		var bgrectH = childRectNumber*80 + (childRectNumber - 1)*20 + 40;
								  		return bgrectH;
								  })
								  .attr("x",function(d){
								  	var childRectX = d.children[0].x;
								  	var bgrectX = childRectX - 20;
								  	return bgrectX;
								  })
								  .attr("y",function(d){
								  	var childRectY = d.children[0].y;
								  	var bgrectY = childRectY - 20;
								  	return bgrectY;
								  })
								  .attr("fill","none")
								  .attr("stroke-width","3")
								  .attr("stroke","#00C5C4")
						rectChildG.selectAll(".text")
								.data(d.children)
								.enter()
								.append("text")
								.attr("class","text")
								.attr("x",function(d){
									return parseInt(d.x) + 75;
								})
								.attr("y",function(d){
									return parseInt(d.y) + 40;
								})
								.text(function(d){
									return d.name;
								})
					}
				})
	//纵向
	for(k in verticalData){
		var x;
		var y;
		var verticalrect;
		var verticalHaschild = verticalData[k].haschild;
		var intervalNodeId = verticalData[k].intervalNode;
		var intervalNodeHaschild = $("#" + intervalNodeId).attr("haschild");
		if(intervalNodeHaschild == 0){
			if(verticalHaschild == "0"){
			var rectName = verticalData[k].name;
			var rectId = verticalData[k].id;
			var rectFiltnumber = verticalData[k].filtnumber;
			var rectHaschild = verticalData[k].haschild;
			var rectChildren = verticalData[k].children;
			x = $("#" + intervalNodeId).find(".rect").attr("x");
			var intervalNodeY = $("#" + intervalNodeId).find(".rect:last-child").attr("y");
			y = parseInt(intervalNodeY) + 180;
			verticalrect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
		}
		if(verticalHaschild == "1"){
			x = $("#" + intervalNodeId).find(".rect").attr("x");
			y  = verticalLength;
			var rectName = verticalData[k].name;
			var rectId = verticalData[k].id;
			var rectFiltnumber = verticalData[k].filtnumber;
			var rectHaschild = verticalData[k].haschild;
			var rectChildren = verticalData[k].children;
			verticalrect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
			var verticalrectChildmsg = verticalrect.children;
			console.log(rectChildmsg);
			for (var j = 0; j < verticalrectChildmsg.length; j++) {
				var rectchildName = verticalrectChildmsg[j].childrenname;
				var rectchildId = verticalrectChildmsg[j].childrenid;
				var rectchildFiltnumber = verticalrectChildmsg[j].childrenfiltnumber;
				var rectHaschild = verticalrectChildmsg[j].childrenhaschild;
				var rectChildren = verticalrectChildmsg[j].children;
				var rectChildrenNumber = verticalrectChildmsg.length;
				var intervalNodeY = $("#" + intervalNodeId).find(".rect").attr("y");
				var firstY = parseInt(intervalNodeY) + 180;
				var Y = firstY + (j*100);
				var rectchild = {"name" : rectchildName,"id":rectchildId,"x":x,"y": Y,"filtnumber":rectchildFiltnumber,"haschild": rectHaschild,"children":rectChildren}
				console.log(intervalNodeId);
				verticalrectChildmsg[j] = rectchild;
			}
		}
		}
		if(intervalNodeHaschild == 1){
			if(verticalHaschild == "0"){
			var rectName = verticalData[k].name;
			var rectId = verticalData[k].id;
			var rectFiltnumber = verticalData[k].filtnumber;
			var rectHaschild = verticalData[k].haschild;
			var rectChildren = verticalData[k].children;
			x = $("#" + intervalNodeId).find(".childRect").attr("x");
			var intervalNodeY = $("#" + intervalNodeId).find(".childRect").last().attr("y");
			y = parseInt(intervalNodeY) + 200;
			verticalrect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
		}
		if(verticalHaschild == "1"){
			x = $("#" + intervalNodeId).find(".childRect").attr("x");
			y  = verticalLength;
			var rectName = verticalData[k].name;
			var rectId = verticalData[k].id;
			var rectFiltnumber = verticalData[k].filtnumber;
			var rectHaschild = verticalData[k].haschild;
			var rectChildren = verticalData[k].children;
			verticalrect = {"name" : rectName,"id":rectId,"x":x,"y":y,"filtnumber":rectFiltnumber,"haschild": rectHaschild,"children":rectChildren};
			var verticalrectChildmsg = verticalrect.children;
			console.log(rectChildmsg);
			for (var j = 0; j < verticalrectChildmsg.length; j++) {
				var rectchildName = verticalrectChildmsg[j].childrenname;
				var rectchildId = verticalrectChildmsg[j].childrenid;
				var rectchildFiltnumber = verticalrectChildmsg[j].childrenfiltnumber;
				var rectHaschild = verticalrectChildmsg[j].childrenhaschild;
				var rectChildren = verticalrectChildmsg[j].children;
				var rectChildrenNumber = verticalrectChildmsg.length;
				var intervalNodeY = $("#" + intervalNodeId).find(".childRect").last().attr("y");
				var firstY = parseInt(intervalNodeY) + 200;
				var Y = firstY + (j*100);
				var rectchild = {"name" : rectchildName,"id":rectchildId,"x":x,"y": Y,"filtnumber":rectchildFiltnumber,"haschild": rectHaschild,"children":rectChildren}
				console.log(intervalNodeId);
				verticalrectChildmsg[j] = rectchild;
			}
		}
		}
		verticalrectData.push(verticalrect);
	}
	console.log(verticalrectData);
	var verticalrectG = outG.selectAll(".verticalrectG")
						.data(verticalrectData)
						.enter()
						.append("g")
					.attr("class","verticalrectG")
					.attr("id",function(d){
									return d.id;
								})
					.attr("haschild",function(d){
						return d.haschild;
					})
					.each(function(d){
						if(d.haschild == "0"){
							d3.select(this)
								.append("rect")
								.attr("class","rect")
								.attr("stroke-width","3")
								.attr("stroke","#00C5C4")
								.attr("fill","#008A85")
								.attr("x",function(d){
									return d.x;
							})
								.attr("y",function(d){
									return d.y;
								})
							d3.select(this)
								.append("text")
								.attr("class","text")
								.attr("x",function(d){
									return parseInt(d.x) + 75;
								})
								.attr("y",function(d){
									return parseInt(d.y) + 40;
								})
								.text(function(d){
									return d.name;
								})
						}
						if(d.haschild == "1"){
							var rectChildG = d3.select(this);
							rectChildG.selectAll(".childRect")
									  .data(d.children)
									  .enter()
									  .append("rect")
									  .attr("class","childRect")
									  .attr("stroke-width","3")
									  .attr("stroke","#00C5C4")
									  .attr("fill","#008A85")
									  .attr("x",function(d){
										return d.x;
										})
									  .attr("y",function(d){
										return d.y;
										})
									  .attr("id",function(d){
									  	return d.id;
									  })
							rectChildG.append("rect")
									  .attr("class","bgrect")
									  .attr("width","190px")
									  .attr("height",function(d){
									  		var childRectNumber = d.children.length;
									  		var bgrectH = childRectNumber*80 + (childRectNumber - 1)*20 + 40;
									  		return bgrectH;
									  })
									  .attr("x",function(d){
									  	var childRectX = d.children[0].x;
									  	var bgrectX = childRectX - 20;
									  	return bgrectX;
									  })
									  .attr("y",function(d){
									  	var childRectY = d.children[0].y;
									  	var bgrectY = childRectY - 20;
									  	return bgrectY;
									  })
									  .attr("fill","none")
									  .attr("stroke-width","3")
									  .attr("stroke","#00C5C4")
							rectChildG.selectAll(".text")
								.data(d.children)
								.enter()
								.append("text")
								.attr("class","text")
								.attr("x",function(d){
									return parseInt(d.x) + 75;
								})
								.attr("y",function(d){
									return parseInt(d.y) + 40;
								})
								.text(function(d){
									return d.name;
								})
						}
					})
	var startG = outG.append("circle")
				.attr("class","startcircle")
				.attr("fill","#008A85")
				.attr("stroke-width","3")
				.attr("stroke","#00C5C4")
				.attr("r","40")
				.attr("cx","60")
				.attr("cy",verticalLength + 40)
	var startT = outG.append("text")
				.attr("class","text")
				.attr("x","60")
				.attr("y",verticalLength + 40)
				.text("开始")
	var endG = outG.append("circle")
				.attr("class","endcircle")
				.attr("fill","#008A85")
				.attr("stroke-width","3")
				.attr("stroke","#00C5C4")
				.attr("r","40")
				.attr("cx",function(){
					var lastX = $(".rect").last().attr("x");
					var circleX = parseInt(lastX) + 250;
					return circleX;
				})
				.attr("cy",verticalLength + 40)
	var endT = outG.append("text")
				.attr("class","text")
				.attr("x",function(){
					var lastX = $(".rect").last().attr("x");
					var circleX = parseInt(lastX) + 250;
					return circleX;
				})
				.attr("y",verticalLength + 40)
				.text("结束")
}
function drawPath(pathDatamsg){
	var pathData = [];
	var path;
	//画箭头
	var outG = d3.select(".outG");
	var defs = outG.append("defs");
	var arrowMarker = defs.append("marker")  
                        .attr("id","arrow")  
                        .attr("markerUnits","strokeWidth")  
                        .attr("markerWidth","8")  
                        .attr("markerHeight","8")  
                        .attr("viewBox","0 0 12 12")   
                        .attr("refX","9")  
                        .attr("refY","6")  
                        .attr("orient","auto");
	var arrow_path = "M2,2 L10,6 L2,10 L6,6 L2,2";   
	arrowMarker.append("path")  
            	.attr("d",arrow_path)
            	.attr("fill","#00E962");
    //画线
    for(i in pathDatamsg){
    	var sourceId = pathDatamsg[i].sourceId;
    	var targetId = pathDatamsg[i].targetId;
    	var pathId = pathDatamsg[i].id;
    	var pathstate = pathDatamsg[i].state;
    	var sourceX;
    	var sourceY;
    	var targetX;
    	var targetY;
    	var startX;
    	var startY;
    	var endX;
    	var endY;
		var sourcehaschild = $("#" + sourceId).attr("haschild");
    	var targethaschild = $("#" + targetId).attr("haschild");
    	var sourceRectW;
    	var sourceRectH;
    	var targetRectW;
    	var targetRectH;
    	if(pathstate == "0"){
    		if(sourcehaschild == "0" && targethaschild == "0"){
    			 sourceRectW = $("#" + sourceId).find(".rect").width();
		    	 sourceRectH = $("#" + sourceId).find(".rect").height();
		    	 targetRectW = $("#" + targetId).find(".rect").width();
		    	 targetRectH = $("#" + targetId).find(".rect").height();
    			 sourceX = $("#" + sourceId).find(".rect").attr("x");
    			 sourceY = $("#" + sourceId).find(".rect").attr("y");
    			 targetX = $("#" + targetId).find(".rect").attr("x");
    			 targetY = $("#" + targetId).find(".rect").attr("y");
    		}
    		if(sourcehaschild == "0" && targethaschild == "1"){
    			sourceRectW = $("#" + sourceId).find(".rect").width();
		    	 sourceRectH = $("#" + sourceId).find(".rect").height();
		    	 targetRectW = $("#" + targetId).find(".bgrect").width();
		    	 targetRectH = $("#" + targetId).find(".bgrect").height();
    			 sourceX = $("#" + sourceId).find(".rect").attr("x");
    			 sourceY = $("#" + sourceId).find(".rect").attr("y");
    			 targetX = $("#" + targetId).find(".bgrect").attr("x");
    			 targetY = $("#" + targetId).find(".bgrect").attr("y");
    		}
    		if(sourcehaschild == "1" && targethaschild == "0"){
    			sourceRectW = $("#" + sourceId).find(".bgrect").width();
		    	 sourceRectH = $("#" + sourceId).find(".bgrect").height();
		    	 targetRectW = $("#" + targetId).find(".rect").width();
		    	 targetRectH = $("#" + targetId).find(".rect").height();
    			 sourceX = $("#" + sourceId).find(".bgrect").attr("x");
    			 sourceY = $("#" + sourceId).find(".bgrect").attr("y");
    			 targetX = $("#" + targetId).find(".rect").attr("x");
    			 targetY = $("#" + targetId).find(".rect").attr("y");
    		}
    		if(sourcehaschild == "1" && targethaschild == "1"){
    			sourceRectW = $("#" + sourceId).find(".bgrect").width();
		    	 sourceRectH = $("#" + sourceId).find(".bgrect").height();
		    	 targetRectW = $("#" + targetId).find(".bgrect").width();
		    	 targetRectH = $("#" + targetId).find(".bgrect").height();
    			 sourceX = $("#" + sourceId).find(".bgrect").attr("x");
    			 sourceY = $("#" + sourceId).find(".bgrect").attr("y");
    			 targetX = $("#" + targetId).find(".bgrect").attr("x");
    			 targetY = $("#" + targetId).find(".bgrect").attr("y");
    		}
    		 startX = parseInt(sourceX) + parseInt(sourceRectW);
			 startY = parseInt(sourceY) + parseInt(sourceRectH)/2;
			 endX = parseInt(targetX);
			 endY = parseInt(targetY) + parseInt(targetRectH)/2;
			path = {"path" : "M" + startX + " "+ startY + "L" + endX + " " + endY,"sourceId" : sourceId,"targetId":targetId,"id":pathId,"state":pathstate};
    	}
    	if(pathstate == "1"){
    		if(sourcehaschild == "0" && targethaschild == "0"){
    			sourceRectW = $("#" + sourceId).find(".rect").width();
		    	 sourceRectH = $("#" + sourceId).find(".rect").height();
		    	 targetRectW = $("#" + targetId).find(".rect").width();
		    	 targetRectH = $("#" + targetId).find(".rect").height();
    			 sourceX = $("#" + sourceId).find(".rect").attr("x");
    			 sourceY = $("#" + sourceId).find(".rect").attr("y");
    			 targetX = $("#" + targetId).find(".rect").attr("x");
    			 targetY = $("#" + targetId).find(".rect").attr("y");
    		}
    		if(sourcehaschild == "0" && targethaschild == "1"){
    			sourceRectW = $("#" + sourceId).find(".rect").width();
		    	 sourceRectH = $("#" + sourceId).find(".rect").height();
		    	 targetRectW = $("#" + targetId).find(".bgrect").width();
		    	 targetRectH = $("#" + targetId).find(".bgrect").height();
    			 sourceX = $("#" + sourceId).find(".rect").attr("x");
    			 sourceY = $("#" + sourceId).find(".rect").attr("y");
    			 targetX = $("#" + targetId).find(".bgrect").attr("x");
    			 targetY = $("#" + targetId).find(".bgrect").attr("y");
    			 
    		}
    		if(sourcehaschild == "1" && targethaschild == "0"){
    			sourceRectW = $("#" + sourceId).find(".bgrect").width();
		    	 sourceRectH = $("#" + sourceId).find(".bgrect").height();
		    	 targetRectW = $("#" + targetId).find(".rect").width();
		    	 targetRectH = $("#" + targetId).find(".rect").height();
    			 sourceX = $("#" + sourceId).find(".bgrect").attr("x");
    			 sourceY = $("#" + sourceId).find(".bgrect").attr("y");
    			 targetX = $("#" + targetId).find(".rect").attr("x");
    			 targetY = $("#" + targetId).find(".rect").attr("y");
    		}
    		if(sourcehaschild == "1" && targethaschild == "1"){
    			sourceRectW = $("#" + sourceId).find(".bgrect").width();
		    	 sourceRectH = $("#" + sourceId).find(".bgrect").height();
		    	 targetRectW = $("#" + targetId).find(".bgrect").width();
		    	 targetRectH = $("#" + targetId).find(".bgrect").height();
    			 sourceX = $("#" + sourceId).find(".bgrect").attr("x");
    			 sourceY = $("#" + sourceId).find(".bgrect").attr("y");
    			 targetX = $("#" + targetId).find(".bgrect").attr("x");
    			 targetY = $("#" + targetId).find(".bgrect").attr("y");
    		}
    		 startX = parseInt(sourceX) + parseInt(sourceRectW)/2;
			 startY = parseInt(sourceY) + parseInt(sourceRectH);
			 endX = parseInt(targetX) + parseInt(targetRectW)/2
			 endY = parseInt(targetY);
			 path = {"path" : "M" + startX + " " + startY + "L" + endX + " " + endY,"sourceId" : sourceId,"targetId":targetId,"id":pathId,"state":pathstate};
    	}
    	pathData.push(path);
    }
    console.log(pathData);
    var outG = d3.select(".outG");
    var pathG = outG.append("g").attr("class","pathG");
    var path = pathG.selectAll(".path").data(pathData)
    				.enter()
    				.append("path")
    				.attr('fill', 'none')
					.attr("class","path")
					.attr("stroke","#00E962")
					.attr("stroke-width","3")
					.attr("id",function(d){
						return d.id;
					})
					.attr("d",function(d){
						return d.path;
					})
					.attr("state",function(d){
						return d.state;
					})
					.attr("marker-end",function(d){
						return "url(#arrow)";
					});
	var startPath_X1 = parseInt($(".startcircle").attr("cx")) + 40;
	var startPath_Y1 = $(".startcircle").attr("cy");
	var startPath_X2 = startPath_X1 + 100;
	var startPath_Y2 = $(".startcircle").attr("cy");
	var endPath_X1 = parseInt($(".endcircle").attr("cx")) - 100;
	var endPath_Y1 = $(".endcircle").attr("cy");
	var endPath_X2 = parseInt($(".endcircle").attr("cx")) - 40;
	var endtPath_Y2 = $(".endcircle").attr("cy");
	var startPath_d = "M" + startPath_X1 + " "+ startPath_Y1 + "L" + startPath_X2 + " " + startPath_Y2;
	var endPath_d = "M" + endPath_X1 + " "+ endPath_Y1 + "L" + endPath_X2 + " " + endtPath_Y2;
	var startPath = d3.select(".pathG").append("path")
					.attr('fill', 'none')
					.attr("class","startPath")
					.attr("d",startPath_d)
					.attr("stroke","#00E962")
					.attr("stroke-width","3")
					.attr("marker-end",function(d){
						return "url(#arrow)";
					});
	var endPath = d3.select(".pathG").append("path")
					.attr('fill', 'none')
					.attr("class","endPath")
					.attr("d",endPath_d)
					.attr("stroke","#00E962")
					.attr("stroke-width","3")
					.attr("marker-end",function(d){
						return "url(#arrow)";
					});
}
window.onload = function(){
	rectDatamsg = msgData;
	verticalData = msgverticalData;
	pathDatamsg = pathmsg;
	drawRect(rectDatamsg,verticalData);
	drawPath(pathDatamsg);
	var maxY;
	var minY;
	var minX = $(".startcircle").attr("x");
	var maxX = $(".endcircle").attr("x");
	var svgW = parseInt(maxX) - parseInt(minX) + 80;
	
	$(".rect").each(function(){
		var rectX = $(this).attr("x");
		console.log(rectX);
	})
	var translate = [212,78]
	zoom.scale(0.4);
	zoom.translate(translate);
	var T = d3.select(".outG").transition().duration(800)
  	zoom.event(T);
}	