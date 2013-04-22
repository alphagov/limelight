define([
  'backbone'
],
function (Backbone) {

  var bbSync = Backbone.sync;

  Backbone.sync = function(method, model, options) {
    var success = options.success;
    options.success = function(resp, status, xhr) {
      var escaped = Backbone.escapeHtml(resp);
      success(escaped, status, xhr);
    };
    bbSync.apply(this, arguments);
  };

  function mapRecursive(object, func) {
    var recur = function(object) {
      if (_.isArray(object)) {
        return object.map(recur);
      }

      if (_.isObject(object)) {
        return _.reduce(object, function(memo, value, key) { memo[key] = recur(value); return memo; }, {});
      }

      return func(object);
    };

    return recur(object);
  }

  Backbone.escapeHtml = function(object) {
    return mapRecursive(object, function(value) {
      if (_.isString(value)) {
        return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      }
      return value;
    });
  };
});
