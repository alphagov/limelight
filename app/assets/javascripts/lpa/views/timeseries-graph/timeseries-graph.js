define([
  'require',
  'extensions/views/timeseries-graph/timeseries-graph',
  './callout'
],
function (require, TimeseriesGraph, Callout) {
  var LPATimeseriesGraph = TimeseriesGraph.extend({
    
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis },
        { view: this.sharedComponents.stack },
        { view: Callout },
        { view: this.sharedComponents.hover }
      ];
    },

    YScaleFunction: "calcYSeriesSum"
    
  });
  
  return LPATimeseriesGraph;
});
