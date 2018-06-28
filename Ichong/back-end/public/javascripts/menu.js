var $menu = function() {
  var $menuDOM = (function(menuData) {
    var $menu = $(''
      + '<div class="admin-app-menu">'
        + '<ul class="menu"></ul>'
      + '</div>');

    var $ul = $menu.find('.menu');

    menuData.forEach(function(e) {
      var $li = $('<li></li>');

      var $menuBar = $(''
        + '<div class="menu-bar">'
          + '<i class="iconfont ' + e.icon + '"></i>'
          + '<span>' + e.title + '</span>'
          + '<i class="iconfont icon-arrowdown"></i>'
        + '</div>');

      $li.append($menuBar);

      var $menuItems = $('<dl class="menu-items"></dl>');

      e.items.forEach(function(item) {
        var $item = $(''
          + '<dd class="menu-item" data-href="' + item.url + '">' 
            + item.title
          + '</dd>');

        $menuItems.append($item);
      });

      $li.append($menuItems);
      $ul.append($li);
    });

    return $menu;
  })(app.menuData);    

  var $menuBar = $menuDOM.find('.menu-bar'),
    $menuItem = $menuDOM.find('.menu-item'),
    $currentMenuBar = null,
    $currentMenu = null;

  function onMenuBarClick(e) {
    var $menu = $(e.currentTarget),
      arrowStyle = {'up': 'icon-arrowup', 'down': 'icon-arrowdown'};

    $menu.showArrow = function(style) {
      var $arrow = this.find('span+i');

      var cssClass = $arrow.hasClass(arrowStyle.up) ? arrowStyle.up : arrowStyle.down;
      $arrow.removeClass(cssClass);
      $arrow.addClass(style);
    };

    if($currentMenuBar === null) {
      $menu.showArrow(arrowStyle.up);
      $menu.next().css('display', 'block');
      $currentMenuBar = $menu;
    } else if($currentMenuBar.get(0) === $menu.get(0)) {
      $menu.showArrow(arrowStyle.down);
      $menu.next().css('display', 'none');
      $currentMenuBar = null;
    } else {
      $currentMenuBar.showArrow(arrowStyle.down);
      $currentMenuBar.next().css('display', 'none');
      $menu.showArrow(arrowStyle.up);
      $menu.next().css('display', 'block');
      $currentMenuBar = $menu;
    }
  }

  function onMenuItemClick(e) {
    var $menuItem = $(e.currentTarget);
    
    $menuItem.selectMenu = function(isSelected){
      if(isSelected) {
        this.css({'background': '#cf0000', 'color': 'white'});
      } else {
        this.css({'background': '#282e37', 'color': '#c2c2c2'});
      }
    };

    if($currentMenu === null) {
      $menuItem.selectMenu(true);
      $currentMenu = $menuItem;
    } else {
      $currentMenu.selectMenu(false);
      $menuItem.selectMenu(true);
      $currentMenu = $menuItem;
    }

    window.location.hash = $menuItem.attr('data-href');
  }

  function show() {
    $(app.config.appContainer).append($menuDOM);

    $menuBar.click(onMenuBarClick);
    $menuItem.click(onMenuItemClick);
  }
  
  return {show: show};
}();