$(function() {
  window.onhashchange = function() {
    if(location.hash === '#/logout') {
      $login.show();
    } else if(location.hash === '#/index') {
      $(app.config.appContainer).html('');
      $header.show({
        'title': app.config.headerTitle,
        'logo': app.config.headerLogo
      });
      $menu.show();
      $stage.show();
    } else {
      $stage.load(location.hash);
    }
  };

  $login.show();
});
