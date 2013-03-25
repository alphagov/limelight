// Set the require.js configuration for your application.
require.config({

  deps: [
    'fakeapi',
    // get controller path for this page from wrapper element
    window.$ && $('#wrapper').data('controller')
  ],

  paths: {
    jquery: '/assets/vendor/jquery',
    jqueryxdr: '/assets/vendor/jquery.xdr',
    jquerymousewheel: '/assets/vendor/jquery.mousewheel',
    jquerymockjax: '/assets/helpers/jquery.mockjax',
    lodash: '/assets/vendor/lodash',
    backbone: '/assets/vendor/backbone',
    css: '/assets/vendor/require-css',
    modernizr: '/assets/vendor/modernizr',
    moment: '/assets/vendor/moment',
    tpl: '/assets/vendor/tpl',
    d3: '/assets/vendor/d3.v3',
  },

  shim: {
    backbone: {
      deps: ['lodash', 'jquery', 'jqueryxdr', 'jquerymousewheel'],
      exports: 'Backbone'
    },

    modernizr: {
      exports: 'Modernizr'
    },

    moment: {
      exports: 'Moment'
    },
    
    jqueryxdr: {
      deps: ['jquery']
    },

    jquerymousewheel: {
      deps: ['jquery']
    },

    jquerymockjax: {
      deps: ['jquery']
    },

    d3: {
      exports: 'd3'
    }
  }

});
