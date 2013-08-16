define([
  'require',
  'vehicle-excise-duty/collections/services',
  'vehicle-excise-duty/collections/channels',
  'vehicle-excise-duty/views/timeseries-graph',
  'extensions/views/timeseries-graph/timeseries-graph',
  './failures-module',
  'common/controllers/availability-module'
], function (require,
  ServicesCollection, ChannelsCollection, ServicesTimeseriesGraph,
  TimeseriesGraph, failuresModule, availabilityModule) {

  return function () {

    var servicesCollection = new ServicesCollection([], {});
    servicesCollection.fetch();
    new ServicesTimeseriesGraph({
      el: $('#vehicle-excise-duty-services'),
      collection: servicesCollection
    });

    var taxDiscCollection = new ServicesCollection([], {
      seriesList: [{ id: 'successful_tax_disc', title: 'Tax-disc' }]
    });
    taxDiscCollection.fetch();
    new TimeseriesGraph({
      el: $('#tax-disc-volumes'),
      collection: taxDiscCollection
    });

    var channelsCollection = new ChannelsCollection([], {});
    channelsCollection.fetch();
    new ServicesTimeseriesGraph({
      el: $('#vehicle-excise-duty-channels'),
      collection: channelsCollection
    });

    failuresModule('#tax-disc-failures', 'tax-disc');
    failuresModule('#sorn-failures', 'sorn');

    availabilityModule('tax-disc', '#tax-disc-availability');
    availabilityModule('register-sorn-statutory-off-road-notification', '#sorn-availability');
  };
});