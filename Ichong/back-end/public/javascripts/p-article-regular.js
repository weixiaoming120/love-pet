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
            +'<tr id="row1"> '
               +'<td><input type="checkbox" name="check"></td>'
               +'<td>225</td>'
               +'<td style="padding-top: 16px;"><img src="../images/6.jpeg" class="pushphoto"></td>'
               +'<td>冬季对于狗狗的健康养护</td>'
               +'<td>天气凉了人容易生病，狗狗也是如……</td>'
               +'<td>999</td>'
               +'<td>'
                   +'<button class="article-del" onclick="clickdel(`row1`)">删除</button>'
                   +'<button class="article-del">编辑</button>'
                   
               +'</td>'
           +' </tr>'
           +'</table>'
        +'</div>'
            +'<div>'
               +'<input type="checkbox" class="article-all" onclick="selectall()" id="all" name="checkall">全选'
               +'<button class="article-alldel">批量删除</button>'
           +'</div>'        );
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($articleDOM);
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