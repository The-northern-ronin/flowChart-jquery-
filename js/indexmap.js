var cityname;
var cityid="05";
var divid;
var sectionid;
var sectionname;
var module;
$(document).ready(function(){
    var mychart2 = echarts.init(document.getElementById('map'));
    var data=[  
              {name:'济南市', value: 1800},  
              {name:'青岛市', value: 1700},  
              {name:'淄博市', value: 1600},  
              {name:'枣庄市', value: 1400},  
              {name:'东营市', value: 1200},  
              {name:'烟台市', value: 1000},  
              {name:'潍坊市', value: 800},  
              {name:'济宁市', value: 600},  
              {name:'泰安市', value: 400},  
              {name:'威海市', value: 200},  
              {name:'日照市', value: 100},  
              {name:'莱芜市', value: 300},  
              {name:'临沂市', value: 500},  
              {name:'德州市', value: 700},  
              {name:'聊城市', value: 900},  
              {name:'滨州市', value: 1100},
              {name:'菏泽市', value: 1150}   
            ]        
    var option = {  
        title:{
            show:true,
            text:'山东',
            x:'50',
            y:'50',
            textStyle:{
              fontSize:16,
              fontWeight:'bold',
              color:'#fff'
            }  
        },
        tooltip: {  
            trigger: 'item',  
            formatter: '{b}<br/>{c} (个)'  
        },  
        toolbox: {  
           show: true,  
           orient: 'vertical',  
           left: 'right',  
           top: 'center',
        },  
        visualMap: {  
                min: 0,  
                max: 2000,  
                text:['高','低'],  
                realtime: false,  
                calculable: true,  
                inRange: {  
                    color: ['#fcfc00','#fca400']  
                },
                right:"20px",                               //组件离容器右侧的距离,'20%'
                bottom:"20px"   
        },  
        series:[  
            {  
                name:'山东各地市',  
                type:'map',//type必须声明为 map 说明该图标为echarts 中map类型  
                map:'山东', //这里需要特别注意。如果是中国地图，map值为china，如果为各省市则为中文。这里用北京  
                aspectScale: 0.75, //长宽比. default: 0.75  
                zoom: 1.2,      
                itemStyle:{  
                    normal:{label:{show:true}},  
                    emphasis:{label:{show:true}}  
                },
                data:data,  
            }  
        ]  
    };                       
    mychart2.setOption(option);
    mychart2.on('click', function (params) {  
      cityname=params.name;
      if("济南市"==cityname){
      	cityid="0501";
      }
      else if("淄博市"==cityname){
      	cityid="0502";
      }
      else if("济宁市"==cityname){
      	cityid="0503";
      }
      else if("泰安市"==cityname){
      	cityid="0504";
      }
      else if("枣庄市"==cityname){
      	cityid="0505";
      }
      else if("青岛市"==cityname){
      	cityid="0506";
      }
      else if("烟台市"==cityname){
      	cityid="0507";
      }
      else if("潍坊市"==cityname){
      	cityid="0508";
      }
      else if("滨州市"==cityname){
      	cityid="0509";
      }
      else if("德州市"==cityname){
      	cityid="0510";
      }
      else if("聊城市"==cityname){
      	cityid="0511";
      }
      else if("临沂市"==cityname){
      	cityid="0512";
      }
      else if("菏泽市"==cityname){
      	cityid="0513";
      }
      else if("东营市"==cityname){
      	cityid="0514";
      }
      else if("威海市"==cityname){
      	cityid="0515";
      }
      else if("日照市"==cityname){
      	cityid="0516";
      }
      else if("莱芜市"==cityname){
      	cityid="0517";
      }
    }); 
    $('.section').click(function(){
     divid=$(this).attr('id');
     if(divid=="t1"||divid=="t2"||divid=="t3"||divid=="t4"){
     	module="QJJK";
     }
     else if(divid=="t5"||divid=="t6"||divid=="t7"||divid=="t8"||divid=="t9"||divid=="t10"||divid=="t11"||divid=="t12"){
     	module="ZYCL";
     }
     else if(divid=="t13"||divid=="t14"||divid=="t15"||divid=="t16"||divid=="t17"||divid=="t18"||divid=="t19"||divid=="t20"){
     	module="YWML";
     }
     else{
      module="BMXT";
     }
     sectionname =document.getElementById(divid).innerText;
     if("发展部"==sectionname){
     	sectionid="FZ";
     }
     else if("基建部"==sectionname){
     	sectionid="JJ";
     }
     else if("基建部"==sectionname){
     	sectionid="JJ";
     }
     else if("调控中心"==sectionname){
     	sectionid="TK";
     }
     else if("运检部"==sectionname){
     	sectionid="YJ";
     }
     else if("营销部"==sectionname){
     	sectionid="YX";
     }
     else if("财务部"==sectionname){
     	sectionid="CW";
     }
     else if("物资部"==sectionname){
     	sectionid="WZ";
     }
     else if("人资部"==sectionname){
     	sectionid="RZ";
     }
     else if("业务构成"==sectionname){
     	sectionid="YWGC";
     }
     else if("运营潮流"==sectionname){
     	sectionid="YYCL";
     }
     else if("异动监测窗"==sectionname){
     	sectionid="YDJC";
     }
     else if("明细地图"==sectionname){
     	sectionid="MXDT";
     }
     alert("地市:"+cityname+" "+"地市id："+cityid+" "+"模块："+module+" "+"部门名称："+sectionname+" "+"部门id："+sectionid);
    });
});