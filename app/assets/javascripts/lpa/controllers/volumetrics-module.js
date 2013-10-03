define([
  'extensions/collections/graphcollection',
  'extensions/collections/volumetrics',
  'extensions/views/volumetrics/completion-graph',
  'extensions/views/volumetrics/number'
],
function (GraphCollection, 
          VolumetricsCollection,
          VolumetricsCompletionGraph, 
          VolumetricsNumberView) {
  return function () {

    var serviceName = $("#wrapper").data("service-name");

    if (!$('.lte-ie8').length) {
      if ($('#application-method-over-time').length) {

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

      }
    }
  }
});
