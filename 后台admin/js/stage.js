var $stage = function() {
  function show() {
    $(app.config.appContainer).append($('<div class="admin-app-stage"></div>'));
  }
  
  /**
   * 将路由信息解析成 panel 对象的名称
   *
   * @param string router 路由字符串
   * @returns string panel 对象的名称
   */
  function getPanel(router) {
    var panel = router.replace(/-(.)/g, function(letter){
      return letter.toUpperCase();
    }).replace(/#\//,'$')
      .replace(/-/g,'');

    return panel + 'Panel';
  }

  /**
   * 根据路由信息加载相应的面板
   *
   * @param router
   * @returns {undefined}
   */
  function load(router) {
    var panel = getPanel(router);
     console.log(panel);
    eval(panel + ".show({'container': '.admin-app-stage'});");
  }

  return {show: show, load: load};
}();