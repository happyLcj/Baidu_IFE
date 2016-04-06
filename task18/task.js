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
  queue.appendChild(div,queue.firstChild);
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
  var del=queue.removeChild(event.target);
  alert(del.innerHTML);
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
}

init();
