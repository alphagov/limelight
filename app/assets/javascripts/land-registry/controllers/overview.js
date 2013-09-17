define([
  'land-registry/collections/sims-over-time',
  'extensions/views/timeseries-graph/multi-timeseries-graph'
],
function (SIMSCollection, ApplicationsGraph) {
  return function () {

    if (!$('.lte-ie8').length && $('#sims-by-input-channel').length) {
      var collection = new SIMSCollection();

      var graphView = new ApplicationsGraph({
        el: $('#sims-by-input-channel'),
        collection: collection
      });

      collection.fetch();
    }

  };
});
