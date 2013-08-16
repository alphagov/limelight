define([
  'require',
  'vehicle-excise-duty/collections/services',
  'vehicle-excise-duty/collections/channels',
  'vehicle-excise-duty/views/timeseries-graph',
  'extensions/views/timeseries-graph/timeseries-graph',
  'extensions/views/tabs',
  'extensions/views/graph/headline',
  './failures-module',
  'common/controllers/availability-module',
  './vehicle-license-volumes-module'
], function (require,
  ServicesCollection, ChannelsCollection, ServicesTimeseriesGraph,
  TimeseriesGraph, Tabs, Headline, failuresModule, availabilityModule,
  volumesModule) {

  return function () {

    var servicesCollection = new ServicesCollection([], {});
    servicesCollection.fetch();
    new ServicesTimeseriesGraph({
      el: $('#vehicle-excise-duty-services'),
      collection: servicesCollection
    });

    var channelsCollection = new ChannelsCollection([], {});
    channelsCollection.fetch();
    new ServicesTimeseriesGraph({
      el: $('#vehicle-excise-duty-channels'),
      collection: channelsCollection
    });

    volumesModule('#tax-disc-volumes', 'successful_tax_disc', 'Tax disc');
    volumesModule('#sorn-volumes', 'successful_sorn', 'SORN');

    failuresModule('#tax-disc-failures', 'tax-disc');
    failuresModule('#sorn-failures', 'sorn');

    availabilityModule('tax-disc', '#tax-disc-availability');
    availabilityModule('register-sorn-statutory-off-road-notification', '#sorn-availability');
  };
});