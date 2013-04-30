var baseUrl = GOVUK.config.baseUrl || '/limelight';

var requireConfig = {
  baseUrl: baseUrl,

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
      deps: ['lodash', 'jquery', 'jqueryxdr', 'jquerymousewheel'],
      exports: 'Backbone'
    },
    jqueryxdr: {
      deps: ['jquery'],
      exports: '$'
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
