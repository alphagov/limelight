define([
  'extensions/views/graph/graph'
],
function (Graph) {
  var ResponseTimeGraph = Graph.extend({

    valueAttr: 'avgresponse',
    numYTicks: 3,

    getConfigNames: function () {
      return ['stack', this.collection.query.get('period')];
    },

    components: function () {
      return [
        { view: this.sharedComponents.xaxis },
        { view: this.sharedComponents.yaxis, options: {
            tickFormat: function () {
              return function (d) {
                return ResponseTimeGraph.prototype.formatDuration(d, 4);
              };
            }
          }
        },
        {
          view: this.sharedComponents.stack,
          options: {
            drawCursorLine: true,
            allowMissingData: true
          }
        },
        {
          view: this.sharedComponents.tooltip,
          options: {
            getValue: function (group, groupIndex, model, index) {
              var responseTime = model.get(this.graph.valueAttr);
              if (responseTime === null) {
                return '';
              } else {
                return this.formatDuration(responseTime, 4);
              }
            }
          }
        },
        { view: this.sharedComponents.hover }
      ];
    }

  });

  return ResponseTimeGraph;
});
