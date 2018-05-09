var $backHomePanel= function() {
  var $backhomeDOM= $(''
  	    +'<h2>带我回家信息管理</h2>'
        +'<div class="back-home-panel">' 
           +'<table cellspacing="0">'
             +'<tr>'
               +'<th></th>'
               +'<th>用户ID</th>'
               +'<th>宠物头像</th>'
               +'<th>用户名</th>'
               +'<th>联系方式</th>'
               +'<th>宠物领养地址</th>'
               +'<th>宠物信息描述</th>'
               +'<th>操作</th>'
            +'</tr>'
            +'<tr> '
               +'<td><input type="checkbox"></td>'
               +'<td>2352513</td>'
               +'<td><img src="image/6.jpeg" class="bhphoto"></td>'
               +'<td>铲屎官</td>'
               +'<td>123456789012</td>'
               +'<td>XXXXXXXX</td>'
               +'<td>女 3岁 萨摩耶</td>'
               +'<td>'
                   +'<button class="backhome-del">编辑</button>'
                   +'<button class="backhome-del">删除</button>'
               +'</td>'
            +'</tr>'
           +'</table>'
    	+'</div>'
      +'<div>'
               +'<input type="checkbox" class="backhome-all">全选'
               +'<button class="backhome-alldel">批量删除</button>'
      +'</div>'      );
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($backhomeDOM);
   }
  return {show: show};
}();
