define([
  'extensions/collections/graphcollection',
  'fco/collections/conversion-series',
  'extensions/views/conversion-graph/conversion-graph',
  'extensions/views/conversion-success-rate'
],
function (GraphCollection, ConversionCollection,
          ConversionGraph, SuccessRateView) {

  return function (serviceName) {

    var conversionCollection = new GraphCollection(null, {
      collections:[
        {collection:ConversionCollection, options:{weeksAgo:1}},
        {collection:ConversionCollection, options:{weeksAgo:0}}
      ],
      serviceName: serviceName
    });

    if (!$('.lte-ie8').length) {
      var conversionGraph = new ConversionGraph({
        el:$('#applications-conversion-graph'),
        collection:conversionCollection
      });
    }

    conversionCollection.fetch();
  };
});
