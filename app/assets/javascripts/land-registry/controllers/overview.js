define([
  'land-registry/collections/sims-over-time',
  'extensions/views/timeseries-graph/stacked-graph',
  'extensions/views/timeseries-graph/multi-timeseries-graph'
],
function (SIMSCollection, ApplicationsGraph, TSGraph) {
  return function () {

    if (!$('.lte-ie8').length && $('#sims-by-input-channel').length) {
      var collection = new SIMSCollection();

      var graphView = new ApplicationsGraph({
        el: $('#sims-by-input-channel'),
        collection: collection,
        showLineLabels: true
      });

      var anotherGraphView = new TSGraph({
        el: $('#timeseries-sims-graph'),
        collection: collection
      });

      collection.fetch();
    }

  };
});
