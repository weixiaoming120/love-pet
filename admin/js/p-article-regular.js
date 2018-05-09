var $articleRegularPanel= function() {
  var $articleDOM= $(''
  	    +'<h2>文章管理</h2>'
      +'<div class="article-regular-panel">' 
           +'<table cellspacing="0">'
             +'<tr>'
               +'<th></th>'
               +'<th>ID</th>'
               +'<th>推荐图</th>'
               +'<th>标题</th>'
               +'<th>内容</th>'
               +'<th>调用次数</th>'
               +'<th>操作</th>'
            +'</tr>'
            +'<tr> '
               +'<td><input type="checkbox"></td>'
               +'<td>225</td>'
               +'<td style="padding-top: 16px;"><img src="image/6.jpeg" class="pushphoto"></td>'
               +'<td>冬季对于狗狗的健康养护</td>'
               +'<td>天气凉了人容易生病，狗狗也是如……</td>'
               +'<td>999</td>'
               +'<td>'
                   +'<button class="article-del">编辑</button>'
                   +'<button class="article-del">删除</button>'
               +'</td>'
           +' </tr>'
           +'</table>'
        +'</div>'
            +'<div>'
               +'<input type="checkbox" class="article-all">全选'
               +'<button class="article-alldel">批量删除</button>'
           +'</div>'        );
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($articleDOM);
   }
  return {show: show};
}();
