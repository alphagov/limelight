define([
  'extensions/collections/graphcollection',
  'extensions/collections/singleitemgraphcollection',
  'fco/collections/conversion-series',
  'extensions/views/conversion-graph/conversion-graph',
  'extensions/views/conversion-success-rate'
],
function (GraphCollection, SingleItemGraphCollection,
          ConversionCollection, ConversionGraph, SuccessRateView) {

  return function (serviceName) {

    if ($('.lte-ie8').length) {
      // do not attempt to show graphs in legacy IE
      return;
    }

    var conversionCollection = new SingleItemGraphCollection(null, {
      conversionCollection: ConversionCollection,
      serviceName: serviceName
    });

    var conversionGraph = new ConversionGraph({
      el:$('#applications-conversion-graph'),
      collection:conversionCollection
    });

    conversionCollection.fetch();
  };
});
