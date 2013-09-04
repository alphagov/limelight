define([
  'extensions/views/graph/graph'
],
function (Graph) {
  var StackedGraph = Graph.extend({
    
    components: function () {

      var labelComponent, labelOptions, stackOptions;
      if (this.options.showLineLabels) {
        labelComponent = this.sharedComponents.linelabel;
        labelOptions = {
          showValues: true,
          showValuesPercentage: true,
          showSummary: true,
          showTimePeriod: true
        };
        stackOptions = {
          selectGroup: false,
          drawCursorLine: true
        };
      } else {
        labelComponent = this.sharedComponents.callout;
      }

      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis },
        { view: this.sharedComponents.stack, options: stackOptions },
        { view: labelComponent, options: labelOptions },
        { view: this.sharedComponents.hover }
      ];
    },

    getConfigNames: function () {
      return ['stack', this.collection.query.get('period') || 'week'];
    }
  });
  
  return StackedGraph;
});
