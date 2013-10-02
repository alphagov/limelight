define([
  'lpa/collections/application-method-over-time',
  'extensions/views/timeseries-graph/stacked-graph',
  'extensions/collections/multiconversioncollection',
  'lpa/collections/conversion-series',
  'extensions/views/conversion-graph/conversion-graph',
  'lpa/collections/help-usage', 'lpa/views/help-usage-table',
  'common/controllers/availability-module',
  'extensions/collections/graphcollection',
  'fco/collections/volumetrics',
  'fco/views/volumetrics-submissions-graph',
  'fco/views/volumetrics-completion-graph',
  'fco/views/volumetrics-number'
],
function (ApplicationsCollection, ApplicationsGraph,
          MultiConversionCollection, ConversionSeries, ConversionGraph,
          HelpUsageCollection, HelpUsageTable,
          availabilityModule, GraphCollection, VolumetricsCollection,
          VolumetricsSubmissionsGraph, VolumetricsCompletionGraph
          , VolumetricsNumberView) {
  return function () {

    var serviceName = $("#wrapper").data("service-name");

    if (!$('.lte-ie8').length) {

      if ($('#application-method-over-time').length) {
        var applicationsCollection = new ApplicationsCollection();

        var graphView = new ApplicationsGraph({
          el: $('#application-method-over-time'),
          collection: applicationsCollection,
          showLineLabels: true
        });

        applicationsCollection.fetch();
      }

      /*here*/
      var volumetricsCollection = new VolumetricsCollection([], {
        serviceName: serviceName,
        startMatcher: /user\/login/,
        endMatcher: /create\/complete/,
        matchingAttribute: "eventLabel"
      });

      var volumetricsCompletion = new GraphCollection();
      volumetricsCollection.on('reset', function () {
        volumetricsCompletion.reset([volumetricsCollection.completionSeries()]);
      });

      var volumetricsCompletionNumber = new VolumetricsNumberView({
        collection:volumetricsCompletion,
        el:$('#volumetrics-completion-selected'),
        valueAttr: 'totalCompletion',
        selectionValueAttr: 'completion',
        formatValue: function (value) {
          return this.formatPercentage(value);
        }
      });

      var volumetricsCompletionGraph = new VolumetricsCompletionGraph({
        el:$('#volumetrics-completion'),
        collection:volumetricsCompletion,
        valueAttr:'completion'
      });

      volumetricsCollection.fetch();
      /*here end*/

      if ($('#lpa-conversion-graph').length) {
        var conversionCollection = new MultiConversionCollection(null, {
          conversionCollection: ConversionSeries
        });

        var conversionGraph = new ConversionGraph({
          el: $('#lpa-conversion-graph'),
          collection: conversionCollection
        });

        conversionCollection.fetch();
      }
    }

    var helpUsageCollection = new HelpUsageCollection();

    new HelpUsageTable({
       el: $('.help-usage-table'),
       collection: helpUsageCollection
    });

    helpUsageCollection.fetch();

    availabilityModule('lasting-power-of-attorney');
  }
});
