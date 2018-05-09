var $videoManagePanel = (function() {
  var $videoMagDOM = $(''
      +'<h2>视频管理</h2>'
       + '<div class="video-manage-panel">'
           +'<div class="row-video">'
                +'<div class="video-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="video-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="video-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete">删除</button>'
                +'</div>'
                +'<div class="video-col-one">'
                    +'<img src="image/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete">删除</button>'
                +'</div>'
           +'</div>'
       + '</div>'
       +'<button class="video-delete">批量删除</button><button class="video-pass">批量通过</button>');


  
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($videoMagDOM);

    
  }

  return {show: show};
})();