({
  name: "main",

  deps: [
    "common/controllers/services",
    "fco/controllers/overview",
    "hmrc/controllers/overview",
    "licensing/controllers/authorities",
    "licensing/controllers/licences",
    "licensing/controllers/overview",
    "licensing/controllers/per_authority",
    "licensing/controllers/per_licence",
    "common/controllers/preprocessors/module_touch_actions",
    "common/controllers/preprocessors/partial_experience_warning",
    "lpa/controllers/overview"
  ],

  out: "production.js",

  preserveLicenseComments: false,

  baseUrl: ".",


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
  },

  excludeShallow: [ 'd3' ]
})