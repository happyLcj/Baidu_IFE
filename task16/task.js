/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function checkCity(city)     //检测城市名输入是否合法
{
  if(city.length==0||/[^\u4e00-\u9fa5a-zA-Z]/.test(city)){
    alert("城市名输入不合法");
    return false;
  }
  return true;
}
function checkAqi(aqi)    //检测空气质量输入是否合法
{
  if(aqi.length==0||/\D/.test(aqi)){
    alert("空气质量输入不合法");
    return false;
  }
  return true;
}
function trim(str)   //去掉首尾的空白字符
{
  return str.replace(/(^\s*)|(\s*$)/g,"");
}
function addAqiData() {
  var city=document.getElementById("aqi-city-input").value;
  var aqi=document.getElementById("aqi-value-input").value;
  city=trim(city);
  aqi=trim(aqi);
  if(checkCity(city)&&checkAqi(aqi))
    aqiData[city]=aqi;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
  var table=document.getElementById("aqi-table");
  table.innerHTML="";
  var tr=document.createElement("tr");
  tr.innerHTML="<th>城市</th><th>空气质量</th><th>操作</th>";
  table.appendChild(tr);
  //table.innerHTML = JSON.stringify(aqiData);
  for(var city in aqiData){
    var tr=document.createElement("tr");
    tr.innerHTML="<td>"+city+"</td>"
                +"<td>&nbsp;&nbsp;&nbsp;"+aqiData[city]+"</td>"
                +"<td><button>删除</button></td>";
    table.appendChild(tr);
  }
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(node) {
  // do sth.
  var city=node.getElementsByTagName("td")[0].innerHTML;
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn=document.getElementById("add-btn");
  addBtn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  var table=document.getElementById("aqi-table");
  table.addEventListener("click",function(event){
    if(event.target.nodeName=="BUTTON"){
      delBtnHandle(event.target.parentNode.parentNode);  //获取所点击的行
    }
  },false);
}

init();
