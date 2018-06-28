var $userRegularPanel= function() {
  var $userDOM= $(''
  	    +'<h2>用户管理</h2>'
        +'<div class="back-home-panel">' 
           +'<table cellspacing="0">'
             +'<tr>'
               +'<th></th>'
               +'<th>用户ID</th>'
               +'<th>头像</th>'
               +'<th>用户昵称</th>'
               +'<th>宠物ID</th>'
               +'<th>邮箱</th>'
               +'<th>联系方式</th>'
               +'<th>操作</th>'
            +'</tr>'
            +'<tr id="row1"> '
               +'<td><input type="checkbox" name="check"></td>'
               +'<td>2352513</td>'
               +'<td><img src="../images/6.jpeg" class="userimg"></td>'
               +'<td>铲屎官</td>'
               +'<td>1</td>'
               +'<td>XXXXXXXXXX</td>'
               +'<td>157XXXXXXXX</td>'
               +'<td>'
                   +'<button class="user-del">编辑</button>'
                   +'<button class="user-del"  onclick="clickdel(`row1`)">删除</button>'
               +'</td>'
            +'</tr>'
            +'<tr id="row2"> '
               +'<td><input type="checkbox" name="check"></td>'
               +'<td>2352513</td>'
               +'<td><img src="../images/6.jpeg" class="userimg"></td>'
               +'<td>铲屎官</td>'
               +'<td>1</td>'
               +'<td>XXXXXXXXXX</td>'
               +'<td>157XXXXXXXX</td>'
               +'<td>'
                   +'<button class="user-del">编辑</button>'
                   +'<button class="user-del" onclick="clickdel(`row2`)">删除</button>'
               +'</td>'
            +'</tr>'
           +'</table>'
    	+'</div>'
      +'<div>'
               +'<input type="checkbox" class="user-all" onclick="selectall()" id="userall" name="checkall">全选'
               +'<button class="user-alldel">批量删除</button>'
           +'</div>');
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($userDOM);
   }
  return {show: show};
}();
function selectall(){
            //获取全选复选框  
            var root = document.getElementById("userall");  
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
