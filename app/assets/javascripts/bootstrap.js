define([ 'jquery' ], function ($) {
  $(document).ready(function () {
    require([$('#wrapper').data('controller')]);
  });
});
