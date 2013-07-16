define([
  'extensions/collections/collection'
],
function (Collection) {
  var AvailabilityFor24HoursCollection = Collection.extend({

    initialize: function (models, options) {
      if (!_.isString(options.serviceName)) {
        throw "options argument has no serviceName property";
      }
      this.serviceName = options.serviceName;
      Collection.prototype.initialize.apply(this, arguments);
    },

    serviceName: undefined,
    apiName: 'monitoring',

    queryParams: function () {
      return {
        sort_by: "_timestamp:descending",
        limit: 24
      };
    },

    parse: function (response) {
      var data = response.data;
      _.each(data, function (d) {
        d.total = d.downtime + d.unmonitored + d.uptime;
        d.uptimeFraction = d.uptime / d.total;
      });
      return data;
    },

    _getTotalUptime: function () {
      return this.reduce(function (memo, model) {
        return memo + model.get('uptime');
      }, 0)
    },

    _getTotalTime: function () {
      return this.reduce(function (memo, model) {
        return memo + model.get('total');
      }, 0)
    },

    getPercentageOfUptime: function () {
      return 100 * (this._getTotalUptime() / this._getTotalTime());
    },

    getAverageResponseTime: function () {
      var total = this.reduce(function (memo, model) {
        return memo + model.get('avgresponse');
      }, 0);
      return total / this.length;
    }

  });

  return AvailabilityFor24HoursCollection;
});
