define([
  'lpa/collections/application-method-over-time',
  'lpa/views/timeseries-graph/timeseries-graph',
  'common/controllers/availability-module'
],
function (ApplicationsCollection, ApplicationsGraph,
          availabilityModule) {
  return function () {

    if (!$('.lte-ie8').length && $('#application-method-over-time').length) {
      var applicationsCollection = new ApplicationsCollection();

      var graphView = new ApplicationsGraph({
        el: $('#application-method-over-time'),
        collection: applicationsCollection
      });

      applicationsCollection.fetch();
    }

    availabilityModule('lasting-power-of-attorney', 'lpa');
  }
});
