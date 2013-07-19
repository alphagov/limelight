define([
  'extensions/views/timeseries-graph/timeseries-graph',
  'extensions/views/availability/tooltip'

],
function (TimeseriesGraph, Tooltip) {
  var VolumetricsGraph = TimeseriesGraph.extend({
    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        {
          view: this.sharedComponents.yaxis,
          options: {
            ticks: 3
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
              var value = model.get(this.graph.valueAttr);     
              return value;
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }
  });

  return VolumetricsGraph;
});

