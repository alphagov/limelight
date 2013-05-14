var argv = require('optimist').argv;

var options = {
  verbose: argv.verbose || false
};

require('expectations');

var webdriver = require('wd-sync');

var webdriverArgs = [
  argv.driverUrl,
  argv.driverPort,
  argv.driverUser,
  argv.driverToken
];



var client = webdriver.remote.apply(this, webdriverArgs)
    , browser = client.browser
    , sync = client.sync;



var desiredCapabilities = {
  browserName: argv.browserName,
  version: argv.browserVersion,
  platform: argv.browserPlatform
};

var baseUrl = argv.baseUrl || "http://localhost:3000";


exports.World = function WorldConstructor(callback) {
    
  this.sync = sync;
  this.browser = browser;
  
  if (options.verbose) {
    browser.on('status', function(info){
      console.log('\x1b[36m%s\x1b[0m', info);
    });
  
    browser.on('command', function(meth, path){
      console.log(' > \x1b[33m%s\x1b[0m: %s', meth, path);
    });
  }
  
  

  
  this.get = function(url) {
    browser.get(baseUrl + url);
  };
  
  this.remote = function (remoteFunction, args) {
    var remoteString = 'return (' + remoteFunction.toString() + ').apply(this, arguments)';
    return browser.execute(remoteString, args);
  };
  
  sync(function () {
    callback();
  });
};


exports.setup = function () {
  var Before = this.Before;
  this.Before = function (func) {
    Before.call(this, function (callback) {
      var that = this;
      this.sync(function () {
        func.call(that);
        callback();
      });
    });
  };
  
  var After = this.After;
  this.After = function (func) {
    After.call(this, function (callback) {
      var that = this;
      this.sync(function () {
        func.call(that);
        callback();
      });
    });
  };
  
  var When = this.When;
  this.When = function (expression, func) {
    When.call(this, expression, function () {
      var that = this;
      var matches = Array.prototype.slice.call(arguments);
      var callback = matches.pop();
      
      this.sync(function () {
        try {
          func.apply(that, matches);
          callback();
        } catch (e) {
          callback.fail(e.message);
        }
      });
    });
  };
  
  
  var Then = this.Then;
  this.Then = function (expression, func) {
    Then.call(this, expression, function () {
      var that = this;
      var matches = Array.prototype.slice.call(arguments);
      var callback = matches.pop();
      
      this.sync(function () {
        try {
          func.apply(that, matches);
          callback();
        } catch (e) {
          callback.fail(e.message);
        }
      });
    });
  };
  
  
  this.Before(function () {
    this.browser.init(desiredCapabilities);
  });
  
  this.After(function () {
    this.browser.quit();
  });
  
  
  
  
}