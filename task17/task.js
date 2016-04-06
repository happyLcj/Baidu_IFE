/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
};

function setDiv(div,title,height,width)
{
  div.style.display="inline-block";
  div.title=title+"空气质量："+height;
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.marginRight="1px";
  var color="white";
  if(height>400){
    color="black";
  }
  else if(height>300){
    color="purple";
  }
  else if(height>200){
    color="red";
  }
  else if(height>100){
    color="blue";
  }
  else{
    color="green";
  }
  div.style.backgroundColor=color;
}

/**
 * 渲染图表
 */
function renderChart() {
  var div=document.getElementsByClassName("aqi-chart-wrap")[0];
  div.innerHTML="";
  var dat=new Date("2016-01-01");
  var datStr="";
  if(pageState.nowGraTime=="day"){
    for(var i=1;i<92;i++){
      var dayDiv=document.createElement("div");
      datStr = getDateStr(dat);
      setDiv(dayDiv,datStr,chartData[datStr],"8");
      div.appendChild(dayDiv);
      dat.setDate(dat.getDate() + 1);
    }
  }
  else if(pageState.nowGraTime=="week"){
    var height=0,cnt=0,week=0;
    for(var i=1;i<92;i++){
      datStr = getDateStr(dat);
      height+=chartData[datStr];
      cnt++;
      if(dat.getDay()===0||i===91){
        height=parseInt(height/cnt);
        week++;
        var weekDiv=document.createElement("div");
        setDiv(weekDiv,"第"+week+"周",height,"25");
        div.appendChild(weekDiv);
        height=0;
        cnt=0;
      }
      dat.setDate(dat.getDate() + 1);
    }
  }
  else if(pageState.nowGraTime=="month"){
    var sum=[0,0,0],day=[31,29,31];
    for(var i=1;i<92;i++){
      datStr=getDateStr(dat);
      sum[dat.getMonth()]+=chartData[datStr];
      dat.setDate(dat.getDate()+1);
    }
    for(var i=0;i<3;i++){
      var monthDiv=document.createElement("div");
      setDiv(monthDiv,(i+1)+"月",parseInt(sum[i]/day[i]),"40");
      div.appendChild(monthDiv);
    }
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化
  var graTime=event.target.value;
  if(graTime!=pageState.nowGraTime){
    // 设置对应数据
    pageState.nowGraTime=graTime;
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(event) {
  // 确定是否选项发生了变化
  var city=event.target.value;
  if(city!=pageState.nowSelectCity){
    // 设置对应数据
    pageState.nowSelectCity=city;
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var graTime=document.getElementById("form-gra-time");
  graTime.addEventListener("change",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var city=document.getElementById("city-select");
  city.innerHTML="";
  for(var opt in aqiSourceData){
    var option=document.createElement("option");
    option.innerHTML=opt;
    city.appendChild(option);
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city.addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData=aqiSourceData[pageState.nowSelectCity];
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  renderChart();
}

init();
