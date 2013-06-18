define([
  'extensions/collections/graphcollection',
  'fco/collections/conversion-series',
  'extensions/views/conversion-graph/conversion-graph',
  'extensions/views/conversion-graph/headline',
  'extensions/views/conversion-success-rate'
], function (GraphCollection, ConversionCollection, ConversionGraph, ConversionGraphHeadlineView, SuccessRateView) {
  return function () {

    var serviceName = $("#wrapper").data("service-name");

    var conversionCollection = new GraphCollection(null, {
      collections: [{collection: ConversionCollection, options: {monthsAgo: 1}},
                    {collection: ConversionCollection, options: {monthsAgo: 0}}],
      serviceName: serviceName
    });

    if (!$('.lte-ie8').length) {
      var conversionGraph = new ConversionGraph({
        el: $('#applications-conversion-graph'),
        collection: conversionCollection
      });
    }

    var successRate = new SuccessRateView({
      el: $('#applications-success-rate'),
      collection: conversionCollection.collectionInstances[0],
      startStep: serviceName + ':start',
      endStep: serviceName + ':done'
    });

    var conversionGraphHeadlineView = new ConversionGraphHeadlineView({
      el: $('#applications-conversion-graph').siblings('h2'),
      collection: conversionCollection,
      title: 'Percentages of unique visitors at each stage'
    });

    conversionCollection.fetch();
  };
});
