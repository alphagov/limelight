define([
  'require',
  './failures-module',
  'common/controllers/availability-module',
  './vehicle-license-volumes-module',
  './digital-takeup-module',
  'extensions/collections/visitors-realtime',
  'extensions/views/visitors-realtime',
  './customer-satisfaction-module'
], function (require, failuresModule, availabilityModule, volumesModule, takeupModule, RealtimeCollection, RealtimeView, consumerSatisfactionModule) {
  return function () {
    var service = $('#wrapper').data('service-name'),
        serviceNames = {
          'sorn': 'register-sorn-statutory-off-road-notification',
          'tax-disc': 'tax-disc'
        },
      serviceName = serviceNames[service];

    volumesModule('#' + service + '-volumes', 'successful_' + service.replace("-", "_"), service);

    takeupModule('#' + service + '-takeup', service);

    failuresModule('#' + service + '-failures', service);

    availabilityModule(serviceName, '#' + service + '-availability');

    consumerSatisfactionModule("#customer-satisfaction", service);

    var updateInterval = 120*1000;

    var realtimeCollection = new RealtimeCollection([],{
      serviceName: serviceName
    });

    var realtimeView = new RealtimeView({
      el: $('#' + service + '-realtime'),
      collection: realtimeCollection,
      collectionUpdateInterval: updateInterval
    });

    realtimeCollection.fetch();

    setInterval(function () {
      realtimeCollection.fetch();
    }, updateInterval);
  };
});
