var $feedbackPanel = function() {
  var $feedbackDOM = $(''
      +'<h2>反馈信息</h2>'
      +'<div class="system-regular-panel">'
      +'<table cellspacing="0" cellpadding="5">'
      +'<tr>'
      +'<th></th>'      
      +'<th>账号</th>'
      +'<th>反馈类型</th>'
      +'<th>状态</th>'
      +'<th>手机号</th>'
      +'<th>邮箱</th>'
      +'<th>操作</th>'    
      +'</tr>'
      +'<tr id="row1">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td>123563</td>'
      +'<td>登录问题</td>'
      +'<td>未解决</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row1`)">删除</button><button class="deledi">回复</button></td>'      
      +'</tr>'
      +'<tr id="row2">'
      +'<td><input type="checkbox" name="check"></td>'
      +'<td>123563</td>'
      +'<td>网页问题</td>'
      +'<td>已关闭</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row2`)">删除</button><button class="deledi">回复</button></td>'      
      +'</tr>'          
      +'</table>'
      + '</div>'
      +'<div>'
      +'<button class="add">添加管理员</button>'
      +'</div>'
      +'<div>'
               +'<input type="checkbox" class="yimiao-all" onclick="selectall()" id="all" name="checkall">全选'
               +'<button class="yimiao-alldel">批量删除</button>'
      +'</div>'       );


  
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($feedbackDOM);
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
