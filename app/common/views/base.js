define([
  'extensions/views/view',
  'tpl!common/templates/base.html'
], function(View, template) {
  
  var BaseView = View.extend({
    template: template
  });
  
  return BaseView;
});
