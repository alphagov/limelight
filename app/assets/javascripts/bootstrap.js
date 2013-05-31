define([ 'require', 'jquery' ], function (require, $) {
  var controller = $('#wrapper').data('controller'),
      preController = $('#wrapper').data('preprocessor'),
      loadThese = [];

  if (preController) {
    loadThese.push(preController);
  }

  loadThese.push(controller);

  require(loadThese, function () {
    var args = Array.prototype.slice.call(arguments);
    $.each(args, function (i, func) {
      func();
    });
  });
});
