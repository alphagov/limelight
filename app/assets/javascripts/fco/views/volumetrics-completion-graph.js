define([
  'require',
  './volumetrics-submissions-graph',
  'extensions/views/availability/tooltip'
],
function (require, VolumetricsSubmissionsGraph, Tooltip) {
  var VolumetricsCompletionGraph = VolumetricsSubmissionsGraph.extend({
    minYDomainExtent: 1,
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        {
          view: this.sharedComponents.yaxis,
          options: {
            ticks: 3,
            tickFormat: function () {
              return function (d) {
                return Math.round(100 * d) + '%';
              };
            }
          }
        },
        {
          view: this.sharedComponents.stack,
          options: { drawCursorLine: true }
        },
        {
          view: Tooltip,
          options: {
            getValue: function (group, groupIndex, model, index) {
              var value = model.get(this.graph.valueAttr) * 100;
              if (value !== 100) {
                value = value.toFixed(0);
              }
              var selection = this.collection.getCurrentSelection();
              var finished = selection.selectedModel.get('uniqueEvents');
              
              //TODO: really hacky way of finding no of started.
              var started = finished / (value / 100);
              started = started.toFixed(0);
              

              return value + '%' + ' (' + finished + ' out of ' + started + ')';
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }
  });

  return VolumetricsCompletionGraph;
});
