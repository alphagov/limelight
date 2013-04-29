module.exports = {
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,

    baseUrl: 'app/',

    paths: {
      lodash: 'vendor/lodash',
      backbone: 'vendor/backbone',
      css: 'vendor/require-css',
      modernizr: 'vendor/modernizr',
      moment: 'vendor/moment',
      text: 'vendor/text',
      tpl: 'vendor/tpl'
    },
    
    shim: {
      backbone: {
        deps: ['lodash', 'jquery'],//, 'jquerymousewheel'] , 'jqueryxdr'],
        exports: 'Backbone'
      },
    
      modernizr: {
        exports: 'Modernizr'
      },
    
      moment: {
        exports: 'Moment'
      }
    }
};
