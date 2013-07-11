define([
  'require',
  'extensions/views/graph/graph',
  './xaxis',
  './yaxis',
  './stack',
  'extensions/views/graph/hover',
  './callout'
],
function (require, Graph, XAxis, YAxis, Stack, Hover, Callout) {
  var TimeseriesGraph = Graph.extend({
    
    sharedComponents: {
      xaxis: XAxis,
      yaxis: YAxis,
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

    yAxisInstance: function() {
      return this.componentInstances[1];
    },

    getConfigNames: function () {
      return ['overlay', this.collection.query.get('period') || 'week'];
    },

    minYDomainExtent: 6
  });
  
  return TimeseriesGraph;
});
