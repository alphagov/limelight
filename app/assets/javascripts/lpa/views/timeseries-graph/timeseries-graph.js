define([
  'extensions/views/timeseries-graph/timeseries-graph'
],
function (TimeseriesGraph) {
  var LPATimeseriesGraph = TimeseriesGraph.extend({
    
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis },
        {
          view: this.sharedComponents.stack,
          options: {
            selectGroup: false,
            drawCursorLine: true
          }
        },
        {
          view: this.sharedComponents.linelabel,
          options: {
            showValues: true,
            showValuesPercentage: true,
            showSummary: true,
            showTimePeriod: true
          }
        },
        {
          view: this.sharedComponents.callout,
          options: {
            showPercentage: true
          }
        },
        { view: this.sharedComponents.hover }
      ];
    },

    getConfigNames: function () {
      return ['stack', 'week'];
    }
    
  });
  
  return LPATimeseriesGraph;
});
