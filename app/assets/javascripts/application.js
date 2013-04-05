/**
 * Loads fake API when required.
 * Bootstraps application only when not running tests.
 */

define({
  load: function(name, req, onLoad, config) {
    
    var that = this;
    var loadApplication = function () {
      if (window.jasmine) {
        // Don't initialise app when running unit tests
        onLoad.call(that);
      } else {
        // Load controller for this page
        var controller = $('#wrapper').data('controller');
        req([controller], function (controller) {
          onLoad.call(that);
        });
      }
    }
    
    // first, ensure that we have jquery available
    req(['jquery'], function ($) {
      
      // wait until document is fully loaded to ensure we can read config
      $(document).ready(function () {
        
        // inspect configuration
        var backdropUrl = $('#wrapper').data('backdrop-url');
        if (!window.jasmine && backdropUrl && backdropUrl.indexOf('//fakeapi') == -1) {
          // use real API
          loadApplication();
        } else {
          // use fake API
          req(['fakeapi'], function (fakeapi) {
            loadApplication();
          });
        }
      });
    });
  }
});
