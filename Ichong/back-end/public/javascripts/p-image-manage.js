var $imageManagePanel = function() {
  var $imageMagDOM = $(''
      +'<h2>图片管理</h2>'
       + '<div class="image-manage-panel">'
           +'<div class="row-image">'
                +'<div class="image-col-one" id="div1">'
                    +'<img src="../images/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete" onclick="clickdel(`div1`)">删除</button>'
                +'</div>'
                +'<div class="image-col-one" id="div2">'
                    +'<img src="../images/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete" onclick="clickdel(`div2s`)">删除</button>'
                +'</div>'
                +'<div class="image-col-one" id="div3">'
                    +'<img src="../images/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete" onclick="clickdel(`div3`)">删除</button>'
                +'</div>'
                +'<div class="image-col-one" id="div4">'
                    +'<img src="../images/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete" onclick="clickdel(`div4`)">删除</button>'
                +'</div>'
           +'</div>'
           
       + '</div>'
       +'<button class="image-delete">批量删除</button><button class="image-pass">批量通过</button>');


  
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($imageMagDOM);

    
  }

  return {show: show};
}();
function clickdel(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }