define([
  'extensions/views/timeseries-graph/timeseries-graph'
],
function (TimeseriesGraph) {
  var VolumetricsGraph = TimeseriesGraph.extend({

    numYTicks: 3,

    getConfigNames: function () {
      return ['stack', 'week'];
    },
    
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis },
        {
          view: this.sharedComponents.stack,
          options: { drawCursorLine: true }
        },
        { view: this.sharedComponents.hover }
      ];
    }
  });

  return VolumetricsGraph;
});
