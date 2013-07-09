define([
  'lpa/collections/application-method-over-time',
  'lpa/views/timeseries-graph/timeseries-graph'
],
function (ApplicationsCollection, ApplicationsGraph) {
  return function () {

    if (!$('.lte-ie8').length) {
      var applicationsCollection = new ApplicationsCollection();

      var graphView = new ApplicationsGraph({
        el: $('#application-method-over-time'),
        collection: applicationsCollection
      });

      applicationsCollection.fetch();
    }

  };
});
