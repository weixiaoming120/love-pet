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
            +'<tr id="row1"> '
               +'<td><input type="checkbox" name="check"></td>'
               +'<td>2352513</td>'
               +'<td>冰冰</td>'
               +'<td>二联疫苗</td>'
               +'<td>XXXX/XX/XX</td>'
               +'<td>已接种</td>'
               +'<td>'
                   
                   +'<button class="yimiao-del" onclick="clickdel(`row1`)">删除</button>'
                   +'<button class="yimiao-del">编辑</button>'
               +'</td>'
            +'</tr>'
           +'</table>'
    	+'</div>'
           +'<div>'
               +'<input type="checkbox" id="all" class="yimiao-all" onclick="selectall()" name="checkall">全选'
               +'<button class="yimiao-alldel">批量删除</button>'
           +'</div>'      );
   function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($yimiaoDOM);
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
