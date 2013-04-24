var baseUrl, requireConfig;

baseUrl = '/limelight';

requireConfig = {
    baseUrl: baseUrl,

    paths: {
      jquery: 'jqueryloader',
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
};

require.config(requireConfig);

require(['bootstrap']);
