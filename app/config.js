// $(document).ready(function () {
  
  // var baseUrl = $('#wrapper').data('base-url') || '/limelight';
  var baseUrl = '/limelight/js';
  
  require.config({

    baseUrl: baseUrl,

    deps: ['bootstrap'],

    paths: {
      jquery: 'vendor/jquery',
      jqueryxdr: 'vendor/jquery.xdr',
      jquerymousewheel: 'vendor/jquery.mousewheel',
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      css: 'vendor/require-css',
      modernizr: 'vendor/modernizr',
      moment: 'vendor/moment',
      tpl: 'vendor/tpl',
      d3: 'vendor/d3.v3'
    },

    shim: {
      backbone: {
        deps: ['lodash', 'jqueryxdr', 'jquerymousewheel'],
        exports: 'Backbone'
      },

      modernizr: {
        exports: 'Modernizr'
      },

      moment: {
        exports: 'Moment'
      },

      d3: {
        exports: 'd3'
      }
    }

  });
// })


// require('application!');

