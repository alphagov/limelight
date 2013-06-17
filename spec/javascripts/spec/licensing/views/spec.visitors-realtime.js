define([
  'licensing/views/visitors-realtime',
  'extensions/collections/collection'
],
function (VisitorsRealtimeView, Collection) {
  describe("VisitorsRealtimeView", function () {
    it("renders a number", function () {
      var view = new VisitorsRealtimeView({
        collection: new Collection([{
          "unique_visitors": 10
        }])
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual(
          '<strong>10</strong> Users online now'
        )
      })
    });

    it("renders nothing when there's no data", function () {
      var view = new VisitorsRealtimeView({
        collection: new Collection([])
      });

      jasmine.renderView(view, function () {
        expect(view.$el.html()).toEqual('');
      });
    })
  })
});