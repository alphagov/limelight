var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require,

    baseUrl: 'app/',

    paths: {
      // jquery: 'jqueryloader',
      // jqueryxdr: 'vendor/jquery.xdr',
      // jquerymousewheel: 'vendor/jquery.mousewheel',
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
        deps: ['lodash'],//, 'jquerymousewheel'] , 'jqueryxdr'],
        exports: 'Backbone'
      },
    
      modernizr: {
        exports: 'Modernizr'
      },
    
      moment: {
        exports: 'Moment'
      }
    }
});

var express = require('express')
  , cons = require('consolidate')
  , swig = require('swig')
  , http = require('http')
  , path = require('path');


global.isServer = true;
global.baseUrl = 'http://publicapi.dev.gov.uk/';

var $ = global.$ = global.jQuery = require('jquery');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
$.support.cors = true;
$.ajaxSettings.xhr = function () {
    return new XMLHttpRequest;
}


var routes = requirejs('./routes');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.compress());
  app.use(app.router);
  app.use('/limelight/js', express.static(path.join(__dirname, 'app')));
  app.use('/limelight/js', express.static(path.join(__dirname, 'test')));
  app.use('/limelight', express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(path.join(__dirname, 'public', 'favicon.ico')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

routes(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
