var $yimiaoRegularPanel= function() {
  var $yimiaoDOM= $(''
        +'<h2>疫苗接种信息管理</h2>'    
        +'<div class="yimiao-regular-panel">'
           +'<table cellspacing="0">'
             +'<tr>'
               +'<th></th>'
               +'<th>用户ID</th>'
               +'<th>宠物名</th>'
               +'<th>疫苗名称</th>'
               +'<th>疫苗接种时间</th>'
               +'<th>接种状况</th>'
               +'<th>操作</th>'
            +'</tr>'
            +'<tr> '
               +'<td><input type="checkbox"></td>'
               +'<td>2352513</td>'
               +'<td>冰冰</td>'
               +'<td>二联疫苗</td>'
               +'<td>XXXX/XX/XX</td>'
               +'<td>已接种</td>'
               +'<td>'
                   +'<button class="yimiao-del">编辑</button>'
                   +'<button class="yimiao-del">删除</button>'
               +'</td>'
            +'</tr>'
           +'</table>'
    	+'</div>'
           +'<div>'
               +'<input type="checkbox" class="yimiao-all">全选'
               +'<button class="yimiao-alldel">批量删除</button>'
           +'</div>'      );
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($yimiaoDOM);
   }
  return {show: show};
}();
