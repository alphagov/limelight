define([
  'extensions/collections/availability-for-24-hours',
  'extensions/views/single-stat',
  'extensions/views/uptime-graph'
],
function (FCO24HourAvailabilityCollection, SingleStatView, UptimeGraph) {

  return function (serviceName) {
    if (!$('#uptime').length || !$('#response-time').length) {
      return;
    }

    var availabilityCollection = new FCO24HourAvailabilityCollection(null, {
      serviceName: serviceName,
      checkName: serviceName
    });

    new SingleStatView({
      el: $('#uptime'),
      collection: availabilityCollection,
      getStatFunction: function (c) {
        return Math.round(c.getPercentageOfUptime()) + '%';
      }
    });

    new SingleStatView({
      el: $('#response-time'),
      collection: availabilityCollection,
      getStatFunction: function (c) { return Math.round(c.getAverageResponseTime()) + 'ms'; }
    });
    
    availabilityCollection.fetch();
  };
  
});
