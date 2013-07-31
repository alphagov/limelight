define([
  'require',
  'extensions/views/graph/graph',
  './xaxis',
  'extensions/views/graph/yaxis',
  './line',
  './stack',
  'extensions/views/graph/hover',
  './callout'
],
function (require, Graph, XAxis, YAxis, Line, Stack, Hover, Callout) {
  var TimeseriesGraph = Graph.extend({
    
    sharedComponents: {
      xaxis: XAxis,
      yaxis: YAxis,
      line: Line,
      stack: Stack,
      callout: Callout,
      hover: Hover
    },
    
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis },
        { view: this.sharedComponents.stack },
        { view: this.sharedComponents.callout },
        { view: this.sharedComponents.hover }
      ];
    },

    getConfigNames: function () {
      return ['overlay', this.collection.query.get('period') || 'week'];
    }
  });
  
  return TimeseriesGraph;
});
