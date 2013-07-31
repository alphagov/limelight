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
    if (!$('#uptime').length || !$('#response-time').length) {
      return;
    }

    var availabilityCollection = new AvailabilityCollection(null, {
      serviceName: serviceName
    });

    new UptimeNumber({
      el: $('#uptime'),
      collection: availabilityCollection
    });

    new UptimeGraph({
      el: $('#uptime-graph'),
      collection: availabilityCollection
    });

    new ResponseTimeNumber({
      el: $('#response-time'),
      collection: availabilityCollection,
      getStatFunction: function (c) { return Math.round(c.getAverageResponseTime()) + 'ms'; }
    });

    new ResponseTimeGraph({
      el: $('#response-time-graph'),
      collection: availabilityCollection
    });

    availabilityCollection.fetch();
  };
  
});
