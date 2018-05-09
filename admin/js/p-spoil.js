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

      +'<tr>'
      +'<td><input type="checkbox"></td>'
      +'<td>1</td>'
      +'<td><img src="image/6.jpeg" class="spoimg"></td>'
      +'<td>XXXXX</td>'
      +'<td>XXXXXXXXXX</td>'
      +'<td><button class="deledi">删除</button><button class="deledi">编辑</button></td>'      
      +'</tr>'
      
      +'</table>'
      + '</div>'
      +'<div class="spo_del">'
      +'<input type="checkbox" id="all">'
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
