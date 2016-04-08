var data=[],render=[];
var id,now=0;
var queue=document.getElementById("queue");
function leftIn()
{
  var input=document.getElementsByTagName("input")[0];
  var value=input.value;
  input.value="";
  if(value===""||/\D/.test(value)){
    alert("请输入数字");
    return false;
  }
  var div=document.createElement("div");
  div.innerHTML=value;
  div.style.height=value*4+"px";
  queue.insertBefore(div,queue.firstChild);
  return true;
}
function rightIn()
{
  var input=document.getElementsByTagName("input")[0];
  var value=input.value;
  input.value="";
  if(value===""||/\D/.test(value)){
    alert("请输入数字");
    return false;
  }
  var div=document.createElement("div");
  div.innerHTML=value;
  div.style.height=value*4+"px";
  queue.appendChild(div);
  return true;
}
function leftOut()
{
  if(queue.firstChild!==null){
    var del=queue.removeChild(queue.firstChild);
    alert(del.innerHTML);
  }
  else {
    alert("队列为空");
  }
}
function rightOut()
{
  if(queue.lastChild!==null){
    var del=queue.removeChild(queue.lastChild);
    alert(del.innerHTML);
  }
  else{
    alert("队列为空");
  }
}
function delDiv(event)
{
  if(event.target.parentNode==queue){
    var del=queue.removeChild(event.target);
    alert(del.innerHTML);
  }
}
function renderDiv(){
  if(now==render.length){
    clearTimeout(id);
    return ;
  }
  queue.innerHTML="";
  var height=render[now].match(/\d+/g);
  var color=render[now].match(/blue|red|green/g);
  //alert(height);
  //alert(color);
  for(var i=0;i<height.length;i++){
    var div=document.createElement("div");
    div.innerHTML=height[i];
    div.style.height=parseInt(height[i]*4)+"px";
    div.style.backgroundColor=color[i];
    div.style.marginTop=parseInt(height[i]*2)+"px";
    queue.appendChild(div);
  }
  now++;
}
function sort()
{
  var num=0;
  for(var i=0;i<data.length;i++){
    var k=i;
    for(var j=i+1;j<data.length;j++){
      data[k].color="blue";
      data[j].color="blue";
      render[num++]=JSON.stringify(data);
      data[k].color="red";
      data[j].color="red";
      if(data[j].value<data[k].value)
        k=j;
    }
    var tmp=data[i];
    data[i]=data[k];
    data[k]=tmp;
    data[k].color="red";
    data[i].color="green";
    render[num++]=JSON.stringify(data);
    render.length=num;
  }
}
function initData()
{
  var num=0;
  var start=queue.firstChild;
  while(start){
    var tmp={value:0,color:"red"};
    tmp.value=parseInt(start.innerHTML);
    data[num++]=tmp;
    start=start.nextSibling;
  }
  data.length=num;
}
function sortHandle()
{
  var start=queue.firstChild;
  if(start===null){
    alert("队列为空");
    return false;
  }
  initData();
  sort();
  now=0;
  id=setInterval(renderDiv,500);
  return true;
}
function init()
{
  var btn=document.getElementsByTagName("button");
  btn[0].addEventListener("click",leftIn,false);
  btn[1].addEventListener("click",rightIn,false);
  btn[2].addEventListener("click",leftOut,false);
  btn[3].addEventListener("click",rightOut,false);
  var div=document.getElementById("queue");
  queue.addEventListener("click",delDiv,false);
  var sort=document.getElementById("sort");
  sort.onclick=sortHandle;
}

init();
