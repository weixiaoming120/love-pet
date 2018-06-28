var $header = function() {
  var $header = $(''
    + '<div class="admin-app-header">'
      + '<div class="title"><h1></h1></div>'
      + '<div class="account">'
        + '<div class="logo"><img src="../images/logo.png" class="imagelogo"></div>'
        + '<span>管理</span>'
        + '<i class="iconfont icon-arrowdown"></i>'
        + '<div class="account-menu">'
          + '<i class="iconfont icon-sign-out"></i>'
          + '<span>&nbsp;注销</span>'
        + '</div>'
      + '</div>'
    + '</div>');

  var $title = $header.find('.title h1'),
    $account = $header.find('.account'),
    $accountMenu = $header.find('.account-menu'),
    $arrow = $header.find('.icon-arrowdown'),
    $logo = $header.find('.account .logo');

  function onMouseOver() {
    $arrow.removeClass('icon-arrowdown');
    $arrow.addClass('icon-arrowup');
    $accountMenu.css('display', 'block');
  }

  function onMouseOut() {
    $arrow.removeClass('icon-arrowup');
    $arrow.addClass('icon-arrowdown');
    $accountMenu.css('display', 'none');
  }

  function onClick() {
    onMouseOut();
    location.hash = '#/logout';
  }

  function show(cfg) {
    $title.html(cfg.title);
    $logo.css('background-image', cfg.logo);
    $(app.config.appContainer).append($header);

    $account.mouseover(onMouseOver);
    $account.mouseout(onMouseOut);
    $accountMenu.click(onClick);
  }
  
  return {show: show};
}();