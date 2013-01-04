// create and set menu
var menu = Ti.UI.createMenu(),
setting_btn = Ti.UI.createMenuItem('Settings', function() {
  window.location = "app://settings.html"
});
menu.appendItem(setting_btn);
Ti.UI.setMenu(menu);