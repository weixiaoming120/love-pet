var $syetemRegularPanel = function() {
  var $systemDOM = $(''
      +'<h2>管理员信息</h2>'
      +'<div class="system-regular-panel">'
      +'<table cellspacing="0" cellpadding="5">'
      +'<tr>'
      +'<th>ID</th>'
      +'<th>用户名</th>'
      +'<th>真实姓名</th>'
      +'<th>性别</th>'
      +'<th>职位</th>'
      +'<th>手机号码</th>'    
      +'<th>邮箱</th>'
      +'<th>操作</th>'    
      +'</tr>'
      +'<tr id="row1">'
      +'<td>123563</td>'
      +'<td>HanLu</td>'
      +'<td>韩璐</td>'
      +'<td>女</td>'
      +'<td>开发人员</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row1`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      +'<tr id="row2">'
      +'<td>123563</td>'
      +'<td>HanLu</td>'
      +'<td>韩璐</td>'
      +'<td>女</td>'
      +'<td>开发人员</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row2`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      +'<tr id="row3">'
      +'<td>123563</td>'
      +'<td>HanLu</td>'
      +'<td>韩璐</td>'
      +'<td>女</td>'
      +'<td>开发人员</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row3`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      +'<tr id="row4">'
      +'<td>123563</td>'
      +'<td>HanLu</td>'
      +'<td>韩璐</td>'
      +'<td>女</td>'
      +'<td>开发人员</td>'
      +'<td>13245678912</td>'
      +'<td>1234325322@qq.com</td>'
      +'<td><button class="deledi" onclick="clickdel(`row4`)">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'                           
      +'</table>'
      + '</div>'
      +'<div>'
      +'<button class="add">添加管理员</button>'
      +'</div>');

  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($systemDOM);
  }

  return {show: show};
}();
 function clickdel(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }
