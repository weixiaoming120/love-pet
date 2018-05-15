var $login = function() {
  var $loginDOM = $(''
          + '<div class="admin-app-header">'
          + '<div class="title"><h1>I 宠后台管理</h1></div>'
          + '<div class="account">'
          + '<div class="logo"><img src="image/logo.png" class="imagelogoo"></div>'
          + '</div>'
          + '</div>'    
          + '<div class="admin-app-login">'
          + '<form>'
          + '<label>用户名</label>'
          + '<input type="text" autofocus><br>'
          + '<label>密　码</label>'
          + '<input type="password"><br>'
          + '<input type="submit" value="登 录">'
          + '</form>'
          + '</div>');

  var $form = $loginDOM.find('form');

  function show() {
    $(app.config.appContainer).html('');
    $(app.config.appContainer).append($loginDOM);

    $form.submit(function(e) {
      e.preventDefault();
      location.hash = '#/index';
    });
  }
  
  return {show: show};
}();