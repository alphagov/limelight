define([
  'extensions/collections/graphcollection'
],
function (GraphCollection) {
  var Availability = GraphCollection.extend({

    initialize: function (models, options) {
      if (!_.isString(options.serviceName)) {
        throw "options argument has no serviceName property";
      }
      this.serviceName = options.serviceName;
      GraphCollection.prototype.initialize.apply(this, arguments);
    },

    serviceName: undefined,
    apiName: 'monitoring',

    queryParams: function () {
      return {
        period: "day",
        collect: ["downtime:sum", "uptime:sum", "unmonitored:sum", "avgresponse:mean"]
      };
    },

    parse: function (response) {
      var data = response.data;
      _.each(data, function (d) {
        d.uptime = d["uptime:sum"];
        d.downtime = d["downtime:sum"];
        d.unmonitored = d["unmonitored:sum"];
        d.avgresponse = d["avgresponse:mean"];
        if (d.downtime === null && d.uptime === null) {
          d.total = null;
          d.uptimeFraction = null;
        } else {
          d.total = d.downtime + d.uptime;
          d.uptimeFraction = d.uptime / d.total;
        }
        d._end_at = this.moment(d._end_at);
        d._start_at = this.moment(d._start_at);
        d._timestamp = d._end_at;
      });
      return {
        id: 'availability',
        title: 'Availability',
        values: data
      };
    },

    _getTotalUptime: function () {
      return this.at(0).get('values').reduce(function (memo, model) {
        return memo + model.get('uptime');
      }, 0);
    },

    _getTotalTime: function ( includeUnmonitored ) {
      return this.at(0).get('values').reduce(function (memo, model) {
        var res = memo + model.get('total');
        if (includeUnmonitored) {
          res += model.get('unmonitored');
        }
        return res;
      }, 0);
    },

    getFractionOfUptime: function () {
      return this._getTotalUptime() / this._getTotalTime();
    },

    getAverageResponseTime: function () {
      var values = this.at(0).get('values');
      var total = values.reduce(function (memo, model) {
        return memo + model.get('avgresponse');
      }, 0);
      return total / values.length;
    }

  });

  return Availability;
});
