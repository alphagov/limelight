define([ 'require' ], function (require) {
  
  if (window.jasmine) {
    return;
  }
  
  function backdropUrl() {
    return GOVUK.config.backdropUrl || "";
  }

  function useFakeApi() {
    return backdropUrl().indexOf('//fakeapi') !== -1;
  }
  
  var loadApplication = function () {
    var controller = GOVUK.config.controller;
    require([controller], function (controller) {
      var view = controller({
        el: $('#wrapper')
      });
      view.render();
    });
  };

  if (useFakeApi()) {
    require(['fakeapi'], loadApplication);
  } else {
    loadApplication();
  }
});
