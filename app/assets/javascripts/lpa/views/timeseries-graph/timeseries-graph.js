define([
  'require',
  'extensions/views/timeseries-graph/timeseries-graph',
  'extensions/views/graph/linelabel',
  './callout'
],
function (require, TimeseriesGraph, LineLabel, Callout) {
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
        { view: Callout },
        { view: this.sharedComponents.hover }
      ];
    },

    getConfigNames: function () {
      return ['stack', 'week'];
    }
    
  });
  
  return LPATimeseriesGraph;
});
