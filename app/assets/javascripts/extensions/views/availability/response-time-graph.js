define([
  'extensions/views/graph/graph'
],
function (Graph) {
  var ResponseTimeGraph = Graph.extend({

    valueAttr: 'avgresponse',
    numYTicks: 3,

    getConfigNames: function () {
      return ['stack', 'hour'];
    },

    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis,options: {
            tickFormat: function () {
              return function (d) {
                return d + 'ms';
              };
            }
          }
        },
        {
          view: this.sharedComponents.stack,
          options: { drawCursorLine: true }
        },
        {
          view: this.sharedComponents.tooltip,
          options: {
            getValue: function (group, groupIndex, model, index) {
              return model.get(this.graph.valueAttr) + 'ms';
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }

  });

  return ResponseTimeGraph;
});
