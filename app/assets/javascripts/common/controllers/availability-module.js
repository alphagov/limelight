define([
  'extensions/collections/graphcollection',
  'extensions/collections/availability-for-24-hours',
  'extensions/views/single-stat',
  'extensions/views/availability/uptime-number',
  'extensions/views/availability/uptime-graph',
  'extensions/views/availability/response-time-number',
  'extensions/views/availability/response-time-graph'
],
function (GraphCollection, AvailabilityCollection,
          SingleStatView, UptimeNumber, UptimeGraph,
          ResponseTimeNumber, ResponseTimeGraph) {

  return function (serviceName) {
    if (!$('#availability').length) {
      return;
    }

    var availabilityCollection = new AvailabilityCollection(null, {
      serviceName: serviceName
    });

    new UptimeNumber({
      el: $('#availability .uptime'),
      collection: availabilityCollection
    });

    new UptimeGraph({
      el: $('#availability .uptime-graph'),
      collection: availabilityCollection
    });

    new ResponseTimeNumber({
      el: $('#availability .response-time'),
      collection: availabilityCollection,
      getStatFunction: function (c) { return Math.round(c.getAverageResponseTime()) + 'ms'; }
    });

    new ResponseTimeGraph({
      el: $('#availability .response-time-graph'),
      collection: availabilityCollection
    });

    availabilityCollection.fetch();
  };
  
});
