define([
  'require',
  'vehicle-excise-duty/collections/channels',
  'vehicle-excise-duty/views/channels-graph',
  './failures-module',
  'common/controllers/availability-module'
], function (require,
  ChannelsCollection, ChannelsGraph,
  failuresModule, availabilityModule) {

  return function () {

    var channelsCollection = new ChannelsCollection();
    var channelsGraph = new ChannelsGraph({
      el: $('#vehicle-excise-duty-channels'),
      collection: channelsCollection
    });
    channelsCollection.fetch();
    
    failuresModule('#tax-disc-failures', 'tax-disc');
    failuresModule('#sorn-failures', 'sorn');

    availabilityModule('tax-disc', '#tax-disc-availability');
    availabilityModule('register-sorn-statutory-off-road-notification', '#sorn-availability');
  };
});