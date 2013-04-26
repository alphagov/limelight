define([ 'jquery' ], function ($) {
  function backdropUrl() {
    var backdropUrl = $('#wrapper').data('backdrop-url');
    return backdropUrl || "";
  }

  function useFakeApi() {
    return window.jasmine || backdropUrl().indexOf('//fakeapi') !== -1
  }

  $(document).ready(function () {
    if (useFakeApi()) {
      require(['fakeapi']);
    }
    require([$('#wrapper').data('controller')]);
  });
});
