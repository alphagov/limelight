define([
  'extensions/collections/visitors-realtime',
  'extensions/views/visitors-realtime'
], function (VisitorsRealtimeCollection, VisitorsRealtimeView) {
  return function () {

    if ($('#govuk-realtime').length) {
      var updateInterval = 120 * 1000;
      var visitorsRealtimeCollection = new VisitorsRealtimeCollection([],{
        serviceName: "government"
      });

      var visitorsRealtimeView = new VisitorsRealtimeView({
        el: $('#govuk-realtime'),
        collection: visitorsRealtimeCollection,
        collectionUpdateInterval: updateInterval
      });

      visitorsRealtimeCollection.fetch();

      setInterval(function () {
        visitorsRealtimeCollection.fetch();
      }, updateInterval);
    }

  };
});
