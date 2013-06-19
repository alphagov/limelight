define([
  'extensions/collections/collection'
],
function (Collection) {
  var LicensingAvailabilityFor24HoursCollection = Collection.extend({
    queryParams: function () {
      return {
        filter_by: "check:licensing",
        sort_by: "_timestamp:descending",
        limit: 24
      };
    },
    _getTotalUptime: function () {
      var listOfUptimes = this.pluck("uptime");
      var total = _.reduce(listOfUptimes, function (sum, number) { return sum + number; }, 0);
      return total;
    },
    _getTotalTime: function () {
      var listOfTimes = this.pluck("downtime").concat(this.pluck("unmonitored")).concat(this.pluck("uptime"));
      var total = _.reduce(listOfTimes, function (sum, number) { return sum + number; }, 0);
      return total;
    },
    getPercentageOfUptime: function () {
      return 100 * (this._getTotalUptime() / this._getTotalTime());
    }
  });
  return LicensingAvailabilityFor24HoursCollection;
});