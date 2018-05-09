var $imageManagePanel = (function() {
  var $imageMagDOM = $(''
      +'<h2>图片管理</h2>'
       + '<div class="image-manage-panel">'
           +'<div class="row-image">'
                +'<div class="image-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="image-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="image-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="image-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="image-col-one-examine">审查</button>'
                    +'<button class="image-col-one-delete">删除</button>'
                +'</div>'
           +'</div>'
           
       + '</div>'
       +'<button class="image-delete">批量删除</button><button class="image-pass">批量通过</button>');


  
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($imageMagDOM);

    
  }

  return {show: show};
})();