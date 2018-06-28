var $spoilPanel = function() {
  var $spoilDOM = $(''
      +'<h2>寄养I宠信息管理</h2>'
      +'<div class="pet-spoil-panel">'
      +'<table cellspacing="0">'
      +'<tr>'
      +'<th></th>'
      +'<th>宠物店ID</th>'
      +'<th>宠物店头像</th>'
      +'<th>宠物店名称</th>'
      +'<th>宠物店地址</th>'
      +'<th>操作</th>'    
      +'</tr>'

      +'<tr id="row1">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td>1</td>'
      +'<td><img src="../images/6.jpeg" class="spoimg"></td>'
      +'<td>XXXXX</td>'
      +'<td>XXXXXXXXXX</td>'
      +'<td><button class="deledi" onclick="clickdel(`row1`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      
      +'</table>'
      + '</div>'
      +'<div class="spo_del">'
      +'<input type="checkbox" id="all" onclick="selectall()"  name="checkall">'
      +'<label for="all">全选</label>'
      +'<button class="spoil_addma">批量删除</button>'
      +'</div>'
      
      );


  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($spoilDOM);

   }
  
  return {show: show};
}();
function clickdel(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }
function selectall(){
            //获取全选复选框  
            var root = document.getElementById("all");  
            //获取全选复选框的状态  
            var status = root.checked;  
            //获取其他复选框集合  
            var elem = document.getElementsByName("check");  
            //如果全选复选框状态为真则全选其他按钮,否则选不选其他按钮  
            if(status){  
                for(var i = 0;i<elem.length;i++){  
                    elem[i].checked =  true;  
                }  
            }else{  
                for(var i = 0;i<elem.length;i++){  
                    elem[i].checked =  false;  
                }  
            }     
}