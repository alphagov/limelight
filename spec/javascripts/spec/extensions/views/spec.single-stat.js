define([
  'extensions/views/single-stat',
  'licensing/collections/licensing-availability-for-24-hours'
], function (SingleStatView, LicensingAvailabilityFor24HoursCollection) {
  describe("SingleStatView", function () {
    it("Should display uptime percentage", function () {
      var collection = new LicensingAvailabilityFor24HoursCollection(
        {"data": [{
          "uptime": 3,
          "downtime": 1,
          "unmonitored": 6
        }]});

      var view = new SingleStatView({collection: collection});

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>30%</strong>");
      });
    });

    xit("Should display response time", function () {
      var collection = new LicensingAvailabilityFor24HoursCollection(
        {"data": [{
          "uptime": 3,
          "downtime": 1,
          "unmonitored": 6
        }]});

      var view = new SingleStatView({collection: collection});

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual("<strong>30%</strong>");
      });
    });
  });
});
