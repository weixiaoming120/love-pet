var $videoManagePanel = function() {
  var $videoMagDOM = $(''
      +'<h2>视频管理</h2>'
       + '<div class="video-manage-panel">'
           +'<div class="row-video">'
                +'<div class="video-col-one" id="div1">'
                    +'<img src="../images/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete" onclick="clickdel(`div1`)">删除</button>'
                +'</div>'
                +'<div class="video-col-one" id="div2">'
                    +'<img src="../images/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete" onclick="clickdel(`div2`)">删除</button>'
                +'</div>'
                +'<div class="video-col-one" id="div3">'
                    +'<img src="../images/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete" onclick="clickdel(`div3`)">删除</button>'
                +'</div>'
                +'<div class="video-col-one" id="div4">'
                    +'<img src="../images/pic.png">'
                    +'<button class="video-col-one-examine">审查</button>'
                    +'<button class="video-col-one-delete" onclick="clickdel(`div4`)">删除</button>'
                +'</div>'
           +'</div>'
       + '</div>'
       +'<button class="video-delete">批量删除</button><button class="video-pass">批量通过</button>');


  
  function show() {
    $(app.config.panelContainer).html('');
    $(app.config.panelContainer).append($videoMagDOM);

    
  }

  return {show: show};
}();
function clickdel(id){
      document.getElementById(id).parentNode.removeChild(document.getElementById(id));
 }