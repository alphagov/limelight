define([
  'backbone'
], function (Backbone) {

  var mapRecursive = function(object, func) {
    var recur = function (object) {
      if (_.isArray(object)) {
        return _.map(object, recur);
      }

      if (_.isObject(object)) {
        return _.reduce(object, function (memo, value, key) {
          memo[key] = recur(value);
          return memo;
        }, {});
      }

      return func(object);
    };

    return recur(object);
  };

  var escapeHtml = function (object) {
    return mapRecursive(object, function (value) {
      if (_.isString(value)) {
        return _.escape(value);
      }
      return value;
    });
  };

  var SafeSync = {};

  SafeSync.sync = function (method, model, options) {
    this.loading = true;
    this.trigger('loading');
    
    var that = this;
    var success = options.success;
    options.success = function (resp, status, xhr) {
      that.loading = false;
      var escaped = escapeHtml(resp);
      if (success) success(escaped, status, xhr);
    };
    var error = options.error;
    options.error = function(xhr, status, thrown) {
      that.loading = false;
      if (error) error(xhr, status, thrown);
    };
    
    Backbone.sync.apply(this, arguments);
  };

  return SafeSync;
});
