require(['config'], function (requireConfig) {
  requireConfig.baseUrl = GOVUK.config.baseUrl || '/limelight';
  require.config(requireConfig);

  if (window.jasmine) {
    return;
  }
  
  var backdropUrl = GOVUK.config.backdropUrl || "";
  var useFakeApi = backdropUrl.indexOf('//fakeapi') !== -1;
  
  var loadApplication = function () {
    var controller = GOVUK.config.controller;
    require([controller], function (controller) {
      var view = controller({
        el: $('#wrapper')
      });
      view.render();
    });
  };

  if (useFakeApi) {
    require(['fakeapi'], loadApplication);
  } else {
    loadApplication();
  }
});

