define([
  'require',
  'vehicle-excise-duty/collections/services',
  'vehicle-excise-duty/collections/channels',
  'vehicle-excise-duty/views/timeseries-graph'
], function (require,
  ServicesCollection, ChannelsCollection, TimeseriesGraph) {

  return function () {

    var servicesCollection = new ServicesCollection();
    var servicesGraph = new TimeseriesGraph({
      el: $('#vehicle-excise-duty-services'),
      collection: servicesCollection
    });
    servicesCollection.fetch();
    
    var channelsCollection = new ChannelsCollection();
    var channelsGraph = new TimeseriesGraph({
      el: $('#vehicle-excise-duty-channels'),
      collection: channelsCollection
    });
    channelsCollection.fetch();
  };
});