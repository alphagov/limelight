/**
 * Loads fake API when required.
 * Bootstraps application only when not running tests.
 */

define({
  load: function(name, req, onLoad, config) {
    req(['jquery'], function ($) {
      var that = this;
      var loadApplication = function () {
        
        // Load controller for this page
        var controller = $('#wrapper').data('controller');
        req([controller], function (controller) {
          var view = controller({
            el: $('#wrapper')
          });
          view.render();
          onLoad.call(that);
        });
      }
      
      var backdropUrl = $('#wrapper').data('backdrop-url');
      if (window.jasmine) {
        onLoad.call(that);
      } else if (backdropUrl && backdropUrl.indexOf('//fakeapi') >= 0) {
        // use fake API
        req(['fakeapi'], function (fakeapi) {
          loadApplication();
        });
      } else {
        // use real API
        loadApplication();
      }
    });
  }
});
