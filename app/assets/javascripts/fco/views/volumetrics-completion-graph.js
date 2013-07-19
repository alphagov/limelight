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
              return value + '%';
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }
  });

  return VolumetricsCompletionGraph;
});
