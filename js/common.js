var h = $(window).innerHeight()/2;
$('.d_top').height(h - 40);
$('.d_main').height(h - 40);
var myChart1 = echarts.init(document.getElementById('echartsBox1'));
var myChart2 = echarts.init(document.getElementById('echartsBox2'));
// 指定图表的配置项和数据
option1 = {
    title: {
        text: '效能情况',
        top:'8px',
        left:'center',
        borderColor:"#00c5c5",
        backgroundColor:"rgba(0,255,255,.15)",
        borderWidth:2,
        textStyle:{
            fontWeight:'normal',
            fontSize:14,
            color:'#fff'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    color:['#fef500','#4ecfff'],
    legend: {
        x: 'center',  
        y: '90%',
        itemWidth:20,
        itemHeight:10,
        data:[
            {
                name:'已办业务量',
                icon:'rect',
                textStyle:{
                    color:'#fff'
                },
            },
            {
                name:'在途业务量',
                icon:'rect',
                textStyle:{
                    color:'#fff'
                },
            }
        ]
    },
    grid: {
        top:'15%',
        left: '3%',
        right: '6%',
        bottom: '13%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {
                show: false
            }
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['05-08','05-09','05-10','05-11','05-12','05-13','05-14'],
        axisLine:{
            lineStyle:{
                color:'#00ffff'
            }
        } 
    },
    yAxis: {
        type: 'value',
        splitLine:{show: false},//去除网格线
        min: 0,
        max: 30,
        splitNumber:2,
        //设置轴线的属性
        axisLine:{
            lineStyle:{
                color:'#00ffff'
            }
        } 
    },
    series: [
        {
            name:'已办业务量',
            type:'line',
            stack: '总量1',
            data:[12, 13, 10, 13, 9, 2, 21],
            symbol: "none",
            smooth:true,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#fef500'
                    }
                }
            }
        },
        {
            name:'在途业务量',
            type:'line',
            stack: '总量2',
            data:[22, 18, 19, 23, 29, 3, 23],
            symbol: "none",
            smooth:true,
            itemStyle : {
                normal : {
                    lineStyle:{
                        color:'#4ecfff'
                    }
                }
            }
        }
    ]
};
option2 = {
    title: {
        text: '效能情况',
        top:'8px',
        left:'center',
        borderColor:"#00c5c5",
        backgroundColor:"rgba(0,255,255,.15)",
        borderWidth:2,
        textStyle:{
            fontWeight:'normal',
            fontSize:14,
            color:'#fff'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    color:['#ff8400','#00fd7d'],
    legend: {
		x: 'center',  
		y: '90%',
		itemWidth:20,
		itemHeight:10,
		data:[
			{
                name:'本期',
                icon:'rect',
                textStyle:{
                    color:'#fff'
                },
            },
            {
                name:'同期',
                icon:'rect',
                textStyle:{
                    color:'#fff'
                },
            }
        ],     
    },
    grid: {
    	top:'15%',
        left: '3%',
        right: '6%',
        bottom: '13%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {
				show: false
			}
        }
    },
    xAxis: {
        splitLine:{show: false},//去除网格线
        type: 'category',
        boundaryGap: false,
        data: ['05-08','05-09','05-10','05-11','05-12','05-13','05-14'],
        //设置轴线的属性
        axisLine:{
            lineStyle:{
                color:'#00ffff'
            }
        } 
    },
    yAxis: {
        splitLine:{show: false},//去除网格线
        type: 'value',
        min: 0,
        max: 20,
        splitNumber:2,
        //设置轴线的属性
        axisLine:{
            lineStyle:{
                color:'#00ffff'
            }
        } 
    },
    series: [
        {
            name:'本期',
            type:'line',
            stack: '总量1',
            data:[12, 13, 10, 13, 9, 23, 21],
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#ff8400'
					}
				}
			},
			symbol: "none",
			smooth:true,
        },
        {
            name:'同期',
            type:'line',
            stack: '总量2',
            data:[2, 18, 19, 2, 2, 3, 3],
            itemStyle : {
				normal : {
					lineStyle:{
						color:'#00fd7d'
					}
				}
			},
			symbol: "none",
			smooth:true,
        }
    ]
};
// 使用刚指定的配置项和数据显示图表。
myChart1.setOption(option1);
myChart2.setOption(option2);
$('.btn').click(function(event) {
	$('#tableBox').css('display', 'none');
	$('.box').css('width', '50%');
	$('.box').children().css('margin', '0 auto');
});	