var $healthPanel = function() {
  var $healthDOM = $(''
      +'<h2>宠物健康信息管理</h2>'
      +'<div class="pet-health-panel">'
      +'<table cellspacing="0">'
      +'<tr>'
      +'<th></th>'
      +'<th>宠物头像</th>'
      +'<th>用户ID</th>'
      +'<th>宠物名</th>'
      +'<th>身高</th>'
      +'<th>体重</th>'    
      +'<th>年龄</th>'
      +'<th>体型</th>'  
      +'<th>吃食</th>' 
      +'<th>活动</th>' 
      +'<th>排便数</th>'  
      +'<th>其他活动</th>' 
      +'<th>操作</th>'  
      +'</tr>'
      +'<tr id="row1">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td><img src="../images/6.jpeg" class="helimg"></td>'
      +'<td>22334</td>'
      +'<td>xixi</td>'
      +'<td>20</td>'
      +'<td>15</td>'
      +'<td>1</td>'
      +'<td>瘦</td>'
      +'<td>狗粮</td>'
      +'<td>遛弯</td>'
      +'<td>2</td>'
      +'<td>XXXXX</td>'
      +'<td><button class="deledi" onclick="clickdel(`row1`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      +'<tr id="row2">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td><img src="../images/6.jpeg" class="helimg"></td>'
      +'<td>22334</td>'
      +'<td>xixi</td>'
      +'<td>20</td>'
      +'<td>15</td>'
      +'<td>1</td>'
      +'<td>瘦</td>'
      +'<td>狗粮</td>'
      +'<td>遛弯</td>'
      +'<td>2</td>'
      +'<td>XXXXX</td>'
      +'<td><button class="deledi" onclick="clickdel(`row2`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      +'<tr id="row3">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td><img  src="../images/6.jpeg" class="helimg"></td>'
      +'<td>22334</td>'
      +'<td>xixi</td>'
      +'<td>20</td>'
      +'<td>15</td>'
      +'<td>1</td>'
      +'<td>瘦</td>'
      +'<td>狗粮</td>'
      +'<td>遛弯</td>'
      +'<td>2</td>'
      +'<td>XXXXX</td>'
      +'<td><button class="deledi" onclick="clickdel(`row3`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      
      +'</table>'
      + '</div>'
      +'<div class="ck_del">'
      +'<input type="checkbox" id="all" onclick="selectall()" name="checkall">'
      +'<label for="all">全选</label>'
      +'<button class="addma">批量删除</button>'
      +'</div>'
      
      );


  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($healthDOM);

   }
  
  return {show: show};
}();
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
 function clickdel(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }
