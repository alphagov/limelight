define([
  'extensions/collections/graphcollection',
  'extensions/collections/availability-for-24-hours',
  'extensions/views/single-stat',
  'extensions/views/availability/current-selection',
  'extensions/views/availability/uptime-number',
  'extensions/views/availability/uptime-graph',
  'extensions/views/availability/response-time-number',
  'extensions/views/availability/response-time-graph'
],
function (GraphCollection, FCO24HourAvailabilityCollection,
          SingleStatView, CurrentSelection, UptimeNumber, UptimeGraph,
          ResponseTimeNumber, ResponseTimeGraph) {

  return function (serviceName) {
    if (!$('#uptime').length || !$('#response-time').length) {
      return;
    }

    var availabilityCollection = new FCO24HourAvailabilityCollection(null, {
      serviceName: serviceName,
      checkName: serviceName
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

    new CurrentSelection({
      el: $('#availability-selection'),
      collection: availabilityCollection
    });

    availabilityCollection.fetch();
  };
  
});
